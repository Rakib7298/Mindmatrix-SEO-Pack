
export enum ToolCategory {
  KEYWORD = 'Keyword & Research',
  CONTENT = 'Content & AI Writing',
  TECHNICAL = 'Technical SEO',
  BACKLINK = 'Backlink & Authority',
  ANALYTICS = 'Analytics & Growth',
  UTILITY = 'Utilities & Productivity'
}

export type Language = 'en' | 'bn';

export interface SeoSettings {
  businessName: string;
  websiteUrl: string;
  industry: string;
  targetRegion: 'BD' | 'Global';
}

export interface ToolInput {
  name: string;
  label: { en: string; bn: string };
  type: 'text' | 'textarea' | 'number' | 'url' | 'select';
  placeholder: { en: string; bn: string };
  options?: { value: string; label: string }[];
  required?: boolean;
}

export interface Tool {
  id: string;
  category: ToolCategory;
  name: { en: string; bn: string };
  description: { en: string; bn: string };
  icon: string;
  isAI: boolean;
  inputs: ToolInput[];
  systemPrompt?: string | ((settings: SeoSettings, lang: Language) => string); // Enhanced for dynamic injection
  popular?: boolean;
}

export interface AppState {
  language: Language;
  selectedToolId: string | null;
  history: { toolId: string; timestamp: number; input: any; output: any }[];
  seoSettings: SeoSettings;
  isAiConnected: boolean;
}
