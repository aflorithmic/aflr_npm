import { Aflr } from "./Aflr";
import { isInitializedError, isSubmoduleAlreadyInitializedError } from "./Errors";
import { RequestBase } from "./RequestBase";
import { IConfig, IScriptBody } from "./types";

export class ScriptClass {
  #initialized = false;
  #RequestClass!: RequestBase;

  public configure(config: IConfig): void | Promise<never> {
    if (this.#initialized) {
      return isSubmoduleAlreadyInitializedError();
    }
    const url = `${config.baseUrl}/script`;
    this.#initialized = true;
    this.#RequestClass = new RequestBase(config.apiKey, url);
  }

  /**
   * List all scripts
   */
  public list(): Promise<never> | Promise<unknown> {
    if (!this.#initialized) {
      return isInitializedError();
    }
    return this.#RequestClass.getRequest();
  }

  /**
   * Get script by id
   * @param scriptId
   */
  public retrieve(scriptId: string): Promise<never> | Promise<unknown> {
    if (!this.#initialized) {
      return isInitializedError();
    }
    return this.#RequestClass.getRequest(scriptId);
  }

  /**
   * Create a new scrip: Promise<never> | Promise<unknown>
   * @param data
   */
  public create(data: IScriptBody): Promise<never> | Promise<unknown> {
    if (!this.#initialized) {
      return isInitializedError();
    }
    return this.#RequestClass.postRequest(data);
  }

  public reset(): void {
    this.#initialized = false;
    // @ts-ignore
    this.#RequestClass = undefined;
  }
}

export const Script = new ScriptClass();
Aflr.register(Script);
