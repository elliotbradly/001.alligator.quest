import * as clone from "clone-deep";
import * as Act from "./progress.action";
import { ProgressModel } from "./progress.model";
import * as Buzz from "./progress.buzzer";
import State from "../99.core/state";

export function reducer(model: ProgressModel = new ProgressModel(), act: Act.Actions,  state?: State ) {
 switch (act.type) {
 
 case Act.UPDATE_PROGRESS:
 return Buzz.updateProgress(clone(model), act.bale, state);

 case Act.INIT_PROGRESS:
 return Buzz.initProgress(clone(model), act.bale, state);

 default:
 return model;
 }
}
