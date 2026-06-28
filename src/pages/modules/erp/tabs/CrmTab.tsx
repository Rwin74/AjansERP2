import React from 'react';
import { useClientStore } from '../../../../store/useClientStore';

export const CrmTab = () => {
  const { clients, activeClientId } = useClientStore();
  const activeClient = clients.find(c => c.id === activeClientId);

  if (!activeClient) return null;

  return (
    <div className="glass-panel overflow-hidden">
      <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
        <h3 className="font-semibold">Müşteri Detayları (CRM)</h3>
        <button className="btn-primary text-xs py-1">Bilgileri Güncelle</button>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-400 uppercase bg-black/40 border-b border-white/5">
          <tr>
            <th className="px-6 py-3">Firma</th>
            <th className="px-6 py-3">Yetkili</th>
            <th className="px-6 py-3">Telefon</th>
            <th className="px-6 py-3">E-posta</th>
            <th className="px-6 py-3">Durum</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-white/5 hover:bg-white/[0.02] cursor-pointer">
            <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold">
                {activeClient.name.substring(0,2).toUpperCase()}
              </div>
              {activeClient.name}
            </td>
            <td className="px-6 py-4 text-gray-300">Ahmet Yılmaz</td>
            <td className="px-6 py-4 text-gray-400">+90 532 123 4567</td>
            <td className="px-6 py-4 text-gray-400">iletisim@{activeClient.name.toLowerCase().replace(/ /g, '')}.com</td>
            <td className="px-6 py-4">
              <span className="badge badge-success">Aktif SEO</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
