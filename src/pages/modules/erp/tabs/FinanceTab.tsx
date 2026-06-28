import React, { useState } from 'react';
import { useClientStore } from '../../../../store/useClientStore';
import type { FinanceTransaction } from '../../../../store/useClientStore';
import { DollarSign, TrendingUp, TrendingDown, Plus, X, Trash2 } from 'lucide-react';

export const FinanceTab = () => {
  const { clients, activeClientId, addTransaction, deleteTransaction } = useClientStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newTx, setNewTx] = useState({ description: '', amount: '', type: 'income' as FinanceTransaction['type'] });

  const activeClient = clients.find(c => c.id === activeClientId);
  if (!activeClient) return null;

  const transactions = activeClient.financeTransactions || [];
  
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  const handleAdd = () => {
    if (!newTx.description.trim() || !newTx.amount) return;
    
    const tx: FinanceTransaction = {
      id: crypto.randomUUID(),
      description: newTx.description,
      amount: parseFloat(newTx.amount),
      type: newTx.type,
      date: new Date().toLocaleDateString('tr-TR')
    };

    addTransaction(activeClient.id, tx);
    setIsAdding(false);
    setNewTx({ description: '', amount: '', type: 'income' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Müşteri Finans Panosu</h2>
          <p className="text-sm text-gray-400">Gelir, gider ve bakiye takibi.</p>
        </div>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="btn-primary flex items-center gap-2">
            <Plus size={16} /> İşlem Ekle
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="glass-panel p-6 border-l-4 border-blue-500">
          <p className="text-sm text-gray-400 mb-1">Net Bakiye</p>
          <p className="text-3xl font-bold text-white">₺{balance.toLocaleString('tr-TR')}</p>
        </div>
        <div className="glass-panel p-6 border-l-4 border-emerald-500 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-400 mb-1">Toplam Gelir</p>
            <p className="text-2xl font-bold text-emerald-400">₺{totalIncome.toLocaleString('tr-TR')}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
            <TrendingUp className="text-emerald-500" />
          </div>
        </div>
        <div className="glass-panel p-6 border-l-4 border-red-500 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-400 mb-1">Toplam Gider</p>
            <p className="text-2xl font-bold text-red-400">₺{totalExpense.toLocaleString('tr-TR')}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
            <TrendingDown className="text-red-500" />
          </div>
        </div>
      </div>

      {isAdding && (
        <div className="glass-panel p-6 mb-6 border border-blue-500/30">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-white">Yeni İşlem Ekle</h3>
            <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-white"><X size={20}/></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Açıklama</label>
              <input type="text" className="glass-input w-full" value={newTx.description} onChange={e => setNewTx({...newTx, description: e.target.value})} placeholder="Örn: Sunucu Yenileme" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Tutar (₺)</label>
              <input type="number" className="glass-input w-full" value={newTx.amount} onChange={e => setNewTx({...newTx, amount: e.target.value})} placeholder="0.00" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">İşlem Tipi</label>
              <select className="glass-input w-full" value={newTx.type} onChange={e => setNewTx({...newTx, type: e.target.value as FinanceTransaction['type']})}>
                <option value="income" className="bg-gray-900 text-emerald-400">Gelir (+)</option>
                <option value="expense" className="bg-gray-900 text-red-400">Gider (-)</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-white">İptal</button>
            <button onClick={handleAdd} className="btn-primary py-2 px-6">Kaydet</button>
          </div>
        </div>
      )}

      <div className="glass-panel overflow-hidden">
        <h3 className="px-6 py-4 font-semibold border-b border-white/5">İşlem Geçmişi</h3>
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-400 uppercase bg-black/40 border-b border-white/5">
            <tr>
              <th className="px-6 py-3">Tarih</th>
              <th className="px-6 py-3">Açıklama</th>
              <th className="px-6 py-3">Tutar</th>
              <th className="px-6 py-3 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                  <DollarSign size={32} className="mx-auto mb-3 opacity-20" />
                  Kayıtlı finansal işlem bulunmuyor.
                </td>
              </tr>
            ) : (
              transactions.map(tx => (
                <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-gray-400">{tx.date}</td>
                  <td className="px-6 py-4 font-medium">{tx.description}</td>
                  <td className={`px-6 py-4 font-semibold ${tx.type === 'income' ? 'text-emerald-400' : 'text-red-400'}`}>
                    {tx.type === 'income' ? '+' : '-'}₺{tx.amount.toLocaleString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => { if(window.confirm('Emin misiniz?')) deleteTransaction(activeClient.id, tx.id); }} className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
