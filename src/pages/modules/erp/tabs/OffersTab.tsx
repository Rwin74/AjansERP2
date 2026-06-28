import React, { useState } from 'react';
import { useClientStore } from '../../../../store/useClientStore';
import type { Offer } from '../../../../store/useClientStore';
import { FileSignature, Plus, X, Trash2 } from 'lucide-react';

export const OffersTab = () => {
  const { clients, activeClientId, addOffer, deleteOffer } = useClientStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newOffer, setNewOffer] = useState({ title: '', amount: '', status: 'Beklemede' as Offer['status'] });

  const activeClient = clients.find(c => c.id === activeClientId);
  if (!activeClient) return null;

  const offers = activeClient.offers || [];

  const handleAdd = () => {
    if (!newOffer.title.trim() || !newOffer.amount) return;
    
    const offer: Offer = {
      id: crypto.randomUUID(),
      offerNo: `TEK-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      title: newOffer.title,
      amount: parseFloat(newOffer.amount),
      status: newOffer.status,
      date: new Date().toLocaleDateString('tr-TR')
    };

    addOffer(activeClient.id, offer);
    setIsAdding(false);
    setNewOffer({ title: '', amount: '', status: 'Beklemede' });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Onaylandı': return 'text-green-400 bg-green-500/10 border border-green-500/20';
      case 'Reddedildi': return 'text-red-400 bg-red-500/10 border border-red-500/20';
      default: return 'text-yellow-400 bg-yellow-500/10 border border-yellow-500/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Teklifler & Sözleşmeler</h2>
          <p className="text-sm text-gray-400">Oluşturulan teklifler ve müşteri onay durumları.</p>
        </div>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="btn-primary flex items-center gap-2">
            <Plus size={16} /> Yeni Teklif Ekle
          </button>
        )}
      </div>

      {isAdding && (
        <div className="glass-panel p-6 mb-6 border border-blue-500/30">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-white">Yeni Teklif Ekle</h3>
            <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-white"><X size={20}/></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Açıklama / Hizmet</label>
              <input type="text" className="glass-input w-full" value={newOffer.title} onChange={e => setNewOffer({...newOffer, title: e.target.value})} placeholder="Örn: 6 Aylık SEO Danışmanlığı" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Tutar (₺)</label>
              <input type="number" className="glass-input w-full" value={newOffer.amount} onChange={e => setNewOffer({...newOffer, amount: e.target.value})} placeholder="0.00" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Durum</label>
              <select className="glass-input w-full" value={newOffer.status} onChange={e => setNewOffer({...newOffer, status: e.target.value as Offer['status']})}>
                <option value="Beklemede" className="bg-gray-900">Beklemede</option>
                <option value="Onaylandı" className="bg-gray-900">Onaylandı</option>
                <option value="Reddedildi" className="bg-gray-900">Reddedildi</option>
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
              <th className="px-6 py-4">Teklif No</th>
              <th className="px-6 py-4">Açıklama</th>
              <th className="px-6 py-4">Tarih</th>
              <th className="px-6 py-4">Tutar</th>
              <th className="px-6 py-4">Durum</th>
              <th className="px-6 py-4 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {offers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  <FileSignature size={32} className="mx-auto mb-3 opacity-20" />
                  Henüz kayıtlı bir teklif bulunmuyor.
                </td>
              </tr>
            ) : (
              offers.map(offer => (
                <tr key={offer.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-300">{offer.offerNo}</td>
                  <td className="px-6 py-4 font-medium">{offer.title}</td>
                  <td className="px-6 py-4 text-gray-400">{offer.date}</td>
                  <td className="px-6 py-4 font-semibold text-white">₺{offer.amount.toLocaleString('tr-TR')}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(offer.status)}`}>
                      {offer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => { if(window.confirm('Emin misiniz?')) deleteOffer(activeClient.id, offer.id); }} className="p-2 hover:bg-red-500/10 text-red-400 rounded-lg transition-colors">
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
