export interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubUserSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubUser[];
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
  private: boolean;
  fork: boolean;
}

