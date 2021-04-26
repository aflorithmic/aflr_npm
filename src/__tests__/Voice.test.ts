import Aflr, { Voice } from "../index";
import { RequestBase } from "../RequestBase";
import { debug, apiKey } from "../../test-config";

describe("Voice module initialization", () => {
  beforeEach(() => {
    Aflr.reset();
  });

  test("It should return an error if not configured", () => {
    expect(() => Voice.list()).toThrowError(/configure the package before using it/);
  });

  test("It should not allow submodule configuration", () => {
    Aflr.configure({ apiKey: "some-api-key" });
    expect(() => Voice.configure({ apiKey: "1", baseUrl: "1" }, new RequestBase(""))).toThrowError(
      /has already been initialized/
    );
  });

  test("It should have some properties", () => {
    Aflr.configure({ apiKey: "some-api-key" });
    expect(Voice).toHaveProperty("list");
  });
});

describe("Voice operations", () => {
  beforeEach(() => {
    Aflr.reset();
    Aflr.configure({ apiKey, debug });
  });

  let allVoicesCount: number;

  test("It should list all of the voices", async () => {
    try {
      const voices: any = await Voice.list();
      expect(Array.isArray(voices.voices)).toBe(true);
      allVoicesCount = voices.voices.length;
    } catch (e) {
      console.error(e);
      throw new Error("test failed");
    }
  });

  test("It should list all of the voices that match the filtering parameters", async () => {
    try {
      const voices: any = await Voice.list({
        tags: "fun",
        gender: "male",
        language: "english"
      });
      expect(Array.isArray(voices.voices)).toBe(true);
      expect(voices.voices.length).toBeLessThanOrEqual(allVoicesCount);
    } catch (e) {
      console.error(e);
      throw new Error("test failed");
    }
  });

  test("It should not return any voice, and should list available filtering parmeters", async () => {
    try {
      await Voice.list({
        notExistingFilteringParameter: "value"
      });
      throw new Error("test failed");
    } catch (e) {
      expect(e).toHaveProperty("message");
      expect(e).toHaveProperty("allowedFilteringParameters");
    }
  });

  test("It should list all of the available filtering parameters", async () => {
    try {
      const parameters: any = await Voice.parameters();
      expect(typeof parameters === "object").toBe(true);
    } catch (e) {
      console.error(e);
      throw new Error("test failed");
    }
  });
});
