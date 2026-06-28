import React from 'react';
import { PenTool, FileText, CheckCircle2 } from 'lucide-react';

export const ContentTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">İçerik Yönetimi</h2>
          <p className="text-sm text-gray-400">Planlanan ve yayındaki içerikler.</p>
        </div>
        <button className="btn-primary">Yeni İçerik Planla</button>
      </div>

      <div className="glass-panel overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-400 uppercase bg-black/40 border-b border-white/5">
            <tr>
              <th className="px-6 py-4">Başlık</th>
              <th className="px-6 py-4">Kelime Odak</th>
              <th className="px-6 py-4">Durum</th>
              <th className="px-6 py-4">Tarih</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr>
              <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                Henüz planlanmış bir içerik bulunmuyor.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
