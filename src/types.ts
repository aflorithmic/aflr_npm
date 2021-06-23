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
  /** Text for your script. A script can contain multiple sections and SSML tags. Learn more about scriptText details [here](https://docs.api.audio/docs/script-2) */
  scriptText: string;
  /** The name of your project. Default value is "default" */
  projectName?: string;
  /** The name of your module. Default value is "default" */
  moduleName?: string;
  /** The name of your script. Default value is "default" */
  scriptName?: string;
  /** Custom identifier for your script. If scriptId parameter is used, then projectName, moduleName and scriptName are required parameters. */
  scriptId?: string;
}

export interface ISpeechBody extends SectionConfig {
  scriptId: string;
  speed?: string; // re-defining this because it can only be string in speech body, but it must be a number in section config
  /** List of dicts containing the personalisation parameters as key-value pairs. This parameter depends on the number of parameters you used in your script resource. For instance, if in the script resource you have `scriptText="Hello {{name}} {{lastname}}"`, the audience should be: `[{"username": "Elon", "lastname": "Musk"}]` */
  audience?: Audience;
  /** A dictionary (key-value pairs), where the key is a section name, and the value is another dictionary with the section configuration ( valid parameters are: voice, speed, effect, silence_padding). If a section is not found here, the section will automatically inherit the voice, speed, effect and silence_padding values you defined above (or the default ones if you don't provide them). See an example below with 2 sections and different configuration parameters being used.
    ```{
      "firstsection": {
          "voice": "Matthew",
          "speed": 110,
          "silence_padding": 100,
          "effect": "dark_father"
      },
      "anothersection": {
          "voice": "en-GB-RyanNeural",
          "speed": 100
      }
    }```
  */
  sections?: Record<string, SectionConfig>;
}

export interface ISoundBody {
  scriptId: string;
  backgroundTrackId: string;
}

export type SectionConfig = {
  /** Voice name. See the list of available voices using Voice resource. Default voice is "Joanna".
   */
  voice?: string;
  /** Voice speed. Default speed is 100. */
  speed?: string | number;
  /** Put a funny effect in your voice. You can try the following ones: dark_father, chewie, 88b, 2r2d */
  effect?: EffectOptions;
  /** Add a silence padding to your speech tracks (in milliseconds). Default is 0 (no padding) */
  silence_padding?: string | number;
};
export type PersonalisationParameters = Record<string, string>;
export type Audience = [PersonalisationParameters];
export type EffectOptions = "dark_father" | "chewie" | "88b" | "2r2d";
export interface IMasteringBody {
  scriptId: string;
  backgroundTrackId: string;
  audience?: Audience;
}

export interface IVoiceFilteringBody {
  /** Try with one of: amazon polly, google, microsoft azure, aflorithmic labs */
  providerFullName?: string;
  /** Try one of: google, polly, azure, msnr */
  provider?: string;
  /** Try with one of: male, female */
  gender?: string;
  /** Try with one of: english, spanish, french, german */
  language?: string;
  /** Try with one of: american, british, neutral, portuguese/brazilian, american soft, mexican, australian */
  accent?: string;
  /** Try with one of: adult, child, senior */
  ageBracket?: string;
  /** Try with one or more (separated by commas) of: steady, confident, balanced, informative, serious, storytelling, calm, deep, formal, sad, thin, energetic, upbeat, fun, tense, flat, low pitched, high pitched, fast, slow */
  tags?: string;
  /** Try with one or more (separated by commas) of: fitness, business, commercial, fashion, travel, audiobook, real estate, faith, health industry, kids entertainment, games, customer service, education, storytelling, entertainment, kids */
  industryExamples?: string;
  [key: string]: any;
}
