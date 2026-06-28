import React from 'react';
import { FileSignature, Download } from 'lucide-react';

export const OffersTab = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-xl font-bold mb-1">Teklifler & Sözleşmeler</h2>
        <p className="text-sm text-gray-400">Oluşturulan teklifler ve müşteri onay durumları.</p>
      </div>
      <button className="btn-primary">Yeni Teklif Oluştur</button>
    </div>

    <div className="glass-panel overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-400 uppercase bg-black/40 border-b border-white/5">
          <tr>
            <th className="px-6 py-3">Teklif No</th>
            <th className="px-6 py-3">Firma Adayı</th>
            <th className="px-6 py-3">Tutar</th>
            <th className="px-6 py-3">Tarih</th>
            <th className="px-6 py-3">Durum</th>
            <th className="px-6 py-3 text-right">İşlem</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
              Henüz teklif veya sözleşme bulunmuyor.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
