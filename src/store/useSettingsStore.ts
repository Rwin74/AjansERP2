import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SettingsStore {
  gemini: {
    apiKey: string;
    model: string;
    isConnected: boolean;
  };
  dataForSeo: {
    username: string;
    apiKey: string;
    isConnected: boolean;
  };
  google: {
    isConnected: boolean;
    accountEmail: string | null;
  };
  setGeminiSettings: (settings: Partial<SettingsStore['gemini']>) => void;
  setDataForSeoSettings: (settings: Partial<SettingsStore['dataForSeo']>) => void;
  setGoogleSettings: (settings: Partial<SettingsStore['google']>) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      gemini: {
        apiKey: '',
        model: 'gemini-2.5-flash',
        isConnected: false,
      },
      dataForSeo: {
        username: '',
        apiKey: '',
        isConnected: false,
      },
      google: {
        isConnected: false,
        accountEmail: null,
      },
      setGeminiSettings: (s) => set((state) => ({ gemini: { ...state.gemini, ...s } })),
      setDataForSeoSettings: (s) => set((state) => ({ dataForSeo: { ...state.dataForSeo, ...s } })),
      setGoogleSettings: (s) => set((state) => ({ google: { ...state.google, ...s } })),
    }),
    {
      name: 'ajansos-settings-storage',
    }
  )
);
