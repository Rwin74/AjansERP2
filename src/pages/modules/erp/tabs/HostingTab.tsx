import React from 'react';
import { useClientStore } from '../../../../store/useClientStore';
import { Server, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HostingTab = () => {
  const { clients, activeClientId } = useClientStore();
  const navigate = useNavigate();
  
  const activeClient = clients.find(c => c.id === activeClientId);
  if (!activeClient) return null;

  const hosting = activeClient.prepData?.hosting;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Hosting Yönetimi</h2>
          <p className="text-sm text-gray-400">Sunucu kaynakları ve bitiş tarihleri.</p>
        </div>
        <button onClick={() => navigate('/seo')} className="btn-primary">Bilgileri Düzenle</button>
      </div>

      <div className="glass-panel overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-400 uppercase bg-black/40 border-b border-white/5">
            <tr>
              <th className="px-6 py-3">Firma</th>
              <th className="px-6 py-3">Kullanıcı Adı</th>
              <th className="px-6 py-3">Şifre</th>
            </tr>
          </thead>
          <tbody>
            {!hosting || !hosting.company ? (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                  <Server size={32} className="mx-auto mb-3 opacity-20" />
                  Hosting bilgisi girilmemiş. SEO Hazırlık veya Müşteri Dosyası ekranından ekleyebilirsiniz.
                </td>
              </tr>
            ) : (
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4 font-medium text-white">{hosting.company}</td>
                <td className="px-6 py-4 font-mono text-gray-300">{hosting.username || '-'}</td>
                <td className="px-6 py-4 font-mono text-gray-400">
                  {hosting.password ? '••••••••' : '-'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
