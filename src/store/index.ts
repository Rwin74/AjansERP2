import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface AppState {
  // Types
  firms: any[];
  jobs: any[];
  transactions: any[];
  domains: any[];
  hostings: any[];
  vaultItems: any[];
  proposals: any[];

  // Fetching State
  loading: boolean;
  
  // Actions
  fetchFirms: () => Promise<void>;
  addFirm: (firm: any) => Promise<void>;
  deleteFirm: (id: string) => Promise<void>;

  fetchJobs: () => Promise<void>;
  addJob: (job: any) => Promise<void>;
  updateJobColumn: (id: string, column_id: string) => Promise<void>;
  deleteJob: (id: string) => Promise<void>;

  fetchTransactions: () => Promise<void>;
  addTransaction: (transaction: any) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;

  fetchDomains: () => Promise<void>;
  addDomain: (domain: any) => Promise<void>;
  deleteDomain: (id: string) => Promise<void>;

  fetchHostings: () => Promise<void>;
  addHosting: (hosting: any) => Promise<void>;
  deleteHosting: (id: string) => Promise<void>;

  fetchVaultItems: () => Promise<void>;
  addVaultItem: (item: any) => Promise<void>;
  deleteVaultItem: (id: string) => Promise<void>;

  fetchProposals: () => Promise<void>;
  addProposal: (proposal: any) => Promise<void>;
  deleteProposal: (id: string) => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  firms: [],
  jobs: [],
  transactions: [],
  domains: [],
  hostings: [],
  vaultItems: [],
  proposals: [],
  loading: false,

  fetchFirms: async () => {
    set({ loading: true });
    const { data } = await supabase.from('firms').select('*').order('created_at', { ascending: false });
    if (data) set({ firms: data });
    set({ loading: false });
  },
  addFirm: async (firm) => {
    const { data, error } = await supabase.from('firms').insert(firm).select().single();
    if (error) alert('Müşteri eklenirken hata: ' + error.message);
    if (data && !error) set({ firms: [data, ...get().firms] });
  },
  deleteFirm: async (id) => {
    const { error } = await supabase.from('firms').delete().eq('id', id);
    if (error) alert('Müşteri silinirken hata: ' + error.message);
    else set({ firms: get().firms.filter(f => f.id !== id) });
  },

  fetchJobs: async () => {
    const { data, error } = await supabase.from('jobs').select('*, firms(name)').order('created_at', { ascending: false });
    if (error) console.error(error);
    if (data) set({ jobs: data });
  },
  addJob: async (job) => {
    const { data, error } = await supabase.from('jobs').insert(job).select('*, firms(name)').single();
    if (error) alert('İş eklenirken hata: ' + error.message);
    if (data && !error) set({ jobs: [data, ...get().jobs] });
  },
  updateJobColumn: async (id, column_id) => {
    set({ jobs: get().jobs.map(j => j.id === id ? { ...j, column_id } : j) });
    const { error } = await supabase.from('jobs').update({ column_id }).eq('id', id);
    if (error) alert('İş güncellenirken hata: ' + error.message);
  },
  deleteJob: async (id) => {
    const { error } = await supabase.from('jobs').delete().eq('id', id);
    if (error) alert('İş silinirken hata: ' + error.message);
    else set({ jobs: get().jobs.filter(j => j.id !== id) });
  },

  fetchTransactions: async () => {
    const { data, error } = await supabase.from('transactions').select('*').order('created_at', { ascending: false });
    if (error) console.error(error);
    if (data) set({ transactions: data });
  },
  addTransaction: async (transaction) => {
    const { data, error } = await supabase.from('transactions').insert(transaction).select().single();
    if (error) alert('İşlem eklenirken hata: ' + error.message);
    if (data && !error) set({ transactions: [data, ...get().transactions] });
  },
  deleteTransaction: async (id) => {
    const { error } = await supabase.from('transactions').delete().eq('id', id);
    if (error) alert('İşlem silinirken hata: ' + error.message);
    else set({ transactions: get().transactions.filter(t => t.id !== id) });
  },

  fetchDomains: async () => {
    const { data, error } = await supabase.from('domains').select('*, firms(name)').order('created_at', { ascending: false });
    if (error) console.error(error);
    if (data) set({ domains: data });
  },
  addDomain: async (domain) => {
    const { data, error } = await supabase.from('domains').insert(domain).select('*, firms(name)').single();
    if (error) alert('Domain eklenirken hata: ' + error.message);
    if (data && !error) set({ domains: [data, ...get().domains] });
  },
  deleteDomain: async (id) => {
    const { error } = await supabase.from('domains').delete().eq('id', id);
    if (error) alert('Domain silinirken hata: ' + error.message);
    else set({ domains: get().domains.filter(d => d.id !== id) });
  },

  fetchHostings: async () => {
    const { data, error } = await supabase.from('hostings').select('*').order('created_at', { ascending: false });
    if (error) console.error(error);
    if (data) set({ hostings: data });
  },
  addHosting: async (hosting) => {
    const { data, error } = await supabase.from('hostings').insert(hosting).select().single();
    if (error) alert('Hosting eklenirken hata: ' + error.message);
    if (data && !error) set({ hostings: [data, ...get().hostings] });
  },
  deleteHosting: async (id) => {
    const { error } = await supabase.from('hostings').delete().eq('id', id);
    if (error) alert('Hosting silinirken hata: ' + error.message);
    else set({ hostings: get().hostings.filter(h => h.id !== id) });
  },

  fetchVaultItems: async () => {
    const { data, error } = await supabase.from('vault_items').select('*').order('created_at', { ascending: false });
    if (error) console.error(error);
    if (data) set({ vaultItems: data });
  },
  addVaultItem: async (item) => {
    const { data, error } = await supabase.from('vault_items').insert(item).select().single();
    if (error) alert('Şifre eklenirken hata: ' + error.message);
    if (data && !error) set({ vaultItems: [data, ...get().vaultItems] });
  },
  deleteVaultItem: async (id) => {
    const { error } = await supabase.from('vault_items').delete().eq('id', id);
    if (error) alert('Şifre silinirken hata: ' + error.message);
    else set({ vaultItems: get().vaultItems.filter(v => v.id !== id) });
  },

  fetchProposals: async () => {
    const { data, error } = await supabase.from('proposals').select('*').order('created_at', { ascending: false });
    if (error) console.error(error);
    if (data) set({ proposals: data });
  },
  addProposal: async (proposal) => {
    const { data, error } = await supabase.from('proposals').insert(proposal).select().single();
    if (error) alert('Teklif eklenirken hata: ' + error.message);
    if (data && !error) set({ proposals: [data, ...get().proposals] });
  },
  deleteProposal: async (id) => {
    const { error } = await supabase.from('proposals').delete().eq('id', id);
    if (error) alert('Teklif silinirken hata: ' + error.message);
    else set({ proposals: get().proposals.filter(p => p.id !== id) });
  },
}));
