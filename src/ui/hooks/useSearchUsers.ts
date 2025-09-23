import { useState, useEffect } from 'react';
import { User } from '@domain/entities/User';
import { SearchUsersUseCase } from '@application/useCases/SearchUsersUseCase';
import { DomainError, ApiError } from '@application/errors/DomainError';
import { container } from '@infrastructure/container/Container';

interface UseSearchUsersResult {
  users: User[];
  isLoading: boolean;
  error: DomainError | null;
  searchUsers: (query: string) => Promise<void>;
}

export const useSearchUsers = (debouncedQuery: string): UseSearchUsersResult => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<DomainError | null>(null);

  const searchUsersUseCase = container.get<SearchUsersUseCase>('searchUsersUseCase');

  const searchUsers = async (query: string) => {
    if (!query.trim()) {
      setUsers([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await searchUsersUseCase.execute(query);
      setUsers(result);
    } catch (err) {
      const domainError = err instanceof DomainError
        ? err
        : new ApiError('An unexpected error occurred', undefined, 'Something went wrong. Please try again.');
      setError(domainError);
      setUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedQuery) {
      searchUsers(debouncedQuery);
    } else {
      setUsers([]);
      setError(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  return { users, isLoading, error, searchUsers };
};