import { SourceType, TimeFilter } from "./types";

export function cnDate(dateStr: string): number {
  return new Date(dateStr).getTime();
}

export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
}

export function isWithinTimeFilter(dateStr: string, filter: TimeFilter): boolean {
  if (filter === "all") return true;
  const diffHours = (Date.now() - new Date(dateStr).getTime()) / 36e5;
  if (filter === "1h") return diffHours <= 1;
  if (filter === "24h") return diffHours <= 24;
  return diffHours <= 168;
}

export function sourceTypeLabel(type: SourceType): string {
  return ({ blog: "Blog", reddit: "Reddit", news: "News", hn: "HN", github: "GitHub", research: "Research" })[type];
}

export function sourceTypeBadgeClass(type: SourceType): string {
  return ({
    blog: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    reddit: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    news: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    hn: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    github: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    research: "bg-pink-500/10 text-pink-400 border-pink-500/30",
  })[type];
}

export function highlightKeywords(text: string, keywords: string[]): string {
  if (!keywords.length) return text;
  const escaped = keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  return text.replace(regex, '<mark class="keyword">$1</mark>');
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/&[^;]+;/g, " ").replace(/\s+/g, " ").trim();
}
