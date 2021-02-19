import { Aflr } from "./Aflr";
import { isInitializedError, isSubmoduleAlreadyInitializedError } from "./Errors";
import { RequestBase } from "./RequestBase";
import { IConfig } from "./types";

export class VoiceClass {
  private initialized = false;
  private RequestClass!: RequestBase;

  public configure(config: IConfig): void | Promise<never> {
    if (this.initialized) {
      return isSubmoduleAlreadyInitializedError();
    }
    const url = `${config.baseUrl}/voice`;
    this.initialized = true;
    this.RequestClass = new RequestBase(config.apiKey, url);
  }

  /**
   * List all voices
   */
  public list(): Promise<never> | Promise<unknown> {
    if (!this.initialized) {
      return isInitializedError();
    }
    return this.RequestClass.getRequest();
  }

  public reset(): void {
    this.initialized = false;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.RequestClass = undefined;
  }
}

export const Voice = new VoiceClass();
Aflr.register(Voice);
