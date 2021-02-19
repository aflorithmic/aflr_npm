import { Aflr } from "./Aflr";
import { isInitializedError, isSubmoduleAlreadyInitializedError } from "./Errors";
import { RequestBase } from "./RequestBase";
import { IConfig, IScriptBody } from "./types";

export class ScriptClass {
  #initialized = false;
  #RequestClass!: RequestBase;

  public configure(config: IConfig): void {
    if (this.#initialized) {
      isSubmoduleAlreadyInitializedError();
    }
    const url = `${config.baseUrl}/script`;
    this.#initialized = true;
    this.#RequestClass = new RequestBase(config.apiKey, url);
  }

  /**
   * List all scripts
   */
  public list(): Promise<unknown> {
    if (!this.#initialized) {
      isInitializedError();
    }
    return this.#RequestClass.getRequest();
  }

  /**
   * Get script by id
   * @param scriptId
   */
  public retrieve(scriptId: string): Promise<unknown> {
    if (!this.#initialized) {
      isInitializedError();
    }
    return this.#RequestClass.getRequest(scriptId);
  }

  /**
   * Create a new script
   * @param data
   */
  public create(data: IScriptBody): Promise<unknown> {
    if (!this.#initialized) {
      isInitializedError();
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
