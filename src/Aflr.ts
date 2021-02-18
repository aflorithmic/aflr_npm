import { IConfig } from "./types";

interface IComponent {
  getModuleName(): any;
  configure(config: IConfig): any | void;
}

interface IObject {
  [key: string]: any;
}

class AflrClass {
  private config!: IConfig;
  private components: IComponent[] = [];
  private modules: IObject = {};

  public register(comp: IComponent) {
    this.components.push(comp);
    this.modules[comp.getModuleName()] = comp;
  }

  public configure(config: IConfig) {
    if (!config || !config.apiKey) {
      throw new Error("API key must be a valid string.");
    }

    this.config = config;

    this.components.map(comp => {
      comp.configure(this.config);
    });

    return this.config;
  }
}

export const Aflr = new AflrClass();
