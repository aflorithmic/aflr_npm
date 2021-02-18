import { Aflr } from "./Aflr";
import { API_BASE_URL } from "./constants";
import { isInitializedError } from "./Errors";
import { AxiosPromise, RequestBase } from "./RequestBase";
import { IConfig } from "./types";

const url: string = `${API_BASE_URL}/voice`;

export class VoiceClass {
  private config!: IConfig;
  private initialized: boolean = false;
  private RequestClass!: RequestBase;

  public configure(config: IConfig = this.config): void {
    this.initialized = true;
    this.RequestClass = new RequestBase(config.apiKey, url);
  }

  /**
   * List all voices
   */
  public list(): Promise<AxiosPromise> {
    if (!this.initialized) {
      return isInitializedError();
    }
    return this.RequestClass.getRequest(true);
  }
}

export const Voice = new VoiceClass();
Aflr.register(Voice);
