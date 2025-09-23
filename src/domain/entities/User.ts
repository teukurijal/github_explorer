export class User {
  readonly id: number;
  readonly login: string;
  readonly avatarUrl: string;
  readonly htmlUrl: string;
  readonly name?: string;
  readonly bio?: string;
  readonly publicRepos: number;
  readonly followers: number;
  readonly following: number;

  constructor(
    id: number,
    login: string,
    avatarUrl: string,
    htmlUrl: string,
    name?: string,
    bio?: string,
    publicRepos: number = 0,
    followers: number = 0,
    following: number = 0
  ) {
    this.id = id;
    this.login = login;
    this.avatarUrl = avatarUrl;
    this.htmlUrl = htmlUrl;
    this.name = name;
    this.bio = bio;
    this.publicRepos = publicRepos;
    this.followers = followers;
    this.following = following;
  }

  static fromApiData(data: {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
    name?: string;
    bio?: string;
    public_repos?: number;
    followers?: number;
    following?: number;
  }): User {
    return new User(
      data.id,
      data.login,
      data.avatar_url,
      data.html_url,
      data.name,
      data.bio,
      data.public_repos,
      data.followers,
      data.following
    );
  }

  get displayName(): string {
    return this.name || this.login;
  }

  get profileStats(): string {
    return `${this.publicRepos} repos • ${this.followers} followers`;
  }
}