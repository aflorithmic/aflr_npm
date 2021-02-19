import { API_BASE_URL, API_BASE_URL_STAGING } from "./constants";
import { isModuleAlreadyInitializedError, isValidApiKeyError } from "./Errors";
import { ScriptClass } from "./Script";
import { SpeechClass } from "./Speech";
import { IConfig, IInputConfig } from "./types";
import { VoiceClass } from "./Voice";

interface IComponent {
  configure(config: IConfig): void | Promise<never>;
  reset(): void;
}

class AflrClass {
  public Script!: ScriptClass;
  public Speech!: SpeechClass;
  public Voice!: VoiceClass;
  #config!: IConfig;
  #components: IComponent[] = [];
  #initialized = false;

  public register(comp: IComponent) {
    this.#components.push(comp);
  }

  /**
   * Configure the SDK before using it. Make sure you call this function
   * before any of the calls
   * @param config
   */
  public configure(config: IInputConfig) {
    if (!config || !config.apiKey) {
      return isValidApiKeyError();
    } else if (this.#initialized) {
      return isModuleAlreadyInitializedError();
    }

    const baseUrl = config.debug ? API_BASE_URL_STAGING : API_BASE_URL;

    this.#config = { ...config, baseUrl };
    this.#initialized = true;
    this.#components.map(comp => comp.configure(this.#config));

    return this.#config;
  }

  /**
   * Reset the initialization
   */
  public reset() {
    // @ts-ignore
    this.#config = {};
    this.#components.map(comp => comp.reset());
    this.#initialized = false;
  }
}

export const Aflr = new AflrClass();
