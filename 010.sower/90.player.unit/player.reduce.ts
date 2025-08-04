import * as clone from "clone-deep";
import * as Act from "./player.action";
import { PlayerModel } from "./player.model";
import * as Buzz from "./player.buzzer";
import State from "../99.core/state";

export function reducer(model: PlayerModel = new PlayerModel(), act: Act.Actions,  state?: State ) {
 switch (act.type) {
 
 case Act.UPDATE_PLAYER:
 return Buzz.updatePlayer(clone(model), act.bale, state);

 case Act.INIT_PLAYER:
 return Buzz.initPlayer(clone(model), act.bale, state);

case Act.READ_PLAYER:
 return Buzz.readPlayer(clone(model), act.bale, state);
 
case Act.WRITE_PLAYER:
 return Buzz.writePlayer(clone(model), act.bale, state);
 
case Act.REMOVE_PLAYER:
 return Buzz.removePlayer(clone(model), act.bale, state);
 
case Act.DELETE_PLAYER:
 return Buzz.deletePlayer(clone(model), act.bale, state);
 
case Act.CREATE_PLAYER:
 return Buzz.createPlayer(clone(model), act.bale, state);
 
case Act.OPEN_PLAYER:
 return Buzz.openPlayer(clone(model), act.bale, state);
 
 default:
 return model;
 }
}
