import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class RequestBase {
  #axios: AxiosInstance;
  #url: string;

  constructor(apiKey: string, url: string) {
    this.#axios = axios.create({ headers: { "x-api-key": apiKey } });
    this.#url = url;
  }

  public postRequest(data: unknown, config: AxiosRequestConfig = {}): any {
    return new Promise((res, rej) => {
      this.#axios
        .post(this.#url, data, { ...config })
        .then(({ data: result }) => res(result))
        .catch(({ response }) => rej(response.data));
    });
  }

  public getRequest(path = "", config: AxiosRequestConfig = {}): any {
    return new Promise((res, rej) => {
      this.#axios
        .get(`${this.#url}/${path}`, { ...config })
        .then(({ data: result }) => res(result))
        .catch(({ response }) => rej(response.data));
    });
  }
}
