import { Aflr } from "./Aflr";
import { isInitializedError, isSubmoduleAlreadyInitializedError } from "./Errors";
import { RequestBase } from "./RequestBase";
import { IConfig, ISpeechBody } from "./types";

export class SpeechClass {
  #initialized = false;
  #RequestClass!: RequestBase;

  public configure(config: IConfig): void {
    if (this.#initialized) {
      isSubmoduleAlreadyInitializedError();
    }
    const url = `${config.baseUrl}/speech`;
    this.#initialized = true;
    this.#RequestClass = new RequestBase(config.apiKey, url);
  }

  /**
   * Get speech url by script id
   * @param scriptId
   */
  public retrieve(scriptId: string): Promise<unknown> {
    if (!this.#initialized) {
      isInitializedError();
    }
    return this.#RequestClass.getRequest(scriptId);
  }

  /**
   * Create a new speech
   * @param data
   */
  public create(data: ISpeechBody): Promise<unknown> {
    if (!this.#initialized) {
      isInitializedError();
    }
    return this.#RequestClass.postRequest({ ...data, api: false });
  }

  public reset(): void {
    this.#initialized = false;
    // @ts-ignore
    this.#RequestClass = undefined;
  }
}

export const Speech = new SpeechClass();
Aflr.register(Speech);
