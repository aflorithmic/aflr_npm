export interface IConfig {
  apiKey: string;
  [key: string]: any;
}

export enum ErrorTypes {
  validApiKey = "API key must be a valid string.",
  notInitialized = "You should configure the package before using it."
}
