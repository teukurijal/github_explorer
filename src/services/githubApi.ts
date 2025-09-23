import type { GitHubUserSearchResponse, GitHubRepository } from '@/types/github';

const BASE_URL = process.env.BASE_URL;

class GitHubApiService {
  private async fetchWithErrorHandling<T>(url: string): Promise<T> {
    // Check if user is online
    if (!navigator.onLine) {
      throw new Error('No internet connection. Please check your network and try again.');
    }

    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message = errorData?.message || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(message);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        // Check for network-related errors
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
          throw new Error('Network error. Please check your internet connection and try again.');
        }
        if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
          throw new Error('Unable to connect. Please check your internet connection.');
        }
        throw error;
      }
      throw new Error('An unexpected error occurred');
    }
  }

  async searchUsers(query: string): Promise<GitHubUserSearchResponse> {
    if (!query.trim()) {
      throw new Error('Search query cannot be empty');
    }

    const url = `${BASE_URL}/search/users?q=${encodeURIComponent(query)}&per_page=5`;
    return this.fetchWithErrorHandling<GitHubUserSearchResponse>(url);
  }

  async getUserRepositories(username: string): Promise<GitHubRepository[]> {
    if (!username.trim()) {
      throw new Error('Username cannot be empty');
    }

    const url = `${BASE_URL}/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`;
    return this.fetchWithErrorHandling<GitHubRepository[]>(url);
  }
}

export const githubApi = new GitHubApiService();