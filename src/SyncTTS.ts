import { Aflr } from "./Aflr";
import { isInitializedError, isSubmoduleAlreadyInitializedError } from "./Errors";
import { RequestBase } from "./RequestBase";
import { IConfig, ISyncTTSBody } from "./types";

export class SyncTTSClass {
  #initialized = false;
  #RequestClass!: RequestBase;
  #url = "";

  public configure(config: IConfig, requestClass: RequestBase): void {
    if (this.#initialized) {
      isSubmoduleAlreadyInitializedError();
    }
    this.#url = `${config.baseUrl}/sync_speech/synthesize`;
    this.#initialized = true;
    this.#RequestClass = requestClass;
  }

  /**
   * Create a new speech
   * @param data
   */
  public create(data: ISyncTTSBody): Promise<unknown> {
    if (!this.#initialized) {
      isInitializedError();
    }
    return this.#RequestClass.postRequest(this.#url, data);
  }

  public reset(): void {
    this.#initialized = false;
    // @ts-ignore
    this.#RequestClass = undefined;
    this.#url = "";
  }
}

export const SyncTTS = new SyncTTSClass();
Aflr.register(SyncTTS);
