import { Aflr } from "./Aflr";
import { API_BASE_URL } from "./constants";
import { AxiosPromise, RequestBase } from "./RequestBase";
import { IConfig } from "./types";

const url: string = `${API_BASE_URL}/script`;

export class ScriptClass {
  private config!: IConfig;
  private RequestClass!: RequestBase;

  public getModuleName() {
    return "Script";
  }

  public configure(config: IConfig = this.config) {
    this.RequestClass = new RequestBase(config.apiKey, url);
  }

  public list(): Promise<AxiosPromise> {
    return this.RequestClass.getRequest(true);
  }

  public retrieve(scriptId: string): Promise<AxiosPromise> {
    return this.RequestClass.getRequest(false, scriptId);
  }

  public create(data: any): Promise<AxiosPromise> {
    // TODO: implement script param types
    return this.RequestClass.postRequest(data);
  }
}

export const Script = new ScriptClass();
Aflr.register(Script);
