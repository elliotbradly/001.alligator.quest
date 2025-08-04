import * as clone from "clone-deep";
import * as Act from "./pastoral.action";
import { PastoralModel } from "./pastoral.model";
import * as Buzz from "./pastoral.buzzer";
import State from "../99.core/state";

export function reducer(model: PastoralModel = new PastoralModel(), act: Act.Actions,  state?: State ) {
 switch (act.type) {
 
 case Act.UPDATE_PASTORAL:
 return Buzz.updatePastoral(clone(model), act.bale, state);

 case Act.INIT_PASTORAL:
 return Buzz.initPastoral(clone(model), act.bale, state);

case Act.READ_PASTORAL:
 return Buzz.readPastoral(clone(model), act.bale, state);
 
case Act.WRITE_PASTORAL:
 return Buzz.writePastoral(clone(model), act.bale, state);
 
case Act.REMOVE_PASTORAL:
 return Buzz.removePastoral(clone(model), act.bale, state);
 
case Act.DELETE_PASTORAL:
 return Buzz.deletePastoral(clone(model), act.bale, state);
 
case Act.CREATE_PASTORAL:
 return Buzz.createPastoral(clone(model), act.bale, state);
 
 default:
 return model;
 }
}
