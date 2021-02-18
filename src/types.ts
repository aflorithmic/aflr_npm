export interface IInputConfig {
  apiKey: string;
  debug?: boolean;
  [key: string]: any;
}

export interface IConfig extends IInputConfig {
  baseUrl: string;
}

export enum ErrorTypes {
  validApiKey = "API key must be a valid string. - AFLR",
  notInitialized = "You should configure the package before using it. - AFLR"
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
