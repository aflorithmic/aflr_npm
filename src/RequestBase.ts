import axios, { AxiosInstance } from "axios";

export class RequestBase {
  #axios: AxiosInstance;
  #url: string;

  constructor(apiKey: string, url: string) {
    this.#axios = axios.create({ headers: { "x-api-key": apiKey } });
    this.#url = url;
  }

  public postRequest(data: unknown): any {
    return new Promise((res, rej) => {
      this.#axios
        .post(this.#url, data)
        .then(({ data: result }) => res(result))
        .catch(({ response }) => rej(response));
    });
  }

  public getRequest(path = "", params: unknown = {}): any {
    return new Promise((res, rej) => {
      this.#axios
        .get(`${this.#url}/${path}`, {
          params
        })
        .then(({ data: result }) => res(result))
        .catch(({ response }) => rej(response));
    });
  }
}
