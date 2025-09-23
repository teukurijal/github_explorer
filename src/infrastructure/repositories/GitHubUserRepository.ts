import type { UserRepository } from '@application/useCases/SearchUsersUseCase';
import { User } from '@domain/entities/User';
import { SearchQuery } from '@domain/valueObjects/SearchQuery';
import { NetworkError, ApiError } from '@application/errors/DomainError';

export class GitHubUserRepository implements UserRepository {
  private readonly baseUrl = 'https://api.github.com';

  async searchUsers(query: SearchQuery): Promise<User[]> {
    this.checkOnlineStatus();

    const url = `${this.baseUrl}/search/users?q=${encodeURIComponent(query.toString())}&per_page=5`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const message = errorData?.message || `HTTP ${response.status}: ${response.statusText}`;
        throw new ApiError(message, response.status, 'Failed to search users. Please try again.');
      }

      const data = await response.json();
      return data.items.map((item: unknown) => User.fromApiData(item as Parameters<typeof User.fromApiData>[0]));
    } catch (error) {
      if (error instanceof ApiError || error instanceof NetworkError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
          throw new NetworkError('Network error. Please check your internet connection and try again.');
        }
        if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
          throw new NetworkError('Unable to connect. Please check your internet connection.');
        }
        throw new ApiError(error.message, undefined, 'Failed to search users. Please try again.');
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