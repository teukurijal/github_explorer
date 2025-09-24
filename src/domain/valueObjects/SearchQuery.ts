import { ValidationError } from '@application/errors/DomainError';

export class SearchQuery {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(query: string): SearchQuery {
    const trimmed = query.trim();
    if (trimmed.length === 0) {
      throw new ValidationError('Search query cannot be empty', 'Please enter a search term.');
    }
    if (trimmed.length > 100) {
      throw new ValidationError('Search query is too long', 'Please enter a shorter search term.');
    }
    return new SearchQuery(trimmed);
  }


  get isEmpty(): boolean {
    return this.value.length === 0;
  }


  toString(): string {
    return this.value;
  }

  equals(other: SearchQuery): boolean {
    return this.value === other.value;
  }
}