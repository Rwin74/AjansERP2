import React, { useState } from 'react';
import { useClientStore } from '../../../../store/useClientStore';
import { GeminiService } from '../../../../services/GeminiService';
import { Search, Loader2, Target, TrendingUp, AlertCircle } from 'lucide-react';

export const CompetitorAnalysisTab = () => {
  const { clients, activeClientId } = useClientStore();
  const activeClient = clients.find(c => c.id === activeClientId);
  
  const [competitors, setCompetitors] = useState(['', '', '']);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleAnalyze = async () => {
    const validCompetitors = competitors.filter(c => c.trim() !== '');
    if (validCompetitors.length === 0 || !activeClient) return;

    setLoading(true);
    const data = await GeminiService.analyzeCompetitors(activeClient.name, validCompetitors);
    setResults(data);
    setLoading(false);
  };

  const updateCompetitor = (index: number, value: string) => {
    const newCompetitors = [...competitors];
    newCompetitors[index] = value;
    setCompetitors(newCompetitors);
  };

  if (!activeClient) return null;

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 border-l-4 border-l-blue-500">
        <h2 className="text-xl font-bold mb-2">Rakip Analizi Simülasyonu (AI)</h2>
        <p className="text-sm text-gray-400">
          Müşterinizin web sitesiyle rekabet eden siteleri girerek AI destekli bir kıyaslama yapın.
        </p>

        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 space-y-3">
            {competitors.map((comp, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-gray-500 text-sm font-medium w-4">{i + 1}.</span>
                <input
                  type="text"
                  placeholder={`Rakip site (örn: rakip${i+1}.com)`}
                  value={comp}
                  onChange={(e) => updateCompetitor(i, e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500/50"
                />
              </div>
            ))}
          </div>
          <div className="flex items-end">
            <button
              onClick={handleAnalyze}
              disabled={loading || competitors.every(c => c.trim() === '')}
              className="btn-primary flex items-center justify-center gap-2 h-[132px] w-full md:w-32 bg-blue-600 hover:bg-blue-500 text-white border-none rounded-lg disabled:opacity-50"
            >
              {loading ? <Loader2 size={24} className="animate-spin" /> : <Search size={24} />}
              <span className="md:hidden ml-2">{loading ? 'Analiz Ediliyor...' : 'Analiz Et'}</span>
            </button>
          </div>
        </div>
      </div>

      {results && results.success && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          <div className="glass-panel p-6 space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Target size={18} className="text-blue-400" /> Tahmini Skorlar
            </h3>
            <p className="text-sm text-gray-300 bg-white/5 p-4 rounded-lg">{results.summary}</p>
            
            <div className="space-y-4 mt-4">
              {results.scores?.map((scoreObj: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-gray-200">{scoreObj.site}</span>
                    <span className="text-white font-medium">{scoreObj.score}/100</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${scoreObj.site === activeClient.name ? 'bg-blue-500' : 'bg-gray-500'}`} 
                      style={{ width: \`\${scoreObj.score}%\` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-panel p-6">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                <AlertCircle size={18} className="text-yellow-400" /> Fırsatlar (Gaps)
              </h3>
              <div className="space-y-3">
                {results.gaps?.map((gap: any, i: number) => (
                  <div key={i} className="p-4 border border-white/10 rounded-lg bg-white/5">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-semibold text-white">{gap.title}</h4>
                      <span className="text-xs bg-yellow-400/20 text-yellow-400 px-2 py-0.5 rounded">{gap.impact}</span>
                    </div>
                    <p className="text-sm text-gray-400">{gap.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-6">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                <TrendingUp size={18} className="text-green-400" /> AI Önerileri
              </h3>
              <ul className="space-y-2">
                {results.recommendations?.map((rec: string, i: number) => (
                  <li key={i} className="flex gap-3 text-sm text-gray-300">
                    <span className="text-green-400 font-bold">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
