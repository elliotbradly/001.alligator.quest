import * as clone from "clone-deep";
import * as Act from "./blessed.action";
import { BlessedModel } from "./blessed.model";
import * as Buzz from "./blessed.buzzer";
import State from "../99.core/state";

export function reducer(model: BlessedModel = new BlessedModel(), act: Act.Actions,  state?: State ) {
 switch (act.type) {
 
 case Act.UPDATE_BLESSED:
 return Buzz.updateBlessed(clone(model), act.bale, state);

 case Act.INIT_BLESSED:
 return Buzz.initBlessed(clone(model), act.bale, state);

case Act.READ_BLESSED:
 return Buzz.readBlessed(clone(model), act.bale, state);
 
case Act.WRITE_BLESSED:
 return Buzz.writeBlessed(clone(model), act.bale, state);
 
case Act.REMOVE_BLESSED:
 return Buzz.removeBlessed(clone(model), act.bale, state);
 
case Act.DELETE_BLESSED:
 return Buzz.deleteBlessed(clone(model), act.bale, state);
 
case Act.CREATE_BLESSED:
 return Buzz.createBlessed(clone(model), act.bale, state);
 
 default:
 return model;
 }
}
