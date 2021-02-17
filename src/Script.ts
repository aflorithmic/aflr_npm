import { API_BASE_URL } from "./constants";
import { AxiosPromise, RequestBase } from "./RequestBase";

export class Script extends RequestBase {
  constructor(apiKey: string) {
    const surl: string = `${API_BASE_URL}/script`;
    const purl: string = `${API_BASE_URL}/scripts`;
    super(apiKey, { singularUrl: surl, pluralUrl: purl });
  }

  public list(): Promise<AxiosPromise> {
    return this.getRequest(true);
  }

  public retrieve(scriptId: string): Promise<AxiosPromise> {
    return this.getRequest(false, scriptId);
  }

  public create(data: any): Promise<AxiosPromise> {
    // TODO: implement script params
    return this.postRequest(data);
  }
}
