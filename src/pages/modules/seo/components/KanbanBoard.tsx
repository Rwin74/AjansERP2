import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Target, Clock, CheckCircle2, MoreHorizontal, MessageSquare } from 'lucide-react';
import { useClientStore, AITask } from '../../../../store/useClientStore';

interface KanbanBoardProps {
  clientId: string;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({ clientId }) => {
  const { clients, updateAITaskStatus } = useClientStore();
  const client = clients.find(c => c.id === clientId);
  const tasks = client?.aiTasks || [];

  const columns = {
    'Açık': tasks.filter(t => t.status === 'Açık'),
    'Devam Ediyor': tasks.filter(t => t.status === 'Devam Ediyor'),
    'Tamamlandı': tasks.filter(t => t.status === 'Tamamlandı'),
  };

  const getPriorityColor = (p: string) => {
    if (p === 'Kritik') return 'text-red-400 bg-red-400/10 border-red-400/20';
    if (p === 'Yüksek') return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
    if (p === 'Orta') return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const { source, destination, draggableId } = result;
    
    if (source.droppableId !== destination.droppableId) {
      updateAITaskStatus(clientId, draggableId, destination.droppableId as AITask['status']);
    }
  };

  return (
    <div className="glass-panel p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Target size={18} className="text-red-400" />
          Müşteri AI Görevleri (Kanban)
        </h3>
        <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-400">{tasks.length} Toplam Görev</span>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(columns).map(([columnId, columnTasks]) => (
            <div key={columnId} className="flex flex-col">
              <h4 className="text-sm font-semibold mb-4 text-gray-300 flex items-center justify-between">
                {columnId} 
                <span className="bg-white/5 px-2 py-0.5 rounded text-xs">{columnTasks.length}</span>
              </h4>
              <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`flex-1 min-h-[150px] p-2 rounded-xl transition-colors ${
                      snapshot.isDraggingOver ? 'bg-white/5 border border-dashed border-white/20' : 'bg-transparent'
                    }`}
                  >
                    {columnTasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`p-4 bg-[#1a1a1c] border border-white/10 rounded-xl mb-3 shadow-lg hover:border-white/20 transition-all ${
                              snapshot.isDragging ? 'opacity-80 scale-[1.02] rotate-1' : ''
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className={`text-[10px] px-2 py-0.5 rounded-md border font-medium ${getPriorityColor(task.priority)}`}>
                                {task.priority}
                              </span>
                              <button className="text-gray-500 hover:text-white"><MoreHorizontal size={14}/></button>
                            </div>
                            <h4 className="text-sm font-medium text-white mb-2 leading-tight">{task.title}</h4>
                            
                            <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-2">
                              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                <Clock size={12} /> {task.estimatedMinutes} Dk
                              </div>
                              {task.status === 'Tamamlandı' ? (
                                <CheckCircle2 size={16} className="text-green-500" />
                              ) : (
                                <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-bold">
                                  AI
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};
