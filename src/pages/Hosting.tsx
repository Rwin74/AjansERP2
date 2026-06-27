import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Search, 
  ShieldCheck,
  HardDrive,
  Cpu,
  Plus,
  Trash2
} from 'lucide-react';
import { clsx } from 'clsx';
import { useStore } from '../store';
import { Modal } from '../components/ui/Modal';

export function Hosting() {
  const { hostings, fetchHostings, addHosting, deleteHosting, firms, fetchFirms } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHosting, setNewHosting] = useState({ name: '', firm_id: '', provider: '', ip: '', expiry_date: '', specs: '', has_ssl: true, status: 'Aktif' });

  useEffect(() => {
    fetchHostings();
    fetchFirms();
  }, [fetchHostings, fetchFirms]);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHosting.firm_id) {
      alert('Lütfen firma seçin');
      return;
    }
    await addHosting(newHosting);
    setIsModalOpen(false);
    setNewHosting({ name: '', firm_id: '', provider: '', ip: '', expiry_date: '', specs: '', has_ssl: true, status: 'Aktif' });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Hosting & Sunucu</h1>
          <p className="text-sm text-text-muted mt-1">Sunucu kaynaklarını, IP adreslerini ve barındırma hizmetlerini izleyin.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-5 h-5" />
          Sunucu Ekle
        </button>
      </div>

      {hostings.length === 0 && <div className="p-8 text-center text-text-muted glass-panel">Henüz sunucu veya hosting bulunmuyor.</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hostings.map(h => (
          <div key={h.id} className="glass-panel p-6 border-t-4 border-t-primary relative group">
            <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
               <button onClick={() => deleteHosting(h.id)} className="p-1.5 text-red-400 hover:bg-white/10 rounded-md">
                 <Trash2 className="w-4 h-4" />
               </button>
            </div>
            <div className="flex justify-between items-start mb-4 pr-8">
              <div>
                 <h3 className="text-lg font-bold text-white flex items-center gap-2">
                   <Server className="w-5 h-5 text-primary" /> {h.name}
                 </h3>
                 <p className="text-sm text-text-muted mt-1">{h.firms?.name} • {h.provider}</p>
              </div>
              <span className={clsx(
                "px-2.5 py-1 rounded text-xs font-bold",
                h.status === 'Aktif' ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"
              )}>
                {h.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
               <div className="bg-surface/50 p-3 rounded-lg border border-white/5">
                 <p className="text-xs text-text-muted mb-1 flex items-center gap-1"><HardDrive className="w-3.5 h-3.5" /> IP Adresi</p>
                 <p className="text-sm font-mono text-white">{h.ip}</p>
               </div>
               <div className="bg-surface/50 p-3 rounded-lg border border-white/5">
                 <p className="text-xs text-text-muted mb-1 flex items-center gap-1"><Cpu className="w-3.5 h-3.5" /> Özellikler</p>
                 <p className="text-sm text-white">{h.specs}</p>
               </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
               <div className="flex items-center gap-2 text-sm">
                 {h.has_ssl ? (
                   <span className="flex items-center gap-1 text-emerald-400"><ShieldCheck className="w-4 h-4" /> SSL Aktif</span>
                 ) : (
                   <span className="flex items-center gap-1 text-red-400">SSL Yok</span>
                 )}
               </div>
               <div className="text-sm">
                 <span className="text-text-muted">Bitiş:</span> <span className="text-white font-medium">{h.expiry_date}</span>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Yeni Sunucu / Hosting Ekle">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-muted">Sunucu / Hosting Adı</label>
            <input required type="text" placeholder="VDS Sunucu 1" className="glass-input w-full" value={newHosting.name} onChange={e => setNewHosting({...newHosting, name: e.target.value})} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-muted">Müşteri / Firma</label>
            <select required className="glass-input w-full appearance-none" value={newHosting.firm_id} onChange={e => setNewHosting({...newHosting, firm_id: e.target.value})}>
              <option value="">Firma Seçin...</option>
              {firms.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-text-muted">Sağlayıcı (Örn: Hetzner, Turhost)</label>
              <input type="text" className="glass-input w-full" value={newHosting.provider} onChange={e => setNewHosting({...newHosting, provider: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-text-muted">IP Adresi</label>
              <input type="text" className="glass-input w-full" value={newHosting.ip} onChange={e => setNewHosting({...newHosting, ip: e.target.value})} />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-muted">Özellikler</label>
            <input type="text" placeholder="Örn: 8GB RAM - 4 CPU - 100GB NVMe" className="glass-input w-full" value={newHosting.specs} onChange={e => setNewHosting({...newHosting, specs: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-text-muted">Bitiş Tarihi</label>
              <input required type="date" className="glass-input w-full" value={newHosting.expiry_date} onChange={e => setNewHosting({...newHosting, expiry_date: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-text-muted">Durum</label>
              <select className="glass-input w-full appearance-none" value={newHosting.status} onChange={e => setNewHosting({...newHosting, status: e.target.value})}>
                <option value="Aktif">Aktif</option>
                <option value="Yaklaşıyor">Yaklaşıyor</option>
                <option value="Pasif">Pasif</option>
              </select>
            </div>
          </div>
          <div className="flex items-center mt-2 gap-2">
            <input type="checkbox" id="hasssl" checked={newHosting.has_ssl} onChange={e => setNewHosting({...newHosting, has_ssl: e.target.checked})} className="rounded bg-background/50 border-white/10 text-primary focus:ring-primary/50" />
            <label htmlFor="hasssl" className="text-sm text-white cursor-pointer">SSL Sertifikası Var</label>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setIsModalOpen(false)} className="btn-ghost border border-white/10">İptal</button>
            <button type="submit" className="btn-primary">Kaydet</button>
          </div>
        </form>
      </Modal>

    </div>
  );
}
