import { useState, useEffect } from 'react';
import { Repository } from '@domain/entities/Repository';
import { User } from '@domain/entities/User';
import { DomainError, ApiError } from '@application/errors/DomainError';
import { container } from '@infrastructure/container/Container';

interface UseUserRepositoriesResult {
  repositories: Repository[];
  isLoading: boolean;
  error: DomainError | null;
  refetch: () => Promise<void>;
}

export const useUserRepositories = (user: User | null): UseUserRepositoriesResult => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<DomainError | null>(null);

  const getUserRepositoriesUseCase = container.getUserRepositoriesUseCase;

  const fetchRepositories = async () => {
    if (!user) {
      setRepositories([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await getUserRepositoriesUseCase.execute(user);
      setRepositories(result);
    } catch (err) {
      const domainError = err instanceof DomainError
        ? err
        : new ApiError('An unexpected error occurred', undefined, 'Something went wrong. Please try again.');
      setError(domainError);
      setRepositories([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.login]);

  return {
    repositories,
    isLoading,
    error,
    refetch: fetchRepositories
  };
};