import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  CreditCard, 
  Building2,
  Plus,
  Download,
  Trash2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { clsx } from 'clsx';
import { useStore } from '../store';
import { Modal } from '../components/ui/Modal';

const staticMonthlyData = [
  { name: 'Oca', gelir: 45000, gider: 12000 },
  { name: 'Şub', gelir: 52000, gider: 15000 },
  { name: 'Mar', gelir: 38000, gider: 18000 },
  { name: 'Nis', gelir: 65000, gider: 14000 },
  { name: 'May', gelir: 85000, gider: 22000 },
  { name: 'Haz', gelir: 72000, gider: 19000 },
];

export function Finance() {
  const { transactions, fetchTransactions, addTransaction, deleteTransaction } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTx, setNewTx] = useState({ type: 'gelir', title: '', amount: '', method: 'Banka (IBAN)', date: new Date().toISOString().split('T')[0] });

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addTransaction({
      ...newTx,
      amount: Number(newTx.amount)
    });
    setIsModalOpen(false);
    setNewTx({ type: 'gelir', title: '', amount: '', method: 'Banka (IBAN)', date: new Date().toISOString().split('T')[0] });
  };

  const totalIncome = transactions.filter(t => t.type === 'gelir').reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalExpense = transactions.filter(t => t.type === 'gider').reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalKasa = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Finans Yönetimi</h1>
          <p className="text-sm text-text-muted mt-1">Gelir, gider ve kasa durumunuzu takip edin.</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-ghost border border-white/10">
            <Download className="w-4 h-4" /> Excel'e Aktar
          </button>
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-5 h-5" />
            Yeni İşlem
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-green-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <p className="text-sm font-medium text-text-muted mb-2 flex items-center gap-2">
             Toplam Kasa <Wallet className="w-4 h-4" />
          </p>
          <h3 className="text-3xl font-bold text-white mb-2">₺{totalKasa.toLocaleString('tr-TR')}</h3>
        </div>
        <div className="glass-panel p-6 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-blue-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <p className="text-sm font-medium text-text-muted mb-2 flex items-center gap-2">
             Toplam Gelir <Building2 className="w-4 h-4" />
          </p>
          <h3 className="text-3xl font-bold text-white mb-2">₺{totalIncome.toLocaleString('tr-TR')}</h3>
        </div>
        <div className="glass-panel p-6 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-red-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <p className="text-sm font-medium text-text-muted mb-2 flex items-center gap-2">
             Toplam Gider <CreditCard className="w-4 h-4" />
          </p>
          <h3 className="text-3xl font-bold text-white mb-2">₺{totalExpense.toLocaleString('tr-TR')}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Chart */}
        <div className="xl:col-span-2 glass-panel p-6">
           <h3 className="text-lg font-semibold text-white mb-6">6 Aylık Gelir & Gider Analizi</h3>
           <div className="h-72 w-full">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={staticMonthlyData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `₺${val/1000}k`} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.02)'}}
                    contentStyle={{ backgroundColor: '#171717', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }} 
                  />
                  <Bar dataKey="gelir" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="gider" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Transactions List */}
        <div className="glass-panel flex flex-col">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Son İşlemler</h3>
            <button className="text-xs text-primary hover:underline">Tümünü Gör</button>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {transactions.length === 0 && <div className="p-4 text-center text-text-muted text-sm">İşlem bulunamadı.</div>}
            {transactions.map(trx => (
              <div key={trx.id} className="p-4 hover:bg-white/5 transition-colors rounded-xl flex items-center justify-between cursor-pointer group">
                 <div className="flex items-center gap-3">
                   <div className={clsx(
                     "w-10 h-10 rounded-full flex items-center justify-center shrink-0 border",
                     trx.type === 'gelir' ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-red-500/10 text-red-500 border-red-500/20"
                   )}>
                     {trx.type === 'gelir' ? <ArrowDownRight className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                   </div>
                   <div>
                     <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">{trx.title}</p>
                     <p className="text-xs text-text-muted mt-0.5">{trx.method}</p>
                   </div>
                 </div>
                 <div className="text-right flex items-center gap-3">
                   <div>
                     <p className={clsx("text-sm font-bold", trx.type === 'gelir' ? "text-green-400" : "text-red-400")}>
                       {trx.type === 'gelir' ? '+' : '-'}₺{Number(trx.amount).toLocaleString('tr-TR')}
                     </p>
                     <p className="text-xs text-text-muted mt-0.5">{trx.date}</p>
                   </div>
                   <button onClick={(e) => { e.stopPropagation(); deleteTransaction(trx.id); }} className="p-1.5 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10 rounded-md">
                     <Trash2 className="w-4 h-4" />
                   </button>
                 </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Add Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Yeni İşlem Ekle">
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button" 
              onClick={() => setNewTx({...newTx, type: 'gelir'})}
              className={clsx("p-3 rounded-xl border text-sm font-bold transition-all", newTx.type === 'gelir' ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-surface border-white/10 text-text-muted')}
            >
              Gelir
            </button>
            <button 
              type="button" 
              onClick={() => setNewTx({...newTx, type: 'gider'})}
              className={clsx("p-3 rounded-xl border text-sm font-bold transition-all", newTx.type === 'gider' ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-surface border-white/10 text-text-muted')}
            >
              Gider
            </button>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-muted">İşlem Açıklaması / Başlık</label>
            <input required type="text" className="glass-input w-full" value={newTx.title} onChange={e => setNewTx({...newTx, title: e.target.value})} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-text-muted">Tutar (₺)</label>
            <input required type="number" step="0.01" className="glass-input w-full" value={newTx.amount} onChange={e => setNewTx({...newTx, amount: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-text-muted">Ödeme Yöntemi</label>
              <select className="glass-input w-full appearance-none" value={newTx.method} onChange={e => setNewTx({...newTx, method: e.target.value})}>
                <option value="Banka (IBAN)">Banka (IBAN)</option>
                <option value="Kredi Kartı">Kredi Kartı</option>
                <option value="Nakit">Nakit</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-text-muted">Tarih</label>
              <input type="date" className="glass-input w-full" value={newTx.date} onChange={e => setNewTx({...newTx, date: e.target.value})} />
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
