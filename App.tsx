
import React, { useState, useMemo, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Settings, 
  ChevronRight, 
  Globe, 
  MessageSquare,
  Sparkles,
  TrendingUp,
  Shield,
  Zap,
  BarChart,
  Copy,
  Download,
  AlertCircle,
  Menu,
  X,
  Languages,
  ArrowRight,
  ExternalLink,
  Wrench,
  HelpCircle,
  Activity,
  Cpu,
  Layers,
  MousePointer2,
  Building2,
  Lock,
  Wifi,
  WifiOff,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useAppState } from './store';
import { ToolCategory, Tool } from './types';
import { TOOLS } from './constants';
import ToolRunner from './components/ToolRunner';
import ChatBot from './components/ChatBot';

const App: React.FC = () => {
  const { state, updateState } = useAppState();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'All'>('All');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [keySelectionActive, setKeySelectionActive] = useState(false);

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const toolName = tool.name[state.language] || '';
      const toolDesc = tool.description[state.language] || '';
      const matchesSearch = toolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          toolDesc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, state.language]);

  const t = (en: string, bn: string) => (state.language === 'en' ? en : bn);

  const currentTool = useMemo(() => 
    TOOLS.find(tool => tool.id === state.selectedToolId), 
  [state.selectedToolId]);

  const handleKeySelection = async () => {
    try {
      if (window.aistudio?.openSelectKey) {
        setKeySelectionActive(true);
        await window.aistudio.openSelectKey();
        updateState({ isAiConnected: true });
      } else {
        console.warn("AI Studio key selection dialog not available in this environment.");
      }
    } catch (error) {
      console.error("Key selection failed", error);
    } finally {
      setKeySelectionActive(false);
    }
  };

  const updateSeoSetting = (key: keyof typeof state.seoSettings, value: string) => {
    updateState({
      seoSettings: {
        ...state.seoSettings,
        [key]: value
      }
    });
  };

  const stats = [
    { label: t('Active Tools', 'সক্রিয় টুলস'), value: '100+', icon: Zap, color: 'text-yellow-400' },
    { label: t('AI Analysis', 'এআই বিশ্লেষণ'), value: '99.9%', icon: Cpu, color: 'text-indigo-400' },
    { label: t('Target Market', 'টার্গেট মার্কেট'), value: state.seoSettings.targetRegion === 'BD' ? 'Bangladesh' : 'Global', icon: Globe, color: 'text-green-400' },
    { label: t('Global DB', 'গ্লোবাল ডাটাবেস'), value: '500M+', icon: Layers, color: 'text-purple-400' },
  ];

  return (
    <div className="flex h-screen overflow-hidden text-gray-100 font-sans selection:bg-indigo-500/30">
      {/* Sidebar */}
      <aside 
        className={`${isSidebarOpen ? 'w-72' : 'w-24'} glass transition-all duration-500 border-r border-white/5 flex flex-col z-50`}
      >
        <div className="p-8 flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/40 transform hover:rotate-12 transition-transform duration-300">
            <Activity className="text-white" size={26} />
          </div>
          {isSidebarOpen && (
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent uppercase">
                Mindmatrix
              </span>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest leading-none">SEO Enterprise</span>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto px-4 space-y-2 py-4 custom-scrollbar">
          <button 
            onClick={() => {
              updateState({ selectedToolId: null });
              setSelectedCategory('All');
              setShowSettings(false);
            }}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 ${!state.selectedToolId && !showSettings && selectedCategory === 'All' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40' : 'hover:bg-white/5 text-gray-400'}`}
          >
            <LayoutDashboard size={22} />
            {isSidebarOpen && <span className="font-semibold">{t('Intelligence Hub', 'ইন্টেলিজেন্স হাব')}</span>}
          </button>

          <div className="pt-6 pb-2 px-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
            {isSidebarOpen ? t('Categories', 'ক্যাটেগরি') : '•••'}
          </div>

          {(Object.values(ToolCategory)).map(cat => {
            const iconKey = cat === ToolCategory.KEYWORD ? 'Search' : 
                          cat === ToolCategory.CONTENT ? 'PenTool' : 
                          cat === ToolCategory.TECHNICAL ? 'Settings' : 
                          cat === ToolCategory.BACKLINK ? 'Link' : 
                          cat === ToolCategory.ANALYTICS ? 'BarChart' : 'Wrench';
            const IconComponent = (LucideIcons as any)[iconKey] || Wrench;
            
            return (
              <button 
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  updateState({ selectedToolId: null });
                  setShowSettings(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 ${selectedCategory === cat && !state.selectedToolId && !showSettings ? 'bg-white/10 text-white ring-1 ring-white/10' : 'hover:bg-white/5 text-gray-500 hover:text-gray-300'}`}
              >
                <IconComponent size={22} />
                {isSidebarOpen && <span className="text-sm font-medium">{t(cat, cat)}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-6">
          <button 
            onClick={() => {
              setShowSettings(true);
              updateState({ selectedToolId: null });
            }}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 ${showSettings ? 'bg-white/10 text-white shadow-lg' : 'hover:bg-white/5 text-gray-500'}`}
          >
            <Settings size={22} />
            {isSidebarOpen && <span className="font-semibold">{t('Settings', 'সেটিংস')}</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Navigation */}
        <header className="h-24 glass border-b border-white/5 px-10 flex items-center justify-between z-40">
          <div className="flex-1 max-w-2xl">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder={t('Analyze keywords, audits, or content...', 'কীওয়ার্ড, অডিট বা কন্টেন্ট বিশ্লেষণ করুন...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:bg-white/10 transition-all text-sm tracking-wide"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => updateState({ language: state.language === 'en' ? 'bn' : 'en' })}
              className="flex items-center gap-3 px-5 py-2.5 rounded-2xl glass hover:bg-white/10 transition-all border border-white/10"
            >
              <Languages size={18} className="text-indigo-400" />
              <span className="text-xs font-bold uppercase tracking-widest">{state.language === 'en' ? 'EN' : 'BN'}</span>
            </button>
            <div className="h-10 w-px bg-white/10"></div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">{state.seoSettings.businessName || 'SEO Manager'}</p>
                <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">Enterprise Plan</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[2px] shadow-xl">
                <div className="w-full h-full bg-gray-900 rounded-[14px] flex items-center justify-center font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
                  {state.seoSettings.businessName ? state.seoSettings.businessName[0].toUpperCase() : 'SM'}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic View Area */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          {showSettings ? (
            <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in zoom-in-95 duration-500 pb-20">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-4xl font-black tracking-tighter flex items-center gap-4">
                    <Settings className="text-indigo-400" size={36} />
                    {t('SaaS Configuration', 'কনফিগারেশন')}
                  </h2>
                  <p className="text-gray-500 mt-1 font-medium">{t('Tailor Mindmatrix to your specific business SEO needs.', 'আপনার ব্যবসার এসইও প্রয়োজন অনুযায়ী সেটিংস ঠিক করুন।')}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Business Profile */}
                <div className="glass p-10 rounded-[3rem] space-y-8 border border-white/10 relative overflow-hidden flex flex-col">
                  <div className="flex items-center gap-4 text-indigo-400">
                    <Building2 size={24} />
                    <h3 className="text-xl font-bold uppercase tracking-widest text-sm">{t('Business Identity', 'বিজনেস আইডেন্টিটি')}</h3>
                  </div>
                  
                  <div className="space-y-6 flex-1">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 px-1">{t('Business Name', 'ব্যবসার নাম')}</label>
                      <input 
                        type="text" 
                        value={state.seoSettings.businessName}
                        onChange={(e) => updateSeoSetting('businessName', e.target.value)}
                        placeholder="e.g. Acme Corp BD"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 px-1">{t('Target Website', 'টার্গেট ওয়েবসাইট')}</label>
                      <input 
                        type="url" 
                        value={state.seoSettings.websiteUrl}
                        onChange={(e) => updateSeoSetting('websiteUrl', e.target.value)}
                        placeholder="https://example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Regional & Language */}
                <div className="glass p-10 rounded-[3rem] space-y-8 border border-white/10 flex flex-col">
                   <div className="flex items-center gap-4 text-indigo-400">
                    <Globe size={24} />
                    <h3 className="text-xl font-bold uppercase tracking-widest text-sm">{t('Regional Targeting', 'আঞ্চলিক টার্গেটিং')}</h3>
                  </div>

                  <div className="space-y-6 flex-1">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 px-1">{t('Primary Region', 'প্রধান অঞ্চল')}</label>
                      <select 
                        value={state.seoSettings.targetRegion}
                        onChange={(e) => updateSeoSetting('targetRegion', e.target.value as any)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 appearance-none transition-all"
                      >
                        <option value="BD" className="bg-gray-900">Bangladesh (Local)</option>
                        <option value="Global" className="bg-gray-900">Global (Worldwide)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 px-1">{t('Interface Language', 'ভাষা')}</label>
                      <div className="flex gap-4">
                        <button 
                          onClick={() => updateState({ language: 'en' })}
                          className={`flex-1 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${state.language === 'en' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white/5 border border-white/10 text-gray-500'}`}
                        >
                          English
                        </button>
                        <button 
                          onClick={() => updateState({ language: 'bn' })}
                          className={`flex-1 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${state.language === 'bn' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white/5 border border-white/10 text-gray-500'}`}
                        >
                          বাংলা
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Connection Status */}
              <div className="glass p-10 rounded-[4rem] border border-white/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] -mr-48 -mt-48 rounded-full"></div>
                
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-400 ring-1 ring-white/10">
                        <Lock size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black uppercase tracking-widest leading-none">{t('Intelligence Authentication', 'ইন্টেলিজেন্স অথেন্টিকেশন')}</h3>
                        <p className="text-[10px] font-bold text-gray-500 mt-2 uppercase tracking-[0.2em]">{t('Enterprise AI Core v3.5', 'এন্টারপ্রাইজ এআই কোর v৩.৫')}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed max-w-lg">
                      {t('Our Zero-Trust architecture ensures your API keys are never stored on our servers. Mindmatrix connects directly to your authorized Google Cloud project via secure environment bridging.', 'আপনার এআই কী আমাদের সার্ভারে সংরক্ষিত হয় না। এটি সরাসরি আপনার গুগলের অথরাইজড প্রজেক্টের সাথে যুক্ত থাকে।')}
                    </p>
                    <div className="flex items-center gap-6 pt-2">
                      <div className="flex items-center gap-2">
                        {state.isAiConnected ? <Wifi size={16} className="text-green-400" /> : <WifiOff size={16} className="text-rose-400" />}
                        <span className={`text-[10px] font-black uppercase tracking-widest ${state.isAiConnected ? 'text-green-400' : 'text-rose-400'}`}>
                          {state.isAiConnected ? t('Engine Ready', 'ইঞ্জিন প্রস্তুত') : t('Disconnected', 'বিচ্ছিন্ন')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-indigo-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">SSL Encrypted</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 w-full md:w-auto">
                    <button 
                      onClick={handleKeySelection}
                      disabled={keySelectionActive}
                      className="w-full md:w-auto bg-white text-gray-900 px-10 py-6 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.2em] hover:bg-gray-200 transition-all shadow-2xl active:scale-95 disabled:opacity-50 flex items-center justify-center gap-4 group"
                    >
                      {keySelectionActive ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
                      )}
                      {t('Update AI Connection', 'এআই কানেকশন আপডেট')}
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-rose-500/5 border border-rose-500/10 rounded-[2.5rem] flex items-start gap-6">
                <AlertCircle className="text-rose-500 shrink-0" size={24} />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-rose-400 uppercase tracking-widest">{t('Sensitive Data Protocol', 'সেনসিটিভ ডাটা প্রোটোকল')}</h4>
                  <p className="text-xs text-rose-500/80 leading-relaxed font-medium">
                    {t('Manual entry of private keys is strictly prohibited for security compliance. Please use the "Update AI Connection" button above to use the platform\'s secure key selector. Never share your sk- key in support chats.', 'সিকিউরিটি কমপ্লায়েন্সের জন্য ম্যানুয়াল এন্ট্রি নিষিদ্ধ। উপরের বাটনের মাধ্যমে সিকিউর কানেকশন তৈরি করুন।')}
                  </p>
                </div>
              </div>
            </div>
          ) : currentTool ? (
            <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-500">
              <ToolRunner tool={currentTool} />
            </div>
          ) : (
            <div className="space-y-12 max-w-7xl mx-auto">
              {/* Massive Hero Section */}
              <div className="relative overflow-hidden rounded-[4rem] bg-gray-900 border border-white/5 p-16 group">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/20 blur-[150px] -mr-[400px] -mt-[400px] rounded-full transition-transform duration-1000 group-hover:scale-110"></div>
                <div className="relative z-10 space-y-8 max-w-3xl">
                  <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 animate-pulse">
                    <Sparkles size={14} />
                    {t('AI-Core v3.1 Enterprise', 'এআই-কোর v৩.১ এন্টারপ্রাইজ')}
                  </div>
                  <h1 className="text-6xl md:text-7xl font-black leading-[1.05] tracking-tight">
                    {t('Dominate Search with Precision.', 'নিখুঁতভাবে সার্চ দখল করুন।')}
                  </h1>
                  <p className="text-gray-400 text-xl leading-relaxed font-medium">
                    {t('Mindmatrix leverages the world\'s most advanced AI models to audit, research, and rank your content faster than humanly possible.', 'মাইন্ডম্যাট্রিক্স বিশ্বের সবচেয়ে উন্নত এআই মডেল ব্যবহার করে আপনার কন্টেন্ট দ্রুত অডিট, রিসার্চ এবং র‍্যাঙ্ক করতে সাহায্য করে।')}
                  </p>
                  <div className="pt-6 flex flex-wrap gap-6 items-center">
                    <button 
                      onClick={() => setSelectedCategory(ToolCategory.KEYWORD)}
                      className="bg-indigo-600 text-white px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-600/40 active:scale-95 flex items-center gap-3"
                    >
                      {t('Launch Command Center', 'কমান্ড সেন্টার চালু করুন')}
                      <ArrowRight size={20} />
                    </button>
                    <div className="flex -space-x-4">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className={`w-12 h-12 rounded-full border-2 border-gray-900 bg-gray-800 flex items-center justify-center text-xs font-bold`}>
                          {i}
                        </div>
                      ))}
                      <div className="pl-6 flex flex-col justify-center">
                        <span className="text-sm font-bold">12,000+ Users</span>
                        <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">In Bangladesh</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-time Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="glass p-8 rounded-[2.5rem] border border-white/5 flex items-center gap-6 group hover:border-white/10 transition-all duration-300">
                    <div className={`w-16 h-16 rounded-[1.5rem] bg-white/5 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                      <stat.icon size={28} />
                    </div>
                    <div>
                      <p className="text-2xl font-black">{stat.value}</p>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tools Filtering Section */}
              <section className="space-y-10 pt-10 pb-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                  <div>
                    <h2 className="text-4xl font-black tracking-tight">{t('Intelligence Suite', 'ইন্টেলিজেন্স স্যুইট')}</h2>
                    <p className="text-gray-500 mt-2 font-medium">{t('Select a specialized module to begin analysis.', 'বিশ্লেষণ শুরু করতে একটি মডিউল নির্বাচন করুন।')}</p>
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {['All', ...Object.values(ToolCategory)].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat as any)}
                        className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/40' : 'glass hover:bg-white/10 text-gray-400'}`}
                      >
                        {cat === 'All' ? t('All Tools', 'সব টুলস') : t(cat, cat)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredTools.map(tool => {
                    const IconComponent = (LucideIcons as any)[tool.icon] || HelpCircle;
                    return (
                      <button 
                        key={tool.id}
                        onClick={() => updateState({ selectedToolId: tool.id })}
                        className="glass group p-8 rounded-[3rem] text-left hover:bg-white/5 hover:-translate-y-2 transition-all duration-500 border border-white/5 hover:border-indigo-500/30 relative overflow-hidden flex flex-col h-full"
                      >
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[50px] -mr-16 -mb-16 rounded-full group-hover:bg-indigo-500/10 transition-all duration-700"></div>
                        <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center mb-8 transition-all group-hover:scale-110 group-hover:rotate-6 ${tool.isAI ? 'bg-indigo-500/10 text-indigo-400' : 'bg-white/5 text-gray-500'}`}>
                          <IconComponent size={32} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-black mb-3 group-hover:text-indigo-400 transition-colors leading-tight">{tool.name[state.language]}</h3>
                        <p className="text-gray-500 text-sm line-clamp-2 mb-8 leading-relaxed font-medium">
                          {tool.description[state.language]}
                        </p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                          {tool.isAI ? (
                            <div className="flex items-center gap-2">
                              <Sparkles size={14} className="text-indigo-400" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400/80">
                                AI Core
                              </span>
                            </div>
                          ) : (
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">
                              System Logic
                            </span>
                          )}
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-500 text-indigo-400">
                            <ArrowRight size={20} />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            </div>
          )}
        </div>
      </main>

      <ChatBot />
    </div>
  );
};

export default App;
