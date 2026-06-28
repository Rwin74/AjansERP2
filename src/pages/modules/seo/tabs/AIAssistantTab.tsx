import React from 'react';
import { BrainCircuit, PlayCircle, Clock } from 'lucide-react';

export const AIAssistantTab = () => {
  const tasks = [
    { t: '404 hatalarını düzelt (5 adet)', p: 'Yüksek', time: '15 dk', impact: 'Kritik', color: 'red' },
    { t: 'Yeni blog yazısı: "2024 SEO Trendleri"', p: 'Orta', time: '2 saat', impact: 'Trafik', color: 'blue' },
    { t: 'Google Business post paylaşımı', p: 'Düşük', time: '10 dk', impact: 'Yerel', color: 'green' },
    { t: 'Ana sayfa yükleme hızını optimize et', p: 'Yüksek', time: '45 dk', impact: 'Sıralama', color: 'purple' },
    { t: 'Eksik meta descriptionları tamamla (3 sayfa)', p: 'Orta', time: '20 dk', impact: 'CTR', color: 'yellow' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="glass-panel p-8 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border-indigo-500/20 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
                <BrainCircuit size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">AjansOS Zeka Ajansı</h2>
                <p className="text-sm text-indigo-200/60 flex items-center gap-2">
                  <Clock size={14} /> Son analiz: Bugün 08:30 (Gemini Flash API)
                </p>
              </div>
            </div>
            <button className="btn-primary bg-indigo-600 hover:bg-indigo-500 text-white border-none">
              Yeniden Analiz Et
            </button>
          </div>
          
          <div className="bg-black/40 border border-white/5 rounded-xl p-5 mb-2 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">AI Özeti</h3>
            <p className="text-gray-300 leading-relaxed">
              Sistem tüm entegre API'leri (Search Console, Analytics, Screaming Frog) taradı. 
              Organik trafikte <span className="text-green-400 font-medium">%5.2 artış</span> tespit edildi, ancak 
              <span className="text-red-400 font-medium"> 3 sayfada canonical hatası</span> ve 
              <span className="text-yellow-400 font-medium"> CLS değerinde düşüş</span> var. 
              Mevcut sıralamaları korumak için aşağıdaki görevleri öncelik sırasına göre tamamlamanız önerilir.
            </p>
          </div>
        </div>
        
        {/* Abstract shapes for AI feel */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-lg ml-1 flex items-center gap-2">
          Günün Görevleri
          <span className="badge badge-neutral">{tasks.length} Görev</span>
        </h3>
        
        <div className="space-y-3">
          {tasks.map((task, i) => (
            <div key={i} className="glass-panel p-5 flex items-center justify-between group hover:bg-white/[0.02] transition-colors cursor-pointer border-l-4" style={{ borderLeftColor: `var(--color-${task.color === 'purple' ? 'accent' : task.color})`}}>
              <div className="flex items-center gap-5">
                <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg font-bold text-gray-400 group-hover:text-white transition-colors`}>
                  {i+1}
                </div>
                <div>
                  <h4 className="font-medium text-white text-lg">{task.t}</h4>
                  <div className="flex items-center gap-3 mt-2 text-xs">
                    <span className={`px-2 py-1 rounded bg-white/5 text-gray-300`}>Öncelik: {task.p}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400 flex items-center gap-1"><Clock size={12} /> {task.time}</span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-400">Etki: <span className="text-white">{task.impact}</span></span>
                  </div>
                </div>
              </div>
              <button className="btn-outline opacity-0 group-hover:opacity-100 transition-opacity">
                <PlayCircle size={16} /> Başla
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
