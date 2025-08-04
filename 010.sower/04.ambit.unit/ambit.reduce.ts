import * as clone from "clone-deep";
import * as Act from "./ambit.action";
import { AmbitModel } from "./ambit.model";
import * as Buzz from "./ambit.buzzer";
import State from "../99.core/state";

export function reducer(model: AmbitModel = new AmbitModel(), act: Act.Actions,  state?: State ) {
 switch (act.type) {
 
 case Act.UPDATE_AMBIT:
 return Buzz.updateAmbit(clone(model), act.bale, state);

 case Act.INIT_AMBIT:
 return Buzz.initAmbit(clone(model), act.bale, state);

case Act.READ_AMBIT:
 return Buzz.readAmbit(clone(model), act.bale, state);
 
case Act.WRITE_AMBIT:
 return Buzz.writeAmbit(clone(model), act.bale, state);
 
case Act.REMOVE_AMBIT:
 return Buzz.removeAmbit(clone(model), act.bale, state);
 
case Act.DELETE_AMBIT:
 return Buzz.deleteAmbit(clone(model), act.bale, state);
 
case Act.CREATE_AMBIT:
 return Buzz.createAmbit(clone(model), act.bale, state);
 
 default:
 return model;
 }
}