import { useQuery } from '@tanstack/react-query';
import { githubApi } from '@services/githubApi';
import type { GitHubUserSearchResponse } from '@/types/github';

export function useGitHubUsers(query: string) {
  return useQuery<GitHubUserSearchResponse>({
    queryKey: ['github-users', query],
    queryFn: () => githubApi.searchUsers(query),
    enabled: !!query.trim(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}