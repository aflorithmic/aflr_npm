import { isValidApiKeyError } from "./Errors";
import { IConfig } from "./types";

interface IComponent {
  configure(config: IConfig): void;
}

class AflrClass {
  private config!: IConfig;
  private components: IComponent[] = [];

  public register(comp: IComponent) {
    this.components.push(comp);
  }

  /**
   * Configure the SDK before using it. Make sure you call this function
   * before any of the calls
   * @param config
   */
  public configure(config: IConfig) {
    if (!config || !config.apiKey) {
      return isValidApiKeyError();
    }

    this.config = config;
    this.components.map(comp => {
      comp.configure(this.config);
    });

    return this.config;
  }
}

export const Aflr = new AflrClass();
