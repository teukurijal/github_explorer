import type { RepositoryRepository } from '@application/useCases/GetUserRepositoriesUseCase';
import { Repository } from '@domain/entities/Repository';
import { NetworkError, ApiError, ValidationError } from '@application/errors/DomainError';

export class GitHubRepositoryRepository implements RepositoryRepository {
  private readonly baseUrl = 'https://api.github.com';

  async getUserRepositories(username: string): Promise<Repository[]> {
    this.checkOnlineStatus();

    if (!username.trim()) {
      throw new ValidationError('Username cannot be empty', 'Please provide a valid username.');
    }

    const url = `${this.baseUrl}/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message = errorData?.message || `HTTP ${response.status}: ${response.statusText}`;
        throw new ApiError(message, response.status, 'Failed to fetch repositories. Please try again.');
      }

      const data = await response.json();
      return data.map((item: unknown) => Repository.fromApiData(item as Parameters<typeof Repository.fromApiData>[0]));
    } catch (error) {
      if (error instanceof ApiError || error instanceof NetworkError || error instanceof ValidationError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
          throw new NetworkError('Network error. Please check your internet connection and try again.');
        }
        if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
          throw new NetworkError('Unable to connect. Please check your internet connection.');
        }
        throw new ApiError(error.message, undefined, 'Failed to fetch repositories. Please try again.');
      }
      throw new ApiError('An unexpected error occurred', undefined, 'Something went wrong. Please try again.');
    }
  }

  private checkOnlineStatus(): void {
    if (!navigator.onLine) {
      throw new NetworkError('No internet connection. Please check your network and try again.');
    }
  }
}