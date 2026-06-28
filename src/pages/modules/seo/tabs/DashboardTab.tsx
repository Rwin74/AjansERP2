import React, { useState } from 'react';
import { useClientStore } from '../../../../store/useClientStore';
import type { AITask } from '../../../../store/useClientStore';
import { Target, TrendingUp, ShieldCheck, Search, Activity, CheckCircle2, Clock, Mail, MessageSquare, Plus, ArrowRight, Zap, Globe, FileText, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotificationStore } from '../../../../store/useNotificationStore';
import { KanbanBoard } from '../components/KanbanBoard';

export const DashboardTab = () => {
  const { clients, activeClientId, completeTask } = useClientStore();
  const activeClient = clients.find(c => c.id === activeClientId);
  const { addNotification } = useNotificationStore();
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{role: 'user'|'ai', content: string}[]>([
    { role: 'ai', content: `Merhaba, ${activeClient?.name} için bugün ne yapabilirim?` }
  ]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Simulating Anomaly Detection
  React.useEffect(() => {
    if (!activeClient) return;
    
    // Yalnızca demonstrasyon amaçlı, 4 saniye sonra bildirim atar
    const timer = setTimeout(() => {
      // Sadece şansa bağlı olarak uyarı versin ki her seferinde çıkmasın (%50 ihtimal)
      if (Math.random() > 0.5) {
        addNotification({
          type: 'warning',
          message: `Dikkat: ${activeClient.name} trafiğinde anlık %3'lük bir düşüş algılandı. AI Asistan'dan analiz isteyebilirsiniz.`,
          duration: 8000
        });
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [activeClient?.id]);

  if (!activeClient) return null;

  const { healthScores, timelineEvents, aiTasks } = activeClient;
  const openTasks = aiTasks?.filter(t => t.status === 'Açık') || [];

  const getPriorityColor = (p: string) => {
    if (p === 'Kritik') return 'text-red-400 bg-red-400/10 border-red-400/20';
    if (p === 'Yüksek') return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
    if (p === 'Orta') return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
  };

  const [isTyping, setIsTyping] = useState(false);

  const handleActionClick = (task: AITask) => {
    completeTask(activeClient.id, task.id);
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;
    
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setChatInput('');
    setIsTyping(true);
    
    // Geçici olarak "Yazıyor..." mesajı ekle
    setChatMessages(prev => [...prev, { role: 'ai', content: '...' }]);

    try {
      const { GeminiService } = await import('../../../../services/GeminiService');
      const response = await GeminiService.askAssistant(userMsg, activeClient);
      
      setChatMessages(prev => {
        // "Yazıyor..." mesajını sil ve gerçek yanıtı ekle
        const newMsgs = [...prev];
        newMsgs.pop();
        return [...newMsgs, { role: 'ai', content: response }];
      });
    } catch (error) {
      setChatMessages(prev => {
        const newMsgs = [...prev];
        newMsgs.pop();
        return [...newMsgs, { role: 'ai', content: 'Üzgünüm, bir bağlantı sorunu oluştu.' }];
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="space-y-6 pb-24 relative">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1 text-white">{activeClient.name} - Detaylı Analiz Paneli</h2>
          <p className="text-sm text-gray-400">SEO, Performans ve Operasyonel verilerin anlık durumu.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Health Scores */}
        <div className="space-y-6">
          <div className="glass-panel p-6">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Activity size={18} className="text-blue-400" />
              Müşteri Sağlık Skoru
            </h3>
            
            <div className="flex items-center justify-center mb-8">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="56" fill="transparent" stroke="#ffffff10" strokeWidth="12" />
                  <circle cx="64" cy="64" r="56" fill="transparent" stroke="#3b82f6" strokeWidth="12" 
                    strokeDasharray="351.8" 
                    strokeDashoffset={351.8 - (351.8 * (healthScores?.toplam || 0)) / 100} 
                    className="transition-all duration-1000 ease-out" 
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-bold">{healthScores?.toplam || 0}</span>
                  <span className="text-[10px] text-gray-500 uppercase">Toplam</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'SEO', value: healthScores?.seo, icon: <TrendingUp size={14} /> },
                { label: 'Google', value: healthScores?.google, icon: <Search size={14} /> },
                { label: 'Teknik', value: healthScores?.teknik, icon: <Settings size={14} /> },
                { label: 'İçerik', value: healthScores?.icerik, icon: <FileText size={14} /> },
                { label: 'Güvenlik', value: healthScores?.guvenlik, icon: <ShieldCheck size={14} /> },
                { label: 'Performans', value: healthScores?.performans, icon: <Zap size={14} /> },
                { label: 'Business', value: healthScores?.business, icon: <Globe size={14} /> },
              ].map((score, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-gray-400 flex items-center gap-1.5">{score.icon} {score.label}</span>
                    <span className="text-white font-medium">%{score.value || 0}</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${(score.value || 0) > 85 ? 'bg-green-500' : (score.value || 0) > 70 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                      style={{ width: `${score.value || 0}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-gray-500 text-center">
              {healthScores?.toplam === 0 ? "Henüz sistem analizi yapılmadı." : "Sistem analiz verileri güncel."}
            </div>
          </div>
        </div>

        {/* Right Column: AI Tasks & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Actionable AI Tasks Kanban Board */}
          <KanbanBoard clientId={activeClient.id} />

          {/* Timeline */}
          <div className="glass-panel p-6">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Clock size={18} className="text-purple-400" />
              Operasyon Geçmişi (Timeline)
            </h3>
            
            <div className="relative border-l border-white/10 ml-3 space-y-6">
              {timelineEvents?.map((event) => (
                <div key={event.id} className="relative pl-6">
                  <div className={`absolute -left-1.5 top-1.5 w-3 h-3 rounded-full border-2 border-[#0f0f11] ${
                    event.type === 'success' ? 'bg-green-500' :
                    event.type === 'warning' ? 'bg-yellow-500' :
                    event.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                  }`} />
                  <p className="text-xs text-gray-500 mb-1">{event.timeLabel}</p>
                  <p className="text-sm text-gray-300">{event.content}</p>
                </div>
              ))}
              {(!timelineEvents || timelineEvents.length === 0) && (
                <p className="pl-6 text-sm text-gray-500">Henüz kaydedilmiş bir işlem yok.</p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* FLOATING AI CHAT WIDGET */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute bottom-16 right-0 w-80 bg-[#111113] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-96"
            >
              <div className="p-4 border-b border-white/5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare size={16} className="text-blue-400" />
                  <h3 className="font-semibold text-sm">AI Asistan</h3>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white">✕</button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-xl text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white/10 text-gray-200 rounded-bl-sm'}`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleChatSubmit} className="p-3 border-t border-white/5 bg-white/[0.02] flex gap-2">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  placeholder="Soru sorun..." 
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500/50"
                />
                <button type="submit" className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors">
                  <ArrowRight size={16} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/20 hover:scale-105 transition-transform"
        >
          {isChatOpen ? <span className="text-xl">✕</span> : <MessageSquare size={24} />}
        </button>
      </div>

    </div>
  );
};
