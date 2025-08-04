import { Action } from "../99.core/interface/action.interface";
import  SupernalBit  from "./fce/supernal.bit";

// Supernal actions

export const INIT_SUPERNAL = "[Supernal action] Init Supernal";
export class InitSupernal implements Action {
 readonly type = INIT_SUPERNAL;
 constructor(public bale: SupernalBit) {}
}

export const UPDATE_SUPERNAL = "[Supernal action] Update Supernal";
export class UpdateSupernal implements Action {
 readonly type = UPDATE_SUPERNAL;
 constructor(public bale: SupernalBit) {}
}

export const READ_SUPERNAL = "[Read action] Read Supernal";
 export class ReadSupernal implements Action {
 readonly type = READ_SUPERNAL;
 constructor(public bale: SupernalBit) {}
 }
 
export const WRITE_SUPERNAL = "[Write action] Write Supernal";
 export class WriteSupernal implements Action {
 readonly type = WRITE_SUPERNAL;
 constructor(public bale: SupernalBit) {}
 }
 
export const REMOVE_SUPERNAL = "[Remove action] Remove Supernal";
 export class RemoveSupernal implements Action {
 readonly type = REMOVE_SUPERNAL;
 constructor(public bale: SupernalBit) {}
 }
 
export const DELETE_SUPERNAL = "[Delete action] Delete Supernal";
 export class DeleteSupernal implements Action {
 readonly type = DELETE_SUPERNAL;
 constructor(public bale: SupernalBit) {}
 }
 
export const CREATE_SUPERNAL = "[Create action] Create Supernal";
 export class CreateSupernal implements Action {
 readonly type = CREATE_SUPERNAL;
 constructor(public bale: SupernalBit) {}
 }
 
export type Actions = | InitSupernal | UpdateSupernal 
| ReadSupernal
| WriteSupernal
| RemoveSupernal
| DeleteSupernal
| CreateSupernal