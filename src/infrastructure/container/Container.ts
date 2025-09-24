import { SearchUsersUseCase } from '@application/useCases/SearchUsersUseCase';
import { GetUserRepositoriesUseCase } from '@application/useCases/GetUserRepositoriesUseCase';
import { MonitorNetworkStatusUseCase } from '@application/useCases/MonitorNetworkStatusUseCase';
import { GitHubUserRepository } from '@infrastructure/repositories/GitHubUserRepository';
import { GitHubRepositoryRepository } from '@infrastructure/repositories/GitHubRepositoryRepository';
import { BrowserNetworkStatusRepository } from '@infrastructure/repositories/BrowserNetworkStatusRepository';

class Container {
  private gitHubUserRepository = new GitHubUserRepository();
  private gitHubRepositoryRepository = new GitHubRepositoryRepository();
  private browserNetworkStatusRepository = new BrowserNetworkStatusRepository();

  searchUsersUseCase = new SearchUsersUseCase(this.gitHubUserRepository);
  getUserRepositoriesUseCase = new GetUserRepositoriesUseCase(this.gitHubRepositoryRepository);
  monitorNetworkStatusUseCase = new MonitorNetworkStatusUseCase(this.browserNetworkStatusRepository);
}

export const container = new Container();