"use client";

import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Source, SourceType, TimeFilter } from "@/lib/types";
import { sourceTypeBadgeClass, sourceTypeLabel } from "@/lib/utils";

const types: SourceType[] = ["blog", "reddit", "news", "hn", "github", "research"];

export function Sidebar({
  sources, keywords, activeTypes, timeFilter, searchQuery, onSetSearchQuery, onToggleType, onSetTimeFilter,
  onToggleSource, onRemoveSource, onAddKeyword, onRemoveKeyword,
}: {
  sources: Source[]; keywords: string[]; activeTypes: Set<SourceType>; timeFilter: TimeFilter; searchQuery: string;
  onSetSearchQuery: (v: string) => void; onToggleType: (t: SourceType) => void; onSetTimeFilter: (f: TimeFilter) => void;
  onToggleSource: (id: string) => void; onRemoveSource: (id: string) => void; onAddKeyword: (v: string) => void; onRemoveKeyword: (v: string) => void;
}) {
  return (
    <TooltipProvider>
      <ScrollArea className="h-[calc(100vh-5rem)] pr-1">
        <div className="space-y-4 p-3">
          <div className="relative"><Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" /><Input className="pl-8" placeholder="Search feed..." value={searchQuery} onChange={(e) => onSetSearchQuery(e.target.value)} /></div>
          <Select value={timeFilter} onValueChange={(v) => onSetTimeFilter(v as TimeFilter)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="1h">Last 1h</SelectItem><SelectItem value="24h">Last 24h</SelectItem><SelectItem value="7d">Last 7d</SelectItem><SelectItem value="all">All time</SelectItem></SelectContent></Select>
          <Separator />
          <div className="space-y-2">{types.map((type) => <button key={type} onClick={() => onToggleType(type)} className="w-full text-left"><Badge className={activeTypes.has(type) ? sourceTypeBadgeClass(type) : "border-zinc-800 text-zinc-500"}>{sourceTypeLabel(type)}</Badge></button>)}</div>
          <Separator />
          <div className="space-y-2">
            <div className="text-xs font-medium text-zinc-400">Keywords</div>
            <div className="flex flex-wrap gap-1">{keywords.map((k) => <Badge key={k} className="border-zinc-700 text-zinc-300 cursor-pointer" onClick={() => onRemoveKeyword(k)}>{k}</Badge>)}</div>
            <div className="flex gap-2"><Input placeholder="Add keyword" onKeyDown={(e) => { if (e.key === "Enter") { onAddKeyword((e.currentTarget as HTMLInputElement).value); (e.currentTarget as HTMLInputElement).value = ""; } }} /><Tooltip><TooltipTrigger asChild><Button size="icon" variant="outline"><Plus className="h-4 w-4" /></Button></TooltipTrigger><TooltipContent>Press Enter to add</TooltipContent></Tooltip></div>
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="text-xs font-medium text-zinc-400">Sources ({sources.length})</div>
            {sources.map((s) => (
              <div key={s.id} className="flex items-center gap-2">
                <Switch checked={s.enabled} onCheckedChange={() => onToggleSource(s.id)} />
                <div className="min-w-0 flex-1 text-sm text-zinc-300 truncate">{s.name}</div>
                <Button size="icon" variant="ghost" className="h-7 w-7 text-zinc-500" onClick={() => onRemoveSource(s.id)}>×</Button>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </TooltipProvider>
  );
}
