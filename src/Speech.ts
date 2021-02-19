import { Aflr } from "./Aflr";
import { isInitializedError, isSubmoduleAlreadyInitializedError } from "./Errors";
import { RequestBase } from "./RequestBase";
import { IConfig, ISpeechBody } from "./types";

export class SpeechClass {
  private initialized = false;
  private RequestClass!: RequestBase;

  public configure(config: IConfig): void | Promise<never> {
    if (this.initialized) {
      return isSubmoduleAlreadyInitializedError();
    }
    const url = `${config.baseUrl}/speech`;
    this.initialized = true;
    this.RequestClass = new RequestBase(config.apiKey, url);
  }

  /**
   * Get speech url by script id
   * @param scriptId
   */
  public retrieve(scriptId: string): Promise<never> | Promise<unknown> {
    if (!this.initialized) {
      return isInitializedError();
    }
    return this.RequestClass.getRequest(scriptId);
  }

  /**
   * Create a new speech
   * @param data
   */
  public create(data: ISpeechBody): Promise<never> | Promise<unknown> {
    if (!this.initialized) {
      return isInitializedError();
    }
    return this.RequestClass.postRequest({ ...data, api: false });
  }

  public reset(): void {
    this.initialized = false;
    // @ts-ignore
    this.RequestClass = undefined;
  }
}

export const Speech = new SpeechClass();
Aflr.register(Speech);
