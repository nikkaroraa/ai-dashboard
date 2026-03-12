import { NextRequest, NextResponse } from "next/server";

interface RSSItem {
  title: string;
  link: string;
  description?: string;
  pubDate?: string;
  guid?: string;
}

function extractTag(xml: string, tag: string): string {
  const cdataRegex = new RegExp(`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`, "i");
  const cdataMatch = xml.match(cdataRegex);
  if (cdataMatch) return cdataMatch[1].trim();
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  return xml.match(regex)?.[1]?.trim() || "";
}

function extractAttr(xml: string, tag: string, attr: string): string {
  const regex = new RegExp(`<${tag}[^>]*${attr}="([^"]*)"`, "i");
  return xml.match(regex)?.[1] || "";
}

function parseItems(xml: string): RSSItem[] {
  const items: RSSItem[] = [];
  const itemRegex = /<item[\s>]([\s\S]*?)<\/item>/gi;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    items.push({
      title: extractTag(block, "title"),
      link: extractTag(block, "link") || extractAttr(block, "link", "href"),
      description: extractTag(block, "description") || extractTag(block, "content:encoded") || extractTag(block, "summary"),
      pubDate: extractTag(block, "pubDate") || extractTag(block, "dc:date") || extractTag(block, "published") || extractTag(block, "updated"),
      guid: extractTag(block, "guid") || extractTag(block, "id"),
    });
  }
  if (items.length === 0) {
    const entryRegex = /<entry[\s>]([\s\S]*?)<\/entry>/gi;
    while ((match = entryRegex.exec(xml)) !== null) {
      const block = match[1];
      items.push({
        title: extractTag(block, "title"),
        link: extractTag(block, "link") || extractAttr(block, "link", "href"),
        description: extractTag(block, "content") || extractTag(block, "summary"),
        pubDate: extractTag(block, "published") || extractTag(block, "updated"),
        guid: extractTag(block, "id"),
      });
    }
  }
  return items;
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "AI-Intelligence-Dashboard/1.0 (RSS Reader)",
        Accept: "application/rss+xml, application/xml, application/atom+xml, text/xml, */*",
      },
    });
    clearTimeout(timeout);
    if (!response.ok) return NextResponse.json({ error: `Feed returned ${response.status}` }, { status: 502 });
    const xml = await response.text();
    const items = parseItems(xml);
    return NextResponse.json({
      items: items.slice(0, 50).map((item) => ({
        title: item.title,
        link: item.link,
        description: item.description || "",
        pubDate: item.pubDate || new Date().toISOString(),
        guid: item.guid || item.link || item.title,
      })),
    });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Unknown error" }, { status: 502 });
  }
}
