import React from 'react';
import { useClientStore } from '../../../../store/useClientStore';
import { Mail, Phone, Building } from 'lucide-react';

export const CrmTab = () => {
  const { clients } = useClientStore();

  return (
    <div className="glass-panel overflow-hidden">
      <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
        <h3 className="font-semibold">Müşteri Detayları (CRM)</h3>
        <span className="text-xs text-gray-500">{clients.length} Müşteri Kayıtlı</span>
      </div>
      
      {clients.length === 0 ? (
        <div className="p-12 text-center text-gray-500">
          Kayıtlı müşteri bulunamadı.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-400 uppercase bg-black/40 border-b border-white/5">
              <tr>
                <th className="px-6 py-4">Firma</th>
                <th className="px-6 py-4">Yetkili</th>
                <th className="px-6 py-4">İletişim</th>
                <th className="px-6 py-4">Kayıt Tarihi</th>
                <th className="px-6 py-4 text-right">Durum</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 border border-white/10 flex items-center justify-center text-blue-400 font-bold">
                        {client.name.substring(0,2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-white">{client.name}</div>
                        <div className="text-xs text-gray-500">{client.erpData?.sector || 'Sektör Belirtilmedi'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {client.erpData?.contact_person || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Phone size={12} />
                        <span className="text-xs">{client.erpData?.phone || '-'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Mail size={12} />
                        <span className="text-xs">{client.erpData?.email || '-'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {new Date(client.createdAt).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="px-2.5 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-md text-xs font-medium">
                      Aktif Müşteri
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
