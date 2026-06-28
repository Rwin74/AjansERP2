import React from 'react';
import { Receipt, FileText } from 'lucide-react';

export const InvoicesTab = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-xl font-bold mb-1">Faturalar</h2>
        <p className="text-sm text-gray-400">e-Fatura entegrasyonu (Yakında).</p>
      </div>
      <button className="btn-primary">Fatura Kes</button>
    </div>

    <div className="glass-panel overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-gray-400 uppercase bg-black/40 border-b border-white/5">
          <tr>
            <th className="px-6 py-3">Fatura No</th>
            <th className="px-6 py-3">Firma</th>
            <th className="px-6 py-3">Tutar (KDV Dahil)</th>
            <th className="px-6 py-3">Tarih</th>
            <th className="px-6 py-3">Durum</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
              Henüz kesilmiş veya bekleyen fatura bulunmuyor.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
