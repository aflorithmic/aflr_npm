import { API_BASE_URL, API_BASE_URL_STAGING } from "../constants";
import Aflr from "../index";
import { debug } from "../../test-config";
require("dotenv").config();

const apiKey = process.env.API_KEY || "";

describe("Main module initialization", () => {
  beforeEach(() => Aflr.reset());

  test("It should require apiKey in configuration", () => {
    // @ts-ignore
    expect(() => Aflr.configure().toThrowError(/must be a valid string/));
  });

  test("It should throw an error if configured twice", () => {
    Aflr.configure({ apiKey, debug });
    expect(() => Aflr.configure({ apiKey, debug })).toThrowError(/has already been initialized/);
  });

  test("It should not throw an error if configured twice after resetting", () => {
    Aflr.configure({ apiKey, debug });
    Aflr.reset();
    expect(() => Aflr.configure({ apiKey, debug })).not.toThrow();
  });

  test("It should return if initialized", () => {
    expect(Aflr.isInitialized()).toBe(false);
    Aflr.configure({ apiKey, debug });
    expect(Aflr.isInitialized()).toBe(true);
    Aflr.reset();
    expect(Aflr.isInitialized()).toBe(false);
  });

  test("It should set base url correctly according to debug value", () => {
    const { baseUrl: stagingBaseUrl } = Aflr.configure({ apiKey, debug: true });
    expect(stagingBaseUrl).toBe(API_BASE_URL_STAGING);
    Aflr.reset();
    const { baseUrl: prodBaseUrl } = Aflr.configure({ apiKey, debug: false });
    expect(prodBaseUrl).toBe(API_BASE_URL);
  });
});
