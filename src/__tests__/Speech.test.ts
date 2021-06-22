import Aflr, { Script, Speech } from "../index";
import { RequestBase } from "../RequestBase";
import { debug, apiKey } from "../../test-config";

describe("Speech module initialization", () => {
  beforeEach(() => {
    Aflr.reset();
  });

  test("It should return an error if not configured", () => {
    expect(() => Speech.retrieve("some-id")).toThrowError(/configure the package before using it/);
  });

  test("It should not allow submodule configuration", () => {
    Aflr.configure({ apiKey: "some-api-key" });
    expect(() => Speech.configure({ apiKey: "1", baseUrl: "1" }, new RequestBase(""))).toThrowError(
      /has already been initialized/
    );
  });

  test("It should have some properties", () => {
    Aflr.configure({ apiKey: "some-api-key" });
    expect(Speech).toHaveProperty("create");
    expect(Speech).toHaveProperty("retrieve");
  });
});

describe("Speech operations", () => {
  beforeEach(() => {
    Aflr.reset();
    Aflr.configure({ apiKey, debug });
  });
  const testScriptText =
    "<<sectionName::hello>> Hello {{username|buddy}} <<sectionName::bye>> Good bye from {{location|istanbul}}";
  const testValues = "test6";
  let createdScriptId: string;

  test("It should create a speech from a new script", async () => {
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
        speed: "100",
        effect: "dark_father",
        silence_padding: 1200,
        audience: [{ username: "salih", location: "london" }]
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

  test("It should retrieve the created speech with section", async () => {
    try {
      const rawResult: any = await Speech.retrieve(createdScriptId, "hello", {
        username: "salih",
        location: "london"
      });
      expect(rawResult.default).toBeDefined();
      expect(rawResult.default.startsWith("https://")).toBe(true);
      expect(rawResult.default).toMatch(`${testValues}/${testValues}/${testValues}`);
    } catch (e) {
      console.error(e);
      throw new Error("test failed");
    }
  }, 30000);
});
