import { SearchUsersUseCase } from '@application/useCases/SearchUsersUseCase';
import { GetUserRepositoriesUseCase } from '@application/useCases/GetUserRepositoriesUseCase';
import { MonitorNetworkStatusUseCase } from '@application/useCases/MonitorNetworkStatusUseCase';
import { GitHubUserRepository } from '@infrastructure/repositories/GitHubUserRepository';
import { GitHubRepositoryRepository } from '@infrastructure/repositories/GitHubRepositoryRepository';
import { BrowserNetworkStatusRepository } from '@infrastructure/repositories/BrowserNetworkStatusRepository';

export class Container {
  private static instance: Container;
  private services: Map<string, unknown> = new Map();

  private constructor() {
    this.setupDependencies();
  }

  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  get<T>(key: string): T {
    const service = this.services.get(key);
    if (!service) {
      throw new Error(`Service ${key} not found`);
    }
    return service as T;
  }

  private setupDependencies(): void {
    const gitHubUserRepository = new GitHubUserRepository();
    const gitHubRepositoryRepository = new GitHubRepositoryRepository();
    const browserNetworkStatusRepository = new BrowserNetworkStatusRepository();

    const searchUsersUseCase = new SearchUsersUseCase(gitHubUserRepository);
    const getUserRepositoriesUseCase = new GetUserRepositoriesUseCase(gitHubRepositoryRepository);
    const monitorNetworkStatusUseCase = new MonitorNetworkStatusUseCase(browserNetworkStatusRepository);

    this.services.set('searchUsersUseCase', searchUsersUseCase);
    this.services.set('getUserRepositoriesUseCase', getUserRepositoriesUseCase);
    this.services.set('monitorNetworkStatusUseCase', monitorNetworkStatusUseCase);

    this.services.set('gitHubUserRepository', gitHubUserRepository);
    this.services.set('gitHubRepositoryRepository', gitHubRepositoryRepository);
    this.services.set('browserNetworkStatusRepository', browserNetworkStatusRepository);
  }
}

export const container = Container.getInstance();