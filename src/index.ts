import { Aflr } from "./Aflr";
import { Script } from "./Script";
import { Speech } from "./Speech";
import { SyncTTS } from "./SyncTTS";
import { Voice } from "./Voice";

Aflr.Script = Script;
Aflr.Speech = Speech;
Aflr.Voice = Voice;
Aflr.SyncTTS = SyncTTS;

export default Aflr;
export { Script, Speech, Voice, SyncTTS };
