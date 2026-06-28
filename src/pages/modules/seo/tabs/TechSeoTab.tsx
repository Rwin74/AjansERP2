import React, { useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, XCircle, FileSpreadsheet, X } from 'lucide-react';
import { ScreamingFrogParser } from '../../../../services/ScreamingFrogParser';

import { useClientStore } from '../../../../store/useClientStore';

export const TechSeoTab = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<any>(null);
  
  const { activeClientId, clients, updateClient } = useClientStore();
  const activeClient = clients.find(c => c.id === activeClientId);
  const dynamicMetrics = activeClient?.seoData?.techSeoMetrics || [];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsParsing(true);
    try {
      const result = await ScreamingFrogParser.parseCSV(file);
      const parsedIssues = result.dynamicIssues || [];
      
      if (activeClientId) {
        updateClient(activeClientId, {
          seoData: {
            ...activeClient?.seoData,
            techSeoMetrics: parsedIssues
          }
        });
      }
      
      alert('Screaming Frog raporu başarıyla içe aktarıldı ve analiz edildi.');
    } catch (error: any) {
      alert(`Hata: ${error.message}`);
    } finally {
      setIsParsing(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const defaultMetricsList = [
    { id: '404', name: '404 Hataları', value: 0, status: 'success' },
    { id: '301', name: '301 Yönlendirmeleri', value: 0, status: 'success' },
    { id: 'title', name: 'Eksik Title', value: 0, status: 'success' },
    { id: 'desc', name: 'Eksik Description', value: 0, status: 'success' },
    { id: 'h1', name: 'Eksik/Çift H1', value: 0, status: 'success' },
    { id: 'canonical', name: 'Canonical Sorunları', value: 0, status: 'success' },
    { id: 'broken', name: 'Kırık Linkler (Dış)', value: 0, status: 'success' },
    { id: 'largeImg', name: 'Büyük Görseller', value: 0, status: 'success' },
    { id: 'schema', name: 'Schema Markup', value: '-', status: 'warning', description: '', howToFix: '' },
    { id: 'robots', name: 'Robots.txt', value: '-', status: 'warning', description: '', howToFix: '' },
  ];

  const techMetricsList = dynamicMetrics.length > 0 ? dynamicMetrics : defaultMetricsList;

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Teknik SEO Analizi</h2>
          <p className="text-sm text-gray-400">Screaming Frog entegrasyonu ile otomatik güncellenen veriler. Detaylar için kartlara tıklayın.</p>
        </div>
        
        <div className="flex gap-3">
          <input 
            type="file" 
            accept=".csv" 
            ref={fileInputRef} 
            onChange={handleFileUpload}
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isParsing}
            className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(22,163,74,0.3)] disabled:opacity-50"
          >
            {isParsing ? <AlertCircle className="animate-spin" size={18} /> : <FileSpreadsheet size={18} />}
            {isParsing ? 'Okunuyor...' : 'Excel / CSV Yükle'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {techMetricsList.map((metric: any) => (
          <div 
            key={metric.id} 
            onClick={() => {
              if (metric.value !== 0 && metric.value !== '-') setSelectedMetric(metric);
            }}
            className={`bg-[#111113] border border-white/5 p-5 rounded-2xl flex flex-col justify-between group transition-all shadow-lg ${
              metric.value !== 0 && metric.value !== '-' ? 'cursor-pointer hover:border-white/20 hover:-translate-y-1' : 'opacity-70'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-xl ${
                metric.status === 'success' ? 'bg-green-500/10 text-green-500' :
                metric.status === 'error' ? 'bg-red-500/10 text-red-500' :
                'bg-yellow-500/10 text-yellow-500'
              }`}>
                {metric.status === 'success' ? <CheckCircle2 size={20} /> :
                 metric.status === 'error' ? <XCircle size={20} /> :
                 <AlertCircle size={20} />}
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
              <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">{metric.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedMetric && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#111113] border border-white/10 rounded-2xl p-8 max-w-2xl w-full shadow-2xl relative">
            <button 
              onClick={() => setSelectedMetric(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2 rounded-xl ${
                selectedMetric.status === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'
              }`}>
                {selectedMetric.status === 'error' ? <XCircle size={24} /> : <AlertCircle size={24} />}
              </div>
              <h3 className="text-2xl font-bold text-white">{selectedMetric.name}</h3>
              <span className="ml-auto text-3xl font-black text-white">{selectedMetric.value}</span>
            </div>

            <div className="space-y-6">
              {selectedMetric.description ? (
                <div>
                  <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">Sorun Nedir? (Description)</h4>
                  <p className="text-gray-300 text-sm leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">{selectedMetric.description}</p>
                </div>
              ) : (
                <p className="text-gray-400 text-sm italic">Detaylı açıklama bulunamadı.</p>
              )}
              
              {selectedMetric.howToFix && (
                <div>
                  <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wider mb-2">Nasıl Çözülür? (How To Fix)</h4>
                  <p className="text-gray-300 text-sm leading-relaxed bg-green-500/5 p-4 rounded-xl border border-green-500/10">{selectedMetric.howToFix}</p>
                </div>
              )}

              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 mt-6">
                <p className="text-orange-400 text-sm flex items-start gap-2">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>
                    <strong>Hangi URL'ler etkilendi?</strong>
                    <br/>
                    "Issues Overview" (Genel Bakış) CSV raporunda spesifik URL listeleri bulunmaz. Sorunlu linkleri listelemek için Screaming Frog içerisinden o spesifik hatanın dışa aktarımını yapmalısınız.
                  </span>
                </p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => setSelectedMetric(null)}
                className="bg-white/10 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="glass-panel p-6 mt-8">
        <h3 className="text-lg font-semibold mb-4">Core Web Vitals</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'LCP (Largest Contentful Paint)', value: '-', status: 'Veri Yok', color: 'gray' },
            { name: 'FID (First Input Delay)', value: '-', status: 'Veri Yok', color: 'gray' },
            { name: 'CLS (Cumulative Layout Shift)', value: '-', status: 'Veri Yok', color: 'gray' },
          ].map((cwv, i) => (
            <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-4">
              <p className="text-sm text-gray-400 mb-2">{cwv.name}</p>
              <div className="flex justify-between items-end">
                <span className="text-2xl font-bold">{cwv.value}</span>
                <span className={`badge bg-${cwv.color}-500/10 text-${cwv.color}-500`}>{cwv.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
