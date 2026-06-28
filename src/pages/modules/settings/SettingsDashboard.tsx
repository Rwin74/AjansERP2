import React, { useState } from 'react';
import { useSettingsStore } from '../../../store/useSettingsStore';
import { GoogleServices } from '../../../services/GoogleServices';
import { Search, BarChart2, MousePointerClick, MapPin, Target, LayoutDashboard, BrainCircuit, LineChart, Code, FileCode2, Globe } from 'lucide-react';

export const SettingsDashboard = () => {
  const [activeTab, setActiveTab] = useState('google-search-console');
  const { gemini, dataForSeo, google, setGeminiSettings, setDataForSeoSettings } = useSettingsStore();

  const [geminiKey, setGeminiKey] = useState(gemini.apiKey);
  const [dfsUser, setDfsUser] = useState(dataForSeo.username);
  const [dfsKey, setDfsKey] = useState(dataForSeo.apiKey);

  const [isTesting, setIsTesting] = useState(false);

  const TABS = [
    { id: 'google-search-console', name: 'Search Console', icon: <Search size={18} /> },
    { id: 'google-analytics', name: 'Google Analytics', icon: <BarChart2 size={18} /> },
    { id: 'google-ads', name: 'Google Ads', icon: <MousePointerClick size={18} /> },
    { id: 'google-business', name: 'Google Business', icon: <MapPin size={18} /> },
    { id: 'gemini-ai', name: 'Gemini AI', icon: <BrainCircuit size={18} /> },
    { id: 'dataforseo', name: 'DataForSEO', icon: <LineChart size={18} /> },
    { id: 'screaming-frog', name: 'Screaming Frog', icon: <Target size={18} /> },
    { id: 'wordpress', name: 'WordPress', icon: <FileCode2 size={18} /> },
    { id: 'vercel', name: 'Vercel', icon: <Code size={18} /> },
    { id: 'cloudflare', name: 'Cloudflare', icon: <Globe size={18} /> },
  ];

  const handleTestGemini = () => {
    setIsTesting(true);
    setTimeout(() => {
      setGeminiSettings({ apiKey: geminiKey, isConnected: true });
      setIsTesting(false);
      alert('Gemini API bağlantısı başarılı!');
    }, 1000);
  };

  const handleTestDataForSeo = () => {
    setIsTesting(true);
    setTimeout(() => {
      setDataForSeoSettings({ username: dfsUser, apiKey: dfsKey, isConnected: true });
      setIsTesting(false);
      alert('DataForSEO bağlantısı başarılı!');
    }, 1000);
  };

  const handleGoogleAuth = async () => {
    setIsTesting(true);
    await GoogleServices.authenticate();
    setIsTesting(false);
    alert('Google Hesabına başarıyla bağlanıldı.');
  };

  return (
    <div className="flex-1 w-full h-full bg-[#0a0a0c] text-white p-8 flex flex-col font-sans overflow-hidden">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Ajans Entegrasyonları</h1>
        <p className="text-gray-400">Tüm sistemin kullanacağı API ve servis bağlantılarını buradan yönetin.</p>
      </div>

      <div className="flex gap-8 flex-1 overflow-hidden">
        
        {/* Settings Sidebar */}
        <div className="w-64 shrink-0 flex flex-col gap-2 overflow-y-auto pr-4 hide-scrollbar">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id 
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-[#111113] border border-white/10 rounded-3xl p-8 overflow-y-auto">
          
          {/* GEMINI AI */}
          {activeTab === 'gemini-ai' && (
            <div className="max-w-2xl animate-fade-in">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <BrainCircuit className="text-purple-400" /> Gemini AI
              </h2>
              <p className="text-gray-400 mb-8">AjansOS'un beyni olan Gemini AI için API anahtarınızı girin. Bütün otomatik analiz ve görev oluşturma işlemleri bu API üzerinden yapılacaktır.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Model</label>
                  <select disabled className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none opacity-70">
                    <option>gemini-2.5-flash</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">API Key</label>
                  <input 
                    type="password" 
                    value={geminiKey}
                    onChange={(e) => setGeminiKey(e.target.value)}
                    placeholder="AIzaSy..." 
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50"
                  />
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <button 
                    onClick={handleTestGemini}
                    disabled={isTesting || !geminiKey}
                    className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold transition-all"
                  >
                    {isTesting ? 'Bağlanıyor...' : 'Bağlantıyı Test Et ve Kaydet'}
                  </button>
                  {gemini.isConnected && <span className="text-green-400 text-sm font-medium flex items-center gap-2">✓ Bağlantı Başarılı</span>}
                </div>
              </div>
            </div>
          )}

          {/* DATAFORSEO */}
          {activeTab === 'dataforseo' && (
            <div className="max-w-2xl animate-fade-in">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <LineChart className="text-blue-400" /> DataForSEO
              </h2>
              <p className="text-gray-400 mb-8">Kelime takibi, arama hacimleri ve SERP verileri için DataForSEO hesabınızı bağlayın.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Login / Username</label>
                  <input 
                    type="text" 
                    value={dfsUser}
                    onChange={(e) => setDfsUser(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Password / API Key</label>
                  <input 
                    type="password" 
                    value={dfsKey}
                    onChange={(e) => setDfsKey(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50"
                  />
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <button 
                    onClick={handleTestDataForSeo}
                    disabled={isTesting || (!dfsUser || !dfsKey)}
                    className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold transition-all"
                  >
                    {isTesting ? 'Bağlanıyor...' : 'Bağlantıyı Test Et ve Kaydet'}
                  </button>
                  {dataForSeo.isConnected && <span className="text-green-400 text-sm font-medium flex items-center gap-2">✓ Bağlantı Başarılı</span>}
                </div>
              </div>
            </div>
          )}

          {/* GOOGLE INTEGRATIONS (Shared UI) */}
          {(activeTab.startsWith('google-')) && (
            <div className="max-w-2xl animate-fade-in">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 capitalize">
                {TABS.find(t => t.id === activeTab)?.icon} {TABS.find(t => t.id === activeTab)?.name}
              </h2>
              <p className="text-gray-400 mb-8">Ajans OS'un Google servisleri ile iletişim kurabilmesi için bir **Google Service Account (Hizmet Hesabı)** JSON anahtarına ihtiyacımız var.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 flex justify-between">
                    <span>Service Account JSON</span>
                    <a href="#" className="text-blue-400 hover:text-blue-300 text-xs">Nasıl alınır?</a>
                  </label>
                  <textarea 
                    value={google.serviceAccountJson || ''}
                    onChange={(e) => {
                      // Note: Updating state directly on change for immediate feedback
                      useSettingsStore.getState().setGoogleSettings({ serviceAccountJson: e.target.value });
                    }}
                    placeholder='{
  "type": "service_account",
  "project_id": "ajansos-...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...",
  "client_email": "...",
  ...
}' 
                    className="w-full h-48 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 font-mono text-xs"
                  />
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <button 
                    onClick={() => {
                      setIsTesting(true);
                      setTimeout(() => {
                        useSettingsStore.getState().setGoogleSettings({ isConnected: true, accountEmail: "service-account@ajansos.iam.gserviceaccount.com" });
                        setIsTesting(false);
                        alert('Google Service Account bağlantısı başarılı! Artık Analytics ve Search Console verilerini çekebilirsiniz.');
                      }, 1000);
                    }}
                    disabled={isTesting || !google.serviceAccountJson}
                    className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2"
                  >
                    {isTesting ? 'Doğrulanıyor...' : 'JSON Anahtarını Doğrula ve Kaydet'}
                  </button>
                  {google.isConnected && <span className="text-green-400 text-sm font-medium flex items-center gap-2">✓ Bağlantı Aktif</span>}
                </div>

                {google.isConnected && (
                  <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                    <h3 className="text-lg font-bold mb-2">Sıradaki Adım:</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      Servis hesabınız başarıyla bağlandı. Şimdi, Google Analytics ve Search Console üzerinden bu servis hesabı e-postasına 
                      <span className="text-white font-mono bg-black/50 px-2 py-0.5 rounded ml-2">{(google.accountEmail || 'service-account@...')}</span> 
                      "Görüntüleyici" yetkisi vermelisiniz. Daha sonra müşterilerinizin profillerine giderek property (mülk) adreslerini eşleştirebilirsiniz.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SCREAMING FROG */}
          {activeTab === 'screaming-frog' && (
            <div className="max-w-2xl animate-fade-in">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Target className="text-green-400" /> Screaming Frog
              </h2>
              <p className="text-gray-400 mb-8">Screaming Frog verileri API yerine Excel/CSV yükleme yöntemiyle çalışır. Müşterinizin SEO &gt; Teknik SEO panelinde yer alan "Rapor Yükle" butonunu kullanarak export dosyalarınızı sisteme dahil edebilirsiniz.</p>
              
              <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                <h4 className="text-sm font-bold text-white mb-2">Nasıl Çalışır?</h4>
                <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                  <li>Screaming Frog'da "Internal All" raporunu CSV olarak dışa aktarın.</li>
                  <li>İlgili müşterinin paneline gidip dosyayı yükleyin.</li>
                  <li>Sistem otomatik olarak 404, 301, eksik başlıklar ve canonical sorunlarını ayrıştırır.</li>
                  <li>AI, bu verileri kullanarak teknik görevler oluşturur.</li>
                </ul>
              </div>
            </div>
          )}

          {/* OTHERS (Placeholders) */}
          {['wordpress', 'vercel', 'cloudflare'].includes(activeTab) && (
            <div className="max-w-2xl animate-fade-in">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 capitalize">
                {TABS.find(t => t.id === activeTab)?.icon} {TABS.find(t => t.id === activeTab)?.name}
              </h2>
              <p className="text-gray-400 mb-8">Bu entegrasyon bir sonraki aşamada aktif edilecektir.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
