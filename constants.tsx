
import { Tool, ToolCategory } from './types';

/**
 * System Prompt Template Generator
 */
const buildSystemPrompt = (name: string, category: string, instructions: string, outputRules: string) => `
You are an expert SEO tool engine inside Mindmatrix SEO.

Tool Name: ${name}
Category: ${category}

Target Market: Bangladesh
SEO Standard: White-hat only

Instructions:
${instructions}
- Follow modern Google SEO best practices
- Avoid keyword stuffing or spam tactics
- If metrics are estimated, label them clearly
- Output must be clean, structured, and copy-ready

Output Requirements:
${outputRules}

Recommended Next Action:
Suggest 1–2 relevant Mindmatrix SEO tools.
`;

export const TOOLS: Tool[] = [
  // 🟩 KEYWORD RESEARCH TOOLS (1–20)
  {
    id: 'kw-gen',
    category: ToolCategory.KEYWORD,
    name: { en: 'Keyword Generator', bn: 'কীওয়ার্ড জেনারেটর' },
    description: { en: 'Generate high-intent keywords grouped by search intent.', bn: 'সার্চ ইনটেন্ট অনুযায়ী হাই-ইনটেন্ট কীওয়ার্ড তৈরি করুন।' },
    icon: 'Search',
    isAI: true,
    popular: true,
    inputs: [
      { name: 'seed', label: { en: 'Seed Keyword', bn: 'মূল কীওয়ার্ড' }, type: 'text', placeholder: { en: 'e.g. digital marketing bd', bn: 'উদা: ডিজিটাল মার্কেটিং বিডি' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Keyword Generator', 'Keyword Research', 
      'Generate a list of high-intent keywords based on the seed. Focus on Bangladesh search behavior.',
      'Group by intent: Informational, Commercial, Transactional. Use a Markdown table.')
  },
  {
    id: 'kw-difficulty',
    category: ToolCategory.KEYWORD,
    name: { en: 'Keyword Difficulty Checker', bn: 'কীওয়ার্ড ডিফিকাল্টি চেকার' },
    description: { en: 'Estimate ranking difficulty for specific keywords.', bn: 'নির্দিষ্ট কীওয়ার্ডের জন্য র‍্যাঙ্কিং ডিফিকাল্টি অনুমান করুন।' },
    icon: 'Zap',
    isAI: true,
    inputs: [
      { name: 'keyword', label: { en: 'Keyword', bn: 'কীওয়ার্ড' }, type: 'text', placeholder: { en: 'best laptop price', bn: 'সেরা ল্যাপটপ প্রাইস' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Keyword Difficulty Checker', 'Keyword Research',
      'Estimate ranking difficulty (0-100) and provide a label (Low/Medium/High).',
      'Explain why briefly. Include estimated backlink requirements.')
  },
  {
    id: 'bn-kw-gen',
    category: ToolCategory.KEYWORD,
    name: { en: 'Bangla Keyword Generator', bn: 'বাংলা কীওয়ার্ড জেনারেটর' },
    description: { en: 'Generate natural Bangla keywords for local SEO.', bn: 'লোকাল এসইও-র জন্য প্রাকৃতিক বাংলা কীওয়ার্ড তৈরি করুন।' },
    icon: 'Languages',
    isAI: true,
    inputs: [
      { name: 'topic', label: { en: 'Topic', bn: 'টপিক' }, type: 'text', placeholder: { en: 'Investment tips', bn: 'বিনিয়োগের টিপস' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Bangla Keyword Generator', 'Keyword Research',
      'Generate Bangla keywords used by real Bangladeshi searchers. Avoid literal translations.',
      'Prefer natural Bangla queries. List 15-20 variations.')
  },
  {
    id: 'intent-analyzer',
    category: ToolCategory.KEYWORD,
    name: { en: 'Search Intent Analyzer', bn: 'সার্চ ইনটেন্ট অ্যানালাইজার' },
    description: { en: 'Classify keyword intent and user goals.', bn: 'কীওয়ার্ড ইনটেন্ট এবং ইউজারের লক্ষ্য বিশ্লেষণ করুন।' },
    icon: 'Target',
    isAI: true,
    inputs: [
      { name: 'keyword', label: { en: 'Keyword', bn: 'কীওয়ার্ড' }, type: 'text', placeholder: { en: 'buy iphone 15', bn: 'আইফোন ১৫ কিনুন' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Search Intent Analyzer', 'Keyword Research',
      'Classify the keyword intent and explain the expected user goal.',
      'Provide content strategy tips for this intent.')
  },
  {
    id: 'long-tail-finder',
    category: ToolCategory.KEYWORD,
    name: { en: 'Long-tail Keyword Finder', bn: 'লোকাল মার্কেটে লং-টেইল কীওয়ার্ড খুঁজুন।' },
    description: { en: 'Find low-competition long-tail keywords.', bn: 'কম কম্পিটিশনের লং-টেইল কীওয়ার্ড খুঁজুন।' },
    icon: 'BarChart3',
    isAI: true,
    inputs: [
      { name: 'seed', label: { en: 'Seed Keyword', bn: 'মূল কীওয়ার্ড' }, type: 'text', placeholder: { en: 'SEO tools', bn: 'এসইও টুলস' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Long-tail Keyword Finder', 'Keyword Research',
      'Generate long-tail keywords suitable for low-competition ranking.',
      'List at least 10 keywords with search volume estimates.')
  },
  {
    id: 'paa-extractor',
    category: ToolCategory.KEYWORD,
    name: { en: 'People Also Ask Extractor', bn: 'PAA এক্সট্রাক্টর' },
    description: { en: 'Extract common "People Also Ask" questions.', bn: 'জনপ্রিয় "পিপল অলসো আস্ক" প্রশ্নগুলো বের করুন।' },
    icon: 'HelpCircle',
    isAI: true,
    inputs: [
      { name: 'topic', label: { en: 'Topic', bn: 'টপিক' }, type: 'text', placeholder: { en: 'Health tips', bn: 'স্বাস্থ্য টিপস' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('People Also Ask Extractor', 'Keyword Research',
      'Generate common "People Also Ask" questions related to the keyword.',
      'Provide answers suitable for featured snippets.')
  },
  {
    id: 'related-kw',
    category: ToolCategory.KEYWORD,
    name: { en: 'Related Keywords Tool', bn: 'রিলেটেড কীওয়ার্ড টুল' },
    description: { en: 'Find semantically related LSI keywords.', bn: 'সিম্যান্টিকলি রিলেটেড এলএসআই কীওয়ার্ড খুঁজুন।' },
    icon: 'Network',
    isAI: true,
    inputs: [
      { name: 'keyword', label: { en: 'Keyword', bn: 'কীওয়ার্ড' }, type: 'text', placeholder: { en: 'Digital camera', bn: 'ডিজিটাল ক্যামেরা' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Related Keywords Tool', 'Keyword Research',
      'Find semantically related keywords (LSI-style).',
      'Focus on contextual relevance.')
  },
  {
    id: 'kw-clustering',
    category: ToolCategory.KEYWORD,
    name: { en: 'Keyword Clustering Tool', bn: 'কীওয়ার্ড ক্লাস্টারিং টুল' },
    description: { en: 'Cluster keywords by topical relevance.', bn: 'টপিকাল রেলেভ্যান্স অনুযায়ী কীওয়ার্ড ক্লাস্টার করুন।' },
    icon: 'Layers',
    isAI: true,
    inputs: [
      { name: 'list', label: { en: 'Keyword List', bn: 'কীওয়ার্ড লিস্ট' }, type: 'textarea', placeholder: { en: 'Keyword 1, Keyword 2...', bn: 'কীওয়ার্ড ১, কীওয়ার্ড ২...' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Keyword Clustering Tool', 'Keyword Research',
      'Cluster keywords by topical relevance for content planning.',
      'Organize into pillars and subtopics.')
  },
  {
    id: 'kw-trends',
    category: ToolCategory.KEYWORD,
    name: { en: 'Keyword Trend Analyzer', bn: 'কীওয়ার্ড ট্রেন্ড অ্যানালাইজার' },
    description: { en: 'Analyze interest trends for keywords.', bn: 'কীওয়ার্ডের ইন্টারেস্ট ট্রেন্ড বিশ্লেষণ করুন।' },
    icon: 'TrendingUp',
    isAI: true,
    inputs: [
      { name: 'keyword', label: { en: 'Keyword', bn: 'কীওয়ার্ড' }, type: 'text', placeholder: { en: 'E-commerce in BD', bn: 'বিডিতে ই-কমার্স' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Keyword Trend Analyzer', 'Keyword Research',
      'Analyze whether interest is rising, stable, or declining.',
      'Mark results as estimated. Use search grounding.')
  },
  {
    id: 'cpc-estimator',
    category: ToolCategory.KEYWORD,
    name: { en: 'CPC Estimator (BD)', bn: 'সিপিসি এস্টিমেটর (বিডি)' },
    description: { en: 'Estimate CPC for Bangladesh market.', bn: 'বাংলাদেশ মার্কেটের জন্য সিপিসি অনুমান করুন।' },
    icon: 'DollarSign',
    isAI: true,
    inputs: [
      { name: 'keyword', label: { en: 'Keyword', bn: 'কীওয়ার্ড' }, type: 'text', placeholder: { en: 'Insurance', bn: 'ইন্স্যুরেন্স' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('CPC Estimator (BD)', 'Keyword Research',
      'Estimate CPC value for Bangladesh advertisers.',
      'Label values as approximate. Provide Low and High range.')
  },
  {
    id: 'serp-preview',
    category: ToolCategory.KEYWORD,
    name: { en: 'SERP Preview Tool', bn: 'SERP প্রিভিউ টুল' },
    description: { en: 'Preview Google search result appearance.', bn: 'গুগল সার্চ রেজাল্ট প্রিভিউ দেখুন।' },
    icon: 'Eye',
    isAI: true,
    inputs: [
      { name: 'title', label: { en: 'Title', bn: 'টাইটেল' }, type: 'text', placeholder: { en: 'Best SEO Tools...', bn: 'সেরা এসইও টুলস...' }, required: true },
      { name: 'desc', label: { en: 'Description', bn: 'ডেসক্রিপশন' }, type: 'textarea', placeholder: { en: 'We provide...', bn: 'আমরা দিচ্ছি...' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('SERP Preview Tool', 'Keyword Research',
      'Generate Google SERP title + meta preview. Respect pixel limits.',
      'Highlight if title/desc is too long.')
  },
  {
    id: 'question-gen',
    category: ToolCategory.KEYWORD,
    name: { en: 'Question Keyword Generator', bn: 'প্রশ্ন কীওয়ার্ড জেনারেটর' },
    description: { en: 'Generate pre-buying questions.', bn: 'কেনার আগের প্রশ্নগুলো জেনারেট করুন।' },
    icon: 'HelpCircle',
    isAI: true,
    inputs: [
      { name: 'topic', label: { en: 'Topic', bn: 'টপিক' }, type: 'text', placeholder: { en: 'Mobile phone', bn: 'মোবাইল ফোন' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Question Keyword Generator', 'Keyword Research',
      'Generate question-based keywords users search before buying.',
      'Group by stages: awareness, consideration, decision.')
  },
  {
    id: 'lsi-gen',
    category: ToolCategory.KEYWORD,
    name: { en: 'LSI Keyword Generator', bn: 'LSI কীওয়ার্ড জেনারেটর' },
    description: { en: 'Generate NLP-based supporting keywords.', bn: 'এনএলপি ভিত্তিক সাপোর্টিং কীওয়ার্ড তৈরি করুন।' },
    icon: 'Cpu',
    isAI: true,
    inputs: [
      { name: 'main_kw', label: { en: 'Main Keyword', bn: 'মূল কীওয়ার্ড' }, type: 'text', placeholder: { en: 'Coffee shop', bn: 'কফি শপ' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('LSI Keyword Generator', 'Keyword Research',
      'Generate NLP-based supporting keywords for content depth.',
      'List 20 contextually relevant entities.')
  },
  {
    id: 'local-kw-bd',
    category: ToolCategory.KEYWORD,
    name: { en: 'Local Keyword Finder', bn: 'লোকাল কীওয়ার্ড ফাইন্ডার' },
    description: { en: 'Find location-based keywords for BD cities.', bn: 'বিডির শহর ভিত্তিক লোকাল কীওয়ার্ড খুঁজুন।' },
    icon: 'MapPin',
    isAI: true,
    inputs: [
      { name: 'service', label: { en: 'Service', bn: 'সার্ভিস' }, type: 'text', placeholder: { en: 'Plumber', bn: 'প্লাম্বার' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Local Keyword Finder', 'Keyword Research',
      'Generate location-based keywords for Bangladesh cities (Dhaka, CTG, etc.).',
      'Include "near me" and specific area names.')
  },
  {
    id: 'seasonal-kw',
    category: ToolCategory.KEYWORD,
    name: { en: 'Seasonal Keyword Analyzer', bn: 'সিজনাল কীওয়ার্ড অ্যানালাইজার' },
    description: { en: 'Analyze seasonal search trends (Eid, Ramadan).', bn: 'সিজনাল সার্চ ট্রেন্ড বিশ্লেষণ করুন (ঈদ, রমজান)।' },
    icon: 'Calendar',
    isAI: true,
    inputs: [
      { name: 'topic', label: { en: 'Topic', bn: 'টপিক' }, type: 'text', placeholder: { en: 'Fashion', bn: 'ফ্যাশন' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Seasonal Keyword Analyzer', 'Keyword Research',
      'Identify seasonal relevance (Ramadan, Eid, sales events) in BD.',
      'Suggest content timing.')
  },
  {
    id: 'kw-gap',
    category: ToolCategory.KEYWORD,
    name: { en: 'Keyword Gap Tool', bn: 'কীওয়ার্ড গ্যাপ টুল' },
    description: { en: 'Identify competitor keyword opportunities.', bn: 'প্রতিযোগীদের কীওয়ার্ড অপরচুনিটি খুঁজে বের করুন।' },
    icon: 'Activity',
    isAI: true,
    inputs: [
      { name: 'my_site', label: { en: 'My Site', bn: 'আমার সাইট' }, type: 'url', placeholder: { en: 'mysite.com', bn: 'mysite.com' }, required: true },
      { name: 'comp_site', label: { en: 'Competitor', bn: 'প্রতিযোগী' }, type: 'url', placeholder: { en: 'competitor.com', bn: 'competitor.com' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Keyword Gap Tool', 'Keyword Research',
      'Identify keywords competitors likely rank for but user may not.',
      'Explain logical gap and ranking difficulty.')
  },
  {
    id: 'ai-kw-expansion',
    category: ToolCategory.KEYWORD,
    name: { en: 'AI Keyword Expansion', bn: 'এআই কীওয়ার্ড এক্সপানশন' },
    description: { en: 'Expand seed keywords into a topical map.', bn: 'মূল কীওয়ার্ড থেকে টপিকাল ম্যাপ তৈরি করুন।' },
    icon: 'Maximize2',
    isAI: true,
    inputs: [
      { name: 'seed', label: { en: 'Seed', bn: 'মূল' }, type: 'text', placeholder: { en: 'AI Writing', bn: 'এআই রাইটিং' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('AI Keyword Expansion', 'Keyword Research',
      'Expand seed keyword into topical authority map.',
      'Include 4 main pillars and 5 subtopics each.')
  },
  {
    id: 'voice-search-kw',
    category: ToolCategory.KEYWORD,
    name: { en: 'Voice Search Keyword Tool', bn: 'ভয়েস সার্চ কীওয়ার্ড টুল' },
    description: { en: 'Generate conversational queries.', bn: 'কথোপকথনমূলক কোয়েরি তৈরি করুন।' },
    icon: 'Mic',
    isAI: true,
    inputs: [
      { name: 'topic', label: { en: 'Topic', bn: 'টপিক' }, type: 'text', placeholder: { en: 'How to make tea', bn: 'কীভাবে চা বানাতে হয়' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Voice Search Keyword Tool', 'Keyword Research',
      'Generate conversational voice-search queries.',
      'Focus on long-form natural language.')
  },
  {
    id: 'youtube-kw',
    category: ToolCategory.KEYWORD,
    name: { en: 'YouTube Keyword Tool', bn: 'ইউটিউব কীওয়ার্ড টুল' },
    description: { en: 'Generate YouTube SEO keywords.', bn: 'ইউটিউব এসইও কীওয়ার্ড তৈরি করুন।' },
    icon: 'Youtube',
    isAI: true,
    inputs: [
      { name: 'topic', label: { en: 'Video Topic', bn: 'ভিডিও টপিক' }, type: 'text', placeholder: { en: 'Gardening', bn: 'বাগান করা' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('YouTube Keyword Tool', 'Keyword Research',
      'Generate YouTube SEO keywords and video title ideas.',
      'Include 5 high-CTR title variations.')
  },
  {
    id: 'ecommerce-kw',
    category: ToolCategory.KEYWORD,
    name: { en: 'Ecommerce Keyword Tool', bn: 'ই-কমার্স কীওয়ার্ড টুল' },
    description: { en: 'Generate buyer-intent keywords.', bn: 'বায়ার-ইনটেন্ট কীওয়ার্ড তৈরি করুন।' },
    icon: 'ShoppingCart',
    isAI: true,
    inputs: [
      { name: 'product', label: { en: 'Product Category', bn: 'প্রোডাক্ট ক্যাটেগরি' }, type: 'text', placeholder: { en: 'Shoes', bn: 'জুতো' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Ecommerce Keyword Tool', 'Keyword Research',
      'Generate buyer-intent ecommerce keywords.',
      'Include "buy", "price", "best" variations for BD market.')
  },

  // 🟦 CONTENT & AI WRITING TOOLS (21–45)
  {
    id: 'ai-writer',
    category: ToolCategory.CONTENT,
    name: { en: 'AI SEO Article Writer', bn: 'এআই এসইও আর্টিকেল রাইটার' },
    description: { en: 'Write fully optimized SEO articles.', bn: 'সম্পূর্ণ এসইও অপ্টিমাইজড আর্টিকেল লিখুন।' },
    icon: 'PenTool',
    isAI: true,
    popular: true,
    inputs: [
      // Fix: Added missing placeholders
      { name: 'topic', label: { en: 'Topic', bn: 'টপিক' }, type: 'text', placeholder: { en: 'e.g. Benefits of SEO for Business', bn: 'উদা: ব্যবসার জন্য এসইওর উপকারিতা' }, required: true },
      { name: 'keywords', label: { en: 'Keywords', bn: 'কীওয়ার্ডসমূহ' }, type: 'text', placeholder: { en: 'e.g. seo tips, digital marketing', bn: 'উদা: এসইও টিপস, ডিজিটাল মার্কেটিং' } }
    ],
    systemPrompt: buildSystemPrompt('AI SEO Article Writer', 'Content & AI Writing',
      'Write a fully SEO-optimized article. Use headings, FAQs, internal linking suggestions.',
      'Ensure high readability and EEAT compliance.')
  },
  {
    id: 'bn-article-gen',
    category: ToolCategory.CONTENT,
    name: { en: 'Bangla Article Generator', bn: 'বাংলা আর্টিকেল জেনারেটর' },
    description: { en: 'Write natural Bangla SEO content.', bn: 'প্রাকৃতিক বাংলা এসইও কন্টেন্ট লিখুন।' },
    icon: 'Type',
    isAI: true,
    inputs: [
      // Fix: Added missing placeholder
      { name: 'topic', label: { en: 'Topic', bn: 'টপিক' }, type: 'text', placeholder: { en: 'e.g. Online earning tips', bn: 'উদা: অনলাইনে আয়ের টিপস' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Bangla Article Generator', 'Content & AI Writing',
      'Write natural, professional Bangla SEO content.',
      'Focus on formal yet engaging tone.')
  },
  {
    id: 'meta-title-gen',
    category: ToolCategory.CONTENT,
    name: { en: 'Meta Title Generator', bn: 'মেটা টাইটেল জেনারেটর' },
    description: { en: 'Generate SEO meta titles.', bn: 'এসইও মেটা টাইটেল তৈরি করুন।' },
    icon: 'Tag',
    isAI: true,
    inputs: [
      // Fix: Added missing placeholder
      { name: 'topic', label: { en: 'Page Content', bn: 'পেজ কন্টেন্ট' }, type: 'text', placeholder: { en: 'e.g. Best SEO Service in Dhaka', bn: 'উদা: ঢাকার সেরা এসইও সার্ভিস' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Meta Title Generator', 'Content & AI Writing',
      'Generate SEO-friendly meta titles within 60 characters.',
      'Provide 5 variations including a question and a CTA.')
  },
  {
    id: 'meta-desc-gen',
    category: ToolCategory.CONTENT,
    name: { en: 'Meta Description Generator', bn: 'মেটা ডেসক্রিপশন জেনারেটর' },
    description: { en: 'Generate compelling meta descriptions.', bn: 'আকর্ষণীয় মেটা ডেসক্রিপশন তৈরি করুন।' },
    icon: 'FileText',
    isAI: true,
    inputs: [
      // Fix: Added missing placeholder
      { name: 'content', label: { en: 'Page Context', bn: 'পেজ কনটেক্সট' }, type: 'textarea', placeholder: { en: 'Briefly describe your page...', bn: 'আপনার পেজ সম্পর্কে সংক্ষেপে লিখুন...' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Meta Description Generator', 'Content & AI Writing',
      'Generate compelling meta descriptions with CTA (150-160 characters).',
      'Provide 3 variations.')
  },
  {
    id: 'faq-schema-gen',
    category: ToolCategory.CONTENT,
    name: { en: 'FAQ Schema Generator', bn: 'এফএকিউ স্কিমা জেনারেটর' },
    description: { en: 'Generate FAQ content for schema.', bn: 'স্কিমার জন্য এফএকিউ তৈরি করুন।' },
    icon: 'HelpCircle',
    isAI: true,
    inputs: [
      // Fix: Added missing placeholder
      { name: 'topic', label: { en: 'Topic', bn: 'টপিক' }, type: 'text', placeholder: { en: 'e.g. Product Warranty', bn: 'উদা: প্রোডাক্ট ওয়ারেন্টি' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('FAQ Schema Generator', 'Content & AI Writing',
      'Generate 5 FAQ questions and answers suitable for schema markup.',
      'Use common user queries.')
  },
  {
    id: 'content-rewriter',
    category: ToolCategory.CONTENT,
    name: { en: 'Content Rewriter', bn: 'কন্টেন্ট রিরাইটার' },
    description: { en: 'Rewrite content preserving SEO intent.', bn: 'এসইও ইনটেন্ট ঠিক রেখে কন্টেন্ট রিরাইট করুন।' },
    icon: 'RefreshCcw',
    isAI: true,
    inputs: [
      // Fix: Added missing placeholder
      { name: 'text', label: { en: 'Original Content', bn: 'মূল কন্টেন্ট' }, type: 'textarea', placeholder: { en: 'Paste your content to rewrite...', bn: 'রিরাইট করার জন্য কন্টেন্ট পেস্ট করুন...' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Content Rewriter', 'Content & AI Writing',
      'Rewrite content while preserving meaning and SEO intent.',
      'Improve flow and clear up wordiness.')
  },
  {
    id: 'paraphraser',
    category: ToolCategory.CONTENT,
    name: { en: 'Paraphraser', bn: 'প্যারাফ্রেজার' },
    description: { en: 'Paraphrase naturally without AI tone.', bn: 'এআই টোন ছাড়া স্বাভাবিকভাবে প্যারাফ্রেজ করুন।' },
    icon: 'Copy',
    isAI: true,
    inputs: [
      // Fix: Added missing placeholder
      { name: 'text', label: { en: 'Text', bn: 'টেক্সট' }, type: 'textarea', placeholder: { en: 'Paste text to paraphrase...', bn: 'প্যারাফ্রেজ করার জন্য টেক্সট দিন...' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Paraphraser', 'Content & AI Writing',
      'Paraphrase content naturally without AI tone.',
      'Offer 2 versions: Creative and Professional.')
  },
  {
    id: 'readability-analyzer',
    category: ToolCategory.CONTENT,
    name: { en: 'Readability Analyzer', bn: 'রিডিবিলিটি অ্যানালাইজার' },
    description: { en: 'Analyze and improve readability.', bn: 'রিডিবিলিটি বিশ্লেষণ এবং উন্নত করুন।' },
    icon: 'BookOpen',
    isAI: true,
    inputs: [
      // Fix: Added missing placeholder
      { name: 'text', label: { en: 'Content', bn: 'কন্টেন্ট' }, type: 'textarea', placeholder: { en: 'Paste content for analysis...', bn: 'বিশ্লেষণের জন্য কন্টেন্ট পেস্ট করুন...' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Readability Analyzer', 'Content & AI Writing',
      'Analyze content readability (Flesch-Kincaid) and suggest improvements.',
      'Identify complex sentences.')
  },
  {
    id: 'content-score',
    category: ToolCategory.CONTENT,
    name: { en: 'Content Score Analyzer', bn: 'কন্টেন্ট স্কোর অ্যানালাইজার' },
    description: { en: 'Score content SEO quality (1-100).', bn: 'কন্টেন্টের এসইও কোয়ালিটি স্কোর করুন।' },
    icon: 'BarChart',
    isAI: true,
    inputs: [
      // Fix: Added missing placeholder
      { name: 'text', label: { en: 'Content', bn: 'কন্টেন্ট' }, type: 'textarea', placeholder: { en: 'Paste content to score...', bn: 'স্কোর করার জন্য কন্টেন্ট পেস্ট করুন...' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Content Score Analyzer', 'Content & AI Writing',
      'Score content SEO quality from 1–100 with explanation.',
      'Audit keywords, headings, and intent.')
  },
  {
    id: 'ai-optimizer',
    category: ToolCategory.CONTENT,
    name: { en: 'AI Content Optimizer', bn: 'এআই কন্টেন্ট অপ্টিমাইজার' },
    description: { en: 'Optimize content for ranking.', bn: 'র‍্যাঙ্কিংয়ের জন্য কন্টেন্ট অপ্টিমাইজ করুন।' },
    icon: 'Sparkles',
    isAI: true,
    inputs: [
      // Fix: Added missing placeholder
      { name: 'text', label: { en: 'Content', bn: 'কন্টেন্ট' }, type: 'textarea', placeholder: { en: 'Paste content to optimize...', bn: 'অপ্টিমাইজ করার জন্য কন্টেন্ট পেস্ট করুন...' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('AI Content Optimizer', 'Content & AI Writing',
      'Optimize content for better ranking and engagement.',
      'Add LSI keywords and improve H-tags.')
  },
  {
    id: 'blog-outline',
    category: ToolCategory.CONTENT,
    name: { en: 'Blog Outline Generator', bn: 'ব্লগ আউটলাইন জেনারেটর' },
    description: { en: 'Create SEO-friendly blog outlines.', bn: 'এসইও ফ্রেন্ডলি ব্লগ আউটলাইন তৈরি করুন।' },
    icon: 'Layout',
    isAI: true,
    inputs: [
      // Fix: Added missing placeholder
      { name: 'topic', label: { en: 'Topic', bn: 'টপিক' }, type: 'text', placeholder: { en: 'e.g. Future of AI in Bangladesh', bn: 'উদা: বাংলাদেশে এআই-এর ভবিষ্যৎ' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Blog Outline Generator', 'Content & AI Writing',
      'Create SEO-friendly blog outline with H1-H3 structure.',
      'Include target keywords for each section.')
  },
  {
    id: 'yt-script-gen',
    category: ToolCategory.CONTENT,
    name: { en: 'YouTube Script Generator', bn: 'ইউটিউব স্ক্রিপ্ট জেনারেটর' },
    description: { en: 'Generate hook-driven scripts.', bn: 'আকর্ষণীয় স্ক্রিপ্ট জেনারেট করুন।' },
    icon: 'Youtube',
    isAI: true,
    inputs: [
      // Fix: Added missing placeholder
      { name: 'topic', label: { en: 'Video Topic', bn: 'ভিডিও টপিক' }, type: 'text', placeholder: { en: 'e.g. How to start a startup', bn: 'উদা: কীভাবে স্টার্টআপ শুরু করবেন' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('YouTube Script Generator', 'Content & AI Writing',
      'Generate hook-driven YouTube script.',
      'Include hook, intro, body, and CTA.')
  },
  {
    id: 'fb-caption-gen',
    category: ToolCategory.CONTENT,
    name: { en: 'Facebook Caption Generator', bn: 'ফেসবুক ক্যাপশন জেনারেটর' },
    description: { en: 'Generate engaging short captions.', bn: 'আকর্ষণীয় ক্যাপশন তৈরি করুন।' },
    icon: 'Facebook',
    isAI: true,
    inputs: [
      // Fix: Added missing placeholder
      { name: 'post', label: { en: 'Post Description', bn: 'পোস্ট ডেসক্রিপশন' }, type: 'textarea', placeholder: { en: 'Describe your post context...', bn: 'আপনার পোস্ট সম্পর্কে লিখুন...' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Facebook Caption Generator', 'Content & AI Writing',
      'Generate short, engaging captions optimized for reach.',
      'Include emojis and relevant hashtags.')
  },
  {
    id: 'product-desc-gen',
    category: ToolCategory.CONTENT,
    name: { en: 'Product Description Generator', bn: 'প্রোডাক্ট ডেসক্রিপশন জেনারেটর' },
    description: { en: 'Generate conversion-focused descriptions.', bn: 'কনভার্সন ফোকাসড ডেসক্রিপশন তৈরি করুন।' },
    icon: 'ShoppingBag',
    isAI: true,
    inputs: [
      // Fix: Added missing placeholder
      { name: 'product', label: { en: 'Product Details', bn: 'প্রোডাক্ট ডিটেইলস' }, type: 'textarea', placeholder: { en: 'Enter product features and specs...', bn: 'প্রোডাক্টের বৈশিষ্ট্য ও তথ্য দিন...' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Product Description Generator', 'Content & AI Writing',
      'Generate conversion-focused product descriptions.',
      'Focus on benefits over features.')
  },
  {
    id: 'humanizer',
    category: ToolCategory.CONTENT,
    name: { en: 'AI Content Humanizer', bn: 'এআই কন্টেন্ট হিউম্যানাইজার' },
    description: { en: 'Make content sound fully human.', bn: 'কন্টেন্টকে মানুষের মতো শোনায় এমন করুন।' },
    icon: 'UserCheck',
    isAI: true,
    inputs: [
      // Fix: Added missing placeholder
      { name: 'text', label: { en: 'AI Generated Text', bn: 'এআই টেক্সট' }, type: 'textarea', placeholder: { en: 'Paste AI text to humanize...', bn: 'এআই টেক্সট পেস্ট করুন...' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('AI Content Humanizer', 'Content & AI Writing',
      'Rewrite content to sound fully human.',
      'Vary sentence structure and use natural expressions.')
  },
  {
    id: 'content-gap',
    category: ToolCategory.CONTENT,
    name: { en: 'Content Gap Analyzer', bn: 'কন্টেন্ট গ্যাপ অ্যানালাইজার' },
    description: { en: 'Find missing subtopics.', bn: 'বাদ পড়া সাব-টপিকগুলো খুঁজুন।' },
    icon: 'Columns',
    isAI: true,
    inputs: [
      // Fix: Added missing placeholders
      { name: 'my_post', label: { en: 'My Post', bn: 'আমার পোস্ট' }, type: 'textarea', placeholder: { en: 'Paste your content...', bn: 'আপনার কন্টেন্ট পেস্ট করুন...' }, required: true },
      { name: 'comp_post', label: { en: 'Competitor Post', bn: 'প্রতিযোগীর পোস্ট' }, type: 'textarea', placeholder: { en: 'Paste competitor content...', bn: 'প্রতিযোগীর কন্টেন্ট পেস্ট করুন...' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Content Gap Analyzer', 'Content & AI Writing',
      'Identify missing subtopics compared to competitors.',
      'List 5-10 specific points to add.')
  },
  {
    id: 'internal-links',
    category: ToolCategory.CONTENT,
    name: { en: 'Internal Linking Suggestions', bn: 'ইন্টারনাল লিঙ্কিং সাজেশন' },
    description: { en: 'Suggest anchor texts and links.', bn: 'অ্যাঙ্কর টেক্সট এবং লিংক সাজেশন পান।' },
    icon: 'Link',
    isAI: true,
    inputs: [
      // Fix: Added missing placeholder
      { name: 'content', label: { en: 'Your Content', bn: 'আপনার কন্টেন্ট' }, type: 'textarea', placeholder: { en: 'Paste content for internal link suggestions...', bn: 'ইন্টারনাল লিংক সাজেশনের জন্য কন্টেন্ট দিন...' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Internal Linking Suggestions', 'Content & AI Writing',
      'Suggest internal anchor texts and link targets.',
      'Map content topics to common SEO structures.')
  },
  {
    id: 'nlp-entities',
    category: ToolCategory.CONTENT,
    name: { en: 'NLP Entity Extractor', bn: 'NLP এনটিটি এক্সট্রাক্টর' },
    description: { en: 'Extract important entities.', bn: 'গুরুত্বপূর্ণ এনটিটিগুলো বের করুন।' },
    icon: 'Cpu',
    isAI: true,
    inputs: [
      // Fix: Added missing placeholder
      { name: 'text', label: { en: 'Content', bn: 'কন্টেন্ট' }, type: 'textarea', placeholder: { en: 'Paste text for entity extraction...', bn: 'এনটিটি এক্সট্রাকশনের জন্য টেক্সট দিন...' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('NLP Entity Extractor', 'Content & AI Writing',
      'Extract important entities for SEO relevance.',
      'Categorize by Person, Place, Org, Concept.')
  },
  {
    id: 'content-brief',
    category: ToolCategory.CONTENT,
    name: { en: 'Content Brief Generator', bn: 'কন্টেন্ট ব্রিফ জেনারেটর' },
    description: { en: 'Generate complete SEO content briefs.', bn: 'সম্পূর্ণ এসইও কন্টেন্ট ব্রিফ তৈরি করুন।' },
    icon: 'Clipboard',
    isAI: true,
    inputs: [
      // Fix: Added missing placeholder
      { name: 'topic', label: { en: 'Topic', bn: 'টপিক' }, type: 'text', placeholder: { en: 'e.g. Best Smartphones 2025', bn: 'উদা: ২০২৫-এর সেরা স্মার্টফোন' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Content Brief Generator', 'Content & AI Writing',
      'Generate a complete SEO content brief.',
      'Include keywords, target audience, and structure.')
  },
  {
    id: 'headline-score',
    category: ToolCategory.CONTENT,
    name: { en: 'Headline Analyzer', bn: 'হেডলাইন অ্যানালাইজার' },
    description: { en: 'Score and improve headline CTR.', bn: 'হেডলাইনের CTR স্কোর এবং উন্নত করুন।' },
    icon: 'Heading',
    isAI: true,
    inputs: [
      // Fix: Added missing placeholder
      { name: 'headline', label: { en: 'Headline', bn: 'হেডলাইন' }, type: 'text', placeholder: { en: 'e.g. 10 Secret SEO Hacks', bn: 'উদা: এসইও-র ১০টি গোপন হ্যাক' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Headline Analyzer', 'Content & AI Writing',
      'Score headline CTR potential and improve it.',
      'Provide 3 better alternatives.')
  },
  {
    id: 'cta-gen',
    category: ToolCategory.CONTENT,
    name: { en: 'CTA Generator', bn: 'CTA জেনারেটর' },
    description: { en: 'Generate persuasive CTAs.', bn: 'আকর্ষণীয় CTA তৈরি করুন।' },
    icon: 'MousePointer2',
    isAI: true,
    inputs: [
      // Fix: Added missing placeholder
      { name: 'goal', label: { en: 'Conversion Goal', bn: 'কনভার্সন গোল' }, type: 'text', placeholder: { en: 'e.g. Buy Now or Get Free Quote', bn: 'উদা: এখনই কিনুন বা ফ্রি কোট পান' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('CTA Generator', 'Content & AI Writing',
      'Generate persuasive CTAs based on intent.',
      'Provide 5 variations for buttons and text links.')
  },
  {
    id: 'snippet-opt',
    category: ToolCategory.CONTENT,
    name: { en: 'Snippet Optimizer', bn: 'স্নপেট অপ্টিমাইজার' },
    description: { en: 'Optimize for featured snippets.', bn: 'ফিচারড স্নপেটের জন্য অপ্টিমাইজ করুন।' },
    icon: 'Box',
    isAI: true,
    inputs: [
      // Fix: Added missing placeholder
      { name: 'content', label: { en: 'Content Block', bn: 'কন্টেন্ট ব্লক' }, type: 'textarea', placeholder: { en: 'Paste content block for snippet optimization...', bn: 'স্নপেট অপ্টিমাইজেশনের জন্য কন্টেন্ট দিন...' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Snippet Optimizer', 'Content & AI Writing',
      'Optimize content for featured snippet chances.',
      'Format for definitions, lists, or tables.')
  },
  {
    id: 'schema-gen',
    category: ToolCategory.CONTENT,
    name: { en: 'Schema Markup Generator', bn: 'স্কিমা মার্কআপ জেনারেটর' },
    description: { en: 'Generate JSON-LD schema.', bn: 'JSON-LD স্কিমা তৈরি করুন।' },
    icon: 'Code',
    isAI: true,
    inputs: [
      // Fix: Added missing placeholder
      { name: 'data', label: { en: 'Page Info', bn: 'পেজ ইনফো' }, type: 'textarea', placeholder: { en: 'Enter business/article details...', bn: 'বিজনেস বা আর্টিকেলের তথ্য দিন...' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('Schema Markup Generator', 'Content & AI Writing',
      'Generate JSON-LD schema markup.',
      'Support LocalBusiness, Article, and Product.')
  },
  {
    id: 'proofreader',
    category: ToolCategory.CONTENT,
    name: { en: 'AI Proofreader', bn: 'এআই প্রুফরিডার' },
    description: { en: 'Fix grammar, clarity, and tone.', bn: 'গ্রামার, স্বচ্ছতা এবং টোন ঠিক করুন।' },
    icon: 'CheckSquare',
    isAI: true,
    inputs: [
      // Fix: Added missing placeholder
      { name: 'text', label: { en: 'Text', bn: 'টেক্সট' }, type: 'textarea', placeholder: { en: 'Paste text for proofreading...', bn: 'প্রুফরিডিংয়ের জন্য টেক্সট দিন...' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('AI Proofreader', 'Content & AI Writing',
      'Fix grammar, clarity, and tone issues.',
      'Highlight specific changes made.')
  },
  {
    id: 'content-translator',
    category: ToolCategory.CONTENT,
    name: { en: 'AI Content Translator', bn: 'এআই কন্টেন্ট ট্রান্সলেটর' },
    description: { en: 'Translate with SEO context.', bn: 'এসইও কনটেক্সট ঠিক রেখে ট্রান্সলেট করুন।' },
    icon: 'Languages',
    isAI: true,
    inputs: [
      // Fix: Added missing placeholder
      { name: 'text', label: { en: 'Source Text', bn: 'সোর্স টেক্সট' }, type: 'textarea', placeholder: { en: 'Paste text to translate...', bn: 'ট্রান্সলেট করার জন্য টেক্সট দিন...' }, required: true }
    ],
    systemPrompt: buildSystemPrompt('AI Content Translator', 'Content & AI Writing',
      'Translate content between Bangla and English with SEO context.',
      'Preserve keyword intent in the target language.')
  },

  // 🟨 TECHNICAL SEO (46–65)
  // These tools use a diagnostic pattern
  ...([
    { id: 'onpage-checker', name: { en: 'On-Page SEO Checker', bn: 'অন-পেজ এসইও চেকার' }, icon: 'CheckCircle' },
    { id: 'speed-analyzer', name: { en: 'Page Speed Analyzer', bn: 'পেজ স্পিড অ্যানালাইজার' }, icon: 'Gauge' },
    { id: 'vitals-checker', name: { en: 'Core Web Vitals', bn: 'কোর ওয়েব ভাইটালস' }, icon: 'Activity' },
    { id: 'mobile-test', name: { en: 'Mobile SEO Test', bn: 'মোবাইল এসইও টেস্ট' }, icon: 'Smartphone' },
    { id: 'robots-gen', name: { en: 'Robots.txt Generator', bn: 'Robots.txt জেনারেটর' }, icon: 'FileCode' },
    { id: 'sitemap-gen', name: { en: 'XML Sitemap Generator', bn: 'XML সাইটম্যাপ জেনারেটর' }, icon: 'Network' },
    { id: 'url-opt', name: { en: 'URL Optimizer', bn: 'ইউআরএল অপ্টিমাইজার' }, icon: 'Link2' },
    { id: 'redirect-check', name: { en: 'Redirect Checker', bn: 'রিডাইরেক্ট চেকার' }, icon: 'Repeat' },
    { id: 'broken-links', name: { en: 'Broken Link Checker', bn: 'ব্রোকেন লিংক চেকার' }, icon: 'AlertTriangle' },
    { id: 'canonical-check', name: { en: 'Canonical Checker', bn: 'ক্যানোনিকাল চেকার' }, icon: 'Shield' },
    { id: 'schema-val', name: { en: 'Schema Validator', bn: 'স্কিমা ভ্যালিডেটর' }, icon: 'Code' },
    { id: 'minifier', name: { en: 'HTML/JS Minifier', bn: 'মিনিফায়ার' }, icon: 'Minimize' },
    { id: 'hreflang-gen', name: { en: 'Hreflang Generator', bn: 'Hreflang জেনারেটর' }, icon: 'Globe' },
    { id: 'index-check', name: { en: 'Indexability Checker', bn: 'ইনডেক্সিবিলিটি চেকার' }, icon: 'Search' },
    { id: 'ssl-check', name: { en: 'SSL Checker', bn: 'SSL চেকার' }, icon: 'Lock' },
    { id: 'status-check', name: { en: 'HTTP Status Checker', bn: 'HTTP স্ট্যাটাস চেকার' }, icon: 'Server' },
    { id: 'crawl-test', name: { en: 'Crawlability Test', bn: 'ক্রলিবিলিটি টেস্ট' }, icon: 'Spider' },
    { id: 'img-alt-audit', name: { en: 'Image Alt Audit', bn: 'ইমেজ অল্ট অডিট' }, icon: 'Image' },
    { id: 'head-tag-audit', name: { en: 'Head Tag Audit', bn: 'হেড ট্যাগ অডিট' }, icon: 'Code2' },
    { id: 'tech-audit-summary', name: { en: 'Technical Audit Summary', bn: 'টেকনিক্যাল অডিট সামারি' }, icon: 'FileSearch' }
  ].map((t): Tool => ({
    id: t.id,
    category: ToolCategory.TECHNICAL,
    name: t.name,
    description: { en: `Analyze and improve ${t.name.en}.`, bn: `${t.name.bn} বিশ্লেষণ এবং উন্নত করুন।` },
    icon: t.icon,
    isAI: true,
    // Fix: Added missing placeholder
    inputs: [{ name: 'url_code', label: { en: 'URL or Code', bn: 'ইউআরএল বা কোড' }, type: 'textarea', placeholder: { en: 'Enter URL or code snippet...', bn: 'ইউআরএল বা কোড স্নিপেট দিন...' }, required: true }],
    systemPrompt: buildSystemPrompt(t.name.en, 'Technical SEO', 
      'Analyze the input URL/code. Identify issues. Explain impact. Provide fix steps.',
      'Use a checklist format.')
  }))),

  // 🟥 BACKLINK & AUTHORITY (66–75)
  ...([
    { id: 'backlink-check', name: { en: 'Backlink Checker', bn: 'ব্যাকলিংক চেকার' }, icon: 'Link' },
    { id: 'da-check', name: { en: 'Domain Authority', bn: 'ডোমেইন অথরিটি' }, icon: 'Shield' },
    { id: 'pa-check', name: { en: 'Page Authority', bn: 'পেজ অথরিটি' }, icon: 'File' },
    { id: 'spam-score', name: { en: 'Spam Score', bn: 'স্প্যাম স্কোর' }, icon: 'AlertTriangle' },
    { id: 'anchor-analyzer', name: { en: 'Anchor Text Analyzer', bn: 'অ্যাঙ্কর টেক্সট অ্যানালাইজার' }, icon: 'Type' },
    { id: 'referring-domains', name: { en: 'Referring Domains', bn: 'রেফারিং ডোমেইন' }, icon: 'Globe' },
    { id: 'comp-backlinks', name: { en: 'Competitor Backlinks', bn: 'প্রতিযোগী ব্যাকলিংক' }, icon: 'Share2' },
    { id: 'toxic-links', name: { en: 'Toxic Link Detector', bn: 'টক্সিক লিংক ডিটেক্টর' }, icon: 'Skull' },
    { id: 'link-opps', name: { en: 'Link Opportunity Finder', bn: 'লিংক অপরচুনিটি ফাইন্ডার' }, icon: 'Search' },
    { id: 'link-profile', name: { en: 'Link Profile Summary', bn: 'লিংক প্রোফাইল সামারি' }, icon: 'FileText' }
  ].map((t): Tool => ({
    id: t.id,
    category: ToolCategory.BACKLINK,
    name: t.name,
    description: { en: `Analyze and improve ${t.name.en}.`, bn: `${t.name.bn} বিশ্লেষণ এবং উন্নত করুন।` },
    icon: t.icon,
    isAI: true,
    // Fix: Added missing placeholder
    inputs: [{ name: 'domain', label: { en: 'Domain Name', bn: 'ডোমেইন নাম' }, type: 'text', placeholder: { en: 'e.g. example.com', bn: 'উদা: example.com' }, required: true }],
    systemPrompt: buildSystemPrompt(t.name.en, 'Backlink & Authority',
      'Analyze backlink profile ethically. Explain risks. Suggest safe improvements.',
      'Provide estimated metrics.')
  }))),

  // 🟪 ANALYTICS & GROWTH (76–85)
  ...([
    { id: 'rank-tracker', name: { en: 'Rank Tracker', bn: 'র‍্যাঙ্ক ট্র্যাকার' }, icon: 'Target' },
    { id: 'traffic-est', name: { en: 'Traffic Estimator', bn: 'ট্রাফিক এস্টিমেটর' }, icon: 'BarChart' },
    { id: 'ctr-analyzer', name: { en: 'CTR Analyzer', bn: 'CTR অ্যানালাইজার' }, icon: 'MousePointer' },
    { id: 'conv-insights', name: { en: 'Conversion Insights', bn: 'কনভার্সন ইনসাইটস' }, icon: 'TrendingUp' },
    { id: 'serp-features', name: { en: 'SERP Feature Tracker', bn: 'SERP ফিচার ট্র্যাকার' }, icon: 'Star' },
    { id: 'content-decay', name: { en: 'Content Decay', bn: 'কন্টেন্ট ডিকে' }, icon: 'Wind' },
    { id: 'comp-compare', name: { en: 'Competitor Comparison', bn: 'প্রতিযোগী তুলনা' }, icon: 'Users' },
    { id: 'update-impact', name: { en: 'Google Update Impact', bn: 'গুগল আপডেট ইমপ্যাক্ট' }, icon: 'Zap' },
    { id: 'growth-sug', name: { en: 'Growth Suggestions', bn: 'গ্রোথ সাজেশন' }, icon: 'Rocket' },
    { id: 'seo-dash', name: { en: 'SEO Performance Dashboard', bn: 'এসইও ড্যাশবোর্ড' }, icon: 'Layout' }
  ].map((t): Tool => ({
    id: t.id,
    category: ToolCategory.ANALYTICS,
    name: t.name,
    description: { en: `Analyze and improve ${t.name.en}.`, bn: `${t.name.bn} বিশ্লেষণ এবং উন্নত করুন।` },
    icon: t.icon,
    isAI: true,
    // Fix: Added missing placeholder
    inputs: [{ name: 'url', label: { en: 'URL', bn: 'ইউআরএল' }, type: 'url', placeholder: { en: 'https://example.com', bn: 'https://example.com' }, required: true }],
    systemPrompt: buildSystemPrompt(t.name.en, 'Analytics & Growth',
      'Analyze SEO performance trends. No ranking guarantees. Provide growth actions.',
      'Use data-driven insights.')
  }))),

  // ⚙️ UTILITIES & PRODUCTIVITY (86–100)
  ...([
    { id: 'seo-checklist', name: { en: 'SEO Checklist', bn: 'এসইও চেকলিস্ট' }, icon: 'ListChecks' },
    { id: 'audit-pdf', name: { en: 'Audit Report', bn: 'অডিট রিপোর্ট' }, icon: 'FileText' },
    { id: 'case-conv', name: { en: 'Text Case Converter', bn: 'টেক্সট কেস কনভার্টার' }, icon: 'Type' },
    { id: 'word-count', name: { en: 'Word Counter', bn: 'ওয়ার্ড কাউন্টার' }, icon: 'Calculator' },
    { id: 'dup-checker', name: { en: 'Duplicate Checker', bn: 'ডুপ্লিকেট চেকার' }, icon: 'Copy' },
    { id: 'url-encoder', name: { en: 'URL Encoder', bn: 'ইউআরএল এনকোডার' }, icon: 'Link' },
    { id: 'htaccess-gen', name: { en: 'HTACCESS Generator', bn: 'HTACCESS জেনারেটর' }, icon: 'Settings' },
    { id: 'og-preview', name: { en: 'OG Preview', bn: 'OG প্রিভিউ' }, icon: 'Facebook' },
    { id: 'email-analyzer', name: { en: 'Email Subject Analyzer', bn: 'ইমেইল সাবজেক্ট অ্যানালাইজার' }, icon: 'Mail' },
    { id: 'prompt-gen', name: { en: 'AI Prompt Generator', bn: 'এআই প্রম্পট জেনারেটর' }, icon: 'Sparkles' },
    { id: 'regex-tester', name: { en: 'Regex Tester', bn: 'Regex টেস্টার' }, icon: 'Terminal' },
    { id: 'json-ld-builder', name: { en: 'JSON-LD Builder', bn: 'JSON-LD বিল্ডার' }, icon: 'Code' },
    { id: 'snippet-prev', name: { en: 'Snippet Preview', bn: 'স্নপেট প্রিভিউ' }, icon: 'Eye' },
    { id: 'md-converter', name: { en: 'Markdown Converter', bn: 'Markdown কনভার্টার' }, icon: 'FileText' },
    { id: 'strategy-planner', name: { en: 'SEO Strategy Planner', bn: 'এসইও স্ট্র্যাটেজি প্ল্যানার' }, icon: 'Calendar' }
  ].map((t): Tool => ({
    id: t.id,
    category: ToolCategory.UTILITY,
    name: t.name,
    description: { en: `Utility for ${t.name.en}.`, bn: `${t.name.bn} ইউটিলিটি।` },
    icon: t.icon,
    isAI: true,
    // Fix: Added missing placeholder
    inputs: [{ name: 'input', label: { en: 'Input', bn: 'ইনপুট' }, type: 'textarea', placeholder: { en: 'Enter text to process...', bn: 'প্রসেস করার জন্য টেক্সট দিন...' }, required: true }],
    systemPrompt: buildSystemPrompt(t.name.en, 'Utilities & Productivity',
      'Perform utility task instantly. Minimal explanation.',
      'Output must be copy-ready.')
  })))
];
