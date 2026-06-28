import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { StateStorage } from 'zustand/middleware';
import { get, set, del } from 'idb-keyval';

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
  status: 'Açık' | 'Devam Ediyor' | 'Tamamlandı';
  actionType: 'email' | 'publish' | 'apply_wp' | 'create_task' | 'scan' | 'fix';
  actionData?: any;
}

export interface ClientFile {
  id: string;
  name: string;
  type: 'image' | 'doc' | 'pdf' | 'zip' | 'other';
  size: string;
  date: string;
  base64Data?: string;
}

export interface ClientNote {
  id: string;
  title: string;
  content: string;
  date: string;
  color: string;
}

export interface Job {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  date: string;
}

export interface Offer {
  id: string;
  offerNo: string;
  title: string;
  amount: number;
  date: string;
  status: 'Beklemede' | 'Onaylandı' | 'Reddedildi';
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  amount: number;
  date: string;
  status: 'Ödendi' | 'Bekliyor';
}

export interface FinanceTransaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
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
    googleAnalyticsId?: string;
    searchConsoleUrl?: string;
  };
  healthScores: HealthScores;
  timelineEvents: TimelineEvent[];
  aiTasks: AITask[];
  files?: ClientFile[];
  notes?: ClientNote[];
  jobs?: Job[];
  offers?: Offer[];
  invoices?: Invoice[];
  financeTransactions?: FinanceTransaction[];
}

interface ClientStore {
  clients: Client[];
  activeClientId: string | null;
  addClient: (client: Client) => void;
  setActiveClient: (id: string | null) => void;
  updateClient: (id: string, data: Partial<Client>) => void;
  deleteClient: (id: string) => void;
  completeTask: (clientId: string, taskId: string) => void;
  updateAITaskStatus: (clientId: string, taskId: string, status: AITask['status']) => void;
  addFileToClient: (clientId: string, file: ClientFile) => void;
  deleteFileFromClient: (clientId: string, fileId: string) => void;
  addNoteToClient: (clientId: string, note: ClientNote) => void;
  deleteNoteFromClient: (clientId: string, noteId: string) => void;
  
  // ERP Actions
  addJob: (clientId: string, job: Job) => void;
  updateJobStatus: (clientId: string, jobId: string, status: Job['status']) => void;
  deleteJob: (clientId: string, jobId: string) => void;
  
  addOffer: (clientId: string, offer: Offer) => void;
  deleteOffer: (clientId: string, offerId: string) => void;
  
  addInvoice: (clientId: string, invoice: Invoice) => void;
  deleteInvoice: (clientId: string, invoiceId: string) => void;
  
  addTransaction: (clientId: string, transaction: FinanceTransaction) => void;
  deleteTransaction: (clientId: string, transactionId: string) => void;
}

const idbStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return (await get(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await set(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await del(name);
  },
};

const INITIAL_CLIENTS: Client[] = [
  {
    id: "04b9f10a-bd8e-4aae-a3ac-a3238fb7e86d",
    name: "GünBoyu",
    createdAt: "2026-06-27T11:43:37.261667+00:00",
    erpData: { sector: "Lojistik", contact_person: "Akif", phone: "05052536534", email: "" },
    healthScores: { seo: 0, google: 0, teknik: 0, icerik: 0, guvenlik: 0, performans: 0, business: 0, toplam: 0 },
    timelineEvents: [],
    aiTasks: []
  },
  {
    id: "821c2862-6e57-48e8-96a5-c1ddbf163df5",
    name: "Çiçek taksi",
    createdAt: "2026-06-27T13:40:06.393154+00:00",
    erpData: { sector: "Ticari Taksi Tekirdağ Çerkezköy ilçesi", contact_person: "Serhat", phone: "05325149682", email: "" },
    healthScores: { seo: 0, google: 0, teknik: 0, icerik: 0, guvenlik: 0, performans: 0, business: 0, toplam: 0 },
    timelineEvents: [],
    aiTasks: []
  },
  {
    id: "d252e30c-b22d-4884-914a-d7aa260192db",
    name: "Emir Rent a car",
    createdAt: "2026-06-27T13:56:24.151034+00:00",
    erpData: { sector: "Rent a car", contact_person: "İsa", phone: "", email: "" },
    healthScores: { seo: 0, google: 0, teknik: 0, icerik: 0, guvenlik: 0, performans: 0, business: 0, toplam: 0 },
    timelineEvents: [],
    aiTasks: []
  },
  {
    id: "792b945a-e6f4-4d6a-bbf1-99d142376162",
    name: "Akgün Oto kurtarma",
    createdAt: "2026-06-27T14:19:13.838273+00:00",
    erpData: { sector: "Oto kurtarma", contact_person: "Mert Akgün", phone: "0552 082 86 19", email: "" },
    healthScores: { seo: 0, google: 0, teknik: 0, icerik: 0, guvenlik: 0, performans: 0, business: 0, toplam: 0 },
    timelineEvents: [],
    aiTasks: []
  },
  {
    id: "833e6cde-47cf-4a34-a404-4cb2f1175f48",
    name: "Kodil",
    createdAt: "2026-06-27T14:22:23.603207+00:00",
    erpData: { sector: "Dil ve konuşma", contact_person: "Enes", phone: "0 538 770 55 94", email: "" },
    healthScores: { seo: 0, google: 0, teknik: 0, icerik: 0, guvenlik: 0, performans: 0, business: 0, toplam: 0 },
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
      deleteClient: (id) => set((state) => ({
        clients: state.clients.filter(c => c.id !== id),
        activeClientId: state.activeClientId === id ? null : state.activeClientId
      })),
      completeTask: (clientId, taskId) => set((state) => ({
        clients: state.clients.map(c => {
          if (c.id !== clientId) return c;
          return {
            ...c,
            aiTasks: c.aiTasks.map(t => t.id === taskId ? { ...t, status: 'Tamamlandı' as const } : t)
          };
        })
      })),
      updateAITaskStatus: (clientId, taskId, status) => set((state) => ({
        clients: state.clients.map(c => {
          if (c.id !== clientId) return c;
          return {
            ...c,
            aiTasks: c.aiTasks.map(t => t.id === taskId ? { ...t, status } : t)
          };
        })
      })),
      addFileToClient: (clientId, file) => set((state) => ({
        clients: state.clients.map(c => {
          if (c.id !== clientId) return c;
          return { ...c, files: [file, ...(c.files || [])] };
        })
      })),
      deleteFileFromClient: (clientId, fileId) => set((state) => ({
        clients: state.clients.map(c => {
          if (c.id !== clientId) return c;
          return { ...c, files: (c.files || []).filter(f => f.id !== fileId) };
        })
      })),
      addNoteToClient: (clientId, note) => set((state) => ({
        clients: state.clients.map(c => {
          if (c.id !== clientId) return c;
          return { ...c, notes: [note, ...(c.notes || [])] };
        })
      })),
      deleteNoteFromClient: (clientId, noteId) => set((state) => ({
        clients: state.clients.map(c => {
          if (c.id !== clientId) return c;
          return { ...c, notes: (c.notes || []).filter(n => n.id !== noteId) };
        })
      })),
      addJob: (clientId, job) => set((state) => ({
        clients: state.clients.map(c => c.id === clientId ? { ...c, jobs: [job, ...(c.jobs || [])] } : c)
      })),
      updateJobStatus: (clientId, jobId, status) => set((state) => ({
        clients: state.clients.map(c => {
          if (c.id !== clientId) return c;
          return { ...c, jobs: (c.jobs || []).map(j => j.id === jobId ? { ...j, status } : j) };
        })
      })),
      deleteJob: (clientId, jobId) => set((state) => ({
        clients: state.clients.map(c => c.id === clientId ? { ...c, jobs: (c.jobs || []).filter(j => j.id !== jobId) } : c)
      })),
      addOffer: (clientId, offer) => set((state) => ({
        clients: state.clients.map(c => c.id === clientId ? { ...c, offers: [offer, ...(c.offers || [])] } : c)
      })),
      deleteOffer: (clientId, offerId) => set((state) => ({
        clients: state.clients.map(c => c.id === clientId ? { ...c, offers: (c.offers || []).filter(o => o.id !== offerId) } : c)
      })),
      addInvoice: (clientId, invoice) => set((state) => ({
        clients: state.clients.map(c => c.id === clientId ? { ...c, invoices: [invoice, ...(c.invoices || [])] } : c)
      })),
      deleteInvoice: (clientId, invoiceId) => set((state) => ({
        clients: state.clients.map(c => c.id === clientId ? { ...c, invoices: (c.invoices || []).filter(i => i.id !== invoiceId) } : c)
      })),
      addTransaction: (clientId, transaction) => set((state) => ({
        clients: state.clients.map(c => c.id === clientId ? { ...c, financeTransactions: [transaction, ...(c.financeTransactions || [])] } : c)
      })),
      deleteTransaction: (clientId, transactionId) => set((state) => ({
        clients: state.clients.map(c => c.id === clientId ? { ...c, financeTransactions: (c.financeTransactions || []).filter(t => t.id !== transactionId) } : c)
      }))
    }),
    {
      name: 'ajansos-client-storage-v5', // Upgraded to v5 for IndexedDB switch
      storage: createJSONStorage(() => idbStorage),
    }
  )
);
