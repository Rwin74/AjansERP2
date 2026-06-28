import React, { useState } from 'react';
import { ArrowRight, Building, Globe, Server, Cloud, MonitorDot, UploadCloud, GitBranch, Box, Search, BarChart2, Target, MapPin, Tag, Share2, Mail, Key, ChevronDown, ChevronUp, Save, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useClientStore } from '../../../store/useClientStore';
import { useNavigate } from 'react-router-dom';

// --- Data Types & State ---

type FormState = { [key: string]: string };
type ManualStatus = 'bekliyor' | 'yok' | 'yapildi';

const CATEGORIES = [
  { id: 'firma', title: 'Firma Bilgileri', icon: <Building size={18} />, fields: ['Firma Adı', 'Yetkili', 'Telefon', 'WhatsApp', 'E-Posta', 'Adres', 'Vergi No', 'Vergi Dairesi', 'Sektör', 'Notlar'] },
  { id: 'domain', title: 'Domain', icon: <Globe size={18} />, fields: ['Domain', 'Registrar', 'Domain Bitiş Tarihi', 'DNS Sağlayıcısı', 'Nameserver', 'Whois Gizli mi', 'Domain Hesabı Maili', 'Kullanıcı Adı', 'Şifre', 'API Key', 'Notlar'] },
  { id: 'hosting', title: 'Hosting', icon: <Server size={18} />, fields: ['Hosting Firması', 'Paket', 'IP', 'Disk', 'RAM', 'cPanel Linki', 'SSH', 'FTP', 'Hosting Hesabı Maili', 'Kullanıcı', 'Şifre', 'Hosting Bitiş Tarihi', 'Notlar'] },
  { id: 'cloudflare', title: 'Cloudflare', icon: <Cloud size={18} />, fields: ['Hesap Maili', 'Zone', 'API Token', 'SSL Durumu', 'Proxy Durumu', 'Notlar'] },
  { id: 'wordpress', title: 'WordPress', icon: <MonitorDot size={18} />, fields: ['Admin URL', 'Kullanıcı', 'Şifre', 'Tema', 'Builder', 'Lisanslar', 'Notlar'] },
  { id: 'ftp', title: 'FTP', icon: <UploadCloud size={18} />, fields: ['Host', 'Port', 'Kullanıcı', 'Şifre'] },
  { id: 'github', title: 'Github', icon: <GitBranch size={18} />, fields: ['Repository', 'Owner', 'Branch', 'Deploy'] },
  { id: 'vercel', title: 'Vercel', icon: <Box size={18} />, fields: ['Team', 'Project', 'Production URL', 'Mail'] },
  { id: 'gsc', title: 'Search Console', icon: <Search size={18} />, fields: ['Property', 'Mail', 'Doğrulandı mı', 'API Bağlandı mı'] },
  { id: 'analytics', title: 'Google Analytics', icon: <BarChart2 size={18} />, fields: ['Property ID', 'Mail', 'API Bağlandı mı'] },
  { id: 'ads', title: 'Google Ads', icon: <Target size={18} />, fields: ['Customer ID', 'Manager Account', 'Mail', 'Conversion Kurulu mu', 'Tag Kurulu mu', 'Günlük Bütçe'] },
  { id: 'gmb', title: 'Google Business Profile', icon: <MapPin size={18} />, fields: ['Profil Adı', 'Mail', 'Telefon', 'Doğrulandı mı', 'Yönetici Sayısı'] },
  { id: 'gtm', title: 'Google Tag Manager', icon: <Tag size={18} />, fields: ['Container ID', 'Mail', 'Kurulu mu'] },
  { id: 'meta', title: 'Meta Business', icon: <Share2 size={18} />, fields: ['Business Manager', 'Pixel ID', 'Facebook', 'Instagram'] },
  { id: 'mail', title: 'Kurumsal Mail', icon: <Mail size={18} />, fields: ['Mail Sağlayıcısı', 'SMTP', 'IMAP', 'POP3', 'Mail Kullanıcıları'] },
  { id: 'licenses', title: 'Lisanslar', icon: <Key size={18} />, fields: ['Elementor', 'RankMath', 'LiteSpeed', 'WP Rocket', 'Diğer Lisanslar'] },
];

export const SeoPrepDashboard: React.FC = () => {
  const { addClient, setActiveClient } = useClientStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Record<string, FormState>>({});
  const [manualStatuses, setManualStatuses] = useState<Record<string, ManualStatus>>({});
  const [expandedId, setExpandedId] = useState<string | null>(CATEGORIES[0].id);

  const getCategoryStatus = (catId: string) => {
    return manualStatuses[catId] || 'bekliyor';
  };

  const updateField = (catId: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [catId]: {
        ...(prev[catId] || {}),
        [field]: value
      }
    }));
  };

  const setManualStatus = (e: React.MouseEvent, catId: string, status: ManualStatus) => {
    e.stopPropagation();
    setManualStatuses(prev => ({ ...prev, [catId]: status }));
  };

  // Derived state
  const completedCount = CATEGORIES.filter(c => {
    const s = getCategoryStatus(c.id);
    return s === 'yok' || s === 'yapildi';
  }).length;
  
  const progressPercent = Math.round((completedCount / CATEGORIES.length) * 100);
  const isReady = progressPercent === 100;
  
  const companyName = formData['firma']?.['Firma Adı'] || 'Yeni Müşteri';

  const getStatusColorClass = (status: ManualStatus) => {
    if (status === 'yapildi') return 'border-green-500/30 bg-green-500/5';
    if (status === 'yok') return 'border-gray-500/30 bg-gray-500/5';
    return 'border-white/5 hover:border-white/10 bg-white/[0.02]';
  };

  return (
    <div className="flex-1 w-full h-full overflow-y-auto bg-[#000000] text-white">
      <div className="max-w-5xl mx-auto py-12 px-6">
        
        {/* Header Section */}
        <div className="glass-panel p-8 mb-8 sticky top-0 z-30 shadow-2xl backdrop-blur-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-400 font-medium mb-1 uppercase tracking-wider">SEO Onboarding</p>
              <h1 className="text-4xl font-bold tracking-tight mb-4 text-gradient">{companyName}</h1>
              
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Hazırlık Durumu</p>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold">{progressPercent}%</span>
                  </div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div>
                  <p className="text-xs text-gray-500 mb-1">Tamamlanan</p>
                  <div className="flex items-end gap-2 text-xl">
                    <span className="font-semibold text-white">{completedCount}</span>
                    <span className="text-gray-500">/ {CATEGORIES.length}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <button 
              disabled={!isReady}
              onClick={() => {
                const newClient = {
                  id: crypto.randomUUID(),
                  name: companyName,
                  createdAt: new Date().toISOString(),
                  healthScores: { seo: 0, google: 0, teknik: 0, icerik: 0, guvenlik: 0, performans: 0, business: 0, toplam: 0 },
                  timelineEvents: [],
                  aiTasks: [],
                  prepData: formData,
                };
                addClient(newClient);
                setActiveClient(newClient.id);
                navigate('/seo');
              }}
              className={`px-8 py-4 rounded-xl font-medium flex items-center gap-3 transition-all duration-300 ${
                isReady 
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] text-white scale-105' 
                  : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'
              }`}
            >
              SEO'ya Aktar
              <ArrowRight size={20} />
            </button>
          </div>
          
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mt-6 relative z-10">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Categories List */}
        <div className="space-y-4 pb-20">
          {CATEGORIES.map((cat, index) => {
            const status = getCategoryStatus(cat.id);
            const isExpanded = expandedId === cat.id;

            return (
              <div 
                key={cat.id} 
                className={`glass-panel overflow-hidden transition-all duration-300 border ${getStatusColorClass(status)}`}
              >
                {/* Card Header (Clickable) */}
                <div 
                  className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between cursor-pointer gap-4"
                  onClick={() => setExpandedId(isExpanded ? null : cat.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-black/40 flex items-center justify-center border border-white/5 shadow-inner">
                      {cat.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-white flex items-center gap-2">
                        {index + 1}. {cat.title}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1">
                        Zorunlu alan yok. Formu doldurabilir veya durumu yandaki butonlardan seçebilirsiniz.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
                    {/* Manual Status Overrides */}
                    <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-lg border border-white/5">
                      <button 
                        onClick={(e) => setManualStatus(e, cat.id, 'bekliyor')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${status === 'bekliyor' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                      >
                        Bekliyor
                      </button>
                      <button 
                        onClick={(e) => setManualStatus(e, cat.id, 'yok')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${status === 'yok' ? 'bg-gray-600/50 text-gray-200 shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                      >
                        Yok
                      </button>
                      <button 
                        onClick={(e) => setManualStatus(e, cat.id, 'yapildi')}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1 ${status === 'yapildi' ? 'bg-green-500/20 text-green-400 shadow-sm' : 'text-gray-500 hover:text-green-400'}`}
                      >
                        <Check size={14} />
                        Yapıldı
                      </button>
                    </div>

                    <div className="text-gray-500 bg-black/40 p-2 rounded-lg ml-auto md:ml-2 border border-white/5">
                      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                </div>

                {/* Expanded Form Area */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t border-white/5 bg-black/20"
                    >
                      <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {cat.fields.map((field) => {
                            const isSelect = field.includes('Durum') || field.includes('mı');
                            const isTextarea = field.includes('Notlar') || field.includes('Sektör');
                            const val = formData[cat.id]?.[field] || '';

                            return (
                              <div key={field} className={isTextarea ? 'md:col-span-2 lg:col-span-3' : ''}>
                                <label className="block text-xs font-medium text-gray-400 mb-2">
                                  {field}
                                </label>
                                
                                {isSelect ? (
                                  <select 
                                    className="glass-input w-full text-sm py-2.5"
                                    value={val}
                                    onChange={(e) => updateField(cat.id, field, e.target.value)}
                                  >
                                    <option value="">Seçiniz...</option>
                                    <option value="Evet">Evet</option>
                                    <option value="Hayır">Hayır</option>
                                    <option value="Beklemede">Beklemede</option>
                                  </select>
                                ) : isTextarea ? (
                                  <textarea 
                                    className="glass-input w-full text-sm py-2.5 min-h-[80px]"
                                    placeholder={`${field} giriniz... (İsteğe bağlı)`}
                                    value={val}
                                    onChange={(e) => updateField(cat.id, field, e.target.value)}
                                  />
                                ) : (
                                  <input 
                                    type={field.includes('Şifre') ? 'password' : 'text'}
                                    className="glass-input w-full text-sm py-2.5"
                                    placeholder={`${field} giriniz... (İsteğe bağlı)`}
                                    value={val}
                                    onChange={(e) => updateField(cat.id, field, e.target.value)}
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>
                        
                        <div className="mt-8 flex justify-end">
                          <button 
                            className="btn-primary"
                            onClick={(e) => {
                              // Mark as Yapildi automatically when clicking save and continue
                              setManualStatus(e as any, cat.id, 'yapildi');
                              
                              const nextIdx = CATEGORIES.findIndex(c => c.id === cat.id) + 1;
                              if (nextIdx < CATEGORIES.length) {
                                setExpandedId(CATEGORIES[nextIdx].id);
                              } else {
                                setExpandedId(null);
                              }
                            }}
                          >
                            <Save size={16} />
                            Kaydet ve Devam Et
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
