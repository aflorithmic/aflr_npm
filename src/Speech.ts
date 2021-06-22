import { Aflr } from "./Aflr";
import { isInitializedError, isSubmoduleAlreadyInitializedError } from "./Errors";
import { RequestBase } from "./RequestBase";
import { IConfig, ISpeechBody, PersonalisationParameters } from "./types";

export class SpeechClass {
  #initialized = false;
  #RequestClass!: RequestBase;
  #url = "";
  #file_url = "";

  public configure(config: IConfig, requestClass: RequestBase): void {
    if (this.#initialized) {
      isSubmoduleAlreadyInitializedError();
    }
    this.#url = `${config.baseUrl}/speech`;
    this.#file_url = `${config.baseUrl}/file/speech`;
    this.#initialized = true;
    this.#RequestClass = requestClass;
  }

  /**
   * Get speech url by script id, section and parameters
   * @param scriptId
   * @param section The script section name for the first section. The default name for a script section is "default". NOTE: At the moment, Only scripts with 1 section are supported. If the scripts contain more than one section, only the first section can be retrieved.
   * @param parameters Dict containing the personalisation parameters for the first section of the script. This parameter depends on the parameters you used in your script's resource section. If this parameter is used, `section` must be specified.
   */
  public retrieve(
    scriptId: string,
    section?: string,
    parameters?: PersonalisationParameters
  ): Promise<unknown> {
    if (!this.#initialized) {
      isInitializedError();
    }
    return this.#RequestClass.getRequest(this.#file_url, undefined, {
      params: { scriptId, section, parameters },
      timeout: 30000
    });
  }

  /**
   * Create a new speech
   * @param data
   */
  public create(data: ISpeechBody): Promise<unknown> {
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

export const Speech = new SpeechClass();
Aflr.register(Speech);
