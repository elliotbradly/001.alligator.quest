import { Action } from "../99.core/interface/action.interface";
import  PlayerBit  from "./fce/player.bit";

// Player actions

export const INIT_PLAYER = "[Player action] Init Player";
export class InitPlayer implements Action {
 readonly type = INIT_PLAYER;
 constructor(public bale: PlayerBit) {}
}

export const UPDATE_PLAYER = "[Player action] Update Player";
export class UpdatePlayer implements Action {
 readonly type = UPDATE_PLAYER;
 constructor(public bale: PlayerBit) {}
}

export const READ_PLAYER = "[Read action] Read Player";
 export class ReadPlayer implements Action {
 readonly type = READ_PLAYER;
 constructor(public bale: PlayerBit) {}
 }
 
export const WRITE_PLAYER = "[Write action] Write Player";
 export class WritePlayer implements Action {
 readonly type = WRITE_PLAYER;
 constructor(public bale: PlayerBit) {}
 }
 
export const REMOVE_PLAYER = "[Remove action] Remove Player";
 export class RemovePlayer implements Action {
 readonly type = REMOVE_PLAYER;
 constructor(public bale: PlayerBit) {}
 }
 
export const DELETE_PLAYER = "[Delete action] Delete Player";
 export class DeletePlayer implements Action {
 readonly type = DELETE_PLAYER;
 constructor(public bale: PlayerBit) {}
 }
 
export const CREATE_PLAYER = "[Create action] Create Player";
 export class CreatePlayer implements Action {
 readonly type = CREATE_PLAYER;
 constructor(public bale: PlayerBit) {}
 }
 
export const OPEN_PLAYER = "[Open action] Open Player";
 export class OpenPlayer implements Action {
 readonly type = OPEN_PLAYER;
 constructor(public bale: PlayerBit) {}
 }
 
export type Actions = | InitPlayer | UpdatePlayer 
| ReadPlayer
| WritePlayer
| RemovePlayer
| DeletePlayer
| CreatePlayer
| OpenPlayer