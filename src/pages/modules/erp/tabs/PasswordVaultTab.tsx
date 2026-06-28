import React from 'react';
import { useClientStore } from '../../../../store/useClientStore';
import { Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PasswordVaultTab = () => {
  const { clients, activeClientId } = useClientStore();
  const navigate = useNavigate();
  
  const activeClient = clients.find(c => c.id === activeClientId);
  if (!activeClient) return null;

  const prepData = activeClient.prepData || {};

  // Tüm şifreli olabilecek alanları topla
  const vaultItems = [
    { title: 'Hosting', data: prepData.hosting },
    { title: 'Domain', data: prepData.domain },
    { title: 'WordPress Admin', data: prepData.wpAdmin },
    { title: 'FTP Bilgileri', data: prepData.ftp },
    { title: 'Cloudflare', data: prepData.cloudflare },
    { title: 'Google Hesabı', data: prepData.googleAccount },
    { title: 'Sosyal Medya (Instagram)', data: prepData.socialMedia?.instagram },
    { title: 'Sosyal Medya (Facebook)', data: prepData.socialMedia?.facebook },
  ].filter(item => item.data && (item.data.username || item.data.password));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Şifre Kasası</h2>
          <p className="text-sm text-gray-400">Müşteriye ait tüm hesap ve platform şifreleri.</p>
        </div>
        <button onClick={() => navigate('/seo')} className="btn-primary">Şifreleri Düzenle</button>
      </div>

      <div className="glass-panel overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-400 uppercase bg-black/40 border-b border-white/5">
            <tr>
              <th className="px-6 py-4">Platform</th>
              <th className="px-6 py-4">Kullanıcı Adı / Email</th>
              <th className="px-6 py-4">Şifre</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {vaultItems.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-gray-500">
                  <Key size={32} className="mx-auto mb-3 opacity-20" />
                  Kayıtlı hiçbir şifre bulunmuyor. SEO Hazırlık veya Müşteri Dosyası ekranından ekleyebilirsiniz.
                </td>
              </tr>
            ) : (
              vaultItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{item.title}</td>
                  <td className="px-6 py-4 font-mono text-gray-300">{item.data.username || item.data.email || '-'}</td>
                  <td className="px-6 py-4 font-mono text-gray-400">
                    {item.data.password ? '••••••••' : '-'}
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
