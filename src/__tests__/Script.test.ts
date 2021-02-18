import Aflr, { Script } from "../index";

test("It should have some properties", () => {
  Aflr.configure({ apiKey: "some-api-key" });
  expect(Script).toHaveProperty("list");
  expect(Script).toHaveProperty("create");
  expect(Script).toHaveProperty("retrieve");
});
