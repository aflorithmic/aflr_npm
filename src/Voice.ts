import { Aflr } from "./Aflr";
import { isInitializedError, isSubmoduleAlreadyInitializedError } from "./Errors";
import { RequestBase } from "./RequestBase";
import { IConfig, IVoiceFilteringBody } from "./types";

export class VoiceClass {
  #initialized = false;
  #RequestClass!: RequestBase;
  #url = "";
  #parameters_url = "";

  public configure(config: IConfig, requestClass: RequestBase): void {
    if (this.#initialized) {
      isSubmoduleAlreadyInitializedError();
    }
    this.#url = `${config.baseUrl}/voice`;
    this.#parameters_url = `${config.baseUrl}/voice/parameter`;
    this.#initialized = true;
    this.#RequestClass = requestClass;
  }

  /**
   * List all voices
   */
  public list(params?: IVoiceFilteringBody): Promise<unknown> {
    if (!this.#initialized) {
      isInitializedError();
    }
    return this.#RequestClass.getRequest(this.#url, "", { params });
  }

  /**
   * List all allowed filtering parameters
   */
  public parameters(): Promise<unknown> {
    if (!this.#initialized) {
      isInitializedError();
    }
    return this.#RequestClass.getRequest(this.#parameters_url);
  }

  public reset(): void {
    this.#initialized = false;
    // @ts-ignore
    this.#RequestClass = undefined;
    this.#url = "";
  }
}

export const Voice = new VoiceClass();
Aflr.register(Voice);
