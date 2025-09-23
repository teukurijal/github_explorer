import { Repository } from '@domain/entities/Repository';
import { User } from '@domain/entities/User';

export interface RepositoryRepository {
  getUserRepositories(username: string): Promise<Repository[]>;
}

export class GetUserRepositoriesUseCase {
  private repositoryRepository: RepositoryRepository;

  constructor(repositoryRepository: RepositoryRepository) {
    this.repositoryRepository = repositoryRepository;
  }

  async execute(user: User): Promise<Repository[]> {
    if (!user.login) {
      throw new Error('User login is required');
    }

    const repositories = await this.repositoryRepository.getUserRepositories(user.login);

    return repositories.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }
}