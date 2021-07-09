import Aflr, { SyncTTS } from "../index";
import { RequestBase } from "../RequestBase";
import { debug, apiKey } from "../../test-config";

describe("SyncTTS module initialization", () => {
  beforeEach(() => {
    Aflr.reset();
  });

  test("It should return an error if not configured", () => {
    expect(() => SyncTTS.create({ voice: "", text: "" })).toThrowError(
      /configure the package before using it/
    );
  });

  test("It should not allow submodule configuration", () => {
    Aflr.configure({ apiKey: "some-api-key" });
    expect(() =>
      SyncTTS.configure({ apiKey: "1", baseUrl: "1" }, new RequestBase(""))
    ).toThrowError(/has already been initialized/);
  });

  test("It should have some properties", () => {
    Aflr.configure({ apiKey: "some-api-key" });
    expect(SyncTTS).toHaveProperty("create");
  });
});

describe("SyncTTS operations", () => {
  beforeEach(() => {
    Aflr.reset();
    Aflr.configure({ apiKey, debug });
  });
  const testTTSText = "Hey testing!";
  const testVoiceId = "salih";

  test("It should create a TTS and return a presigned S3 url", async () => {
    try {
      const result: any = await SyncTTS.create({
        voice: testVoiceId,
        text: testTTSText
      });
      expect(result.message).toBeDefined();
      expect(result.message.startsWith("https://")).toBe(true);
      expect(result.message).toMatch("Expires");
      expect(result.message).toMatch("AWSAccessKeyId");
      expect(result.message).toMatch("Signature");
      expect(result.message).toMatch("x-amz-security-token");
    } catch (e) {
      console.error(e);
      throw new Error("test failed");
    }
  }, 30000);
});
