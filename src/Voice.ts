import { Aflr } from "./Aflr";
import { isInitializedError, isSubmoduleAlreadyInitializedError } from "./Errors";
import { RequestBase } from "./RequestBase";
import { IConfig } from "./types";

export class VoiceClass {
  private initialized: boolean = false;
  private RequestClass!: RequestBase;

  public configure(config: IConfig): void | Promise<never> {
    if (this.initialized) {
      return isSubmoduleAlreadyInitializedError();
    }
    const url: string = `${config.baseUrl}/voice`;
    this.initialized = true;
    this.RequestClass = new RequestBase(config.apiKey, url);
  }

  /**
   * List all voices
   */
  public list() {
    if (!this.initialized) {
      return isInitializedError();
    }
    return this.RequestClass.getRequest(true);
  }

  public reset() {
    this.initialized = false;
    // @ts-ignore
    this.RequestClass = undefined;
  }
}

export const Voice = new VoiceClass();
Aflr.register(Voice);
