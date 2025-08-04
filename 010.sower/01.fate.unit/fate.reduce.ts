import * as clone from "clone-deep";
import * as Act from "./fate.action";
import { FateModel } from "./fate.model";
import * as Buzz from "./fate.buzzer";
import State from "../99.core/state";

export function reducer(model: FateModel = new FateModel(), act: Act.Actions,  state?: State ) {
 switch (act.type) {
 
 case Act.UPDATE_FATE:
 return Buzz.updateFate(clone(model), act.bale, state);

 case Act.INIT_FATE:
 return Buzz.initFate(clone(model), act.bale, state);

case Act.INTEGER_FATE:
 return Buzz.integerFate(clone(model), act.bale, state);
 
case Act.APPLE_FATE:
 return Buzz.appleFate(clone(model), act.bale, state);
 
case Act.SINE_FATE:
 return Buzz.sineFate(clone(model), act.bale, state);
 
case Act.SELECT_FATE:
 return Buzz.selectFate(clone(model), act.bale, state);
 
case Act.SHUFFLE_FATE:
 return Buzz.shuffleFate(clone(model), act.bale, state);
 
 default:
 return model;
 }
}
