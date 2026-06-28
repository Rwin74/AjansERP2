import React, { useState, useRef } from 'react';
import { useClientStore } from '../../../../store/useClientStore';
import type { ClientFile } from '../../../../store/useClientStore';
import { FileBox, FileImage, FileText, Download, Trash2, Loader2, UploadCloud } from 'lucide-react';
import imageCompression from 'browser-image-compression';

export const FilesTab = () => {
  const { clients, activeClientId, addFileToClient, deleteFileFromClient } = useClientStore();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeClient = clients.find(c => c.id === activeClientId);

  if (!activeClient) return null;

  const files = activeClient.files || [];

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      let finalFile: File | Blob = file;
      
      // Sıkıştırma İşlemi (Sadece görseller için)
      if (file.type.startsWith('image/')) {
        const options = {
          maxSizeMB: 1, // Maksimum 1MB
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        finalFile = await imageCompression(file, options);
      }

      // Base64'e Çevirme
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result as string;
        
        let fileType: ClientFile['type'] = 'other';
        if (finalFile.type.startsWith('image/')) fileType = 'image';
        else if (finalFile.type === 'application/pdf') fileType = 'pdf';
        else if (file.name.endsWith('.doc') || file.name.endsWith('.docx')) fileType = 'doc';
        else if (file.name.endsWith('.zip') || file.name.endsWith('.rar')) fileType = 'zip';

        const sizeInMb = (finalFile.size / (1024 * 1024)).toFixed(2) + ' MB';

        const newFile: ClientFile = {
          id: crypto.randomUUID(),
          name: file.name,
          type: fileType,
          size: sizeInMb,
          date: new Date().toLocaleDateString('tr-TR'),
          base64Data
        };

        addFileToClient(activeClient.id, newFile);
        setIsUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
      };
      reader.readAsDataURL(finalFile);

    } catch (error) {
      console.error('File upload error:', error);
      alert('Dosya yüklenirken veya sıkıştırılırken bir hata oluştu.');
      setIsUploading(false);
    }
  };

  const downloadFile = (e: React.MouseEvent, f: ClientFile) => {
    e.stopPropagation();
    if (!f.base64Data) return;
    const a = document.createElement('a');
    a.href = f.base64Data;
    a.download = f.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const deleteFile = (e: React.MouseEvent, fileId: string) => {
    e.stopPropagation();
    if (window.confirm('Bu dosyayı kalıcı olarak silmek istediğinize emin misiniz?')) {
      deleteFileFromClient(activeClient.id, fileId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Müşteri Dosyaları</h2>
          <p className="text-sm text-gray-400">Vergi levhası, logolar, briefler ve sözleşme dökümanları.</p>
        </div>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileUpload} 
          className="hidden" 
          accept="image/*,.pdf,.doc,.docx,.zip,.rar"
        />
        
        <button 
          onClick={() => fileInputRef.current?.click()} 
          disabled={isUploading}
          className="btn-primary flex items-center gap-2"
        >
          {isUploading ? (
            <><Loader2 size={16} className="animate-spin" /> Yükleniyor & Sıkıştırılıyor...</>
          ) : (
            <><UploadCloud size={16} /> Dosya Yükle</>
          )}
        </button>
      </div>

      {files.length === 0 ? (
        <div className="glass-panel p-16 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
            <UploadCloud size={32} className="text-gray-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">Henüz Dosya Yüklenmemiş</h3>
          <p className="text-gray-400 max-w-md">
            Müşteriye ait vergi levhası, kimlik veya sözleşme dosyalarını yukarıdaki butondan yükleyebilirsiniz. Görseller otomatik olarak sıkıştırılacaktır.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file) => (
            <div key={file.id} className="glass-panel p-5 group hover:border-blue-500/30 transition-all cursor-pointer relative overflow-hidden">
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 z-10 bg-black/80 p-1 rounded-lg backdrop-blur-md">
                <button onClick={(e) => downloadFile(e, file)} className="p-1.5 hover:bg-white/20 rounded text-blue-400 transition-colors" title="İndir">
                  <Download size={14} />
                </button>
                <button onClick={(e) => deleteFile(e, file.id)} className="p-1.5 hover:bg-red-500/20 rounded text-red-400 transition-colors" title="Sil">
                  <Trash2 size={14} />
                </button>
              </div>
              
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 relative">
                {file.type === 'image' && file.base64Data ? (
                  <div className="absolute inset-0 rounded-xl overflow-hidden opacity-30">
                    <img src={file.base64Data} alt="" className="w-full h-full object-cover" />
                  </div>
                ) : null}
                
                {file.type === 'image' ? <FileImage className="text-pink-400 relative z-10" size={24} /> : 
                 file.type === 'pdf' ? <FileText className="text-red-400 relative z-10" size={24} /> : 
                 file.type === 'doc' ? <FileText className="text-blue-400 relative z-10" size={24} /> : 
                 <FileBox className="text-yellow-400 relative z-10" size={24} />}
              </div>
              
              <h4 className="font-medium text-sm text-white truncate" title={file.name}>{file.name}</h4>
              <div className="flex justify-between mt-3 pt-3 border-t border-white/5 text-xs text-gray-500">
                <span className="font-mono">{file.size}</span>
                <span>{file.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
