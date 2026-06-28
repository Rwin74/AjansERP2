import React, { useState } from 'react';
import { useClientStore } from '../../store/useClientStore';
import type { AITask } from '../../store/useClientStore';
import { PlayCircle, Target, Activity, AlertTriangle, TrendingUp, Link2, CheckCircle2, Clock, Globe, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const EmptyClientState = () => {
  const { clients, setActiveClient, completeTask } = useClientStore();
  const [isWorkMode, setIsWorkMode] = useState(false);
  const navigate = useNavigate();

  // Aggregate all open tasks across all clients
  const allTasks: { clientName: string; clientId: string; task: AITask }[] = [];
  clients.forEach(c => {
    c.aiTasks?.forEach(t => {
      if (t.status === 'Açık') {
        allTasks.push({ clientName: c.name, clientId: c.id, task: t });
      }
    });
  });

  // Sort tasks: Kritik > Yüksek > Orta > Düşük
  const priorityWeight = { 'Kritik': 4, 'Yüksek': 3, 'Orta': 2, 'Düşük': 1 };
  allTasks.sort((a, b) => priorityWeight[b.task.priority] - priorityWeight[a.task.priority]);

  // General Metrics
  const totalClients = clients.length;
  const totalTasks = allTasks.length;
  const criticalTasks = allTasks.filter(t => t.task.priority === 'Kritik').length;
  const mediumTasks = allTasks.filter(t => t.task.priority === 'Orta').length;
  const lowTasks = allTasks.filter(t => t.task.priority === 'Düşük').length;
  const estMinutes = allTasks.reduce((acc, curr) => acc + curr.task.estimatedMinutes, 0);

  const hours = Math.floor(estMinutes / 60);
  const minutes = estMinutes % 60;

  const firstTask = allTasks[0];

  const handleTaskComplete = (clientId: string, taskId: string) => {
    completeTask(clientId, taskId);
    // Let animation play, the array updates automatically via Zustand
  };

  const getPriorityColor = (p: string) => {
    if (p === 'Kritik') return 'text-red-400 bg-red-400/10 border-red-400/20';
    if (p === 'Yüksek') return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
    if (p === 'Orta') return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
  };

  // -------------------------------------------------------------
  // WORK MODE (FOCUS MODE) RENDER
  // -------------------------------------------------------------
  if (isWorkMode) {
    return (
      <div className="flex-1 w-full h-full bg-[#0a0a0c] text-white p-8 flex flex-col items-center overflow-y-auto">
        <div className="w-full max-w-3xl flex justify-between items-center mb-12">
          <button 
            onClick={() => setIsWorkMode(false)}
            className="text-gray-500 hover:text-white transition-colors text-sm font-medium px-4 py-2 bg-white/5 rounded-lg border border-white/5"
          >
            ← Ana Ekrana Dön
          </button>
          <div className="text-sm text-gray-500 font-medium">
            Kalan Görev: <span className="text-white">{totalTasks}</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {firstTask ? (
            <motion.div 
              key={firstTask.task.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -20 }}
              className="w-full max-w-3xl"
            >
              <div className="text-center mb-8">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border ${getPriorityColor(firstTask.task.priority)}`}>
                  {firstTask.task.priority} ÖNCELİK
                </span>
                <h1 className="text-4xl font-bold tracking-tight mb-2">{firstTask.task.title}</h1>
                <p className="text-xl text-gray-400">{firstTask.clientName}</p>
              </div>

              <div className="bg-[#111113] border border-white/10 rounded-2xl p-8 shadow-2xl mb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 pb-8 border-b border-white/5">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Tahmini Süre</p>
                    <p className="text-lg font-semibold flex items-center gap-2"><Clock size={16} className="text-blue-400" /> {firstTask.task.estimatedMinutes} Dk</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">SEO Etkisi</p>
                    <p className="text-lg font-semibold text-yellow-400 tracking-widest">
                      {'★'.repeat(firstTask.task.seoImpact)}{'☆'.repeat(5 - firstTask.task.seoImpact)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Sorumlu</p>
                    <p className="text-lg font-medium">{firstTask.task.assignee}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Aksiyon Türü</p>
                    <p className="text-lg font-medium text-gray-300 capitalize">{firstTask.task.actionType.replace('_', ' ')}</p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Yapay Zeka Analizi ve Sebep</p>
                  <p className="text-lg text-gray-300 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5">
                    {firstTask.task.reason}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => {
                    setActiveClient(firstTask.clientId);
                    navigate('/seo');
                  }}
                  className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Target size={18} /> Müşteri Paneline Git
                </button>
                <button 
                  onClick={() => handleTaskComplete(firstTask.clientId, firstTask.task.id)}
                  className="flex-[2] py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={20} /> Görevi Tamamla ve Sonrakine Geç
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full max-w-3xl text-center py-20"
            >
              <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={48} className="text-green-500" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Harika İş Çıkardın!</h2>
              <p className="text-gray-400 text-lg mb-8">Bugünkü tüm görevleri tamamladın. Dinlenme vakti.</p>
              <button 
                onClick={() => setIsWorkMode(false)}
                className="btn-primary py-3 px-8"
              >
                Dashboard'a Dön
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upcoming Tasks Queue Preview */}
        {allTasks.length > 1 && (
          <div className="w-full max-w-3xl mt-16 border-t border-white/10 pt-8">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Sıradaki Görevler</h3>
            <div className="space-y-3">
              {allTasks.slice(1, 4).map((t, i) => (
                <div key={t.task.id} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl opacity-50 hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600 font-mono font-bold text-lg">{i + 2}</span>
                    <div>
                      <p className="font-medium text-gray-300">{t.clientName}</p>
                      <p className="text-sm text-gray-500">{t.task.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium">
                    <span className="text-gray-400">{t.task.estimatedMinutes} Dk</span>
                    <span className={getPriorityColor(t.task.priority) + ' px-2 py-1 rounded'}>{t.task.priority}</span>
                  </div>
                </div>
              ))}
              {allTasks.length > 4 && (
                <div className="text-center text-sm text-gray-500 pt-2">
                  + {allTasks.length - 4} görev daha
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // DASHBOARD RENDER
  // -------------------------------------------------------------
  return (
    <div className="flex-1 w-full h-full bg-[#0a0a0c] text-white overflow-y-auto font-sans">
      <div className="max-w-[1400px] mx-auto p-8 relative">
        
        {/* HUGE SUMMARY AREA */}
        <div className="mb-12 border border-white/10 bg-[#111113] rounded-3xl p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-[0.02] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                🤖
              </div>
              <h1 className="text-xl font-semibold tracking-tight text-gray-300 uppercase">AI Operasyon Merkezi</h1>
            </div>
            
            <h2 className="text-5xl font-bold tracking-tight mb-8">
              Günaydın <span className="text-white">Atakan</span>.
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-6 mb-10 pb-10 border-b border-white/10">
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Toplam Müşteri</p>
                <p className="text-3xl font-semibold">{totalClients}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Toplam Görev</p>
                <p className="text-3xl font-semibold text-white">{totalTasks}</p>
              </div>
              <div>
                <p className="text-xs text-red-500/70 font-medium uppercase tracking-wider mb-2">Kritik Görev</p>
                <p className="text-3xl font-semibold text-red-400">{criticalTasks}</p>
              </div>
              <div>
                <p className="text-xs text-orange-500/70 font-medium uppercase tracking-wider mb-2">Orta Öncelik</p>
                <p className="text-3xl font-semibold text-orange-400">{mediumTasks}</p>
              </div>
              <div>
                <p className="text-xs text-blue-500/70 font-medium uppercase tracking-wider mb-2">Düşük Öncelik</p>
                <p className="text-3xl font-semibold text-blue-400">{lowTasks}</p>
              </div>
              <div>
                <p className="text-xs text-yellow-500/70 font-medium uppercase tracking-wider mb-2">Tahmini Süre</p>
                <p className="text-2xl font-semibold text-yellow-400 mt-1">{hours}s {minutes}d</p>
              </div>
            </div>

            {firstTask && (
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-blue-600/5 border border-blue-500/20 rounded-2xl p-6">
                <div>
                  <p className="text-lg text-gray-300 mb-2">
                    Bugün önce <span className="font-bold text-white">{firstTask.clientName}</span> ile başlamanı öneriyorum.
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-gray-400">Sebep:</span> {firstTask.task.reason}
                  </p>
                </div>
                <button 
                  onClick={() => setIsWorkMode(true)}
                  className="shrink-0 flex items-center gap-3 bg-white text-black hover:bg-gray-200 px-10 py-5 rounded-xl font-bold text-lg transition-transform hover:scale-105"
                >
                  <PlayCircle size={24} />
                  GÜNE BAŞLA
                </button>
              </div>
            )}
          </div>
        </div>

        {/* WIDGET GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          
          {/* AI Alarm Merkezi */}
          <div className="glass-panel p-6 flex flex-col h-[380px]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6 flex items-center gap-2">
              <AlertTriangle size={16} /> AI Alarm Merkezi
            </h3>
            <div className="space-y-4 overflow-y-auto flex-1 pr-2 hide-scrollbar">
              <div className="flex gap-3 text-sm">
                <div className="mt-1 w-2 h-2 rounded-full bg-red-500 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                <p className="text-gray-300"><span className="font-medium text-white">GünBoyu</span> domain süresi bitmesine 12 gün kaldı.</p>
              </div>
              <div className="flex gap-3 text-sm">
                <div className="mt-1 w-2 h-2 rounded-full bg-yellow-500 shrink-0 shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
                <p className="text-gray-300"><span className="font-medium text-white">Emir Rent a car</span> hosting süresi yaklaşıyor.</p>
              </div>
              <div className="flex gap-3 text-sm">
                <div className="mt-1 w-2 h-2 rounded-full bg-red-500 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                <p className="text-gray-300"><span className="font-medium text-white">Çiçek taksi</span> Analytics bağlantısı koptu.</p>
              </div>
              <div className="flex gap-3 text-sm">
                <div className="mt-1 w-2 h-2 rounded-full bg-green-500 shrink-0" />
                <p className="text-gray-400 line-through">Kodil SSL güncellendi.</p>
              </div>
              <div className="flex gap-3 text-sm">
                <div className="mt-1 w-2 h-2 rounded-full bg-green-500 shrink-0" />
                <p className="text-gray-400 line-through">Sitemap tarandı.</p>
              </div>
            </div>
          </div>

          {/* Haftalık Özet */}
          <div className="glass-panel p-6 flex flex-col h-[380px]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6 flex items-center gap-2">
              <Activity size={16} /> Haftalık Özet
            </h3>
            <div className="grid grid-cols-2 gap-4 flex-1">
              <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-center">
                <p className="text-2xl font-bold text-green-400 mb-1">+17</p>
                <p className="text-xs text-gray-500">Kelime Yükseldi</p>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-center">
                <p className="text-2xl font-bold text-red-400 mb-1">-3</p>
                <p className="text-xs text-gray-500">Kelime Düştü</p>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-center">
                <p className="text-xl font-bold text-green-400 mb-1">-%8</p>
                <p className="text-xs text-gray-500">Ads TBM</p>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-center">
                <p className="text-xl font-bold text-green-400 mb-1">+%21</p>
                <p className="text-xs text-gray-500">Organik Trafik</p>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-center col-span-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xl font-bold text-white mb-1">42</p>
                    <p className="text-xs text-gray-500">GMB Telefon Araması</p>
                  </div>
                  <Globe size={24} className="text-blue-500 opacity-50" />
                </div>
              </div>
            </div>
          </div>

          {/* AI Fırsatları */}
          <div className="glass-panel p-6 flex flex-col h-[380px] xl:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6 flex items-center gap-2">
              <TrendingUp size={16} /> AI Fırsatları & Riskleri
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              {/* Opportunities */}
              <div className="space-y-4 overflow-y-auto hide-scrollbar">
                <div className="p-4 bg-green-500/5 border border-green-500/10 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-green-400 text-xs">★★★★★ Fırsat</span>
                    <span className="text-gray-500 text-xs">Emir Rent a car</span>
                  </div>
                  <p className="text-sm text-gray-300 font-medium mb-2">"Denizli Rent A Car" kelimesinde 3. sıradasınız.</p>
                  <p className="text-xs text-gray-500">İlk sıraya çıkmak için <strong className="text-gray-300">2 kaliteli backlink</strong> ve içerik güncellemesi öneriliyor.</p>
                </div>

                <div className="p-4 bg-green-500/5 border border-green-500/10 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-green-400 text-xs">★★★★☆ Fırsat</span>
                    <span className="text-gray-500 text-xs">Kodil</span>
                  </div>
                  <p className="text-sm text-gray-300 font-medium mb-2">Google Business fotoğrafı eklenmeyeli 42 gün oldu.</p>
                  <p className="text-xs text-gray-500">Yeni fotoğraf eklenmesi yerel sıralamayı artırır.</p>
                </div>
              </div>

              {/* Risks */}
              <div className="space-y-4 overflow-y-auto hide-scrollbar">
                <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl flex items-start gap-3">
                  <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-200 mb-1">5 adet 404 Hatası (Çiçek taksi)</p>
                    <p className="text-xs text-gray-500">Hemen 301 yönlendirmesi yapılmalı.</p>
                  </div>
                </div>
                <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl flex items-start gap-3">
                  <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-200 mb-1">Canonical Eksik (Emir Rent a car)</p>
                    <p className="text-xs text-gray-500">Kopya içerik riski mevcut.</p>
                  </div>
                </div>
                <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl flex items-start gap-3">
                  <ShieldCheck size={16} className="text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-200 mb-1">SSL Yakında Bitecek (GünBoyu)</p>
                    <p className="text-xs text-gray-500">3 gün içinde yenilenmeli.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
