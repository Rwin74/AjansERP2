import React from 'react';
import { FileBox, FileImage, FileText, Download } from 'lucide-react';

export const FilesTab = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-xl font-bold mb-1">Müşteri Dosyaları</h2>
        <p className="text-sm text-gray-400">Logolar, briefler ve sözleşme dökümanları.</p>
      </div>
      <button className="btn-primary">Dosya Yükle</button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[
        { name: 'acme_logo_vector.ai', type: 'image', size: '2.4 MB', date: 'Dün' },
        { name: 'seo_analiz_raporu_ekim.pdf', type: 'doc', size: '4.1 MB', date: '3 gün önce' },
        { name: 'stark_kurumsal_kimlik.pdf', type: 'doc', size: '12 MB', date: 'Geçen hafta' },
        { name: 'banner_reklam_tasarimlari.zip', type: 'zip', size: '45 MB', date: '2 hft önce' },
      ].map((file, i) => (
        <div key={i} className="glass-panel p-5 group hover:border-white/20 transition-all cursor-pointer relative">
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-1.5 bg-white/10 rounded hover:bg-white/20 text-white">
              <Download size={14} />
            </button>
          </div>
          
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
            {file.type === 'image' ? <FileImage className="text-pink-400" size={24} /> : 
             file.type === 'doc' ? <FileText className="text-blue-400" size={24} /> : 
             <FileBox className="text-yellow-400" size={24} />}
          </div>
          
          <h4 className="font-medium text-sm text-white truncate" title={file.name}>{file.name}</h4>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>{file.size}</span>
            <span>{file.date}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
