"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Brain, RefreshCcw, PanelLeft, Plus } from "lucide-react";
import { AddSourceModal } from "@/components/add-source-modal";
import { Feed } from "@/components/feed";
import { Sidebar } from "@/components/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Source, FeedItem, SourceType, TimeFilter } from "@/lib/types";
import { getKeywords, getSources, saveKeywords, saveSources } from "@/lib/storage";
import { isWithinTimeFilter, stripHtml } from "@/lib/utils";

export default function DashboardPage() {
  const [sources, setSources] = useState<Source[]>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [activeTypes, setActiveTypes] = useState<Set<SourceType>>(new Set(["blog", "reddit", "news", "hn", "github", "research"]));
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("24h");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => { setSources(getSources()); setKeywords(getKeywords()); }, []);

  const fetchFeeds = useCallback(async () => {
    const enabled = sources.filter((s) => s.enabled);
    if (!enabled.length) { setItems([]); setLoading(false); return; }
    setLoading(true);
    const allItems: FeedItem[] = [];
    const results = await Promise.allSettled(enabled.map(async (source) => {
      const res = await fetch(`/api/fetch-feed?url=${encodeURIComponent(source.url)}`);
      if (!res.ok) return [];
      const data = await res.json();
      return (data.items || []).map((item: { title: string; link: string; description?: string; pubDate: string; guid: string }) => {
        const title = stripHtml(item.title);
        const desc = stripHtml(item.description || "");
        const text = `${title} ${desc}`.toLowerCase();
        const matched = keywords.filter((k) => text.includes(k.toLowerCase()));
        return { id: `${source.id}-${item.guid || item.link}`, title, link: item.link, description: desc, pubDate: item.pubDate, source: { name: source.name, type: source.type }, matchedKeywords: matched } as FeedItem;
      });
    }));
    results.forEach((r) => { if (r.status === "fulfilled") allItems.push(...r.value); });
    allItems.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
    const seen = new Set<string>();
    const deduped = allItems.filter((item) => { const key = item.title.toLowerCase().slice(0, 90); if (seen.has(key)) return false; seen.add(key); return true; });
    setItems(deduped);
    setLastRefresh(new Date());
    setLoading(false);
  }, [sources, keywords]);

  useEffect(() => {
    if (sources.length) fetchFeeds();
    intervalRef.current = setInterval(fetchFeeds, 5 * 60 * 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchFeeds, sources.length]);

  const filteredItems = useMemo(() => items.filter((item) => {
    if (!activeTypes.has(item.source.type)) return false;
    if (!isWithinTimeFilter(item.pubDate, timeFilter)) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(q) || (item.description || "").toLowerCase().includes(q);
  }), [items, activeTypes, timeFilter, searchQuery]);

  const stats = useMemo(() => {
    const lastHour = items.filter((i) => isWithinTimeFilter(i.pubDate, "1h")).length;
    const counts = items.reduce<Record<string, number>>((acc, i) => { acc[i.source.name] = (acc[i.source.name] || 0) + 1; return acc; }, {});
    const mostActive = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
    const dayItems = items.filter((i) => isWithinTimeFilter(i.pubDate, "24h"));
    const words = dayItems.flatMap((i) => `${i.title} ${i.description || ""}`.toLowerCase().split(/[^a-z0-9+#-]+/)).filter(Boolean);
    const stop = new Set(["the", "and", "for", "with", "from", "that", "this", "you", "your", "are", "about", "into", "new"]);
    const freq = words.reduce<Record<string, number>>((acc, w) => { if (w.length < 4 || stop.has(w)) return acc; acc[w] = (acc[w] || 0) + 1; return acc; }, {});
    const trending = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 8).map(([w]) => w);
    return { total: items.length, lastHour, mostActive, trending };
  }, [items]);

  const sidebarNode = <Sidebar
    sources={sources} keywords={keywords} activeTypes={activeTypes} timeFilter={timeFilter} searchQuery={searchQuery}
    onSetSearchQuery={setSearchQuery} onToggleType={(t) => setActiveTypes((prev) => { const n = new Set(prev); n.has(t) ? n.delete(t) : n.add(t); return n; })}
    onSetTimeFilter={setTimeFilter}
    onToggleSource={(id) => { const u = sources.map((s) => s.id === id ? { ...s, enabled: !s.enabled } : s); setSources(u); saveSources(u); }}
    onRemoveSource={(id) => { const u = sources.filter((s) => s.id !== id); setSources(u); saveSources(u); }}
    onAddKeyword={(kw) => { const t = kw.trim(); if (!t || keywords.includes(t)) return; const u = [...keywords, t]; setKeywords(u); saveKeywords(u); }}
    onRemoveKeyword={(kw) => { const u = keywords.filter((k) => k !== kw); setKeywords(u); saveKeywords(u); }}
  />;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4">
          <div className="flex items-center gap-3"><Brain className="h-5 w-5 text-emerald-400" /><h1 className="font-bold tracking-tight">AI Intelligence</h1></div>
          <div className="flex items-center gap-2 text-xs text-zinc-400"><span>{lastRefresh ? `Last refresh ${lastRefresh.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : "Not refreshed yet"}</span><Badge className="border-zinc-700 text-zinc-300">{sources.filter((s) => s.enabled).length} sources</Badge><Button variant="outline" size="sm" onClick={() => fetchFeeds()}><RefreshCcw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /></Button><Button variant="outline" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}><PanelLeft className="h-4 w-4" /></Button><Button size="sm" className="bg-emerald-500 text-zinc-950 hover:bg-emerald-400" onClick={() => setAddOpen(true)}><Plus className="h-4 w-4" /> Add</Button></div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 p-4 lg:grid-cols-[300px_1fr]">
        <aside className="hidden lg:block rounded-lg border border-zinc-800 bg-zinc-900">{sidebarNode}</aside>
        <section className="space-y-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4"><div className="text-xs text-zinc-400">Total items</div><div className="text-2xl font-bold tracking-tight">{stats.total}</div></div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4"><div className="text-xs text-zinc-400">Items last hour</div><div className="text-2xl font-bold tracking-tight">{stats.lastHour}</div></div>
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4"><div className="text-xs text-zinc-400">Most active source</div><div className="text-sm font-medium truncate mt-1">{stats.mostActive}</div></div>
          </div>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-3"><div className="text-xs text-zinc-400 mb-2">Trending topics (24h)</div><div className="flex flex-wrap gap-1.5">{stats.trending.length ? stats.trending.map((t) => <Badge key={t} className="border-zinc-700 text-zinc-300">{t}</Badge>) : <span className="text-sm text-zinc-500">Not enough data yet</span>}</div></div>
          <Feed items={filteredItems} keywords={keywords} loading={loading} />
        </section>
      </main>

      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}><SheetContent className="left-0 right-auto top-0 h-full w-[92vw] max-w-sm translate-x-0 translate-y-0">{sidebarNode}</SheetContent></Sheet>
      <AddSourceModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={(source) => { const u = [...sources, source]; setSources(u); saveSources(u); setAddOpen(false); }} />
    </div>
  );
}
