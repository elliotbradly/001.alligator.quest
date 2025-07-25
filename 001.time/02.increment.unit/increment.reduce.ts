import * as clone from "clone-deep";
import * as Act from "./increment.action";
import { IncrementModel } from "./increment.model";
import * as Buzz from "./increment.buzzer";
import State from "../99.core/state";

export function reducer(model: IncrementModel = new IncrementModel(), act: Act.Actions,  state?: State ) {
 switch (act.type) {
 
 case Act.UPDATE_INCREMENT:
  return Buzz.updateIncrement(clone(model), act.bale, state);

 case Act.INIT_INCREMENT:
  return Buzz.initIncrement(clone(model), act.bale, state);

 case Act.CREATE_INCREMENT:
  return Buzz.createIncrement(clone(model), act.bale, state);
 
 case Act.READ_INCREMENT:
  return Buzz.readIncrement(clone(model), act.bale, state);

 case Act.WRITE_INCREMENT:
  return Buzz.writeIncrement(clone(model), act.bale, state);

 case Act.REMOVE_INCREMENT:
  return Buzz.removeIncrement(clone(model), act.bale, state);

 case Act.DELETE_INCREMENT:
  return Buzz.deleteIncrement(clone(model), act.bale, state);
 
case Act.LIST_INCREMENT:
 return Buzz.listIncrement(clone(model), act.bale, state);
 
 default:
  return model;
 }
}