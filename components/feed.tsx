"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink } from "lucide-react";
import { FeedItem } from "@/lib/types";
import { highlightKeywords, sourceTypeBadgeClass, sourceTypeLabel, timeAgo } from "@/lib/utils";

export function Feed({ items, keywords, loading }: { items: FeedItem[]; keywords: string[]; loading: boolean }) {
  if (loading && items.length === 0) {
    return <div className="space-y-3">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-28 w-full" />)}</div>;
  }
  if (items.length === 0) return <Card><CardContent className="pt-6 text-zinc-400">No items found. Try broadening filters.</CardContent></Card>;

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <a key={item.id} href={item.link} target="_blank" rel="noreferrer" className="block">
          <Card className="hover:bg-zinc-800/70 transition-colors duration-200">
            <CardHeader>
              <div className="flex items-center gap-2 text-xs">
                <Badge className={sourceTypeBadgeClass(item.source.type)}>{sourceTypeLabel(item.source.type)}</Badge>
                <span className="text-zinc-400">{item.source.name}</span>
                <span className="ml-auto text-zinc-500">{timeAgo(item.pubDate)}</span>
              </div>
              <h3 className="text-zinc-100 font-medium leading-snug" dangerouslySetInnerHTML={{ __html: highlightKeywords(item.title, keywords) }} />
            </CardHeader>
            <CardContent>
              {item.description && <p className="line-clamp-3 text-sm text-zinc-400" dangerouslySetInnerHTML={{ __html: highlightKeywords(item.description.slice(0, 240), keywords) }} />}
              <div className="mt-3 flex items-center gap-1 text-xs text-zinc-500"><ExternalLink className="h-3 w-3" /> Open article</div>
            </CardContent>
          </Card>
        </a>
      ))}
    </div>
  );
}
