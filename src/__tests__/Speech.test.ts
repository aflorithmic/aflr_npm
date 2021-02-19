import Aflr, { Script, Speech } from "../index";
require("dotenv").config();

describe("Speech module initialization", () => {
  beforeEach(() => {
    Aflr.reset();
  });

  test("It should return an error if not configured", async () => {
    try {
      await Speech.retrieve("some-id");
    } catch (e) {
      expect(e).toMatch(/configure the package before using it/);
    }
  });

  test("It should not allow submodule configuration", async () => {
    try {
      Aflr.configure({ apiKey: "some-api-key" });
      await Speech.configure({ apiKey: "1", baseUrl: "1" });
    } catch (e) {
      expect(e).toMatch(/has already been initialized/);
    }
  });

  test("It should have some properties", () => {
    Aflr.configure({ apiKey: "some-api-key" });
    expect(Speech).toHaveProperty("create");
    expect(Speech).toHaveProperty("retrieve");
  });
});

// describe("Speech operations", () => {
//   Aflr.configure({ apiKey: process.env.API_KEY, debug: true });
//   const testScriptText = "Hey testing!";
//   const testValues = "test";
//   let createdScriptId: string;

//   test("It should create a speech from a new script", async () => {
//     try {
//       // @ts-ignore
//       const { scriptId } = await Script.create({
//         scriptText: testScriptText,
//         scriptName: testValues,
//         moduleName: testValues,
//         projectName: testValues
//       });
//       createdScriptId = scriptId;

//       const result = await Speech.create({ scriptId: createdScriptId });

//       expect(result["message"]).toBeDefined();
//       expect(result["message"]).toMatch(/success/i);
//     } catch (e) {
//       throw new Error("test failed");
//     }
//   });

//   test("It should retrieve the created speech", async () => {
//     try {
//       jest.setTimeout(30000);
//       let result = await Speech.retrieve(createdScriptId);
//       expect(result["default"]).toBeDefined(); // sectionName is default by default

//       result = result["default"];

//       expect(result[0].startsWith("https://")).toBe(true);
//       expect(result[0]).toMatch(`/${testValues}__${testValues}__${testValues}/`);
//     } catch (e) {
//       throw new Error("test failed");
//     }
//   });
// });
