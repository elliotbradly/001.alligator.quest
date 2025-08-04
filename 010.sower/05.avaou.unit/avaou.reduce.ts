import * as clone from "clone-deep";
import * as Act from "./avaou.action";
import { AvaouModel } from "./avaou.model";
import * as Buzz from "./avaou.buzzer";
import State from "../99.core/state";

export function reducer(model: AvaouModel = new AvaouModel(), act: Act.Actions,  state?: State ) {
 switch (act.type) {
 
 case Act.UPDATE_AVAOU:
 return Buzz.updateAvaou(clone(model), act.bale, state);

 case Act.INIT_AVAOU:
 return Buzz.initAvaou(clone(model), act.bale, state);

case Act.READ_AVAOU:
 return Buzz.readAvaou(clone(model), act.bale, state);
 
case Act.WRITE_AVAOU:
 return Buzz.writeAvaou(clone(model), act.bale, state);
 
case Act.REMOVE_AVAOU:
 return Buzz.removeAvaou(clone(model), act.bale, state);
 
case Act.DELETE_AVAOU:
 return Buzz.deleteAvaou(clone(model), act.bale, state);
 
case Act.CREATE_AVAOU:
 return Buzz.createAvaou(clone(model), act.bale, state);
 
 default:
 return model;
 }
}