import React from 'react';
import { Server, Activity } from 'lucide-react';

export const HostingTab = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-xl font-bold mb-1">Hosting Yönetimi</h2>
        <p className="text-sm text-gray-400">Sunucu kaynakları ve bitiş tarihleri.</p>
      </div>
      <button className="btn-primary">Yeni Sunucu Ekle</button>
    </div>

    <div className="glass-panel overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-400 uppercase bg-black/40 border-b border-white/5">
          <tr>
            <th className="px-6 py-3">Firma</th>
            <th className="px-6 py-3">IP Adresi</th>
            <th className="px-6 py-3">Paket</th>
            <th className="px-6 py-3">Kullanım</th>
            <th className="px-6 py-3">Bitiş Tarihi</th>
            <th className="px-6 py-3">Durum</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
              Kayıtlı sunucu bulunamadı.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
