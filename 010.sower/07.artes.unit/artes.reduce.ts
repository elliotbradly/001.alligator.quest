import * as clone from "clone-deep";
import * as Act from "./artes.action";
import { ArtesModel } from "./artes.model";
import * as Buzz from "./artes.buzzer";
import State from "../99.core/state";

export function reducer(model: ArtesModel = new ArtesModel(), act: Act.Actions,  state?: State ) {
 switch (act.type) {
 
 case Act.UPDATE_ARTES:
 return Buzz.updateArtes(clone(model), act.bale, state);

 case Act.INIT_ARTES:
 return Buzz.initArtes(clone(model), act.bale, state);

case Act.READ_ARTES:
 return Buzz.readArtes(clone(model), act.bale, state);
 
case Act.WRITE_ARTES:
 return Buzz.writeArtes(clone(model), act.bale, state);
 
case Act.REMOVE_ARTES:
 return Buzz.removeArtes(clone(model), act.bale, state);
 
case Act.DELETE_ARTES:
 return Buzz.deleteArtes(clone(model), act.bale, state);
 
case Act.CREATE_ARTES:
 return Buzz.createArtes(clone(model), act.bale, state);
 
 default:
 return model;
 }
}