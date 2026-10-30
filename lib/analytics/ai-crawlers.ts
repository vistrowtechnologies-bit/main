// Known AI crawlers and AI fetchers, matched on the user agent. "training" bots collect pages for model
// training, "search" bots index pages for AI answers, and "user" fetchers load a page because someone
// asked an assistant about it. Google-Extended and Applebot-Extended are robots.txt tokens only and never
// appear as user agents, so they cannot be counted here.
export const AI_CRAWLERS: { pattern: RegExp; bot: string; owner: string; kind: "training" | "search" | "user" }[] = [
  { pattern: /ChatGPT-User/i, bot: "ChatGPT-User", owner: "OpenAI", kind: "user" },
  { pattern: /OAI-SearchBot/i, bot: "OAI-SearchBot", owner: "OpenAI", kind: "search" },
  { pattern: /GPTBot/i, bot: "GPTBot", owner: "OpenAI", kind: "training" },
  { pattern: /Claude-User/i, bot: "Claude-User", owner: "Anthropic", kind: "user" },
  { pattern: /Claude-SearchBot/i, bot: "Claude-SearchBot", owner: "Anthropic", kind: "search" },
  { pattern: /ClaudeBot|anthropic-ai|Claude-Web/i, bot: "ClaudeBot", owner: "Anthropic", kind: "training" },
  { pattern: /Perplexity-User/i, bot: "Perplexity-User", owner: "Perplexity", kind: "user" },
  { pattern: /PerplexityBot/i, bot: "PerplexityBot", owner: "Perplexity", kind: "search" },
  { pattern: /Google-CloudVertexBot|Gemini-Deep-Research/i, bot: "Gemini", owner: "Google", kind: "user" },
  { pattern: /Meta-ExternalFetcher/i, bot: "Meta-ExternalFetcher", owner: "Meta", kind: "user" },
  { pattern: /Meta-ExternalAgent|FacebookBot/i, bot: "Meta-ExternalAgent", owner: "Meta", kind: "training" },
  { pattern: /MistralAI-User/i, bot: "MistralAI-User", owner: "Mistral", kind: "user" },
  { pattern: /DuckAssistBot/i, bot: "DuckAssistBot", owner: "DuckDuckGo", kind: "search" },
  { pattern: /YouBot/i, bot: "YouBot", owner: "You.com", kind: "search" },
  { pattern: /bingbot.*(copilot|chat)|Copilot/i, bot: "Copilot", owner: "Microsoft", kind: "user" },
  { pattern: /Amazonbot/i, bot: "Amazonbot", owner: "Amazon", kind: "training" },
  { pattern: /Applebot/i, bot: "Applebot", owner: "Apple", kind: "search" },
  { pattern: /Bytespider/i, bot: "Bytespider", owner: "ByteDance", kind: "training" },
  { pattern: /CCBot/i, bot: "CCBot", owner: "Common Crawl", kind: "training" },
  { pattern: /cohere-ai|cohere-training/i, bot: "Cohere", owner: "Cohere", kind: "training" },
  { pattern: /DeepSeekBot/i, bot: "DeepSeekBot", owner: "DeepSeek", kind: "training" },
  { pattern: /PetalBot/i, bot: "PetalBot", owner: "Huawei", kind: "search" },
];

export function matchAiCrawler(userAgent: string | null) {
  if (!userAgent) return undefined;
  return AI_CRAWLERS.find((crawler) => crawler.pattern.test(userAgent));
}
