import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Phone, 
  Mail, 
  Plus,
  Trash2
} from 'lucide-react';
import { clsx } from 'clsx';
import { useStore } from '../store';
import { Modal } from '../components/ui/Modal';

const statusColors: Record<string, string> = {
  'Aktif': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  'Teklif Bekliyor': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  'Pasif': 'bg-red-500/10 text-red-500 border-red-500/20',
};

export function CRM() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFirm, setNewFirm] = useState({ name: '', sector: '', contact_person: '', phone: '', email: '', status: 'Aktif' });
  
  const { firms, fetchFirms, addFirm, deleteFirm } = useStore();

  useEffect(() => {
    fetchFirms();
  }, [fetchFirms]);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addFirm(newFirm);
    setIsModalOpen(false);
    setNewFirm({ name: '', sector: '', contact_person: '', phone: '', email: '', status: 'Aktif' });
  };

  const filteredFirms = firms.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.contact_person?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">CRM & Müşteriler</h1>
          <p className="text-sm text-text-muted mt-1">Tüm müşteri kayıtlarını yönetin ve takip edin.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-5 h-5" />
          Yeni Müşteri
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center glass-panel p-4">
        <div className="relative w-full md:w-96 group">
          <Search className="w-5 h-5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Firma adı, yetkili ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-background/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="btn-ghost w-full md:w-auto border border-white/10">
            <Filter className="w-4 h-4" /> Filtrele
          </button>
        </div>
      </div>

      {/* Firms Table */}
      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-surface/50 text-sm font-medium text-text-muted uppercase tracking-wider">
                <th className="p-4 pl-6">Firma Adı</th>
                <th className="p-4">Sektör</th>
                <th className="p-4">Yetkili</th>
                <th className="p-4">İletişim</th>
                <th className="p-4">Durum</th>
                <th className="p-4 text-right pr-6">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {filteredFirms.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-text-muted">Müşteri bulunamadı.</td>
                </tr>
              ) : filteredFirms.map((firm) => (
                <tr 
                  key={firm.id} 
                  className="hover:bg-white/5 transition-colors cursor-pointer group"
                  onClick={() => navigate(`/crm/${firm.id}`)}
                >
                  <td className="p-4 pl-6">
                    <div className="font-semibold text-white group-hover:text-primary transition-colors">{firm.name}</div>
                    <div className="text-xs text-text-muted mt-0.5">Kayıt: {new Date(firm.created_at).toLocaleDateString('tr-TR')}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-surface rounded text-text border border-white/5">{firm.sector}</span>
                  </td>
                  <td className="p-4 text-white">
                    {firm.contact_person}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1 text-text-muted text-xs">
                      {firm.phone && <div className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {firm.phone}</div>}
                      {firm.email && <div className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {firm.email}</div>}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={clsx("px-2.5 py-1 rounded-full text-xs font-semibold border", statusColors[firm.status] || "bg-white/10 text-white border-white/20")}>
                      {firm.status}
                    </span>
                  </td>
                  <td className="p-4 text-right pr-6 flex justify-end gap-2 items-center h-full mt-3">
                    <button 
                      className="p-1.5 rounded-md text-red-400 opacity-0 group-hover:opacity-100 hover:bg-white/10 transition-all"
                      onClick={(e) => { e.stopPropagation(); deleteFirm(firm.id); }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-md text-text-muted hover:bg-white/10 hover:text-white transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Add Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Yeni Müşteri Ekle">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-muted">Firma Adı</label>
            <input required type="text" className="glass-input w-full" value={newFirm.name} onChange={e => setNewFirm({...newFirm, name: e.target.value})} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-muted">Sektör</label>
            <input type="text" className="glass-input w-full" value={newFirm.sector} onChange={e => setNewFirm({...newFirm, sector: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-text-muted">Yetkili Kişi</label>
              <input type="text" className="glass-input w-full" value={newFirm.contact_person} onChange={e => setNewFirm({...newFirm, contact_person: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-text-muted">Telefon</label>
              <input type="text" className="glass-input w-full" value={newFirm.phone} onChange={e => setNewFirm({...newFirm, phone: e.target.value})} />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-muted">E-Posta</label>
            <input type="email" className="glass-input w-full" value={newFirm.email} onChange={e => setNewFirm({...newFirm, email: e.target.value})} />
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
