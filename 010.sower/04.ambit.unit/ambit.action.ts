import { Action } from "../99.core/interface/action.interface";
import  AmbitBit  from "./fce/ambit.bit";

// Ambit actions

export const INIT_AMBIT = "[Ambit action] Init Ambit";
export class InitAmbit implements Action {
 readonly type = INIT_AMBIT;
 constructor(public bale: AmbitBit) {}
}

export const UPDATE_AMBIT = "[Ambit action] Update Ambit";
export class UpdateAmbit implements Action {
 readonly type = UPDATE_AMBIT;
 constructor(public bale: AmbitBit) {}
}

export const READ_AMBIT = "[Read action] Read Ambit";
 export class ReadAmbit implements Action {
 readonly type = READ_AMBIT;
 constructor(public bale: AmbitBit) {}
 }
 
export const WRITE_AMBIT = "[Write action] Write Ambit";
 export class WriteAmbit implements Action {
 readonly type = WRITE_AMBIT;
 constructor(public bale: AmbitBit) {}
 }
 
export const REMOVE_AMBIT = "[Remove action] Remove Ambit";
 export class RemoveAmbit implements Action {
 readonly type = REMOVE_AMBIT;
 constructor(public bale: AmbitBit) {}
 }
 
export const DELETE_AMBIT = "[Delete action] Delete Ambit";
 export class DeleteAmbit implements Action {
 readonly type = DELETE_AMBIT;
 constructor(public bale: AmbitBit) {}
 }
 
export const CREATE_AMBIT = "[Create action] Create Ambit";
 export class CreateAmbit implements Action {
 readonly type = CREATE_AMBIT;
 constructor(public bale: AmbitBit) {}
 }
 
export type Actions = | InitAmbit | UpdateAmbit 
| ReadAmbit
| WriteAmbit
| RemoveAmbit
| DeleteAmbit
| CreateAmbit