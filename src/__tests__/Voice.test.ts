import Aflr, { Voice } from "../index";
require("dotenv").config();

const apiKey = process.env.API_KEY || "";

describe("Voice module initialization", () => {
  beforeEach(() => {
    Aflr.reset();
  });

  test("It should return an error if not configured", async () => {
    try {
      await Voice.list();
    } catch (e) {
      expect(e).toMatch(/configure the package before using it/);
    }
  });

  test("It should not allow submodule configuration", async () => {
    try {
      Aflr.configure({ apiKey: "some-api-key" });
      await Voice.configure({ apiKey: "1", baseUrl: "1" });
    } catch (e) {
      expect(e).toMatch(/has already been initialized/);
    }
  });

  test("It should have some properties", () => {
    Aflr.configure({ apiKey: "some-api-key" });
    expect(Voice).toHaveProperty("list");
  });
});

describe("Speech operations", () => {
  beforeEach(() => {
    Aflr.reset();
    Aflr.configure({ apiKey, debug: true });
  });

  test("It should list all of the scripts and find the created one", async () => {
    try {
      const voices: any = await Voice.list();
      expect(Array.isArray(voices.voices)).toBe(true);
    } catch (e) {
      throw new Error("test failed");
    }
  });
});
