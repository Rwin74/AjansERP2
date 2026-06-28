import React, { useState, useEffect } from 'react';
import { BrainCircuit, PlayCircle, Clock, Loader2 } from 'lucide-react';
import { GeminiService } from '../../../../services/GeminiService';
import { useSettingsStore } from '../../../../store/useSettingsStore';

export const AIAssistantTab = () => {
  const { gemini } = useSettingsStore();
  const [tasks, setTasks] = useState<any[]>([]);
  const [summary, setSummary] = useState("AI analizi bekleniyor...");
  const [loading, setLoading] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState("Henüz analiz yapılmadı");

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      // Mock client data to send to Gemini for analysis
      const mockClientData = {
        website: "ornek-ajans.com",
        metrics: {
          organicTraffic: { trend: "up", percentage: 5.2 },
          crawlErrors: { count: 3, type: "404" },
          coreWebVitals: { status: "needs_improvement", detail: "CLS dropped" }
        }
      };

      const result = await GeminiService.analyzeClientData(mockClientData);
      
      if (result.success) {
        setSummary(result.summary);
        setTasks(result.tasks || []);
        setLastAnalysis(`Bugün ${new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}`);
      } else {
        setSummary(result.summary || "Analiz alınamadı.");
        setTasks([]);
      }
    } catch (error) {
      console.error(error);
      setSummary("Analiz sırasında beklenmeyen bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleAnalyze();
  }, []);

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
                  <Clock size={14} /> Son analiz: {lastAnalysis} ({gemini.model})
                </p>
              </div>
            </div>
            <button 
              onClick={handleAnalyze}
              disabled={loading || !gemini.isConnected}
              className="btn-primary bg-indigo-600 hover:bg-indigo-500 text-white border-none disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : null}
              {loading ? "Analiz Ediliyor..." : "Yeniden Analiz Et"}
            </button>
          </div>
          
          <div className="bg-black/40 border border-white/5 rounded-xl p-5 mb-2 backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider flex items-center justify-between">
              AI Özeti
              {!gemini.isConnected && (
                <span className="text-xs text-red-400 normal-case bg-red-400/10 px-2 py-1 rounded">API Bağlantısı Yok</span>
              )}
            </h3>
            <p className="text-gray-300 leading-relaxed min-h-[60px]">
              {loading ? "Veriler analiz ediliyor, lütfen bekleyin..." : summary}
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
          {loading ? (
             <div className="glass-panel p-8 text-center text-gray-400 animate-pulse">
               Görevler yükleniyor...
             </div>
          ) : tasks.length > 0 ? (
            tasks.map((task, i) => (
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
            ))
          ) : (
             <div className="glass-panel p-8 text-center text-gray-400">
               {gemini.isConnected ? "Şu an için yeni bir görev bulunmuyor." : "Görevleri görebilmek için Ayarlar'dan Gemini API anahtarınızı bağlayın."}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
