import { Aflr } from "./Aflr";
import { isInitializedError, isSubmoduleAlreadyInitializedError } from "./Errors";
import { RequestBase } from "./RequestBase";
import { IConfig, ISoundBody } from "./types";

export class SoundClass {
  #initialized = false;
  #RequestClass!: RequestBase;
  #url = "";
  #file_url = "";

  public configure(config: IConfig, requestClass: RequestBase): void {
    if (this.#initialized) {
      isSubmoduleAlreadyInitializedError();
    }
    this.#url = `${config.baseUrl}/sound`;
    this.#file_url = `${config.baseUrl}/file/sound`;
    this.#initialized = true;
    this.#RequestClass = requestClass;
  }

  /**
   * Get sound by scriptId
   * @param scriptId
   */
  public retrieve(scriptId: string): Promise<unknown> {
    if (!this.#initialized) {
      isInitializedError();
    }
    return this.#RequestClass.getRequest(this.#file_url, scriptId);
  }

  /**
   * create a sound template
   * @param data
   */
  public create(data: ISoundBody): Promise<unknown> {
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

export const Sound = new SoundClass();
Aflr.register(Sound);