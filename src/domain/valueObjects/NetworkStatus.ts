export const ConnectionState = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  CHECKING: 'checking'
} as const;

export type ConnectionState = typeof ConnectionState[keyof typeof ConnectionState];

export class NetworkStatus {
  readonly state: ConnectionState;
  readonly lastOnlineAt?: Date;

  constructor(
    state: ConnectionState,
    lastOnlineAt?: Date
  ) {
    this.state = state;
    this.lastOnlineAt = lastOnlineAt;
  }

  static online(): NetworkStatus {
    return new NetworkStatus(ConnectionState.ONLINE);
  }

  static offline(): NetworkStatus {
    return new NetworkStatus(ConnectionState.OFFLINE, new Date());
  }

  static checking(): NetworkStatus {
    return new NetworkStatus(ConnectionState.CHECKING);
  }

  get isOnline(): boolean {
    return this.state === ConnectionState.ONLINE;
  }

  get isOffline(): boolean {
    return this.state === ConnectionState.OFFLINE;
  }

  get isChecking(): boolean {
    return this.state === ConnectionState.CHECKING;
  }

  get displayMessage(): string {
    switch (this.state) {
      case ConnectionState.ONLINE:
        return 'Connected';
      case ConnectionState.OFFLINE:
        return 'No internet connection';
      case ConnectionState.CHECKING:
        return 'Checking connection...';
      default:
        return 'Unknown status';
    }
  }
}