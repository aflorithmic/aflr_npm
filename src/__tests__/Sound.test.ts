import Aflr, { Script, Speech, Sound } from "../index";
import { RequestBase } from "../RequestBase";
import { debug, apiKey } from "../../test-config";

describe("Sound module initialization", () => {
  beforeEach(() => {
    Aflr.reset();
  });

  test("It should return an error if not configured", () => {
    expect(() => Sound.retrieve("some-id")).toThrowError(/configure the package before using it/);
  });

  test("It should not allow submodule configuration", () => {
    Aflr.configure({ apiKey: "some-api-key" });
    expect(() => Sound.configure({ apiKey: "1", baseUrl: "1" }, new RequestBase(""))).toThrowError(
      /has already been initialized/
    );
  });

  test("It should have some properties", () => {
    Aflr.configure({ apiKey: "some-api-key" });
    expect(Sound).toHaveProperty("create");
    expect(Sound).toHaveProperty("retrieve");
    expect(Sound).toHaveProperty("list");
  });
});

describe("Sound operations", () => {
  beforeEach(() => {
    Aflr.reset();
    Aflr.configure({ apiKey, debug });
  });
  const testScriptText = "Hey testing testing!";
  const testValues = "test10";
  let createdScriptId: string;

  test("It should create a speech from a new script to test the sound", async () => {
    try {
      // @ts-ignore
      const { scriptId } = await Script.create({
        scriptText: testScriptText,
        scriptName: testValues,
        moduleName: testValues,
        projectName: testValues
      });
      createdScriptId = scriptId;

      const result: any = await Speech.create({
        scriptId: createdScriptId,
        voice: "Joanna",
        speed: "100"
      });

      expect(result.message).toBeDefined();
      expect(result.message).toMatch(/success/i);
    } catch (e) {
      console.error(e);
      throw new Error("test failed");
    }
  });

  test("It should retrieve the created speech", async () => {
    try {
      const rawResult: any = await Speech.retrieve(createdScriptId);
      expect(rawResult.default).toBeDefined();
      expect(rawResult.default.startsWith("https://")).toBe(true);
      expect(rawResult.default).toMatch(`${testValues}/${testValues}/${testValues}`);
    } catch (e) {
      console.error(e);
      throw new Error("test failed");
    }
  }, 30000);

  test("It should create the sound template", async () => {
    try {
      const bg_tracks: any = await Sound.list();
      const rawResult: any = await Sound.create({
        scriptId: createdScriptId,
        backgroundTrackId: bg_tracks["tracklist"][0]
      });
      expect(rawResult.url.startsWith("https://")).toBe(true);
      expect(rawResult.url).toMatch(`${testValues}/${testValues}/${testValues}`);
    } catch (e) {
      console.error(e);
      throw new Error("test failed");
    }
  }, 30000);

  test("It should retrieve the sound template", async () => {
    try {
      const rawResult: any = await Sound.retrieve(createdScriptId);
      expect(rawResult.url.startsWith("https://")).toBe(true);
      expect(rawResult.url).toMatch(`${testValues}/${testValues}/${testValues}`);
    } catch (e) {
      console.error(e);
      throw new Error("test failed");
    }
  }, 30000);

  test("It should list all the background tracks", async () => {
    try {
      const rawResult: any = await Sound.list();
      expect(rawResult).toHaveProperty("tracklist");
      expect(rawResult).toHaveProperty("trackUrls");
      expect(Array.isArray(rawResult?.tracklist)).toBe(true);
      for (const value of rawResult?.trackUrls) {
        expect(typeof value).toEqual("string");
      }
    } catch (e) {
      console.error(e);
      throw new Error("test failed");
    }
  });
});
