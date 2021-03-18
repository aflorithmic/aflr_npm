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

  test("It should list all of the scripts and find the created one", async () => {
    try {
      const voices: any = await Voice.list();
      expect(Array.isArray(voices.voices)).toBe(true);
    } catch (e) {
      console.error(e);
      throw new Error("test failed");
    }
  });
});
