import React from 'react';
import { useNetworkStatus } from '@hooks/useNetworkStatus';
import { ConnectionState } from '@domain/valueObjects/NetworkStatus';
import { MdCheckCircle, MdSignalWifiOff } from 'react-icons/md';

export const NetworkStatus: React.FC = () => {
  const networkStatus = useNetworkStatus();

  if (networkStatus.isOnline) {
    return null;
  }

  return (
    <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 max-w-sm mx-4 animate-[slideDown_0.3s_ease-out] ${
networkStatus.state === ConnectionState.CHECKING
        ? 'animate-[slideDown_0.3s_ease-out,fadeOut_0.5s_ease-in_2.5s_forwards]'
        : ''
    }`}>
      <div className={`relative overflow-hidden rounded-2xl backdrop-blur-2xl shadow-2xl border ${
networkStatus.state === ConnectionState.CHECKING
          ? 'bg-emerald-500/20 border-emerald-400/30 shadow-emerald-500/25'
          : 'bg-red-500/20 border-red-400/30 shadow-red-500/25'
      }`}>
        {/* Gradient glow effect */}
        <div className={`absolute inset-0 ${
networkStatus.state === ConnectionState.CHECKING
            ? 'bg-gradient-to-r from-emerald-500/30 to-green-500/30'
            : 'bg-gradient-to-r from-red-500/30 to-pink-500/30'
        } blur-xl opacity-50`}></div>

        {/* Animated border */}
        <div className={`absolute inset-0 rounded-2xl ${
networkStatus.state === ConnectionState.CHECKING
            ? 'bg-gradient-to-r from-emerald-400/50 to-green-400/50'
            : 'bg-gradient-to-r from-red-400/50 to-pink-400/50'
        } opacity-0 animate-pulse`} style={{
          background: networkStatus.state === ConnectionState.CHECKING
            ? 'linear-gradient(90deg, rgba(16, 185, 129, 0.5) 0%, rgba(34, 197, 94, 0.5) 100%)'
            : 'linear-gradient(90deg, rgba(239, 68, 68, 0.5) 0%, rgba(236, 72, 153, 0.5) 100%)'
        }}></div>

        {/* Content */}
        <div className="relative flex items-center gap-4 px-6 py-4">
          {/* Icon with animated background */}
          <div className={`relative flex items-center justify-center w-10 h-10 rounded-full ${
networkStatus.state === ConnectionState.CHECKING
              ? 'bg-emerald-500/30'
              : 'bg-red-500/30'
          }`}>
            <div className={`absolute inset-0 rounded-full ${
networkStatus.state === ConnectionState.CHECKING
                ? 'bg-emerald-400/50'
                : 'bg-red-400/50'
            } animate-ping`}></div>
            <div className="relative text-lg">
{networkStatus.state === ConnectionState.CHECKING ? (
                <MdCheckCircle className="w-5 h-5 text-emerald-200" />
              ) : (
                <MdSignalWifiOff className="w-5 h-5 text-red-200" />
              )}
            </div>
          </div>

          {/* Message */}
          <div className="flex-1 min-w-0">
            <div className={`font-semibold text-sm ${
networkStatus.state === ConnectionState.CHECKING
                ? 'text-emerald-100'
                : 'text-red-100'
            }`}>
              {networkStatus.state === ConnectionState.CHECKING ? 'Checking Connection' : 'Connection Lost'}
            </div>
            <div className={`text-xs ${
networkStatus.state === ConnectionState.CHECKING
                ? 'text-emerald-200/80'
                : 'text-red-200/80'
            }`}>
              {networkStatus.displayMessage}
            </div>
          </div>

          {/* Action indicator */}
          <div className={`w-2 h-2 rounded-full ${
networkStatus.state === ConnectionState.CHECKING
              ? 'bg-emerald-400'
              : 'bg-red-400'
          } animate-pulse`}></div>
        </div>

        {/* Progress bar for reconnected state */}
        {networkStatus.state === ConnectionState.CHECKING && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500/20">
            <div className="h-full bg-gradient-to-r from-emerald-400 to-green-400 animate-[progress_2.5s_ease-out_forwards]"></div>
          </div>
        )}
      </div>
    </div>
  );
};