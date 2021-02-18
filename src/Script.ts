import { Aflr } from "./Aflr";
import { API_BASE_URL } from "./constants";
import { isInitializedError } from "./Errors";
import { AxiosPromise, RequestBase } from "./RequestBase";
import { IConfig, IScriptBody } from "./types";

const url: string = `${API_BASE_URL}/script`;

export class ScriptClass {
  private config!: IConfig;
  private initialized: boolean = false;
  private RequestClass!: RequestBase;

  public configure(config: IConfig = this.config): void {
    this.initialized = true;
    this.RequestClass = new RequestBase(config.apiKey, url);
  }

  /**
   * List all scripts
   */
  public list(): Promise<AxiosPromise> {
    if (!this.initialized) {
      return isInitializedError();
    }
    return this.RequestClass.getRequest(true);
  }

  /**
   * Get script by id
   * @param scriptId
   */
  public retrieve(scriptId: string): Promise<AxiosPromise> {
    if (!this.initialized) {
      return isInitializedError();
    }
    return this.RequestClass.getRequest(false, scriptId);
  }

  /**
   * Create a new script
   * @param data
   */
  public create(data: IScriptBody): Promise<AxiosPromise> {
    if (!this.initialized) {
      return isInitializedError();
    }
    return this.RequestClass.postRequest(data);
  }
}

export const Script = new ScriptClass();
Aflr.register(Script);
