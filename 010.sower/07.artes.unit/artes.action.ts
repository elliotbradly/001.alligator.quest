import { Action } from "../99.core/interface/action.interface";
import  ArtesBit  from "./fce/artes.bit";

// Artes actions

export const INIT_ARTES = "[Artes action] Init Artes";
export class InitArtes implements Action {
 readonly type = INIT_ARTES;
 constructor(public bale: ArtesBit) {}
}

export const UPDATE_ARTES = "[Artes action] Update Artes";
export class UpdateArtes implements Action {
 readonly type = UPDATE_ARTES;
 constructor(public bale: ArtesBit) {}
}

export const READ_ARTES = "[Read action] Read Artes";
 export class ReadArtes implements Action {
 readonly type = READ_ARTES;
 constructor(public bale: ArtesBit) {}
 }
 
export const WRITE_ARTES = "[Write action] Write Artes";
 export class WriteArtes implements Action {
 readonly type = WRITE_ARTES;
 constructor(public bale: ArtesBit) {}
 }
 
export const REMOVE_ARTES = "[Remove action] Remove Artes";
 export class RemoveArtes implements Action {
 readonly type = REMOVE_ARTES;
 constructor(public bale: ArtesBit) {}
 }
 
export const DELETE_ARTES = "[Delete action] Delete Artes";
 export class DeleteArtes implements Action {
 readonly type = DELETE_ARTES;
 constructor(public bale: ArtesBit) {}
 }
 
export const CREATE_ARTES = "[Create action] Create Artes";
 export class CreateArtes implements Action {
 readonly type = CREATE_ARTES;
 constructor(public bale: ArtesBit) {}
 }
 
export type Actions = | InitArtes | UpdateArtes 
| ReadArtes
| WriteArtes
| RemoveArtes
| DeleteArtes
| CreateArtes