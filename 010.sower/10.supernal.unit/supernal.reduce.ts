import * as clone from "clone-deep";
import * as Act from "./supernal.action";
import { SupernalModel } from "./supernal.model";
import * as Buzz from "./supernal.buzzer";
import State from "../99.core/state";

export function reducer(model: SupernalModel = new SupernalModel(), act: Act.Actions,  state?: State ) {
 switch (act.type) {
 
 case Act.UPDATE_SUPERNAL:
 return Buzz.updateSupernal(clone(model), act.bale, state);

 case Act.INIT_SUPERNAL:
 return Buzz.initSupernal(clone(model), act.bale, state);

case Act.READ_SUPERNAL:
 return Buzz.readSupernal(clone(model), act.bale, state);
 
case Act.WRITE_SUPERNAL:
 return Buzz.writeSupernal(clone(model), act.bale, state);
 
case Act.REMOVE_SUPERNAL:
 return Buzz.removeSupernal(clone(model), act.bale, state);
 
case Act.DELETE_SUPERNAL:
 return Buzz.deleteSupernal(clone(model), act.bale, state);
 
case Act.CREATE_SUPERNAL:
 return Buzz.createSupernal(clone(model), act.bale, state);
 
 default:
 return model;
 }
}
