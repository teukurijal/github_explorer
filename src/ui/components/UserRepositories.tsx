import React from 'react';
import { User } from '@domain/entities/User';
import { Repository } from '@domain/entities/Repository';
import { useUserRepositories } from '@hooks/useUserRepositories';

interface UserRepositoriesProps {
  user: User;
  onBack: () => void;
}

export const UserRepositories: React.FC<UserRepositoriesProps> = ({ user, onBack }) => {
  const { repositories, isLoading, error, refetch } = useUserRepositories(user);

  if (isLoading) {
    return (
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl shadow-black/25">
        <UserHeader user={user} onBack={onBack} />
        <div className="text-center py-20 px-8">
          <div className="relative mx-auto mb-6 w-16 h-16">
            <div className="absolute inset-0 border-4 border-white/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-purple-400 border-r-pink-400 rounded-full animate-spin"></div>
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">Loading repositories...</h3>
          <p className="text-white/60">Fetching the latest projects</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl shadow-black/25">
        <UserHeader user={user} onBack={onBack} />
        <div className="text-center py-20 px-8" role="alert">
          <div className="text-red-400 text-5xl mb-6">💥</div>
          <h3 className="text-white font-bold text-xl mb-3">Something went wrong</h3>
          <p className="text-white/70 mb-8 max-w-md mx-auto">{error.userMessage}</p>
          <button
            onClick={refetch}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl shadow-black/25">
      <UserHeader user={user} onBack={onBack} />
      <RepositoriesContent user={user} repositories={repositories} />
    </div>
  );
};

interface UserHeaderProps {
  user: User;
  onBack: () => void;
}

const UserHeader: React.FC<UserHeaderProps> = ({ user, onBack }) => (
  <div className="relative bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm px-6 sm:px-8 py-8 sm:py-12 border-b border-white/10">
    {/* Background decoration */}
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5"></div>

    <div className="relative">
      {/* Back button */}
      <button
        onClick={onBack}
        className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/30 px-6 py-3 rounded-2xl transition-all duration-300 text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 mb-8"
        aria-label="Go back to search"
      >
        <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back to search</span>
      </button>

      {/* User info */}
      <div className="flex items-center gap-6 flex-col sm:flex-row text-center sm:text-left">
        {/* Avatar with enhanced styling */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
          <div className="relative bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-1 rounded-full">
            <img
              src={user.avatarUrl}
              alt={`${user.login} avatar`}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-white/30 shadow-xl transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-3 border-white/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* User details */}
        <div className="flex-1">
          <div className="mb-4">
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">
              {user.displayName}
            </h1>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
              <span className="text-purple-300 text-lg font-semibold">@{user.login}</span>
              <div className="w-1 h-1 bg-white/40 rounded-full"></div>
              <div className="flex items-center gap-1 text-white/60 text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                </svg>
                <span>GitHub Developer</span>
              </div>
            </div>
            {user.bio && (
              <p className="text-white/80 leading-relaxed max-w-2xl text-base sm:text-lg">
                {user.bio}
              </p>
            )}
          </div>

          {/* Stats preview */}
          <div className="flex items-center justify-center sm:justify-start gap-6 text-sm">
            <div className="flex items-center gap-2 text-white/70">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Public Repos</span>
            </div>
            <div className="flex items-center gap-2 text-white/70">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              <span>Followers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

interface RepositoriesContentProps {
  user: User;
  repositories: Repository[];
}

const RepositoriesContent: React.FC<RepositoriesContentProps> = ({ user, repositories }) => (
  <div className="p-6 sm:p-8">
    {/* Header with stats */}
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
          Public Repositories
        </h2>
        <p className="text-white/60 text-sm sm:text-base">
          {repositories.length} repositories • Updated recently
        </p>
      </div>

      {repositories.length > 0 && (
        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2">
            <span className="text-white/80 text-sm font-medium">
              📊 {repositories.length} repos
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2">
            <span className="text-white/80 text-sm font-medium">
              ⭐ {repositories.reduce((acc, repo) => acc + repo.stargazersCount, 0)} stars
            </span>
          </div>
        </div>
      )}
    </div>

    {repositories.length === 0 ? (
      <NoRepositories user={user} />
    ) : (
      <RepositoriesGrid repositories={repositories} />
    )}
  </div>
);

const NoRepositories: React.FC<{ user: User }> = ({ user }) => (
  <div className="text-center py-20 px-8">
    <div className="text-7xl mb-6">📂</div>
    <h3 className="text-2xl font-bold text-white mb-4">No public repositories yet</h3>
    <p className="text-white/70 mb-8 max-w-md mx-auto leading-relaxed">
      {user.login} hasn't created any public repositories that we can display.
      Check out their GitHub profile for more details.
    </p>
    <a
      href={user.htmlUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
      </svg>
      <span>Visit GitHub Profile</span>
      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  </div>
);

const RepositoriesGrid: React.FC<{ repositories: Repository[] }> = ({ repositories }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
    {repositories.map((repo) => (
      <RepositoryCard key={repo.id} repository={repo} />
    ))}
  </div>
);

const RepositoryCard: React.FC<{ repository: Repository }> = ({ repository }) => (
  <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden">
    {/* Gradient border on hover */}
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

    {/* Glow effect */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

    <div className="relative">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0">
          <a
            href={repository.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-2 text-white font-bold text-lg hover:text-purple-300 transition-colors duration-300"
          >
            <span className="truncate">{repository.name}</span>
            <svg className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-all duration-300 group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Badges */}
        <div className="flex gap-2 ml-4">
          {repository.isPrivate && (
            <span className="bg-red-500/20 text-red-300 px-2 py-1 text-xs rounded-lg border border-red-500/30 font-medium">
              🔒 Private
            </span>
          )}
          {repository.isFork && (
            <span className="bg-blue-500/20 text-blue-300 px-2 py-1 text-xs rounded-lg border border-blue-500/30 font-medium">
              🍴 Fork
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      {repository.description && (
        <p className="text-white/70 mb-4 leading-relaxed text-sm line-clamp-2">
          {repository.description}
        </p>
      )}

      {/* Topics */}
      {repository.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {repository.displayTopics.map((topic) => (
            <span
              key={topic}
              className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs border border-purple-500/30 font-medium hover:bg-purple-500/30 transition-colors duration-200"
            >
              #{topic}
            </span>
          ))}
          {repository.hasMoreTopics && (
            <span className="bg-white/10 text-white/60 px-3 py-1 rounded-full text-xs border border-white/20 font-medium">
              +{repository.additionalTopicsCount}
            </span>
          )}
        </div>
      )}

      {/* Footer stats */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-4">
          {/* Language */}
          {repository.language && (
            <div className="flex items-center gap-2 text-white/60 text-sm">
              <span
                className="w-3 h-3 rounded-full border border-white/20"
                style={{backgroundColor: getLanguageColor(repository.language)}}
              ></span>
              <span className="font-medium">{repository.language}</span>
            </div>
          )}

          {/* Stars */}
          <div className="flex items-center gap-1 text-white/60 text-sm">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="font-semibold">{repository.formattedStarCount}</span>
          </div>

          {/* Forks */}
          <div className="flex items-center gap-1 text-white/60 text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414L2.586 8a2 2 0 010-2.828l3.707-3.707a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">{repository.formattedForkCount}</span>
          </div>
        </div>

        {/* Updated date */}
        <div className="text-white/50 text-xs">
          {repository.formattedUpdatedDate}
        </div>
      </div>
    </div>
  </div>
);

const getLanguageColor = (language: string): string => {
  const colors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    C: '#555555',
    'C#': '#239120',
    PHP: '#4F5D95',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    Swift: '#ffac45',
    Kotlin: '#F18E33',
    Dart: '#00B4AB',
    HTML: '#e34c26',
    CSS: '#1572B6',
    Shell: '#89e051',
    Vue: '#2c3e50',
    React: '#61dafb',
  };

  return colors[language] || '#586069';
};