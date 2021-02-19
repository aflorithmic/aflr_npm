import { API_BASE_URL, API_BASE_URL_STAGING } from "../constants";
import Aflr from "../index";
require("dotenv").config();

describe("Main module initialization", () => {
  beforeAll(() => Aflr.reset());

  test("It should require apiKey in configuration", async () => {
    try {
      // @ts-ignore
      await Aflr.configure();
    } catch (e) {
      expect(e).toMatch(/must be a valid string/);
    }
  });

  test("It should throw an error if configured twice", async () => {
    try {
      await Aflr.configure({ apiKey: process.env.API_KEY, debug: true });
      await Aflr.configure({ apiKey: process.env.API_KEY, debug: true });
    } catch (e) {
      expect(e).toMatch(/has already been initialized/);
    }
  });

  test("It should not throw an error if configured twice after resetting", async () => {
    try {
      Aflr.configure({ apiKey: process.env.API_KEY, debug: true });
      Aflr.reset();
      expect(Aflr.configure({ apiKey: process.env.API_KEY, debug: true })).not.toThrowError();
    } catch (e) {}
  });

  test("It should have staging and prod urls correctly", async () => {
    try {
      Aflr.configure({ apiKey: process.env.API_KEY, debug: true });
      // @ts-ignore
      expect(Aflr.Script.RequestClass.url).toMatch(API_BASE_URL_STAGING);

      Aflr.reset();

      Aflr.configure({ apiKey: process.env.API_KEY });
      // @ts-ignore
      expect(Aflr.Script.RequestClass.url).toMatch(API_BASE_URL);
    } catch (e) {
      expect(e).toMatch(/has already been initialized/);
    }
  });
});
