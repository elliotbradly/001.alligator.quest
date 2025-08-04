import * as clone from "clone-deep";
import * as Act from "./spark.action";
import { SparkModel } from "./spark.model";
import * as Buzz from "./spark.buzzer";
import State from "../99.core/state";

export function reducer(model: SparkModel = new SparkModel(), act: Act.Actions,  state?: State ) {
 switch (act.type) {
 
 case Act.UPDATE_SPARK:
 return Buzz.updateSpark(clone(model), act.bale, state);

 case Act.INIT_SPARK:
 return Buzz.initSpark(clone(model), act.bale, state);

case Act.READ_SPARK:
 return Buzz.readSpark(clone(model), act.bale, state);
 
case Act.WRITE_SPARK:
 return Buzz.writeSpark(clone(model), act.bale, state);
 
case Act.REMOVE_SPARK:
 return Buzz.removeSpark(clone(model), act.bale, state);
 
case Act.DELETE_SPARK:
 return Buzz.deleteSpark(clone(model), act.bale, state);
 
case Act.CREATE_SPARK:
 return Buzz.createSpark(clone(model), act.bale, state);
 
 default:
 return model;
 }
}
