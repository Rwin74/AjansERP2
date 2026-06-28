import React, { useState } from 'react';
import { useClientStore } from '../../../../store/useClientStore';
import type { Invoice } from '../../../../store/useClientStore';
import { Receipt, Plus, X, Trash2 } from 'lucide-react';

export const InvoicesTab = () => {
  const { clients, activeClientId, addInvoice, deleteInvoice } = useClientStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newInvoice, setNewInvoice] = useState({ amount: '', status: 'Bekliyor' as Invoice['status'] });

  const activeClient = clients.find(c => c.id === activeClientId);
  if (!activeClient) return null;

  const invoices = activeClient.invoices || [];

  const handleAdd = () => {
    if (!newInvoice.amount) return;
    
    const invoice: Invoice = {
      id: crypto.randomUUID(),
      invoiceNo: `FAT-${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`,
      amount: parseFloat(newInvoice.amount),
      status: newInvoice.status,
      date: new Date().toLocaleDateString('tr-TR')
    };

    addInvoice(activeClient.id, invoice);
    setIsAdding(false);
    setNewInvoice({ amount: '', status: 'Bekliyor' });
  };

  const getStatusColor = (status: string) => {
    return status === 'Ödendi' 
      ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' 
      : 'text-orange-400 bg-orange-500/10 border border-orange-500/20';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Faturalar</h2>
          <p className="text-sm text-gray-400">Kesilen faturalar ve ödeme durumları.</p>
        </div>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="btn-primary flex items-center gap-2">
            <Plus size={16} /> Yeni Fatura
          </button>
        )}
      </div>

      {isAdding && (
        <div className="glass-panel p-6 mb-6 border border-blue-500/30">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-white">Yeni Fatura Ekle</h3>
            <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-white"><X size={20}/></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Tutar (₺)</label>
              <input type="number" className="glass-input w-full" value={newInvoice.amount} onChange={e => setNewInvoice({...newInvoice, amount: e.target.value})} placeholder="0.00" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Durum</label>
              <select className="glass-input w-full" value={newInvoice.status} onChange={e => setNewInvoice({...newInvoice, status: e.target.value as Invoice['status']})}>
                <option value="Bekliyor" className="bg-gray-900">Bekliyor</option>
                <option value="Ödendi" className="bg-gray-900">Ödendi</option>
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
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-400 uppercase bg-black/40 border-b border-white/5">
            <tr>
              <th className="px-6 py-4">Fatura No</th>
              <th className="px-6 py-4">Tarih</th>
              <th className="px-6 py-4">Tutar</th>
              <th className="px-6 py-4">Durum</th>
              <th className="px-6 py-4 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {invoices.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  <Receipt size={32} className="mx-auto mb-3 opacity-20" />
                  Kayıtlı fatura bulunmuyor.
                </td>
              </tr>
            ) : (
              invoices.map(invoice => (
                <tr key={invoice.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-300">{invoice.invoiceNo}</td>
                  <td className="px-6 py-4 text-gray-400">{invoice.date}</td>
                  <td className="px-6 py-4 font-semibold text-white">₺{invoice.amount.toLocaleString('tr-TR')}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => { if(window.confirm('Emin misiniz?')) deleteInvoice(activeClient.id, invoice.id); }} className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition-colors">
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
