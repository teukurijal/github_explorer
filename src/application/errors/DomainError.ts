export abstract class DomainError extends Error {
  abstract readonly code: string;
  abstract readonly userMessage: string;

  readonly cause?: Error;

  constructor(message: string, cause?: Error) {
    super(message);
    this.cause = cause;
    this.name = this.constructor.name;
  }
}

export class NetworkError extends DomainError {
  readonly code = 'NETWORK_ERROR';
  readonly userMessage = 'Please check your internet connection and try again.';

  constructor(message: string, cause?: Error) {
    super(message, cause);
  }
}

export class ValidationError extends DomainError {
  readonly code = 'VALIDATION_ERROR';
  readonly userMessage: string;

  constructor(message: string, userMessage?: string) {
    super(message);
    this.userMessage = userMessage || message;
  }
}

export class ApiError extends DomainError {
  readonly code = 'API_ERROR';
  readonly userMessage: string;

  readonly statusCode?: number;

  constructor(
    message: string,
    statusCode?: number,
    userMessage?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.userMessage = userMessage || 'An error occurred while fetching data.';
  }
}

