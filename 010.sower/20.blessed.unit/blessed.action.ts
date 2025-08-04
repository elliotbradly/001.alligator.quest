import { Action } from "../99.core/interface/action.interface";
import  BlessedBit  from "./fce/blessed.bit";

// Blessed actions

export const INIT_BLESSED = "[Blessed action] Init Blessed";
export class InitBlessed implements Action {
 readonly type = INIT_BLESSED;
 constructor(public bale: BlessedBit) {}
}

export const UPDATE_BLESSED = "[Blessed action] Update Blessed";
export class UpdateBlessed implements Action {
 readonly type = UPDATE_BLESSED;
 constructor(public bale: BlessedBit) {}
}

export const READ_BLESSED = "[Read action] Read Blessed";
 export class ReadBlessed implements Action {
 readonly type = READ_BLESSED;
 constructor(public bale: BlessedBit) {}
 }
 
export const WRITE_BLESSED = "[Write action] Write Blessed";
 export class WriteBlessed implements Action {
 readonly type = WRITE_BLESSED;
 constructor(public bale: BlessedBit) {}
 }
 
export const REMOVE_BLESSED = "[Remove action] Remove Blessed";
 export class RemoveBlessed implements Action {
 readonly type = REMOVE_BLESSED;
 constructor(public bale: BlessedBit) {}
 }
 
export const DELETE_BLESSED = "[Delete action] Delete Blessed";
 export class DeleteBlessed implements Action {
 readonly type = DELETE_BLESSED;
 constructor(public bale: BlessedBit) {}
 }
 
export const CREATE_BLESSED = "[Create action] Create Blessed";
 export class CreateBlessed implements Action {
 readonly type = CREATE_BLESSED;
 constructor(public bale: BlessedBit) {}
 }
 
export type Actions = | InitBlessed | UpdateBlessed 
| ReadBlessed
| WriteBlessed
| RemoveBlessed
| DeleteBlessed
| CreateBlessed