export interface IConfig {
  apiKey: string;
  [key: string]: any;
}

export enum ErrorTypes {
  validApiKey = "API key must be a valid string.",
  notInitialized = "You should configure the package before using it."
}

export interface IScriptBody {
  scriptText: string;
  projectName?: string;
  moduleName?: string;
  scriptName?: string;
  scriptId?: string;
}

export interface ISpeechBody {
  scriptId: string;
}
