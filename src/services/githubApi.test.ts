import { describe, it, expect, vi, beforeEach } from 'vitest';

// Set environment variable before importing
process.env.BASE_URL = 'https://api.github.com';

import { githubApi } from '@services/githubApi';

// Mock fetch
const mockFetch = vi.fn();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(globalThis as any).fetch = mockFetch;

describe('GitHubApiService', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe('searchUsers', () => {
    it('should throw error for empty query', async () => {
      await expect(githubApi.searchUsers('')).rejects.toThrow('Search query cannot be empty');
      await expect(githubApi.searchUsers('  ')).rejects.toThrow('Search query cannot be empty');
    });

    it('should make correct API call for user search', async () => {
      const mockResponse = {
        total_count: 1,
        incomplete_results: false,
        items: [
          {
            id: 1,
            login: 'testuser',
            avatar_url: 'https://avatar.url',
            html_url: 'https://github.com/testuser',
            name: 'Test User',
            company: null,
            location: null,
            bio: null,
            public_repos: 10,
            followers: 5,
            following: 3
          }
        ]
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await githubApi.searchUsers('testuser');

      expect(mockFetch).toHaveBeenCalledWith(
        '//search/users?q=testuser&per_page=5'
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 403,
        statusText: 'Forbidden',
        json: async () => ({ message: 'API rate limit exceeded' })
      });

      await expect(githubApi.searchUsers('testuser')).rejects.toThrow('API rate limit exceeded');
    });
  });

  describe('getUserRepositories', () => {
    it('should throw error for empty username', async () => {
      await expect(githubApi.getUserRepositories('')).rejects.toThrow('Username cannot be empty');
      await expect(githubApi.getUserRepositories('  ')).rejects.toThrow('Username cannot be empty');
    });

    it('should make correct API call for user repositories', async () => {
      const mockRepos = [
        {
          id: 1,
          name: 'test-repo',
          full_name: 'testuser/test-repo',
          description: 'A test repository',
          html_url: 'https://github.com/testuser/test-repo',
          stargazers_count: 5,
          watchers_count: 5,
          forks_count: 2,
          language: 'TypeScript',
          updated_at: '2023-01-01T00:00:00Z',
          topics: ['react', 'typescript'],
          private: false,
          fork: false
        }
      ];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockRepos
      });

      const result = await githubApi.getUserRepositories('testuser');

      expect(mockFetch).toHaveBeenCalledWith(
        '//users/testuser/repos?sort=updated&per_page=100'
      );
      expect(result).toEqual(mockRepos);
    });
  });
});