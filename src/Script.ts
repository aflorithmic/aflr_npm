import { Aflr } from "./Aflr";
import { isInitializedError, isSubmoduleAlreadyInitializedError } from "./Errors";
import { RequestBase } from "./RequestBase";
import { IConfig, IScriptBody } from "./types";

export class ScriptClass {
  #initialized = false;
  #RequestClass!: RequestBase;
  #url = "";
  #randomUrl = "";

  public configure(config: IConfig, requestClass: RequestBase): void {
    if (this.#initialized) {
      isSubmoduleAlreadyInitializedError();
    }
    this.#url = `${config.baseUrl}/script`;
    this.#randomUrl = `${config.baseUrl}/script/random`;
    this.#initialized = true;
    this.#RequestClass = requestClass;
  }

  /**
   * List all scripts
   */
  public list(): Promise<unknown> {
    if (!this.#initialized) {
      isInitializedError();
    }
    return this.#RequestClass.getRequest(this.#url);
  }

  /**
   * Get script by id
   * @param scriptId
   */
  public retrieve(scriptId: string): Promise<unknown> {
    if (!this.#initialized) {
      isInitializedError();
    }
    return this.#RequestClass.getRequest(this.#url, scriptId);
  }

  /**
   * Retrieve random text from a list of categories
   * @param category The category from which the random text is retrieved. If no category is specified, the function defaults to "FunFact" - Categories currently available: "BibleVerse", "FunFact", "InspirationalQuote", "Joke", "MovieSynopsis", "Poem", "PhilosophicalQuestion", "Recipe", "TriviaQuestion"
   */
  public getRandomText(category?: string): Promise<unknown> {
    if (!this.#initialized) {
      isInitializedError();
    }
    return this.#RequestClass.getRequest(this.#randomUrl, "", { params: { category } });
  }

  /**
   * Create a new script
   * @param data
   */
  public create(data: IScriptBody): Promise<unknown> {
    if (!this.#initialized) {
      isInitializedError();
    }
    return this.#RequestClass.postRequest(this.#url, data);
  }

  public reset(): void {
    this.#initialized = false;
    // @ts-ignore
    this.#RequestClass = undefined;
    this.#url = "";
    this.#randomUrl = "";
  }
}

export const Script = new ScriptClass();
Aflr.register(Script);
