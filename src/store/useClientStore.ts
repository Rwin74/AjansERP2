import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface HealthScores {
  seo: number;
  google: number;
  teknik: number;
  icerik: number;
  guvenlik: number;
  performans: number;
  business: number;
  toplam: number;
}

export interface TimelineEvent {
  id: string;
  timeLabel: string;
  content: string;
  type: 'success' | 'warning' | 'info' | 'error';
}

export interface AITask {
  id: string;
  title: string;
  priority: 'Kritik' | 'Yüksek' | 'Orta' | 'Düşük';
  estimatedMinutes: number;
  seoImpact: number; // 1-5
  reason: string;
  assignee: string;
  status: 'Açık' | 'Tamamlandı';
  actionType: 'email' | 'publish' | 'apply_wp' | 'create_task' | 'scan' | 'fix';
  actionData?: any;
}

export interface Client {
  id: string;
  name: string;
  createdAt: string;
  seoData?: any;
  erpData?: any;
  prepData?: any;
  integrations?: {
    gscPropertyUrl?: string;
    gaPropertyId?: string;
    adsAccountId?: string;
    gmbLocationId?: string;
  };
  healthScores: HealthScores;
  timelineEvents: TimelineEvent[];
  aiTasks: AITask[];
}

interface ClientStore {
  clients: Client[];
  activeClientId: string | null;
  addClient: (client: Client) => void;
  setActiveClient: (id: string | null) => void;
  updateClient: (id: string, data: Partial<Client>) => void;
  completeTask: (clientId: string, taskId: string) => void;
}

const INITIAL_CLIENTS: Client[] = [
  {
    id: "04b9f10a-bd8e-4aae-a3ac-a3238fb7e86d",
    name: "GünBoyu",
    createdAt: "2026-06-27T11:43:37.261667+00:00",
    erpData: { sector: "Lojistik", contact_person: "Akif", phone: "05052536534", email: "" },
    healthScores: { seo: 85, google: 90, teknik: 82, icerik: 75, guvenlik: 95, performans: 80, business: 85, toplam: 85 },
    timelineEvents: [],
    aiTasks: []
  },
  {
    id: "821c2862-6e57-48e8-96a5-c1ddbf163df5",
    name: "Çiçek taksi",
    createdAt: "2026-06-27T13:40:06.393154+00:00",
    erpData: { sector: "Ticari Taksi Tekirdağ Çerkezköy ilçesi", contact_person: "Serhat", phone: "05325149682", email: "" },
    healthScores: { seo: 88, google: 92, teknik: 85, icerik: 78, guvenlik: 96, performans: 84, business: 88, toplam: 87 },
    timelineEvents: [],
    aiTasks: []
  },
  {
    id: "d252e30c-b22d-4884-914a-d7aa260192db",
    name: "Emir Rent a car",
    createdAt: "2026-06-27T13:56:24.151034+00:00",
    erpData: { sector: "Rent a car", contact_person: "İsa", phone: "", email: "" },
    healthScores: { seo: 92, google: 95, teknik: 88, icerik: 85, guvenlik: 98, performans: 90, business: 94, toplam: 92 },
    timelineEvents: [],
    aiTasks: []
  },
  {
    id: "792b945a-e6f4-4d6a-bbf1-99d142376162",
    name: "Akgün Oto kurtarma",
    createdAt: "2026-06-27T14:19:13.838273+00:00",
    erpData: { sector: "Oto kurtarma", contact_person: "Mert Akgün", phone: "0552 082 86 19", email: "" },
    healthScores: { seo: 80, google: 85, teknik: 78, icerik: 70, guvenlik: 90, performans: 75, business: 82, toplam: 80 },
    timelineEvents: [],
    aiTasks: []
  },
  {
    id: "833e6cde-47cf-4a34-a404-4cb2f1175f48",
    name: "Kodil",
    createdAt: "2026-06-27T14:22:23.603207+00:00",
    erpData: { sector: "Dil ve konuşma", contact_person: "Enes", phone: "0 538 770 55 94", email: "" },
    healthScores: { seo: 87, google: 89, teknik: 84, icerik: 80, guvenlik: 94, performans: 86, business: 89, toplam: 87 },
    timelineEvents: [],
    aiTasks: []
  }
];

export const useClientStore = create<ClientStore>()(
  persist(
    (set) => ({
      clients: INITIAL_CLIENTS,
      activeClientId: null,
      addClient: (client) => set((state) => ({ clients: [client, ...state.clients] })),
      setActiveClient: (id) => set({ activeClientId: id }),
      updateClient: (id, data) => set((state) => ({
        clients: state.clients.map(c => c.id === id ? { ...c, ...data } : c)
      })),
      completeTask: (clientId, taskId) => set((state) => ({
        clients: state.clients.map(c => {
          if (c.id !== clientId) return c;
          return {
            ...c,
            aiTasks: c.aiTasks.map(t => t.id === taskId ? { ...t, status: 'Tamamlandı' as const } : t)
          };
        })
      }))
    }),
    {
      name: 'ajansos-client-storage-v3', // saves to localStorage (versioned to wipe old mocks)
    }
  )
);
