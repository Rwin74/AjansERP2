import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Hash, 
  Briefcase,
  Lock,
  Copy,
  ExternalLink,
  Server,
  Link as LinkIcon
} from 'lucide-react';
import { clsx } from 'clsx';
import { useStore } from '../store';

// Tabs configuration
const TABS = [
  { id: 'jobs', label: 'Aktif İşler', icon: Briefcase },
  { id: 'domains', label: 'Domainler', icon: LinkIcon },
  { id: 'hostings', label: 'Sunucular', icon: Server },
  { id: 'passwords', label: 'Şifreler', icon: Lock },
];

export function FirmDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('jobs');
  
  const { firms, jobs, domains, hostings, fetchFirms, fetchJobs, fetchDomains, fetchHostings, fetchVaultItems } = useStore();

  useEffect(() => {
    fetchFirms();
    fetchJobs();
    fetchDomains();
    fetchHostings();
    fetchVaultItems();
  }, [fetchFirms, fetchJobs, fetchDomains, fetchHostings, fetchVaultItems]);

  const firm = firms.find(f => f.id === id);

  if (!firm) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-xl font-bold text-white mb-2">Müşteri Bulunamadı</h2>
        <p className="text-text-muted mb-4">Bu müşteri silinmiş veya geçersiz bir bağlantı kullandınız.</p>
        <button onClick={() => navigate('/crm')} className="btn-primary">CRM'e Dön</button>
      </div>
    );
  }

  const firmJobs = jobs.filter(j => j.firm_id === id);
  const firmDomains = domains.filter(d => d.firm_id === id);
  const firmHostings = hostings.filter(h => h.firm_id === id);
  
  const copyToClipboard = (text: string) => {
    if(text) navigator.clipboard.writeText(text);
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
                {firm.status || 'Aktif'}
              </span>
            </h1>
            <div className="text-sm text-text-muted mt-1 flex items-center gap-4">
              <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {firm.sector || 'Belirtilmedi'}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {firm.address || 'Belirtilmedi'}</span>
            </div>
          </div>
        </div>

        {/* Quick Interaction Buttons */}
        <div className="flex flex-wrap gap-2">
          {firm.phone && (
            <button onClick={() => window.open(`https://wa.me/${firm.phone.replace(/[^0-9]/g, '')}`, '_blank')} className="btn-ghost bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white border border-green-500/20">
              <Phone className="w-4 h-4" /> WhatsApp
            </button>
          )}
          {firm.email && (
            <button onClick={() => window.location.href = `mailto:${firm.email}`} className="btn-ghost bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white border border-blue-500/20">
              <Mail className="w-4 h-4" /> E-Posta
            </button>
          )}
        </div>
      </div>

      {/* Firm Info Card */}
      <div className="glass-panel p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-1">
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Yetkili Kişi</p>
          <p className="text-white font-medium">{firm.contact || '-'}</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Telefon</p>
          <p className="text-white font-medium flex items-center gap-2 group cursor-pointer" onClick={() => copyToClipboard(firm.phone)}>
            {firm.phone || '-'} {firm.phone && <Copy className="w-3 h-3 text-text-muted group-hover:text-white opacity-0 group-hover:opacity-100 transition-all" />}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Web Sitesi</p>
          <p className="text-primary hover:underline cursor-pointer flex items-center gap-1" onClick={() => firm.website && window.open(firm.website.startsWith('http') ? firm.website : `https://${firm.website}`, '_blank')}>
            {firm.website || '-'} {firm.website && <ExternalLink className="w-3 h-3" />}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-text-muted uppercase tracking-wider font-semibold">Sosyal Medya</p>
          <p className="text-white font-medium flex items-center gap-1">
             <Hash className="w-4 h-4 text-pink-500" /> {firm.instagram || '-'}
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
              "px-4 py-2.5 text-sm font-medium transition-all rounded-t-lg flex items-center gap-2 border-b-2 whitespace-nowrap",
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
        
        {/* JOBS TAB */}
        {activeTab === 'jobs' && (
          <div className="glass-panel p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-white">Bu Müşteriye Ait İşler</h3>
              <button onClick={() => navigate('/jobs')} className="btn-primary py-1.5 px-3 text-sm">Panoya Git</button>
            </div>
            {firmJobs.length === 0 ? (
              <p className="text-text-muted text-sm text-center py-8">Bu müşteriye ait kayıtlı iş bulunmuyor.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {firmJobs.map(job => (
                  <div key={job.id} className="bg-surface/50 border border-white/5 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-medium text-sm">{job.title}</h4>
                      <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-text-muted">{job.priority}</span>
                    </div>
                    <p className="text-xs text-text-muted mb-3 line-clamp-2">{job.description}</p>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-primary">{job.column_id === 'new' ? 'Yeni İş' : job.column_id === 'ongoing' ? 'Devam Ediyor' : job.column_id === 'review' ? 'İncelemede' : 'Tamamlandı'}</span>
                      <span className="text-text-muted">{job.due_date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* DOMAINS TAB */}
        {activeTab === 'domains' && (
          <div className="glass-panel p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-white">Bu Müşteriye Ait Domainler</h3>
              <button onClick={() => navigate('/domains')} className="btn-primary py-1.5 px-3 text-sm">Domain Paneline Git</button>
            </div>
            {firmDomains.length === 0 ? (
              <p className="text-text-muted text-sm text-center py-8">Bu müşteriye ait kayıtlı domain bulunmuyor.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {firmDomains.map(d => (
                  <div key={d.id} className="bg-surface/50 border border-white/5 rounded-xl p-4 flex justify-between items-center">
                    <div>
                      <h4 className="text-white font-medium">{d.name}</h4>
                      <p className="text-xs text-text-muted mt-1">{d.registrar} • Bitiş: {d.expiry_date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* HOSTINGS TAB */}
        {activeTab === 'hostings' && (
          <div className="glass-panel p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-white">Bu Müşteriye Ait Sunucular/Hostingler</h3>
              <button onClick={() => navigate('/hosting')} className="btn-primary py-1.5 px-3 text-sm">Hosting Paneline Git</button>
            </div>
            {firmHostings.length === 0 ? (
              <p className="text-text-muted text-sm text-center py-8">Bu müşteriye ait kayıtlı sunucu bulunmuyor.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {firmHostings.map(h => (
                  <div key={h.id} className="bg-surface/50 border border-white/5 rounded-xl p-4">
                    <h4 className="text-white font-medium mb-1">{h.name}</h4>
                    <p className="text-xs text-text-muted">{h.provider} • IP: {h.ip}</p>
                    <div className="mt-3 text-xs flex gap-2">
                      <span className="px-2 py-1 bg-white/5 rounded text-text-muted">{h.specs}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* PASSWORDS TAB */}
        {activeTab === 'passwords' && (
          <div className="glass-panel p-6 text-center py-12">
            <Lock className="w-12 h-12 text-text-muted mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-white mb-2">Şifre Kasası</h3>
            <p className="text-sm text-text-muted max-w-md mx-auto">Tüm şifreler "Şifre Kasası" modülünden yönetilmektedir. Şifrelerinizi güvenle orada AES şifreleme ile saklayabilirsiniz.</p>
            <button onClick={() => navigate('/vault')} className="btn-primary mx-auto mt-6">
              Şifre Kasasına Git
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
