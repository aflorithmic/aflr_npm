import { Aflr } from "./Aflr";
import { isAlreadyInitializedError, isInitializedError } from "./Errors";
import { RequestBase } from "./RequestBase";
import { IConfig, IScriptBody } from "./types";

export class ScriptClass {
  private initialized: boolean = false;
  private RequestClass!: RequestBase;

  public configure(config: IConfig): void | Promise<never> {
    if (this.initialized) {
      return isAlreadyInitializedError();
    }
    const url: string = `${config.baseUrl}/script`;
    this.initialized = true;
    this.RequestClass = new RequestBase(config.apiKey, url);
  }

  /**
   * List all scripts
   */
  public list() {
    if (!this.initialized) {
      return isInitializedError();
    }
    return this.RequestClass.getRequest(true);
  }

  /**
   * Get script by id
   * @param scriptId
   */
  public retrieve(scriptId: string) {
    if (!this.initialized) {
      return isInitializedError();
    }
    return this.RequestClass.getRequest(false, scriptId);
  }

  /**
   * Create a new script
   * @param data
   */
  public create(data: IScriptBody) {
    if (!this.initialized) {
      return isInitializedError();
    }
    return this.RequestClass.postRequest(data);
  }
}

export const Script = new ScriptClass();
Aflr.register(Script);
