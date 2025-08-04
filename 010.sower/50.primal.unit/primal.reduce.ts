import * as clone from "clone-deep";
import * as Act from "./primal.action";
import { PrimalModel } from "./primal.model";
import * as Buzz from "./primal.buzzer";
import State from "../99.core/state";

export function reducer(model: PrimalModel = new PrimalModel(), act: Act.Actions,  state?: State ) {
 switch (act.type) {
 
 case Act.UPDATE_PRIMAL:
 return Buzz.updatePrimal(clone(model), act.bale, state);

 case Act.INIT_PRIMAL:
 return Buzz.initPrimal(clone(model), act.bale, state);

case Act.READ_PRIMAL:
 return Buzz.readPrimal(clone(model), act.bale, state);
 
case Act.WRITE_PRIMAL:
 return Buzz.writePrimal(clone(model), act.bale, state);
 
case Act.REMOVE_PRIMAL:
 return Buzz.removePrimal(clone(model), act.bale, state);
 
case Act.DELETE_PRIMAL:
 return Buzz.deletePrimal(clone(model), act.bale, state);
 
case Act.CREATE_PRIMAL:
 return Buzz.createPrimal(clone(model), act.bale, state);
 
 default:
 return model;
 }
}
