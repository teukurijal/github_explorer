import { useQuery } from '@tanstack/react-query';
import { githubApi } from '@services/githubApi';
import type { GitHubRepository } from '@/types/github';

export function useGitHubRepositories(username: string) {
  return useQuery<GitHubRepository[]>({
    queryKey: ['github-repositories', username],
    queryFn: () => githubApi.getUserRepositories(username),
    enabled: !!username,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}