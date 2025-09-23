export class Repository {
  readonly id: number;
  readonly name: string;
  readonly description: string | null;
  readonly htmlUrl: string;
  readonly language: string | null;
  readonly stargazersCount: number;
  readonly forksCount: number;
  readonly updatedAt: Date;
  readonly isPrivate: boolean;
  readonly isFork: boolean;
  readonly topics: string[];

  constructor(
    id: number,
    name: string,
    description: string | null,
    htmlUrl: string,
    language: string | null,
    stargazersCount: number,
    forksCount: number,
    updatedAt: Date,
    isPrivate: boolean,
    isFork: boolean,
    topics: string[] = []
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.htmlUrl = htmlUrl;
    this.language = language;
    this.stargazersCount = stargazersCount;
    this.forksCount = forksCount;
    this.updatedAt = updatedAt;
    this.isPrivate = isPrivate;
    this.isFork = isFork;
    this.topics = topics;
  }

  static fromApiData(data: {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
    private: boolean;
    fork: boolean;
    topics?: string[];
  }): Repository {
    return new Repository(
      data.id,
      data.name,
      data.description,
      data.html_url,
      data.language,
      data.stargazers_count,
      data.forks_count,
      new Date(data.updated_at),
      data.private,
      data.fork,
      data.topics || []
    );
  }

  get formattedStarCount(): string {
    return this.formatNumber(this.stargazersCount);
  }

  get formattedForkCount(): string {
    return this.formatNumber(this.forksCount);
  }

  get formattedUpdatedDate(): string {
    return this.updatedAt.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  get displayTopics(): string[] {
    return this.topics.slice(0, 3);
  }

  get hasMoreTopics(): boolean {
    return this.topics.length > 3;
  }

  get additionalTopicsCount(): number {
    return Math.max(0, this.topics.length - 3);
  }

  private formatNumber(num: number): string {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  }
}