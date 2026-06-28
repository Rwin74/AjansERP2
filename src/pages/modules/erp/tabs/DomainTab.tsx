import React from 'react';
import { Globe, AlertTriangle } from 'lucide-react';

export const DomainTab = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-xl font-bold mb-1">Domain Yönetimi</h2>
        <p className="text-sm text-gray-400">Alan adı bitiş süreleri ve otomatik uyarılar.</p>
      </div>
      <button className="btn-primary">Domain Ekle</button>
    </div>

    {/* 
    <div className="glass-panel p-4 bg-yellow-500/10 border-yellow-500/20 flex items-start gap-3 mb-6">
      <AlertTriangle size={20} className="text-yellow-500 mt-0.5" />
      <div>
        <h4 className="font-semibold text-yellow-500 text-sm">Yaklaşan Yenilemeler</h4>
        <p className="text-xs text-yellow-200/70 mt-1">Süresi dolmak üzere olan alan adı bulunmuyor.</p>
      </div>
    </div> 
    */}

    <div className="glass-panel overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-400 uppercase bg-black/40 border-b border-white/5">
          <tr>
            <th className="px-6 py-3">Domain</th>
            <th className="px-6 py-3">Firma</th>
            <th className="px-6 py-3">Kayıt Firması</th>
            <th className="px-6 py-3">Bitiş Tarihi</th>
            <th className="px-6 py-3">Kalan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
              Kayıtlı alan adı bulunamadı.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
