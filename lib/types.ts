export type SourceType = "blog" | "reddit" | "news" | "hn" | "github" | "research";

export interface Source {
  id: string;
  name: string;
  url: string;
  type: SourceType;
  enabled: boolean;
}

export interface FeedItem {
  id: string;
  title: string;
  link: string;
  description?: string;
  pubDate: string;
  source: {
    name: string;
    type: SourceType;
  };
  matchedKeywords: string[];
}

export type TimeFilter = "1h" | "24h" | "7d" | "all";
