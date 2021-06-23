import { API_BASE_URL, API_BASE_URL_STAGING } from "./constants";
import { isModuleAlreadyInitializedError, isValidApiKeyError } from "./Errors";
import { IConfig, IInputConfig } from "./types";
import { RequestBase } from "./RequestBase";
import { ScriptClass } from "./Script";
import { SpeechClass } from "./Speech";
import { VoiceClass } from "./Voice";
import { SoundClass } from "./Sound";
import { MasteringClass } from "./Mastering";
import { SyncTTSClass } from "./SyncTTS";

interface IComponent {
  configure(config: IConfig, requestClass: RequestBase): void | Promise<never>;
  reset(): void;
}

class AflrClass {
  public Script!: ScriptClass;
  public Speech!: SpeechClass;
  public Voice!: VoiceClass;
  public SyncTTS!: SyncTTSClass;
  public Sound!: SoundClass;
  public Mastering!: MasteringClass;
  #config!: IConfig;
  #components: IComponent[] = [];
  #initialized = false;

  public register(comp: IComponent): void {
    this.#components.push(comp);
  }

  public isInitialized(): boolean {
    return this.#initialized;
  }

  /**
   * Configure the SDK before using it. Make sure you call this function
   * before any of the calls
   * @param config
   */
  public configure(config: IInputConfig): IConfig {
    if (!config || !config.apiKey) {
      isValidApiKeyError();
    } else if (this.#initialized) {
      isModuleAlreadyInitializedError();
    }

    const baseUrl = config.debug ? API_BASE_URL_STAGING : API_BASE_URL;

    this.#config = { ...config, baseUrl };
    this.#initialized = true;
    const requestClass = new RequestBase(this.#config.apiKey);
    this.#components.map(comp => comp.configure(this.#config, requestClass));

    return this.#config;
  }

  /**
   * Reset the initialization
   */
  public reset(): void {
    // @ts-ignore
    this.#config = {};
    this.#components.map(comp => comp.reset());
    this.#initialized = false;
  }
}

export const Aflr = new AflrClass();
