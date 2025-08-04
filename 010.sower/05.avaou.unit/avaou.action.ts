import { Action } from "../99.core/interface/action.interface";
import  AvaouBit  from "./fce/avaou.bit";

// Avaou actions

export const INIT_AVAOU = "[Avaou action] Init Avaou";
export class InitAvaou implements Action {
 readonly type = INIT_AVAOU;
 constructor(public bale: AvaouBit) {}
}

export const UPDATE_AVAOU = "[Avaou action] Update Avaou";
export class UpdateAvaou implements Action {
 readonly type = UPDATE_AVAOU;
 constructor(public bale: AvaouBit) {}
}

export const READ_AVAOU = "[Read action] Read Avaou";
 export class ReadAvaou implements Action {
 readonly type = READ_AVAOU;
 constructor(public bale: AvaouBit) {}
 }
 
export const WRITE_AVAOU = "[Write action] Write Avaou";
 export class WriteAvaou implements Action {
 readonly type = WRITE_AVAOU;
 constructor(public bale: AvaouBit) {}
 }
 
export const REMOVE_AVAOU = "[Remove action] Remove Avaou";
 export class RemoveAvaou implements Action {
 readonly type = REMOVE_AVAOU;
 constructor(public bale: AvaouBit) {}
 }
 
export const DELETE_AVAOU = "[Delete action] Delete Avaou";
 export class DeleteAvaou implements Action {
 readonly type = DELETE_AVAOU;
 constructor(public bale: AvaouBit) {}
 }
 
export const CREATE_AVAOU = "[Create action] Create Avaou";
 export class CreateAvaou implements Action {
 readonly type = CREATE_AVAOU;
 constructor(public bale: AvaouBit) {}
 }
 
export type Actions = | InitAvaou | UpdateAvaou 
| ReadAvaou
| WriteAvaou
| RemoveAvaou
| DeleteAvaou
| CreateAvaou