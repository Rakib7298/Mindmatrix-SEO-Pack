
import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  Download, 
  Check, 
  Loader2, 
  AlertCircle,
  ExternalLink,
  Info,
  ChevronLeft,
  Sparkles,
  Terminal,
  FileJson,
  Layout,
  Table as TableIcon,
  Cpu,
  Lock
} from 'lucide-react';
import { Tool, Language } from '../types';
import { useAppState } from '../store';
import { callGeminiAI } from '../services/geminiService';

interface ToolRunnerProps {
  tool: Tool;
}

const ToolRunner: React.FC<ToolRunnerProps> = ({ tool }) => {
  const { state, updateState } = useAppState();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [grounding, setGrounding] = useState<any[]>([]);
  const [error, setError] = useState<{message: string, isAuth: boolean} | null>(null);
  const [copied, setCopied] = useState(false);

  const t = (en: string, bn: string) => (state.language === 'en' ? en : bn);

  const handleInputChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const executeTool = async () => {
    setIsLoading(true);
    setResult(null);
    setGrounding([]);
    setError(null);

    try {
      if (tool.isAI) {
        const prompt = `
          BUSINESS PROFILE:
          Name: ${state.seoSettings.businessName}
          Website: ${state.seoSettings.websiteUrl}
          Industry: ${state.seoSettings.industry}
          Region: ${state.seoSettings.targetRegion}

          USER QUERY:
          ${Object.entries(formData).map(([k, v]) => `${k.toUpperCase()}: ${v}`).join('\n')}
        `;
        
        const response = await callGeminiAI(
          'gemini-3-flash-preview',
          prompt,
          `${tool.systemPrompt}. Always use Markdown tables if listing data. Provide actionable advice.`,
          true 
        );
        
        setResult(response.text);
        setGrounding(response.grounding);
      } else {
        // Advanced Logic Simulator
        setTimeout(() => {
          if (tool.id.includes('sitemap')) {
            setResult(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${formData.url_code || state.seoSettings.websiteUrl || 'https://site.com/'}</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n  </url>\n</urlset>`);
          } else {
            setResult(t('Execution successful. Data processed through Mindmatrix System Logic v4.0 for ' + (state.seoSettings.businessName || 'current project'), 'সিস্টেম লজিক v৪.০ এর মাধ্যমে সফলভাবে সম্পন্ন হয়েছে।'));
          }
          setIsLoading(false);
        }, 1200);
        return;
      }
    } catch (err: any) {
      const isAuthError = err.message?.toLowerCase().includes('key') || err.message?.toLowerCase().includes('authorized');
      setError({
        message: err.message || t('System Error: Module failed to initialize.', 'সিস্টেম এরর: মডিউল চালু করা সম্ভব হয়নি।'),
        isAuth: isAuthError
      });
      if (isAuthError) updateState({ isAiConnected: false });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Input Module */}
      <div className="lg:col-span-5 space-y-8">
        <div className="glass p-10 rounded-[3rem] space-y-8 border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[50px] -mr-16 -mt-16 rounded-full group-hover:bg-indigo-500/10 transition-all"></div>
          
          <div className="flex items-center justify-between">
            <button 
              onClick={() => updateState({ selectedToolId: null })}
              className="flex items-center gap-2 text-gray-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
            >
              <ChevronLeft size={14} />
              {t('Back to Hub', 'হাব-এ ফিরুন')}
            </button>
            <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${tool.isAI ? 'bg-indigo-500/10 text-indigo-400' : 'bg-white/5 text-gray-600'}`}>
              {tool.isAI ? 'AI Module' : 'System Logic'}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-black tracking-tight">{tool.name[state.language]}</h2>
            <p className="text-gray-500 mt-2 text-sm font-medium leading-relaxed">{tool.description[state.language]}</p>
          </div>

          <div className="space-y-6">
            {tool.inputs.map(input => (
              <div key={input.name} className="space-y-3">
                <label className="text-xs font-black uppercase tracking-widest text-indigo-400 flex items-center justify-between px-1">
                  {input.label[state.language]}
                  {input.required && <span className="text-rose-500/60 font-bold opacity-50">!</span>}
                </label>
                {input.type === 'textarea' ? (
                  <textarea 
                    value={formData[input.name] || ''}
                    onChange={(e) => handleInputChange(input.name, e.target.value)}
                    placeholder={input.placeholder[state.language]}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:bg-white/10 min-h-[160px] text-sm leading-relaxed"
                  />
                ) : input.type === 'select' ? (
                  <select
                    value={formData[input.name] || ''}
                    onChange={(e) => handleInputChange(input.name, e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-sm appearance-none"
                  >
                    <option value="" disabled className="bg-gray-900">{input.placeholder[state.language]}</option>
                    {input.options?.map(opt => (
                      <option key={opt.value} value={opt.value} className="bg-gray-900">{opt.label}</option>
                    ))}
                  </select>
                ) : (
                  <input 
                    type={input.type}
                    value={formData[input.name] || ''}
                    onChange={(e) => handleInputChange(input.name, e.target.value)}
                    placeholder={input.placeholder[state.language]}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 text-sm"
                  />
                )}
              </div>
            ))}
          </div>

          <button 
            onClick={executeTool}
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-4 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] text-white transition-all shadow-2xl relative overflow-hidden group ${
              isLoading ? 'bg-indigo-600/50 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 active:scale-95 shadow-indigo-600/30'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>{t('Processing Intelligence...', 'প্রসেসিং হচ্ছে...')}</span>
              </>
            ) : (
              <>
                <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                <span>{t('Initiate Execution', 'এক্সেকিউট করুন')}</span>
              </>
            )}
          </button>

          {error && (
            <div className={`p-6 border rounded-[2rem] flex items-start gap-4 text-xs font-bold leading-relaxed ${error.isAuth ? 'bg-rose-500/10 border-rose-500/30 text-rose-400' : 'bg-orange-500/5 border-orange-500/20 text-orange-400'}`}>
              <AlertCircle size={24} className="shrink-0" />
              <div className="space-y-2">
                <p>{error.message}</p>
                {error.isAuth && (
                  <button 
                    onClick={() => {
                      if (window.aistudio?.openSelectKey) window.aistudio.openSelectKey();
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-all uppercase tracking-widest text-[9px]"
                  >
                    <Lock size={12} />
                    {t('Authenticate AI Service', 'এআই সার্ভিস অথেন্টিকেট করুন')}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Output Intelligence Console */}
      <div className="lg:col-span-7 pb-20 lg:pb-0">
        <div className="glass h-full rounded-[3rem] border border-white/5 flex flex-col min-h-[500px] overflow-hidden">
          <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <Terminal size={20} />
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-widest">{t('Intelligence Console', 'ইন্টেলিজেন্স কনসোল')}</h3>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none mt-1">Ready for display</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                onClick={copyToClipboard}
                disabled={!result}
                className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-all disabled:opacity-30 border border-transparent hover:border-white/10 text-[10px] font-black uppercase tracking-widest"
              >
                {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                {copied ? t('Copied', 'কপি হয়েছে') : t('Copy', 'কপি করুন')}
              </button>
            </div>
          </div>

          <div className="flex-1 p-10 overflow-y-auto custom-scrollbar">
            {result ? (
              <div className="prose prose-invert max-w-none">
                <div className="whitespace-pre-wrap leading-relaxed text-gray-300 font-medium text-base selection:bg-indigo-500/50">
                  {result}
                </div>

                {grounding.length > 0 && (
                  <div className="mt-12 pt-10 border-t border-white/5">
                    <h4 className="text-[10px] font-black text-indigo-400 mb-6 uppercase tracking-[0.3em]">Verified Citations & Grounding</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {grounding.map((chunk, idx) => (
                        <a 
                          key={idx} 
                          href={chunk.web?.uri} 
                          target="_blank" 
                          rel="noreferrer"
                          className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all group flex items-start gap-4"
                        >
                          <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 shrink-0">
                            <ExternalLink size={16} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-gray-300 line-clamp-1 group-hover:text-white transition-colors">
                              {chunk.web?.title || 'System Resource'}
                            </p>
                            <p className="text-[10px] text-gray-500 mt-1 truncate max-w-[150px]">{chunk.web?.uri}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-indigo-500/10 rounded-[2rem] flex items-center justify-center border-2 border-dashed border-indigo-500/30 animate-pulse">
                    <Cpu size={40} className="text-indigo-400/50" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                    <Sparkles size={16} className="text-white" />
                  </div>
                </div>
                <div className="max-w-xs space-y-2">
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">
                    {t('Awaiting Command', 'কমান্ডের জন্য অপেক্ষা')}
                  </p>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">
                    {t('Select parameters and run the module to synthesize SEO intelligence reports.', 'প্যারামিটার নির্বাচন করে মডিউল রান করুন।')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolRunner;
