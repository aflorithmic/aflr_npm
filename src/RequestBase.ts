import axios, { AxiosInstance, AxiosPromise } from "axios";

export { AxiosPromise };
export class RequestBase {
  private axios: AxiosInstance;
  private url: string;

  constructor(apiKey: string, url: string) {
    this.axios = axios.create({ headers: { "x-api-key": apiKey } });
    this.url = url;
  }

  public postRequest(data: any): Promise<AxiosPromise> {
    return new Promise(async (res, rej) => {
      try {
        const { data: result } = await this.axios.post(this.url, data);
        res(result);
      } catch (e) {
        rej(e.response);
      }
    });
  }

  public getRequest(
    usePluralUrl: boolean = false,
    path: string = "",
    params: any = {}
  ): Promise<AxiosPromise> {
    const urlAddon: string = usePluralUrl ? "s" : "";
    return new Promise(async (res, rej) => {
      try {
        const { data: result } = await this.axios.get(`${this.url}${urlAddon}/${path}`, { params });
        res(result);
      } catch (e) {
        rej(e.response);
      }
    });
  }
}
