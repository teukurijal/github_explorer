export const validateGitHubUsername = (username: string): { isValid: boolean; error?: string } => {
  if (!username.trim()) {
    return { isValid: false, error: 'Username cannot be empty' };
  }

  if (username.length > 39) {
    return { isValid: false, error: 'Username cannot exceed 39 characters' };
  }

  // GitHub username pattern: alphanumeric and hyphens, cannot start/end with hyphen
  const githubUsernamePattern = /^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$/;

  if (!githubUsernamePattern.test(username)) {
    return {
      isValid: false,
      error: 'Username can only contain alphanumeric characters and hyphens'
    };
  }

  return { isValid: true };
};

export const sanitizeSearchQuery = (query: string): string => {
  return query.trim().toLowerCase();
};