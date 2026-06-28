import React from 'react';
import { Search, Plus, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const mockKeywords: any[] = [];

export const KeywordsTab = () => {
  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-bold mb-1">Anahtar Kelime Takibi</h2>
          <p className="text-sm text-gray-400">DataForSEO API entegrasyonu hazır.</p>
        </div>
        <div className="flex w-full md:w-auto gap-3">
          <div className="relative flex-1 md:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input type="text" placeholder="Kelime ara..." className="glass-input w-full pl-9" />
          </div>
          <button className="btn-primary whitespace-nowrap">
            <Plus size={16} /> Yeni Kelime
          </button>
        </div>
      </div>

      <div className="glass-panel overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-400 uppercase bg-black/40 border-b border-white/5">
            <tr>
              <th className="px-6 py-4">Kelime</th>
              <th className="px-6 py-4">Sıralama</th>
              <th className="px-6 py-4">Değişim</th>
              <th className="px-6 py-4">Arama Hacmi</th>
              <th className="px-6 py-4">CPC</th>
              <th className="px-6 py-4">Rekabet</th>
              <th className="px-6 py-4 w-1/3">AI Analizi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {mockKeywords.map((row) => {
              const diff = row.previous - row.rank;
              const diffIcon = diff > 0 ? <TrendingUp size={16} className="text-green-500" /> : 
                               diff < 0 ? <TrendingDown size={16} className="text-red-500" /> : 
                               <Minus size={16} className="text-gray-500" />;
              const diffText = diff > 0 ? `+${diff}` : diff < 0 ? diff : '-';
              const diffColor = diff > 0 ? 'text-green-500' : diff < 0 ? 'text-red-500' : 'text-gray-500';

              return (
                <tr key={row.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{row.keyword}</td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-white text-base">{row.rank}</span>
                    <span className="text-gray-500 text-xs ml-2">/ {row.previous}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-1 font-medium ${diffColor}`}>
                      {diffIcon} {diffText}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{row.volume}</td>
                  <td className="px-6 py-4 text-gray-400">{row.cpc}</td>
                  <td className="px-6 py-4">
                    <span className={`badge ${row.diff === 'Yüksek' ? 'badge-danger' : 'badge-warning'}`}>
                      {row.diff}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs leading-relaxed">{row.ai}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
