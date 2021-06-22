import { Aflr } from "./Aflr";
import { isInitializedError, isSubmoduleAlreadyInitializedError } from "./Errors";
import { RequestBase } from "./RequestBase";
import { IConfig, IMasteringBody, PersonalisationParameters } from "./types";

export class MasteringClass {
  #initialized = false;
  #RequestClass!: RequestBase;
  #url = "";
  #file_url = "";

  public configure(config: IConfig, requestClass: RequestBase): void {
    if (this.#initialized) {
      isSubmoduleAlreadyInitializedError();
    }
    this.#url = `${config.baseUrl}/mastering`;
    this.#file_url = `${config.baseUrl}/file/mastering`;
    this.#initialized = true;
    this.#RequestClass = requestClass;
  }

  /**
   * Get mastering by scriptId & parameters
   * @param scriptId
   * @param parameters
   */
  public retrieve(scriptId: string, parameters: PersonalisationParameters = {}): Promise<unknown> {
    if (!this.#initialized) {
      isInitializedError();
    }
    return this.#RequestClass.getRequest(this.#file_url, "", {
      params: { ...parameters, scriptId }
    });
  }

  /**
   * create mastered version of a script
   * @param data
   */
  public create(data: IMasteringBody): Promise<unknown> {
    if (!this.#initialized) {
      isInitializedError();
    }
    return this.#RequestClass.postRequest(this.#url, data);
  }

  public reset(): void {
    this.#initialized = false;
    // @ts-ignore
    this.#RequestClass = undefined;
    this.#url = "";
    this.#file_url = "";
  }
}

export const Mastering = new MasteringClass();
Aflr.register(Mastering);
