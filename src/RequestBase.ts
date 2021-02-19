import axios, { AxiosInstance } from "axios";

export class RequestBase {
  private axios: AxiosInstance;
  private url: string;

  constructor(apiKey: string, url: string) {
    this.axios = axios.create({ headers: { "x-api-key": apiKey } });
    this.url = url;
  }

  public postRequest(data: any) {
    return new Promise(async (res, rej) => {
      try {
        const { data: result } = await this.axios.post(this.url, data);
        res(result);
      } catch (e) {
        rej(e.response);
      }
    });
  }

  public getRequest(path: string = "", params: any = {}) {
    return new Promise(async (res, rej) => {
      try {
        const { data: result } = await this.axios.get(`${this.url}/${path}`, {
          params
        });
        res(result);
      } catch (e) {
        rej(e.response);
      }
    });
  }
}
