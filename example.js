const Aflr = require("./lib").default;
require("dotenv").config();

async function example() {
  try {
    Aflr.configure({ apiKey: process.env.API_KEY, debug: true });
    let script = await Aflr.Script.create({ scriptText: "Hello world" });
    console.log(script);

    script = await Aflr.Script.retrieve(script["scriptId"]);
    console.log(script);

    let scripts = await Aflr.Script.list();
    console.log(scripts);

    let voices = await Aflr.Voice.list();
    console.log(voices);

    let speech = await Aflr.Speech.create({ scriptId: script["scriptId"] });
    console.log(speech);

    let speechResult = await Aflr.Speech.retrieve(script["scriptId"]);
    console.log(speechResult);

  } catch (e) {
    console.error(e);
  }
}

example();
