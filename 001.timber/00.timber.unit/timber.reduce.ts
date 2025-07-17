import * as clone from "clone-deep";
import * as Act from "./timber.action";
import { TimberModel } from "./timber.model";
import * as Buzz from "./timber.buzzer";
import State from "../99.core/state";

export function reducer(model: TimberModel = new TimberModel(), act: Act.Actions,  state?: State ) {
 switch (act.type) {
 
 case Act.UPDATE_TIMBER:
 return Buzz.updateTimber(clone(model), act.bale, state);

 case Act.INIT_TIMBER:
 return Buzz.initTimber(clone(model), act.bale, state);

 default:
 return model;
 }
}
