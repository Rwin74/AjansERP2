import React from 'react';
import { useClientStore } from '../../../../store/useClientStore';
import { Building, Globe, Server, Cloud, MonitorDot, UploadCloud, GitBranch, Box, Search, BarChart2, Target, MapPin, Tag, Share2, Mail, Key, ShieldCheck } from 'lucide-react';

export const ProfileTab = () => {
  const { clients, activeClientId } = useClientStore();
  const activeClient = clients.find(c => c.id === activeClientId);

  if (!activeClient) return null;

  const data = activeClient.prepData || {};

  const getCategoryIcon = (key: string) => {
    switch (key) {
      case 'firma': return <Building size={18} className="text-blue-400" />;
      case 'domain': return <Globe size={18} className="text-emerald-400" />;
      case 'hosting': return <Server size={18} className="text-purple-400" />;
      case 'cloudflare': return <Cloud size={18} className="text-orange-400" />;
      case 'wordpress': return <MonitorDot size={18} className="text-blue-500" />;
      case 'ftp': return <UploadCloud size={18} className="text-gray-400" />;
      case 'github': return <GitBranch size={18} className="text-white" />;
      case 'vercel': return <Box size={18} className="text-white" />;
      case 'gsc': return <Search size={18} className="text-blue-300" />;
      case 'analytics': return <BarChart2 size={18} className="text-yellow-400" />;
      case 'ads': return <Target size={18} className="text-red-400" />;
      case 'gmb': return <MapPin size={18} className="text-red-500" />;
      case 'gtm': return <Tag size={18} className="text-blue-400" />;
      case 'meta': return <Share2 size={18} className="text-blue-600" />;
      case 'mail': return <Mail size={18} className="text-gray-300" />;
      case 'licenses': return <Key size={18} className="text-yellow-500" />;
      default: return <ShieldCheck size={18} className="text-gray-400" />;
    }
  };

  const getCategoryTitle = (key: string) => {
    const titles: Record<string, string> = {
      firma: 'Firma Bilgileri', domain: 'Domain', hosting: 'Hosting', cloudflare: 'Cloudflare',
      wordpress: 'WordPress', ftp: 'FTP', github: 'Github', vercel: 'Vercel',
      gsc: 'Search Console', analytics: 'Google Analytics', ads: 'Google Ads',
      gmb: 'Google Business Profile', gtm: 'Google Tag Manager', meta: 'Meta Business',
      mail: 'Kurumsal Mail', licenses: 'Lisanslar'
    };
    return titles[key] || key.toUpperCase();
  };

  const categoriesWithData = Object.entries(data).filter(([_, fields]) => {
    // Only show category if at least one field is filled
    return Object.values(fields as Record<string, string>).some(val => val.trim() !== '');
  });

  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1 text-white">{activeClient.name} - Müşteri Dosyası</h2>
          <p className="text-sm text-gray-400">Kurulum sırasında girilen tüm veriler, erişim bilgileri ve şifreler.</p>
        </div>
      </div>

      {categoriesWithData.length === 0 ? (
        <div className="glass-panel p-12 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <Building size={24} className="text-gray-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">Veri Bulunamadı</h3>
          <p className="text-gray-400 max-w-md">
            Bu müşteri için kaydedilmiş herhangi bir kurulum (SEO Hazırlık) verisi bulunmuyor. Yeni bilgiler eklendiğinde burada görünecektir.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {categoriesWithData.map(([categoryKey, fields]) => (
            <div key={categoryKey} className="glass-panel p-6 hover:border-white/10 transition-colors">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-3 border-b border-white/5 pb-3">
                <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center border border-white/5">
                  {getCategoryIcon(categoryKey)}
                </div>
                {getCategoryTitle(categoryKey)}
              </h3>
              <div className="space-y-3">
                {Object.entries(fields as Record<string, string>).map(([fieldName, value]) => {
                  if (!value || value.trim() === '') return null;
                  
                  const isPassword = fieldName.toLowerCase().includes('şifre') || fieldName.toLowerCase().includes('token') || fieldName.toLowerCase().includes('api');
                  
                  return (
                    <div key={fieldName} className="bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                      <p className="text-xs text-gray-500 mb-1">{fieldName}</p>
                      <p className={`text-sm font-medium ${isPassword ? 'font-mono text-yellow-400 tracking-wider' : 'text-gray-200'} break-words`}>
                        {value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
