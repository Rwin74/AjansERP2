import { useSettingsStore } from '../store/useSettingsStore';

export class GoogleServices {
  static async authenticate(): Promise<boolean> {
    // Mock OAuth flow
    return new Promise(resolve => {
      setTimeout(() => {
        useSettingsStore.getState().setGoogleSettings({
          isConnected: true,
          accountEmail: 'admin@ajans.com'
        });
        resolve(true);
      }, 1000);
    });
  }

  static async getGscProperties(): Promise<any[]> {
    return [
      { id: 'sc-domain:cicektaksi.com', url: 'https://cicektaksi.com' },
      { id: 'sc-domain:onsamakine.com', url: 'https://onsamakine.com' }
    ];
  }

  static async getGaProperties(): Promise<any[]> {
    return [
      { id: 'ga-123456', name: 'Çiçek Taksi GA4' },
      { id: 'ga-654321', name: 'Önsa Makine GA4' }
    ];
  }

  static async getAdsAccounts(): Promise<any[]> {
    return [
      { id: '111-222-3333', name: 'Çiçek Taksi Ads' }
    ];
  }

  static async getGmbLocations(): Promise<any[]> {
    return [
      { id: 'gmb-9876', name: 'Çiçek Taksi Merkez' }
    ];
  }
}
