import * as clone from "clone-deep";
import * as Act from "./color.action";
import { ColorModel } from "./color.model";
import * as Buzz from "./color.buzzer";
import State from "../99.core/state";

export function reducer(model: ColorModel = new ColorModel(), act: Act.Actions,  state?: State ) {
 switch (act.type) {
 
 case Act.UPDATE_COLOR:
 return Buzz.updateColor(clone(model), act.bale, state);

 case Act.INIT_COLOR:
 return Buzz.initColor(clone(model), act.bale, state);

case Act.OPEN_COLOR:
 return Buzz.openColor(clone(model), act.bale, state);
 
case Act.READ_COLOR:
 return Buzz.readColor(clone(model), act.bale, state);
 
case Act.WRITE_COLOR:
 return Buzz.writeColor(clone(model), act.bale, state);
 
case Act.REMOVE_COLOR:
 return Buzz.removeColor(clone(model), act.bale, state);
 
case Act.DELETE_COLOR:
 return Buzz.deleteColor(clone(model), act.bale, state);
 
case Act.CREATE_COLOR:
 return Buzz.createColor(clone(model), act.bale, state);
 
case Act.LIST_COLOR:
 return Buzz.listColor(clone(model), act.bale, state);
 
case Act.RANDOM_COLOR:
 return Buzz.randomColor(clone(model), act.bale, state);
 
case Act.BASKET_COLOR:
 return Buzz.basketColor(clone(model), act.bale, state);
 
case Act.ACCESS_COLOR:
 return Buzz.accessColor(clone(model), act.bale, state);
 
 default:
 return model;
 }
}