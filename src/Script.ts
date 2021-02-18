import { Aflr } from "./Aflr";
import { isInitializedError } from "./Errors";
import { AxiosPromise, RequestBase } from "./RequestBase";
import { IConfig, IScriptBody } from "./types";

export class ScriptClass {
  private initialized: boolean = false;
  private RequestClass!: RequestBase;

  public configure(config: IConfig): void {
    const url: string = `${config.baseUrl}/script`;
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
