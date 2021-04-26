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
  notInitialized = "You should configure the package before using it. - AFLR",
  alreadyInitializedSubmodule = "This submobule has already been initialized and configured, do not try to configure it directly. - AFLR",
  alreadyInitializedModule = "The package has already been initialized and configured. Do not try to configure it again. If you want to reset it, use Aflr.reset() - AFLR"
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
  voice?: string;
  speed?: string;
}

export interface ISyncTTSBody {
  voice: string;
  text: string;
}

export interface ISoundBody {
  scriptId: string;
  backgroundTrackId: string;
}

export interface IMasteringBody {
  scriptId: string;
  backgroundTrackId: string;
  audience?: [{ [key: string]: string }];
}

export interface IVoiceFilteringBody {
  providerFullName?: string;
  provider?: string;
  gender?: string;
  language?: string;
  accent?: string;
  ageBracket?: string;
  tags?: string;
  industryExamples?: string;
  [key: string]: any;
}
