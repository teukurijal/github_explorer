import { useState } from 'react';
import { User } from '@domain/entities/User';
import { UserSearch } from '@components/UserSearch';
import { UserRepositories } from '@components/UserRepositories';
import { NetworkStatus } from '@components/NetworkStatus';
import { ErrorBoundary } from '@components/ErrorBoundary';
import '@/App.css';

export function App() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const handleBackToSearch = () => {
    setSelectedUser(null);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen w-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-x-hidden">
        {/* Advanced gradient overlays */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Main gradient mesh */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_80%_120%,rgba(120,119,198,0.2),rgba(255,255,255,0))]"></div>

          {/* Animated floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.02%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
        </div>

        <NetworkStatus />

        {/* Hero section with improved typography */}
        <header className="relative z-10 text-center pt-12 pb-8 px-4 sm:pt-15 sm:pb-10">
          <div className="max-w-4xl mx-auto">

            <h1 className="text-5xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                GitHub
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-200 via-pink-200 to-white bg-clip-text text-transparent">
                Explorer
              </span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
              Discover developers and explore their repositories with our modern,
              <span className="text-purple-300 font-medium"> lightning-fast</span> interface
            </p>

          </div>
        </header>

        {/* Main content with improved container */}
        <main className="flex-1 relative z-10 pb-8 mb-8">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            {selectedUser ? (
              <ErrorBoundary>
                <UserRepositories
                  user={selectedUser}
                  onBack={handleBackToSearch}
                />
              </ErrorBoundary>
            ) : (
              <div className="w-full mx-auto">
                <ErrorBoundary>
                  <UserSearch onUserSelect={handleUserSelect} />
                </ErrorBoundary>
              </div>
            )}
          </div>
        </main>

        {/* Enhanced footer */}
        <footer className="relative z-10 text-center py-8 px-4 border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-white/60 text-sm">
                Built with React + TypeScript + Clean Architecture
              </p>
              <div className="flex items-center gap-4 text-white/60 text-sm">
                <span>Powered by GitHub API</span>
                <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                <span>Tailwind CSS</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}