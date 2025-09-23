import { User } from '@domain/entities/User';
import { SearchQuery } from '@domain/valueObjects/SearchQuery';

export interface UserRepository {
  searchUsers(query: SearchQuery): Promise<User[]>;
}

export class SearchUsersUseCase {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(queryString: string): Promise<User[]> {
    const query = SearchQuery.create(queryString);

    if (query.isEmpty) {
      return [];
    }

    return await this.userRepository.searchUsers(query);
  }
}