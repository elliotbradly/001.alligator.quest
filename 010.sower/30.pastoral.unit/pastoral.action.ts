import { Action } from "../99.core/interface/action.interface";
import  PastoralBit  from "./fce/pastoral.bit";

// Pastoral actions

export const INIT_PASTORAL = "[Pastoral action] Init Pastoral";
export class InitPastoral implements Action {
 readonly type = INIT_PASTORAL;
 constructor(public bale: PastoralBit) {}
}

export const UPDATE_PASTORAL = "[Pastoral action] Update Pastoral";
export class UpdatePastoral implements Action {
 readonly type = UPDATE_PASTORAL;
 constructor(public bale: PastoralBit) {}
}

export const READ_PASTORAL = "[Read action] Read Pastoral";
 export class ReadPastoral implements Action {
 readonly type = READ_PASTORAL;
 constructor(public bale: PastoralBit) {}
 }
 
export const WRITE_PASTORAL = "[Write action] Write Pastoral";
 export class WritePastoral implements Action {
 readonly type = WRITE_PASTORAL;
 constructor(public bale: PastoralBit) {}
 }
 
export const REMOVE_PASTORAL = "[Remove action] Remove Pastoral";
 export class RemovePastoral implements Action {
 readonly type = REMOVE_PASTORAL;
 constructor(public bale: PastoralBit) {}
 }
 
export const DELETE_PASTORAL = "[Delete action] Delete Pastoral";
 export class DeletePastoral implements Action {
 readonly type = DELETE_PASTORAL;
 constructor(public bale: PastoralBit) {}
 }
 
export const CREATE_PASTORAL = "[Create action] Create Pastoral";
 export class CreatePastoral implements Action {
 readonly type = CREATE_PASTORAL;
 constructor(public bale: PastoralBit) {}
 }
 
export type Actions = | InitPastoral | UpdatePastoral 
| ReadPastoral
| WritePastoral
| RemovePastoral
| DeletePastoral
| CreatePastoral