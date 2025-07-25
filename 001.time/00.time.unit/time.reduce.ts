import * as clone from "clone-deep";
import * as Act from "./time.action";
import { TimeModel } from "./time.model";
import * as Buzz from "./time.buzzer";
import State from "../99.core/state";

export function reducer(model: TimeModel = new TimeModel(), act: Act.Actions, state?: State) {
  switch (act.type) {

    case Act.UPDATE_TIME:
      return Buzz.updateTime(clone(model), act.bale, state);

    case Act.INIT_TIME:
      return Buzz.initTime(clone(model), act.bale, state);


    case Act.TEST_TIME:
      return Buzz.testTime(clone(model), act.bale, state);


case Act.RANDOM_TIME:
 return Buzz.randomTime(clone(model), act.bale, state);
 
    default:
      return model;
  }
}
