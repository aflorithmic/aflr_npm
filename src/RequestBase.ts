import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class RequestBase {
  #axios: AxiosInstance;

  constructor(apiKey: string) {
    this.#axios = axios.create({ headers: { "x-api-key": apiKey } });
  }

  public postRequest(url: string, data: unknown, config: AxiosRequestConfig = {}): any {
    return new Promise((res, rej) => {
      this.#axios
        .post(url, data, { ...config })
        .then(({ data: result }) => res(result))
        .catch(({ response }) => rej(response.data));
    });
  }

  public getRequest(url: string, path = "", config: AxiosRequestConfig = {}): any {
    return new Promise((res, rej) => {
      this.#axios
        .get(`${url}/${path}`, { ...config })
        .then(({ data: result }) => res(result))
        .catch(({ response }) => rej(response.data));
    });
  }
}
