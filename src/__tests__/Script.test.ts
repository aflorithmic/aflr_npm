import { Script } from "../Script";

test("First test", () => {
  const obj = new Script("some-api-key");
  expect(obj).toHaveProperty("list");
  expect(obj).toHaveProperty("create");
  expect(obj).toHaveProperty("retrieve");
});
