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

  // Blogs / People
  { id: "andrej-karpathy", name: "Andrej Karpathy", url: "https://karpathy.github.io/feed.xml", type: "blog", enabled: true },
  { id: "jay-alammar", name: "Jay Alammar", url: "https://jalammar.github.io/feed.xml", type: "blog", enabled: true },
  { id: "chip-huyen", name: "Chip Huyen", url: "https://huyenchip.com/feed.xml", type: "blog", enabled: true },
  { id: "sebastian-raschka", name: "Sebastian Raschka", url: "https://magazine.sebastianraschka.com/feed", type: "blog", enabled: true },
  { id: "eugene-yan", name: "Eugene Yan", url: "https://eugeneyan.com/rss/", type: "blog", enabled: true },
  { id: "hamel-husain", name: "Hamel Husain", url: "https://hamel.dev/index.xml", type: "blog", enabled: true },
  { id: "interconnects", name: "Interconnects (Nathan Lambert)", url: "https://www.interconnects.ai/feed", type: "blog", enabled: true },

  // Research / Orgs
  { id: "google-ai-blog", name: "Google AI Blog", url: "https://blog.google/technology/ai/rss/", type: "research", enabled: true },
  { id: "meta-ai-blog", name: "Meta AI / FAIR", url: "https://about.fb.com/news/feed/", type: "research", enabled: true },
  { id: "deepmind-blog", name: "DeepMind Blog", url: "https://deepmind.google/blog/rss.xml", type: "research", enabled: true },
  { id: "hugging-face-blog", name: "Hugging Face Blog", url: "https://huggingface.co/blog/feed.xml", type: "research", enabled: true },
  // { id: "papers-with-code-trending", name: "Papers With Code Trending", url: "", type: "research", enabled: false }, // No stable public RSS feed found for trending.

  // Newsletters
  // { id: "the-batch", name: "The Batch (DeepLearning.AI)", url: "", type: "news", enabled: false }, // Could not find a working public RSS feed.
  { id: "import-ai", name: "Import AI (Jack Clark)", url: "https://importai.substack.com/feed", type: "news", enabled: true },
  { id: "ai-supremacy", name: "AI Supremacy", url: "https://aisupremacy.substack.com/feed", type: "news", enabled: true },

  // YouTube (via channel RSS)
  { id: "yannic-kilcher-youtube", name: "Yannic Kilcher (YouTube)", url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCGoxKRfTs0jQP52cfHCyyRQ", type: "news", enabled: true },
  { id: "two-minute-papers-youtube", name: "Two Minute Papers (YouTube)", url: "https://www.youtube.com/feeds/videos.xml?channel_id=UCbfYPyITQ-7l4upoX8nvctg", type: "news", enabled: true },
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
