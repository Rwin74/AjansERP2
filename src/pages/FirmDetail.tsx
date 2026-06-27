import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Hash, 
  Briefcase,
  FileText,
  MessageSquare,
  Lock,
  Copy,
  ExternalLink,
  Plus,
  Send,
  AtSign
} from 'lucide-react';
import { clsx } from 'clsx';

// Tabs configuration
const TABS = [
  { id: 'notes', label: 'Notlar', icon: MessageSquare },
  { id: 'jobs', label: 'Aktif İşler', icon: Briefcase },
  { id: 'passwords', label: 'Şifreler', icon: Lock },
  { id: 'files', label: 'Dosyalar', icon: FileText },
];

export function FirmDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('notes');

  // In a real app, fetch firm data based on `id`
  const firm = {
    id: 1, 
    name: 'Gölbaşı Yol Kurtarma', 
    sector: 'Otomotiv', 
    contact: 'Ahmet Yılmaz', 
    phone: '+90 532 123 4567', 
    email: 'info@golbasiyolkurtarma.com', 
    status: 'Aktif', 
    source: 'Google',
    address: 'Ankara, Gölbaşı Sanayi Sitesi',
    website: 'www.golbasiyolkurtarma.com',
    instagram: '@golbasikurtarma'
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/crm')}
            className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-text-muted hover:text-white transition-colors shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              {firm.name}
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                {firm.status}
              </span>
            </h1>
            <div className="text-sm text-text-muted mt-1 flex items-center gap-4">
              <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {firm.sector}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {firm.address}</span>
            </div>
          </div>
        </div>

        {/* Quick Interaction Buttons */}
        <div className="flex flex-wrap gap-2">
          <button className="btn-ghost bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white border border-green-500/20">
            <Phone className="w-4 h-4" /> WhatsApp
          </button>
          <button className="btn-ghost bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white border border-blue-500/20">
            <Mail className="w-4 h-4" /> E-Posta
          </button>
          <button className="btn-ghost border border-white/10">
            <MapPin className="w-4 h-4" /> Harita
          </button>
        </div>
      </div>

      {/* Firm Info Card */}
      <div className="glass-panel p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-1">
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Yetkili Kişi</p>
          <p className="text-white font-medium">{firm.contact}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Telefon</p>
          <p className="text-white font-medium flex items-center gap-2 group cursor-pointer">
            {firm.phone} <Copy className="w-3 h-3 text-text-muted group-hover:text-white opacity-0 group-hover:opacity-100 transition-all" />
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Web Sitesi</p>
          <p className="text-primary hover:underline cursor-pointer flex items-center gap-1">
            {firm.website} <ExternalLink className="w-3 h-3" />
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Sosyal Medya</p>
          <p className="text-white font-medium flex items-center gap-1">
             <Hash className="w-4 h-4 text-pink-500" /> {firm.instagram}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 overflow-x-auto pb-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              "px-4 py-2.5 text-sm font-medium transition-all rounded-t-lg flex items-center gap-2 border-b-2",
              activeTab === tab.id 
                ? "text-primary border-primary bg-primary/5" 
                : "text-text-muted border-transparent hover:text-white hover:bg-white/5"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="min-h-[400px]">
        
        {/* NOTES TAB */}
        {activeTab === 'notes' && (
          <div className="flex gap-6 h-[500px]">
            {/* Notes List */}
            <div className="flex-1 glass-panel flex flex-col overflow-hidden">
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-surface/50">
                <h3 className="font-semibold text-white">İletişim Geçmişi</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Example Note */}
                <div className="flex gap-4 group">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm shrink-0 border border-primary/30">
                    A
                  </div>
                  <div className="flex-1 bg-surface/50 rounded-2xl rounded-tl-none p-4 border border-white/5 relative">
                    <div className="flex items-center justify-between mb-2">
                       <span className="font-medium text-white text-sm">Atakan</span>
                       <span className="text-xs text-text-muted">10:00 - Bugün</span>
                    </div>
                    <p className="text-sm text-text-muted leading-relaxed">
                      Müşteri ile analiz toplantısı yapıldı. Rakip analizi istiyorlar. 
                      <span className="text-primary bg-primary/10 px-1 rounded ml-1 font-medium cursor-pointer hover:bg-primary/20 transition-colors">@Ortak</span> konuyu inceleyebilir misin?
                    </p>
                    <div className="mt-3 flex gap-2">
                       <span className="px-2 py-1 bg-red-500/10 text-red-500 border border-red-500/20 text-xs rounded">Acil</span>
                       <span className="px-2 py-1 bg-blue-500/10 text-blue-500 border border-blue-500/20 text-xs rounded">SEO</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Note Input */}
              <div className="p-4 border-t border-white/10 bg-surface/30">
                <div className="relative flex items-center">
                  <button className="absolute left-3 text-text-muted hover:text-primary transition-colors">
                    <AtSign className="w-5 h-5" />
                  </button>
                  <input 
                    type="text" 
                    placeholder="Hızlı not ekle (Etiketlemek için @ kullanın)..." 
                    className="w-full glass-input pl-10 pr-12 py-3 text-sm rounded-xl"
                  />
                  <button className="absolute right-2 w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-primary-hover transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Summary / Sidebar for Notes */}
            <div className="w-80 hidden lg:flex flex-col gap-4">
               <div className="glass-panel p-4">
                  <h4 className="text-sm font-semibold text-white mb-3">Müşteri Özeti</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex justify-between"><span className="text-text-muted">İlk Görüşme</span> <span className="text-white">10.05.2026</span></li>
                    <li className="flex justify-between"><span className="text-text-muted">Son Arama</span> <span className="text-white">Dün, 14:30</span></li>
                    <li className="flex justify-between"><span className="text-text-muted">Anlaşma Tutarı</span> <span className="text-green-400 font-medium">₺45.000</span></li>
                  </ul>
               </div>
            </div>
          </div>
        )}

        {/* PASSWORDS TAB (Placeholder) */}
        {activeTab === 'passwords' && (
          <div className="glass-panel p-6 text-center">
            <Lock className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-white mb-2">Şifre Kasası</h3>
            <p className="text-sm text-text-muted max-w-md mx-auto">Bu müşteriye ait tüm hosting, domain, sosyal medya şifreleri AES şifreleme ile burada güvenle saklanır.</p>
            <button className="btn-primary mx-auto mt-6">
              <Plus className="w-4 h-4" /> Şifre Ekle
            </button>
          </div>
        )}

        {/* Other tabs follow similar pattern... */}
        {(activeTab === 'jobs' || activeTab === 'files') && (
           <div className="glass-panel p-6 flex items-center justify-center h-64 border-dashed border-2 border-white/10">
             <span className="text-text-muted">Bu modül Faz 3 ve Faz 4'te eklenecektir.</span>
           </div>
        )}

      </div>
    </div>
  );
}
