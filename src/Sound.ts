import { Aflr } from "./Aflr";
import { isInitializedError, isSubmoduleAlreadyInitializedError } from "./Errors";
import { RequestBase } from "./RequestBase";
import { IConfig, ISoundBody } from "./types";

export class SoundClass {
  #initialized = false;
  #RequestClass!: RequestBase;
  #url = "";
  #file_url = "";
  #bg_url = "";
  #template_url = "";

  public configure(config: IConfig, requestClass: RequestBase): void {
    if (this.#initialized) {
      isSubmoduleAlreadyInitializedError();
    }
    this.#url = `${config.baseUrl}/sound`;
    this.#file_url = `${config.baseUrl}/file/sound`;
    this.#bg_url = `${config.baseUrl}/file/background_track`;
    this.#template_url = `${config.baseUrl}/file/soundtemplates`;
    this.#initialized = true;
    this.#RequestClass = requestClass;
  }

  /**
   * Get sound by script id
   * @param scriptId
   * @param parameters
   */
  public retrieve(scriptId: string): Promise<unknown> {
    if (!this.#initialized) {
      isInitializedError();
    }
    return this.#RequestClass.getRequest(this.#file_url, "", { params: { scriptId } });
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

  /**
   * List all background tracks including a 15 seconds audio snippet
   */
  public list(): Promise<unknown> {
    if (!this.#initialized) {
      isInitializedError();
    }
    return this.#RequestClass.getRequest(this.#bg_url);
  }

  /**
   * List all the available sound templates
   */
  public templates(): Promise<unknown> {
    if (!this.#initialized) {
      isInitializedError();
    }
    return this.#RequestClass.getRequest(this.#template_url);
  }

  public reset(): void {
    this.#initialized = false;
    // @ts-ignore
    this.#RequestClass = undefined;
    this.#url = "";
    this.#file_url = "";
    this.#bg_url = "";
    this.#template_url = "";
  }
}

export const Sound = new SoundClass();
Aflr.register(Sound);
