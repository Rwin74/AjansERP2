import React from 'react';
import { Key } from 'lucide-react';

export const PasswordVaultTab = () => (
  <div className="glass-panel overflow-hidden">
    <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
      <div>
        <h3 className="font-semibold text-lg text-white">Şifre Kasası</h3>
        <p className="text-xs text-gray-400">Tüm şifreler veritabanında şifreli (encrypted) olarak saklanır.</p>
      </div>
      <button className="btn-primary text-xs py-1">Şifre Ekle</button>
    </div>
    <table className="w-full text-sm text-left">
      <thead className="text-xs text-gray-400 uppercase bg-black/40 border-b border-white/5">
        <tr>
          <th className="px-6 py-3">Platform</th>
          <th className="px-6 py-3">Firma</th>
          <th className="px-6 py-3">Kullanıcı Adı</th>
          <th className="px-6 py-3">Şifre</th>
          <th className="px-6 py-3 text-right">İşlem</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
            Kayıtlı şifre bulunamadı.
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);
