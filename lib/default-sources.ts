import { Source } from "./types";

export const defaultSources: Source[] = [
  { id: "simon-willison", name: "Simon Willison", url: "https://simonwillison.net/atom/everything/", type: "blog", enabled: true },
  { id: "latent-space", name: "Latent Space", url: "https://latent.space/feed", type: "blog", enabled: true },
  { id: "one-useful-thing", name: "One Useful Thing", url: "https://www.oneusefulthing.org/feed", type: "blog", enabled: true },
  { id: "lilian-weng", name: "Lilian Weng", url: "https://lilianweng.github.io/feed.xml", type: "research", enabled: true },
  { id: "bair", name: "BAIR Berkeley", url: "https://bair.berkeley.edu/blog/feed.xml", type: "research", enabled: true },
  { id: "mit-ai-news", name: "MIT AI News", url: "https://news.mit.edu/rss/topic/artificial-intelligence2", type: "research", enabled: true },
  { id: "techcrunch-ai", name: "TechCrunch AI", url: "https://techcrunch.com/category/artificial-intelligence/feed/", type: "news", enabled: true },
  { id: "verge-ai", name: "The Verge AI", url: "https://www.theverge.com/artificial-intelligence/rss/index.xml", type: "news", enabled: true },
  { id: "ars-ai", name: "Ars Technica AI", url: "https://feeds.arstechnica.com/arstechnica/technology-lab", type: "news", enabled: true },
  { id: "reddit-ml", name: "r/MachineLearning", url: "https://www.reddit.com/r/MachineLearning/.rss", type: "reddit", enabled: true },
  { id: "reddit-localllama", name: "r/LocalLLaMA", url: "https://www.reddit.com/r/LocalLLaMA/.rss", type: "reddit", enabled: true },
  { id: "reddit-artificial", name: "r/artificial", url: "https://www.reddit.com/r/artificial/.rss", type: "reddit", enabled: true },
  { id: "reddit-chatgpt", name: "r/ChatGPT", url: "https://www.reddit.com/r/ChatGPT/.rss", type: "reddit", enabled: true },
  { id: "reddit-claudeai", name: "r/ClaudeAI", url: "https://www.reddit.com/r/ClaudeAI/.rss", type: "reddit", enabled: true },
  { id: "hn-ai", name: "HN AI Front Page", url: "https://hnrss.org/frontpage?q=AI+OR+LLM+OR+GPT+OR+Claude", type: "hn", enabled: true },
  { id: "github-trending-ai", name: "GitHub Trending AI/ML", url: "https://mshibanami.github.io/GitHubTrendingRSS/daily/all.xml", type: "github", enabled: true },
];

export const defaultKeywords: string[] = [
  "Claude",
  "GPT",
  "Codex",
  "Anthropic",
  "OpenAI",
  "agent",
  "fine-tuning",
  "reasoning",
  "Katana",
  "DeFi",
];
