import Aflr from "../index";
import { Script } from "../Script";

test("First test", () => {
  Aflr.configure({ apiKey: "some-api-key" });
  const obj = Script;
  expect(obj).toHaveProperty("list");
  expect(obj).toHaveProperty("create");
  expect(obj).toHaveProperty("retrieve");
});
