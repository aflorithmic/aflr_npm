import { Aflr } from "./Aflr";
import { API_BASE_URL } from "./constants";
import { isInitializedError } from "./Errors";
import { AxiosPromise, RequestBase } from "./RequestBase";
import { IConfig, ISpeechBody } from "./types";

const url: string = `${API_BASE_URL}/speech`;

export class SpeechClass {
  private config!: IConfig;
  private initialized: boolean = false;
  private RequestClass!: RequestBase;

  public configure(config: IConfig = this.config): void {
    this.initialized = true;
    this.RequestClass = new RequestBase(config.apiKey, url);
  }

  /**
   * Get speech url by script id
   * @param scriptId
   */
  public retrieve(scriptId: string): Promise<AxiosPromise> {
    if (!this.initialized) {
      return isInitializedError();
    }
    return this.RequestClass.getRequest(false, scriptId);
  }

  /**
   * Create a new speech
   * @param data
   */
  public create(data: ISpeechBody): Promise<AxiosPromise> {
    if (!this.initialized) {
      return isInitializedError();
    }
    return this.RequestClass.postRequest(data);
  }
}

export const Speech = new SpeechClass();
Aflr.register(Speech);
