import React, { useState } from 'react';
import { useClientStore } from '../../../../store/useClientStore';
import type { ClientNote } from '../../../../store/useClientStore';
import { StickyNote, Plus, Trash2, X, Check } from 'lucide-react';

const COLORS = [
  { id: 'blue', bg: 'bg-blue-500/30', border: 'border-blue-500', text: 'text-blue-400', bar: 'bg-blue-500/50' },
  { id: 'emerald', bg: 'bg-emerald-500/30', border: 'border-emerald-500', text: 'text-emerald-400', bar: 'bg-emerald-500/50' },
  { id: 'yellow', bg: 'bg-yellow-500/30', border: 'border-yellow-500', text: 'text-yellow-400', bar: 'bg-yellow-500/50' },
  { id: 'orange', bg: 'bg-orange-500/30', border: 'border-orange-500', text: 'text-orange-400', bar: 'bg-orange-500/50' },
  { id: 'red', bg: 'bg-red-500/30', border: 'border-red-500', text: 'text-red-400', bar: 'bg-red-500/50' },
  { id: 'purple', bg: 'bg-purple-500/30', border: 'border-purple-500', text: 'text-purple-400', bar: 'bg-purple-500/50' }
];

export const NotesTab = () => {
  const { clients, activeClientId, addNoteToClient, deleteNoteFromClient } = useClientStore();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState('blue');

  const activeClient = clients.find(c => c.id === activeClientId);

  if (!activeClient) return null;

  const notes = activeClient.notes || [];

  const handleAdd = () => {
    if (!title.trim() || !content.trim()) return;
    
    const newNote: ClientNote = {
      id: crypto.randomUUID(),
      title,
      content,
      color,
      date: new Date().toLocaleDateString('tr-TR')
    };

    addNoteToClient(activeClient.id, newNote);
    setIsAdding(false);
    setTitle('');
    setContent('');
    setColor('blue');
  };

  const handleDelete = (e: React.MouseEvent, noteId: string) => {
    e.stopPropagation();
    if (window.confirm('Bu notu silmek istediğinize emin misiniz?')) {
      deleteNoteFromClient(activeClient.id, noteId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold mb-1">Müşteri Notları</h2>
          <p className="text-sm text-gray-400">Toplantı özetleri ve özel notlar.</p>
        </div>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="btn-primary flex items-center gap-2">
            <Plus size={16}/> Yeni Not
          </button>
        )}
      </div>

      {isAdding && (
        <div className="glass-panel p-6 mb-8 border border-blue-500/30">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-white">Yeni Not Ekle</h3>
            <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Başlık</label>
              <input 
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="glass-input w-full"
                placeholder="Örn: Ekim Ayı Değerlendirmesi"
                autoFocus
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">Not İçeriği</label>
              <textarea 
                value={content}
                onChange={e => setContent(e.target.value)}
                className="glass-input w-full min-h-[120px]"
                placeholder="Notlarınızı buraya yazın..."
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2">Renk (Öncelik/Kategori)</label>
              <div className="flex gap-3">
                {COLORS.map(c => (
                  <button 
                    key={c.id}
                    onClick={() => setColor(c.id)}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      color === c.id ? `${c.border} scale-110` : 'border-transparent opacity-50 hover:opacity-100'
                    } ${c.bg}`}
                  >
                    {color === c.id && <Check size={14} className="text-white" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                İptal
              </button>
              <button onClick={handleAdd} className="btn-primary py-2 px-6">
                Notu Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

      {notes.length === 0 && !isAdding ? (
        <div className="glass-panel p-16 text-center">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
            <StickyNote size={24} className="text-gray-500" />
          </div>
          <h3 className="text-lg font-bold mb-2">Henüz Not Eklenmemiş</h3>
          <p className="text-gray-400 text-sm max-w-sm mx-auto mb-6">Müşteriyle ilgili toplantı özetlerini veya özel bilgileri buradan ekleyebilirsiniz.</p>
          <button onClick={() => setIsAdding(true)} className="btn-primary px-6 py-2 mx-auto">İlk Notu Ekle</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => {
            const colorConfig = COLORS.find(c => c.id === note.color) || COLORS[0];
            return (
              <div key={note.id} className="glass-panel p-6 flex flex-col group hover:scale-[1.02] transition-transform relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1 h-full ${colorConfig.bar}`} />
                
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => handleDelete(e, note.id)}
                    className="p-1.5 hover:bg-red-500/20 rounded text-red-400 transition-colors" 
                    title="Sil"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="flex justify-between items-start mb-3 pl-2 pr-6">
                  <h3 className="font-semibold text-white">{note.title}</h3>
                  <StickyNote size={16} className={`${colorConfig.text} shrink-0 mt-1`} />
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-4 pl-2 flex-1 whitespace-pre-wrap">
                  {note.content}
                </p>
                <div className="text-xs text-gray-500 pl-2 mt-auto">
                  {note.date}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
