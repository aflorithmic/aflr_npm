import Aflr, { Script, Speech } from "../index";
require("dotenv").config();

const apiKey = process.env.API_KEY || "";

describe("Speech module initialization", () => {
  beforeEach(() => {
    Aflr.reset();
  });

  test("It should return an error if not configured", async () => {
    try {
      await Speech.retrieve("some-id");
    } catch (e) {
      expect(e.message).toMatch(/configure the package before using it/);
    }
  });

  test("It should not allow submodule configuration", async () => {
    try {
      Aflr.configure({ apiKey: "some-api-key" });
      await Speech.configure({ apiKey: "1", baseUrl: "1" });
    } catch (e) {
      expect(e.message).toMatch(/has already been initialized/);
    }
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
    Aflr.configure({ apiKey, debug: true });
  });
  const testScriptText = "Hey testing!";
  const testValues = "test";
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

      const result: any = await Speech.create({ scriptId: createdScriptId });

      expect(result.message).toBeDefined();
      expect(result.message).toMatch(/success/i);
    } catch (e) {
      throw new Error("test failed");
    }
  });

  test("It should retrieve the created speech", async () => {
    try {
      const rawResult: any = await Speech.retrieve(createdScriptId);
      expect(rawResult.default).toBeDefined(); // sectionName is default by default

      const result: Array<any> = rawResult.default;

      expect(result[0].startsWith("https://")).toBe(true);
      expect(result[0]).toMatch(`${testValues}__${testValues}__${testValues}`);
    } catch (e) {
      throw new Error("test failed");
    }
  }, 30000);
});
