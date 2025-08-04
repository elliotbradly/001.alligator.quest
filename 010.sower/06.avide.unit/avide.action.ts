import { Action } from "../99.core/interface/action.interface";
import  AvideBit  from "./fce/avide.bit";

// Avide actions

export const INIT_AVIDE = "[Avide action] Init Avide";
export class InitAvide implements Action {
 readonly type = INIT_AVIDE;
 constructor(public bale: AvideBit) {}
}

export const UPDATE_AVIDE = "[Avide action] Update Avide";
export class UpdateAvide implements Action {
 readonly type = UPDATE_AVIDE;
 constructor(public bale: AvideBit) {}
}

export const READ_AVIDE = "[Read action] Read Avide";
 export class ReadAvide implements Action {
 readonly type = READ_AVIDE;
 constructor(public bale: AvideBit) {}
 }
 
export const WRITE_AVIDE = "[Write action] Write Avide";
 export class WriteAvide implements Action {
 readonly type = WRITE_AVIDE;
 constructor(public bale: AvideBit) {}
 }
 
export const REMOVE_AVIDE = "[Remove action] Remove Avide";
 export class RemoveAvide implements Action {
 readonly type = REMOVE_AVIDE;
 constructor(public bale: AvideBit) {}
 }
 
export const DELETE_AVIDE = "[Delete action] Delete Avide";
 export class DeleteAvide implements Action {
 readonly type = DELETE_AVIDE;
 constructor(public bale: AvideBit) {}
 }
 
export const CREATE_AVIDE = "[Create action] Create Avide";
 export class CreateAvide implements Action {
 readonly type = CREATE_AVIDE;
 constructor(public bale: AvideBit) {}
 }
 
export type Actions = | InitAvide | UpdateAvide 
| ReadAvide
| WriteAvide
| RemoveAvide
| DeleteAvide
| CreateAvide