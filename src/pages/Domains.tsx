import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Search, 
  AlertTriangle,
  CheckCircle2,
  CalendarDays,
  Plus,
  Trash2
} from 'lucide-react';
import { clsx } from 'clsx';
import { useStore } from '../store';
import { Modal } from '../components/ui/Modal';

export function Domains() {
  const { domains, fetchDomains, addDomain, deleteDomain, firms, fetchFirms } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDomain, setNewDomain] = useState({ name: '', firm_id: '', registrar: '', expiry_date: '', price: '', auto_renew: false });

  useEffect(() => {
    fetchDomains();
    fetchFirms();
  }, [fetchDomains, fetchFirms]);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDomain.firm_id) {
      alert('Lütfen firma seçin');
      return;
    }
    await addDomain(newDomain);
    setIsModalOpen(false);
    setNewDomain({ name: '', firm_id: '', registrar: '', expiry_date: '', price: '', auto_renew: false });
  };

  const getDaysLeft = (dateString: string) => {
    const expiry = new Date(dateString);
    const now = new Date();
    const diffTime = expiry.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const expiringDomains = domains.filter(d => getDaysLeft(d.expiry_date) <= 15 && getDaysLeft(d.expiry_date) >= 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Domain Takibi</h1>
          <p className="text-sm text-text-muted mt-1">Müşterilerinizin alan adı sürelerini ve yenilemelerini yönetin.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-5 h-5" />
          Alan Adı Ekle
        </button>
      </div>

      {/* Warning Alert */}
      {expiringDomains.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-white">Süresi Yaklaşan Domainler (Son 15 Gün)</h4>
            <p className="text-xs text-text-muted mt-1">
              {expiringDomains.map(d => `${d.name} (${getDaysLeft(d.expiry_date)} gün)`).join(', ')} alan adlarının süreleri dolmak üzere. Lütfen yenileme işlemlerini kontrol edin.
            </p>
          </div>
        </div>
      )}

      <div className="glass-panel overflow-hidden">
        <div className="p-4 border-b border-white/10 bg-surface/30 flex justify-between items-center">
           <div className="relative group w-72">
             <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
             <input type="text" placeholder="Domain veya firma ara..." className="glass-input text-sm py-1.5 pl-9 w-full" />
           </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-xs font-semibold text-text-muted uppercase tracking-wider bg-surface/20">
                <th className="p-4 pl-6">Alan Adı</th>
                <th className="p-4">Müşteri</th>
                <th className="p-4">Firma (Kayıtçı)</th>
                <th className="p-4">Bitiş Tarihi</th>
                <th className="p-4">Kalan Süre</th>
                <th className="p-4 text-center">Oto-Yenileme</th>
                <th className="p-4">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {domains.length === 0 && (
                <tr><td colSpan={7} className="p-8 text-center text-text-muted">Alan adı bulunamadı.</td></tr>
              )}
              {domains.map(d => {
                const daysLeft = getDaysLeft(d.expiry_date);
                return (
                  <tr key={d.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4 pl-6">
                      <div className="font-medium text-white flex items-center gap-2">
                         <Globe className="w-4 h-4 text-text-muted" /> {d.name}
                      </div>
                      <div className="text-xs text-text-muted mt-1 font-mono">{d.price}</div>
                    </td>
                    <td className="p-4 text-text-muted hover:text-primary cursor-pointer transition-colors">{d.firms?.name}</td>
                    <td className="p-4 text-white">{d.registrar}</td>
                    <td className="p-4 text-text-muted">
                       <div className="flex items-center gap-2 mt-2">
                         <CalendarDays className="w-4 h-4" /> {d.expiry_date}
                       </div>
                    </td>
                    <td className="p-4">
                       <span className={clsx(
                         "px-2.5 py-1 rounded text-xs font-bold",
                         daysLeft <= 7 ? "bg-red-500/10 text-red-500 border border-red-500/20" :
                         daysLeft <= 30 ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                         "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                       )}>
                         {daysLeft} Gün
                       </span>
                    </td>
                    <td className="p-4 text-center">
                      {d.auto_renew ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />
                      ) : (
                        <span className="text-xs text-text-muted border border-white/10 px-2 py-1 rounded bg-surface">Manuel</span>
                      )}
                    </td>
                    <td className="p-4">
                       <button onClick={() => deleteDomain(d.id)} className="p-1.5 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10 rounded-md">
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Yeni Alan Adı Ekle">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-muted">Alan Adı</label>
            <input required type="text" placeholder="ornek.com" className="glass-input w-full" value={newDomain.name} onChange={e => setNewDomain({...newDomain, name: e.target.value})} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-muted">Müşteri / Firma</label>
            <select required className="glass-input w-full appearance-none" value={newDomain.firm_id} onChange={e => setNewDomain({...newDomain, firm_id: e.target.value})}>
              <option value="">Firma Seçin...</option>
              {firms.map(f => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-text-muted">Kayıt Firması (Örn: GoDaddy)</label>
              <input type="text" className="glass-input w-full" value={newDomain.registrar} onChange={e => setNewDomain({...newDomain, registrar: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-text-muted">Bitiş Tarihi</label>
              <input required type="date" className="glass-input w-full" value={newDomain.expiry_date} onChange={e => setNewDomain({...newDomain, expiry_date: e.target.value})} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-text-muted">Fiyat (Örn: $12)</label>
              <input type="text" className="glass-input w-full" value={newDomain.price} onChange={e => setNewDomain({...newDomain, price: e.target.value})} />
            </div>
            <div className="flex items-center mt-6 gap-2">
              <input type="checkbox" id="autorenew" checked={newDomain.auto_renew} onChange={e => setNewDomain({...newDomain, auto_renew: e.target.checked})} className="rounded bg-background/50 border-white/10 text-primary focus:ring-primary/50" />
              <label htmlFor="autorenew" className="text-sm text-white cursor-pointer">Otomatik Yenileme Açık</label>
            </div>
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
