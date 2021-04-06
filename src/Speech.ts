import { Aflr } from "./Aflr";
import { isInitializedError, isSubmoduleAlreadyInitializedError } from "./Errors";
import { RequestBase } from "./RequestBase";
import { IConfig, ISpeechBody } from "./types";

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
   * Get speech url by script id
   * @param scriptId
   */
  public retrieve(scriptId: string): Promise<unknown> {
    if (!this.#initialized) {
      isInitializedError();
    }
    return this.#RequestClass.getRequest(this.#file_url, undefined, {
      params: { scriptId },
      timeout: 30000
    });
  }

  /**
   * Create a new speech
   * @param data
   */
  public create(data: ISpeechBody): Promise<unknown> {
    // todo: remove

    // @ts-ignore
    if (data["scriptSpeed"]) {
      // @ts-ignore
      data["speed"] = data["scriptSpeed"];
      // @ts-ignore
      delete data["scriptSpeed"];
      console.log(
        "scriptSpeed is renamed to speed, it will be deprecated in the next minor version - AFLR"
      );
    }
    // @ts-ignore
    if (data["voiceName"]) {
      // @ts-ignore
      data["voice"] = data["voiceName"];
      // @ts-ignore
      delete data["voiceName"];
      console.log(
        "voiceName is renamed to voice, it will be deprecated in the next minor version - AFLR"
      );
    }

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
