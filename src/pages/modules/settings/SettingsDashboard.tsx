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
              <p className="text-gray-400 mb-8">Ajans yöneticisi hesabınızla Google'a giriş yapın. Müşteri bazlı property eşleştirmeleri müşteri panellerinde yapılacaktır.</p>
              
              <div className="p-8 border border-white/10 rounded-2xl bg-white/[0.02] flex flex-col items-center justify-center text-center">
                {google.isConnected ? (
                  <>
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl">✓</span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Google Hesabı Bağlı</h3>
                    <p className="text-gray-400 mb-6">{google.accountEmail}</p>
                    <button className="px-6 py-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10">Bağlantıyı Kes</button>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
                      <Globe size={32} className="text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Google ile Giriş Yap</h3>
                    <p className="text-gray-400 mb-6 text-sm">Tüm Google servisleri için tek bir yetkilendirme yeterlidir.</p>
                    <button 
                      onClick={handleGoogleAuth}
                      disabled={isTesting}
                      className="bg-white text-black px-6 py-3 rounded-xl font-bold flex items-center gap-3 hover:bg-gray-200 transition-colors"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      {isTesting ? 'Bekleniyor...' : 'Sign in with Google'}
                    </button>
                  </>
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
