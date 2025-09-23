import { NetworkStatus } from '@domain/valueObjects/NetworkStatus';

export interface NetworkStatusRepository {
  getCurrentStatus(): NetworkStatus;
  subscribeToChanges(callback: (status: NetworkStatus) => void): () => void;
}

export class MonitorNetworkStatusUseCase {
  private networkStatusRepository: NetworkStatusRepository;

  constructor(networkStatusRepository: NetworkStatusRepository) {
    this.networkStatusRepository = networkStatusRepository;
  }

  getCurrentStatus(): NetworkStatus {
    return this.networkStatusRepository.getCurrentStatus();
  }

  subscribeToStatusChanges(callback: (status: NetworkStatus) => void): () => void {
    return this.networkStatusRepository.subscribeToChanges(callback);
  }

  async checkConnectivity(): Promise<NetworkStatus> {
    const currentStatus = this.networkStatusRepository.getCurrentStatus();

    if (currentStatus.isOffline) {
      return NetworkStatus.offline();
    }

    try {
      await fetch('https://api.github.com', {
        method: 'HEAD',
        mode: 'no-cors'
      });
      return NetworkStatus.online();
    } catch {
      return NetworkStatus.offline();
    }
  }
}