import clone from "clone-deep";
import * as Act from "./earth.action";
import { EarthModel } from "./earth.model";
import * as Buzz from "./earth.buzzer";
import State from "../99.core/state";

export function reducer(model: EarthModel = new EarthModel(), act: Act.Actions,  state?: State ) {
 switch (act.type) {
 
 case Act.UPDATE_EARTH:
 return Buzz.updateEarth(clone(model), act.bale, state);

 case Act.INIT_EARTH:
 return Buzz.initEarth(clone(model), act.bale, state);

 case Act.OPEN_EARTH:
 return Buzz.openEarth(clone(model), act.bale, state);

case Act.TEST_EARTH:
 return Buzz.testEarth(clone(model), act.bale, state);
 
 default:
 return model;
 }
}
