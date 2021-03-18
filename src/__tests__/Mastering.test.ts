import Aflr, { Script, Speech, Mastering } from "../index";
import { RequestBase } from "../RequestBase";
import { debug, apiKey } from "../../test-config";

describe("Mastering module initialization", () => {
  beforeEach(() => {
    Aflr.reset();
  });

  test("It should return an error if not configured", () => {
    expect(() => Mastering.retrieve("some-id", {})).toThrowError(
      /configure the package before using it/
    );
  });

  test("It should not allow submodule configuration", () => {
    Aflr.configure({ apiKey: "some-api-key" });
    expect(() =>
      Mastering.configure({ apiKey: "1", baseUrl: "1" }, new RequestBase(""))
    ).toThrowError(/has already been initialized/);
  });

  test("It should have some properties", () => {
    Aflr.configure({ apiKey: "some-api-key" });
    expect(Mastering).toHaveProperty("create");
    expect(Mastering).toHaveProperty("retrieve");
  });
});

describe("Mastering operations", () => {
  beforeEach(() => {
    Aflr.reset();
    Aflr.configure({ apiKey, debug });
  });
  const backgroundTrackId = "full__citynights.wav";
  const testScriptText = "Hey testing!";
  const testValues = "test";
  let createdScriptId: string;

  test("It should create a speech from a new script to test the mastering", async () => {
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
        voiceName: "Joanna",
        voiceProvider: "polly",
        scriptSpeed: "100"
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

  test("It should create the mastering template", async () => {
    try {
      const rawResult: any = await Mastering.create({
        scriptId: createdScriptId,
        backgroundTrackId,
        audience: [{}]
      });
      expect(rawResult.MESSAGE).toBeDefined();
      expect(rawResult.MESSAGE).toMatch(/successful/gi);
    } catch (e) {
      console.error(e);
      throw new Error("test failed");
    }
  }, 30000);

  test("It should retrieve the mastering template", async () => {
    try {
      const rawResult: any = await Mastering.retrieve(createdScriptId, {});
      expect(rawResult.script).toEqual(testValues);
      expect(rawResult.url.startsWith("https://")).toBe(true);
      expect(rawResult.url).toMatch(`${testValues}/${testValues}/${testValues}`);
      expect(true).toBe(true);
    } catch (e) {
      console.error(e);
      throw new Error("test failed");
    }
  }, 30000);
});
