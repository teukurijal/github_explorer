import React, { useState, useRef } from 'react';
import { FaGithub } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { User } from '@domain/entities/User';
import { useSearchUsers } from '@hooks/useSearchUsers';
import { useDebounced } from '@/hooks/useDebounced';

interface UserSearchProps {
  onUserSelect: (user: User) => void;
}

export const UserSearch: React.FC<UserSearchProps> = ({ onUserSelect }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showResults, setShowResults] = useState(false);

  const debouncedQuery = useDebounced(query, 300);
  const { users, isLoading, error } = useSearchUsers(debouncedQuery);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (debouncedQuery.trim()) {
      setShowResults(true);
      setSelectedIndex(-1);
    } else {
      setShowResults(false);
    }
  }, [debouncedQuery, users.length]);

  const handleClear = () => {
    setQuery('');
    setSelectedIndex(-1);
    setShowResults(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle Ctrl+K shortcut for clearing
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      handleClear();
      return;
    }

    if (!showResults || users.length === 0) {
      // Still handle Escape even when no results
      if (e.key === 'Escape') {
        handleClear();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => prev < users.length - 1 ? prev + 1 : 0);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : users.length - 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleUserSelect(users[selectedIndex]);
        }
        break;
      case 'Escape':
        handleClear();
        break;
    }
  };

  const handleUserSelect = (user: User) => {
    onUserSelect(user);
    setQuery(user.login);
    setSelectedIndex(-1);
  };

  const handleInputFocus = () => {
    if (users.length > 0 || debouncedQuery.trim()) {
      setShowResults(true);
    }
  };

  const handleInputBlur = () => {
    setSelectedIndex(-1);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Search container with enhanced styling */}
      <div className="relative">
        {/* Search input with modern glassmorphism design */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-1 transition-all duration-300 hover:bg-white/15 focus-within:bg-white/15 focus-within:border-purple-400/50 focus-within:shadow-2xl focus-within:shadow-purple-500/25">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg ml-1">
                <FaGithub className="text-white text-xl" />
              </div>

              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                placeholder="Search for GitHub developers..."
                className="flex-1 bg-transparent text-white placeholder-white/60 text-lg px-6 py-4 outline-none font-medium"
                aria-label="Search Github username"
                aria-expanded={showResults}
                aria-haspopup="listbox"
                role="combobox"
              />

              {query && !isLoading && (
                <button
                  onClick={handleClear}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 mr-2 group"
                  aria-label="Clear search (Ctrl+K)"
                  title="Clear search (Ctrl+K)"
                >
                  <MdClose className="text-white/60 group-hover:text-white text-lg transition-colors duration-200" />
                </button>
              )}

              {isLoading && (
                <div className="flex items-center justify-center w-10 h-10 mr-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick tips for mobile */}
        <div className="mt-4 text-center sm:hidden">
          <p className="text-white/60 text-sm">
            💡 Tip: Use arrow keys to navigate • Ctrl+K to clear
          </p>
        </div>
      </div>

      {/* Enhanced error display */}
      {error && (
        <div className="mt-6 bg-red-500/10 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6 text-center" role="alert">
          <div className="text-red-400 text-4xl mb-3">⚠️</div>
          <h3 className="text-red-300 font-semibold mb-2">Oops! Something went wrong</h3>
          <p className="text-red-200/80">{error.userMessage}</p>
        </div>
      )}

      {/* Enhanced search results */}
      {showResults && users.length > 0 && (
        <div
          ref={resultsRef}
          className="top-full left-0 right-0 z-50 mt-4"
          role="listbox"
          aria-label="Search results"
        >
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl shadow-black/25 max-h-96 overflow-y-auto scrollbar-hide">
            {/* Results header */}
            <div className="px-6 py-4 border-b border-white/10 bg-white/5">
              <p className="text-white/80 text-sm font-medium">
                Found {users.length} developer{users.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* User results */}
            <div className="divide-y divide-white/5">
              {users.map((user, index) => (
                <div
                  key={user.id}
                  className={`group relative flex items-center p-6 cursor-pointer transition-all duration-300 ${
                    index === selectedIndex
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 transform translate-x-2'
                      : 'hover:bg-white/5 hover:transform hover:translate-x-1'
                  }`}
                  onClick={() => handleUserSelect(user)}
                  role="option"
                  aria-selected={index === selectedIndex}
                  tabIndex={-1}
                >
                  {/* Selection indicator */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-pink-400 transition-opacity duration-300 ${
                    index === selectedIndex ? 'opacity-100' : 'opacity-0'
                  }`}></div>

                  {/* Avatar with enhanced styling */}
                  <div className="relative mr-4 sm:mr-6">
                    <div className={`absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300 ${
                      index === selectedIndex ? 'opacity-100 scale-110' : 'opacity-0 group-hover:opacity-50'
                    }`}></div>
                    <img
                      src={user.avatarUrl}
                      alt={`${user.login} avatar`}
                      className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-white/20 transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white/20 transition-all duration-300 ${
                      index === selectedIndex ? 'scale-110' : 'scale-0 group-hover:scale-100'
                    }`}></div>
                  </div>

                  {/* User info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-white text-lg truncate">
                        {user.login}
                      </h3>
                      <div className="flex-shrink-0">
                        <FaGithub className="text-white/40 text-sm" />
                      </div>
                    </div>
                    {user.name && (
                      <p className="text-white/70 text-sm mb-2 truncate">
                        {user.name}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-white/50">
                      <span>👥 Followers</span>
                      <span>📦 Repos</span>
                    </div>
                  </div>

                  {/* Action indicator */}
                  <div className="flex-shrink-0 ml-4">
                    <div className={`w-8 h-8 rounded-full border-2 border-white/20 flex items-center justify-center transition-all duration-300 ${
                      index === selectedIndex
                        ? 'bg-white/20 border-white/40'
                        : 'group-hover:bg-white/10 group-hover:border-white/30'
                    }`}>
                      <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Results footer */}
            <div className="px-6 py-4 bg-white/5 border-t border-white/10">
              <p className="text-white/60 text-xs text-center">
                Use ↑↓ arrow keys to navigate • Enter to select • Ctrl+K to clear
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced no results state */}
      {debouncedQuery.trim() && users.length === 0 && !isLoading && !error && (
        <div className="mt-6 text-center">
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-white font-bold text-xl mb-3">No developers found</h3>
            <p className="text-white/70 mb-6 max-w-md mx-auto">
              We couldn't find any GitHub users matching{' '}
              <span className="text-purple-300 font-semibold">"{debouncedQuery}"</span>
            </p>
            <div className="space-y-2 text-white/50 text-sm">
              <p>💡 Try searching for:</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {['octocat', 'torvalds', 'gaearon', 'sindresorhus'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setQuery(suggestion)}
                    className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs transition-colors duration-200"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};