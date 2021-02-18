import { Aflr } from "./Aflr";
import { isInitializedError } from "./Errors";
import { RequestBase } from "./RequestBase";
import { IConfig, ISpeechBody } from "./types";

export class SpeechClass {
  private initialized: boolean = false;
  private RequestClass!: RequestBase;

  public configure(config: IConfig): void {
    const url: string = `${config.baseUrl}/speech`;
    this.initialized = true;
    this.RequestClass = new RequestBase(config.apiKey, url);
  }

  /**
   * Get speech url by script id
   * @param scriptId
   */
  public retrieve(scriptId: string) {
    if (!this.initialized) {
      return isInitializedError();
    }
    return this.RequestClass.getRequest(false, scriptId);
  }

  /**
   * Create a new speech
   * @param data
   */
  public create(data: ISpeechBody) {
    if (!this.initialized) {
      return isInitializedError();
    }
    return this.RequestClass.postRequest({ ...data, api: false });
  }
}

export const Speech = new SpeechClass();
Aflr.register(Speech);
