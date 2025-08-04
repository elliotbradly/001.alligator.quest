import * as clone from "clone-deep";
import * as Act from "./sower.action";
import { SowerModel } from "./sower.model";
import * as Buzz from "./sower.buzzer";
import State from "../99.core/state";

export function reducer(model: SowerModel = new SowerModel(), act: Act.Actions,  state?: State ) {
 switch (act.type) {
 
 case Act.UPDATE_SOWER:
 return Buzz.updateSower(clone(model), act.bale, state);

 case Act.INIT_SOWER:
 return Buzz.initSower(clone(model), act.bale, state);

 
case Act.OPEN_SOWER:
 return Buzz.openSower(clone(model), act.bale, state);
 
case Act.TEST_SOWER:
 return Buzz.testSower(clone(model), act.bale, state);
 
 default:
 return model;
 }
}
