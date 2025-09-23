import { useState, useEffect } from 'react';
import { NetworkStatus } from '@domain/valueObjects/NetworkStatus';
import { MonitorNetworkStatusUseCase } from '@application/useCases/MonitorNetworkStatusUseCase';
import { container } from '@infrastructure/container/Container';

export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>(NetworkStatus.online());

  const monitorNetworkStatusUseCase = container.get<MonitorNetworkStatusUseCase>('monitorNetworkStatusUseCase');

  useEffect(() => {
    const currentStatus = monitorNetworkStatusUseCase.getCurrentStatus();
    setNetworkStatus(currentStatus);

    const unsubscribe = monitorNetworkStatusUseCase.subscribeToStatusChanges((status) => {
      setNetworkStatus(status);
    });

    return unsubscribe;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return networkStatus;
};