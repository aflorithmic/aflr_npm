import Aflr, { Script, Speech, Voice } from "aflr";

async function example() {
  Aflr.configure({ apiKey: "your-api-key", debug: true });
  try {
    let script = await Script.create({ scriptText: "<<sectionName::hello>> Hello world" });
    console.log(script);

    script = await Script.retrieve(script["scriptId"]);
    console.log(script);

    let scripts = await Script.list();
    console.log(scripts);

    let speech = await Speech.create({ scriptId: script["scriptId"] });
    console.log(speech);

    let speechResult = await Speech.retrieve(script["scriptId"]);
    console.log(speechResult);

    let voices = await Voice.list();
    console.log(voices);
  } catch (e) {
    console.error(e);
  }
}

example();
