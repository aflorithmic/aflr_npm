import axios, { AxiosInstance, AxiosPromise } from "axios";

interface Urls {
  singularUrl: string;
  pluralUrl: string;
}

export { AxiosPromise };
export class RequestBase {
  private axios: AxiosInstance;
  private urls: Urls;

  constructor(apiKey: string, urls: Urls) {
    this.axios = axios.create({ headers: { "x-api-key": apiKey } });
    this.urls = urls;
  }

  protected postRequest(data: any): Promise<AxiosPromise> {
    return this.axios.post(this.urls.pluralUrl, data);
  }

  protected getRequest(
    usePluralUrl: boolean = false,
    path: string = "",
    params: any = {}
  ): Promise<AxiosPromise> {
    const url: string = usePluralUrl ? this.urls.pluralUrl : this.urls.singularUrl;
    return this.axios.get(`${url}/${path}`, { params });
  }
}
