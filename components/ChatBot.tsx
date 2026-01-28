
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Loader2, Sparkles, ChevronRight } from 'lucide-react';
import { useAppState } from '../store';
import { callGeminiAI } from '../services/geminiService';
import { TOOLS } from '../constants';

const ChatBot: React.FC = () => {
  const { state } = useAppState();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'ai' | 'user'; text: string }>>([
    { role: 'ai', text: 'স্বাগতম! আমি মাইন্ডম্যাট্রিক্স এআই অ্যাসিস্ট্যান্ট। আমি আপনাকে এসইও টুলস ব্যবহার করতে বা যেকোনো এসইও প্রশ্নের উত্তর দিতে সাহায্য করতে পারি।' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const t = (en: string, bn: string) => (state.language === 'en' ? en : bn);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    
    setIsLoading(true);
    try {
      const currentToolName = state.selectedToolId 
        ? TOOLS.find(t => t.id === state.selectedToolId)?.name[state.language] 
        : 'the Dashboard';

      const systemInstruction = `
        You are Mindmatrix AI Assistant, an expert SEO consultant for Bangladeshi users.
        User is currently on: ${currentToolName}.
        Help the user with SEO strategy, how to use the available 100 tools, and local market tips for Bangladesh.
        Answer in ${state.language === 'bn' ? 'Bangla' : 'English'}.
        Keep it concise and actionable.
      `;

      // Fixed: Removed state.apiKey parameter as callGeminiAI now uses process.env.API_KEY
      const response = await callGeminiAI(
        'gemini-3-flash-preview',
        userMsg,
        systemInstruction,
        true // Enable search for up-to-date SEO news
      );

      setMessages(prev => [...prev, { role: 'ai', text: response.text }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Error: Could not reach Gemini. Please check system configuration.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      {isOpen ? (
        <div className="w-[400px] h-[600px] glass rounded-[2.5rem] border border-white/10 flex flex-col shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8">
          {/* Header */}
          <div className="p-6 bg-indigo-600 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white">Mindmatrix AI</h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-indigo-100 font-bold uppercase tracking-widest opacity-80">Online</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full text-white transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${m.role === 'user' ? 'bg-indigo-600' : 'bg-white/10'}`}>
                    {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'glass rounded-tl-none'}`}>
                    {m.text}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg glass flex items-center justify-center">
                    <Loader2 size={14} className="animate-spin" />
                  </div>
                  <div className="glass p-4 rounded-2xl rounded-tl-none flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 glass border-t border-white/10">
            <div className="flex gap-2 bg-white/5 p-2 rounded-2xl border border-white/10 focus-within:border-indigo-500/50 transition-all">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('Type a message...', 'কিছু লিখুন...')}
                className="flex-1 bg-transparent border-none focus:outline-none px-3 text-sm"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-indigo-600 p-2.5 rounded-xl text-white hover:bg-indigo-500 transition-all disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-600/40 hover:scale-110 active:scale-95 transition-all group relative"
        >
          <div className="absolute inset-0 bg-indigo-600 rounded-full animate-ping opacity-20"></div>
          <MessageSquare className="text-white group-hover:rotate-12 transition-all" size={28} />
        </button>
      )}
    </div>
  );
};

export default ChatBot;
