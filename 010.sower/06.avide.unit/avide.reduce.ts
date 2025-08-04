import * as clone from "clone-deep";
import * as Act from "./avide.action";
import { AvideModel } from "./avide.model";
import * as Buzz from "./avide.buzzer";
import State from "../99.core/state";

export function reducer(model: AvideModel = new AvideModel(), act: Act.Actions,  state?: State ) {
 switch (act.type) {
 
 case Act.UPDATE_AVIDE:
 return Buzz.updateAvide(clone(model), act.bale, state);

 case Act.INIT_AVIDE:
 return Buzz.initAvide(clone(model), act.bale, state);

case Act.READ_AVIDE:
 return Buzz.readAvide(clone(model), act.bale, state);
 
case Act.WRITE_AVIDE:
 return Buzz.writeAvide(clone(model), act.bale, state);
 
case Act.REMOVE_AVIDE:
 return Buzz.removeAvide(clone(model), act.bale, state);
 
case Act.DELETE_AVIDE:
 return Buzz.deleteAvide(clone(model), act.bale, state);
 
case Act.CREATE_AVIDE:
 return Buzz.createAvide(clone(model), act.bale, state);
 
 default:
 return model;
 }
}