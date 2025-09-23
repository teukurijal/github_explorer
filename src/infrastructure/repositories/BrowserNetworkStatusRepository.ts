import type { NetworkStatusRepository } from '@application/useCases/MonitorNetworkStatusUseCase';
import { NetworkStatus } from '@domain/valueObjects/NetworkStatus';

export class BrowserNetworkStatusRepository implements NetworkStatusRepository {
  private listeners: ((status: NetworkStatus) => void)[] = [];

  constructor() {
    this.setupEventListeners();
  }

  getCurrentStatus(): NetworkStatus {
    return navigator.onLine ? NetworkStatus.online() : NetworkStatus.offline();
  }

  subscribeToChanges(callback: (status: NetworkStatus) => void): () => void {
    this.listeners.push(callback);

    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private setupEventListeners(): void {
    const handleOnline = () => {
      const status = NetworkStatus.online();
      this.notifyListeners(status);
    };

    const handleOffline = () => {
      const status = NetworkStatus.offline();
      this.notifyListeners(status);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
  }

  private notifyListeners(status: NetworkStatus): void {
    this.listeners.forEach(listener => listener(status));
  }
}