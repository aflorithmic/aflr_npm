import Aflr, { Script } from "../index";
require("dotenv").config();

const apiKey = process.env.API_KEY || "";

describe("Script module initialization", () => {
  beforeEach(() => {
    Aflr.reset();
  });

  test("It should return an error if not configured", () => {
    expect(() => Script.list()).toThrowError(/configure the package before using it/);
  });

  test("It should not allow submodule configuration", () => {
    Aflr.configure({ apiKey: "some-api-key" });
    expect(() => Script.configure({ apiKey: "1", baseUrl: "1" })).toThrowError(
      /has already been initialized/
    );
  });

  test("It should have some properties", () => {
    Aflr.configure({ apiKey: "some-api-key" });
    expect(Script).toHaveProperty("list");
    expect(Script).toHaveProperty("create");
    expect(Script).toHaveProperty("retrieve");
  });
});

describe("Script operations", () => {
  beforeEach(() => {
    Aflr.reset();
    Aflr.configure({ apiKey, debug: true });
  });
  const testScriptText = "Hey testing!";
  const testValues = "test";
  let createdScriptId: string;

  test("It should create a new script", async () => {
    try {
      // @ts-ignore
      const { scriptId, scriptText, scriptName, moduleName, projectName } = await Script.create({
        scriptText: testScriptText,
        scriptName: testValues,
        moduleName: testValues,
        projectName: testValues
      });
      createdScriptId = scriptId;
      expect(scriptText).toMatch(testScriptText); // since section names are added automatically, we dont do exact check
      expect(scriptName).toBe(testValues);
      expect(moduleName).toBe(testValues);
      expect(projectName).toBe(testValues);
    } catch (e) {
      console.error(e);
      throw new Error("test failed");
    }
  });

  test("It should retrieve the created script", async () => {
    try {
      // @ts-ignore
      const { scriptText, scriptName, moduleName, projectName } = await Script.retrieve(
        createdScriptId
      );
      expect(scriptText).toMatch(testScriptText); // since section names are added automatically, we dont do exact check
      expect(scriptName).toBe(testValues);
      expect(moduleName).toBe(testValues);
      expect(projectName).toBe(testValues);
    } catch (e) {
      console.error(e);
      throw new Error("test failed");
    }
  });

  test("It should list all of the scripts and find the created one", async () => {
    try {
      const scripts = await Script.list();
      expect(Array.isArray(scripts)).toBe(true);
      expect(scripts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            scriptText: expect.stringMatching(testScriptText),
            scriptName: testValues,
            moduleName: testValues,
            projectName: testValues
          })
        ])
      );
    } catch (e) {
      console.error(e);
      throw new Error("test failed");
    }
  });
});
