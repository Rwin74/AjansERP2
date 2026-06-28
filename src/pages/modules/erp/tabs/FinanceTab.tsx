import React from 'react';
import { useClientStore } from '../../../../store/useClientStore';

export const FinanceTab = () => {
  const { clients, activeClientId } = useClientStore();
  const activeClient = clients.find(c => c.id === activeClientId);

  if (!activeClient) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 border-t-2 border-t-green-500">
          <p className="text-gray-400 text-sm mb-2">Aylık Sözleşme Tutarı</p>
          <div className="text-3xl font-bold">₺0</div>
          <p className="text-xs text-green-500 mt-2">Belirlenmedi</p>
        </div>
        <div className="glass-panel p-6 border-t-2 border-t-red-500">
          <p className="text-gray-400 text-sm mb-2">Geciken Ödemeler</p>
          <div className="text-3xl font-bold text-red-400">₺0</div>
          <p className="text-xs text-gray-500 mt-2">Gecikme Yok</p>
        </div>
        <div className="glass-panel p-6 border-t-2 border-t-blue-500">
          <p className="text-gray-400 text-sm mb-2">Sonraki Ödeme Tarihi</p>
          <div className="text-2xl font-bold text-white mt-1">-</div>
        </div>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="p-4 border-b border-white/5 bg-white/[0.02]">
          <h3 className="font-semibold">{activeClient.name} - Finans Geçmişi</h3>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-400 uppercase bg-black/40 border-b border-white/5">
            <tr>
              <th className="px-6 py-3">İşlem</th>
              <th className="px-6 py-3">Tutar</th>
              <th className="px-6 py-3">Tarih</th>
              <th className="px-6 py-3">Durum</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                Finans geçmişi bulunmuyor.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
