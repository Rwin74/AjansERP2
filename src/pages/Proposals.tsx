import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Send, 
  CheckCircle, 
  XCircle, 
  Clock,
  MoreVertical,
  Plus,
  Trash2
} from 'lucide-react';
import { clsx } from 'clsx';
import { useStore } from '../store';
import { Modal } from '../components/ui/Modal';

const statusIcons: Record<string, React.ElementType> = {
  'Onaylandı': CheckCircle,
  'Bekliyor': Clock,
  'Reddedildi': XCircle,
  'Okundu': Send
};

const statusColors: Record<string, string> = {
  'Onaylandı': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  'Bekliyor': 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  'Reddedildi': 'text-red-400 bg-red-400/10 border-red-400/20',
  'Okundu': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
};

export function Proposals() {
  const { proposals, fetchProposals, addProposal, deleteProposal } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProp, setNewProp] = useState({ firm_name: '', title: '', amount: '', date: new Date().toISOString().split('T')[0], status: 'Bekliyor' });

  useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addProposal(newProp);
    setIsModalOpen(false);
    setNewProp({ firm_name: '', title: '', amount: '', date: new Date().toISOString().split('T')[0], status: 'Bekliyor' });
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Teklif Yönetimi</h1>
          <p className="text-sm text-text-muted mt-1">Müşterilerinize şık teklifler oluşturun ve durumlarını takip edin.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-5 h-5" />
          Yeni Teklif Hazırla
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Main List */}
        <div className="lg:col-span-3 glass-panel overflow-hidden">
          <div className="p-4 border-b border-white/10 bg-surface/30 flex justify-between items-center">
             <h3 className="font-semibold text-white">Gönderilen Teklifler</h3>
             <input type="text" placeholder="Teklif Ara..." className="glass-input text-sm py-1.5" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  <th className="p-4 pl-6">Teklif No</th>
                  <th className="p-4">Firma & Konu</th>
                  <th className="p-4">Tarih</th>
                  <th className="p-4">Tutar</th>
                  <th className="p-4">Durum</th>
                  <th className="p-4 text-right pr-6">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {proposals.length === 0 && (
                  <tr><td colSpan={6} className="p-8 text-center text-text-muted">Henüz teklif bulunmuyor.</td></tr>
                )}
                {proposals.map((item) => {
                  const StatusIcon = statusIcons[item.status] || Clock;
                  return (
                    <tr key={item.id} className="hover:bg-white/5 transition-colors group cursor-pointer">
                      <td className="p-4 pl-6 font-mono text-xs text-text-muted">TEK-{item.id.slice(0, 6)}</td>
                      <td className="p-4">
                        <div className="font-medium text-white group-hover:text-primary transition-colors">{item.firm_name}</div>
                        <div className="text-xs text-text-muted mt-0.5">{item.title}</div>
                      </td>
                      <td className="p-4 text-text-muted">{item.date}</td>
                      <td className="p-4 font-semibold text-white">₺{item.amount}</td>
                      <td className="p-4">
                        <span className={clsx("px-2.5 py-1 rounded border flex items-center gap-1.5 w-max text-xs font-medium", statusColors[item.status] || statusColors['Bekliyor'])}>
                          <StatusIcon className="w-3.5 h-3.5" /> {item.status}
                        </span>
                      </td>
                      <td className="p-4 text-right pr-6">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={(e) => { e.stopPropagation(); deleteProposal(item.id); }} className="p-1.5 text-red-400 hover:bg-white/10 rounded">
                             <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-text-muted hover:text-white hover:bg-white/10 rounded" title="PDF İndir">
                             <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
           <div className="glass-panel p-6 bg-gradient-to-br from-primary/10 to-transparent border-t-primary/30">
              <h3 className="text-sm font-semibold text-white mb-2">Dönüşüm Oranı</h3>
              <div className="flex items-end gap-2 mb-2">
                 <span className="text-4xl font-bold text-white">%68</span>
                 <span className="text-green-400 text-sm font-medium mb-1">↑ %5</span>
              </div>
              <p className="text-xs text-text-muted">Bu ay gönderilen 24 tekliften 16'sı onaylandı.</p>
           </div>
           
           <div className="glass-panel p-6 border-dashed border-2 border-white/10 flex flex-col items-center justify-center text-center gap-3">
              <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center border border-white/5">
                <FileText className="w-5 h-5 text-text-muted" />
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-1">Teklif Şablonları</p>
                <p className="text-xs text-text-muted">Standart ajans PDF şablonlarınızı buradan yönetin.</p>
              </div>
              <button className="btn-ghost text-xs border border-white/10 mt-2">Şablonlara Git</button>
           </div>
        </div>

      </div>

      {/* Add Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Yeni Teklif Ekle">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-muted">Firma / Müşteri Adı</label>
            <input required type="text" className="glass-input w-full" value={newProp.firm_name} onChange={e => setNewProp({...newProp, firm_name: e.target.value})} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-muted">Teklif Konusu (Başlık)</label>
            <input required type="text" className="glass-input w-full" value={newProp.title} onChange={e => setNewProp({...newProp, title: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-text-muted">Tutar (Örn: 15.000)</label>
              <input required type="text" className="glass-input w-full" value={newProp.amount} onChange={e => setNewProp({...newProp, amount: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-text-muted">Tarih</label>
              <input type="date" className="glass-input w-full" value={newProp.date} onChange={e => setNewProp({...newProp, date: e.target.value})} />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-muted">Durum</label>
            <select className="glass-input w-full appearance-none" value={newProp.status} onChange={e => setNewProp({...newProp, status: e.target.value})}>
              <option value="Bekliyor">Bekliyor</option>
              <option value="Okundu">Okundu</option>
              <option value="Onaylandı">Onaylandı</option>
              <option value="Reddedildi">Reddedildi</option>
            </select>
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
