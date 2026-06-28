import React from 'react';
import { StickyNote, Plus } from 'lucide-react';

export const NotesTab = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-xl font-bold mb-1">Müşteri Notları</h2>
        <p className="text-sm text-gray-400">Toplantı özetleri ve özel notlar.</p>
      </div>
      <button className="btn-primary"><Plus size={16}/> Yeni Not</button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { title: 'Acme Corp Aylık Toplantı', date: '12 Eki 2023', content: 'Müşteri SEO trafiğinden memnun. Önümüzdeki ay e-ticaret sayfalarına ağırlık verilecek. Ads bütçesi %20 artırıldı.', color: 'blue' },
        { title: 'Stark Ind. Tasarım Revizesi', date: '10 Eki 2023', content: 'Bannerlarda kırmızı renk ağırlıklı isteniyor. Cuma gününe kadar teslim.', color: 'red' },
        { title: 'Genel Hatırlatma', date: '05 Eki 2023', content: 'Tüm sitelerin SSL sertifikaları Cuma günü topluca yenilenecek.', color: 'yellow' },
      ].map((note, i) => (
        <div key={i} className="glass-panel p-6 flex flex-col group hover:scale-[1.02] transition-transform cursor-pointer relative overflow-hidden">
          <div className={`absolute top-0 left-0 w-1 h-full bg-${note.color}-500/50`} />
          <div className="flex justify-between items-start mb-3 pl-2">
            <h3 className="font-semibold text-white">{note.title}</h3>
            <StickyNote size={16} className={`text-${note.color}-500/50`} />
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-4 pl-2 flex-1">
            {note.content}
          </p>
          <div className="text-xs text-gray-500 pl-2 mt-auto">
            {note.date}
          </div>
        </div>
      ))}
    </div>
  </div>
);
