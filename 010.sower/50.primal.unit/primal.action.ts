import { Action } from "../99.core/interface/action.interface";
import  PrimalBit  from "./fce/primal.bit";

// Primal actions

export const INIT_PRIMAL = "[Primal action] Init Primal";
export class InitPrimal implements Action {
 readonly type = INIT_PRIMAL;
 constructor(public bale: PrimalBit) {}
}

export const UPDATE_PRIMAL = "[Primal action] Update Primal";
export class UpdatePrimal implements Action {
 readonly type = UPDATE_PRIMAL;
 constructor(public bale: PrimalBit) {}
}

export const READ_PRIMAL = "[Read action] Read Primal";
 export class ReadPrimal implements Action {
 readonly type = READ_PRIMAL;
 constructor(public bale: PrimalBit) {}
 }
 
export const WRITE_PRIMAL = "[Write action] Write Primal";
 export class WritePrimal implements Action {
 readonly type = WRITE_PRIMAL;
 constructor(public bale: PrimalBit) {}
 }
 
export const REMOVE_PRIMAL = "[Remove action] Remove Primal";
 export class RemovePrimal implements Action {
 readonly type = REMOVE_PRIMAL;
 constructor(public bale: PrimalBit) {}
 }
 
export const DELETE_PRIMAL = "[Delete action] Delete Primal";
 export class DeletePrimal implements Action {
 readonly type = DELETE_PRIMAL;
 constructor(public bale: PrimalBit) {}
 }
 
export const CREATE_PRIMAL = "[Create action] Create Primal";
 export class CreatePrimal implements Action {
 readonly type = CREATE_PRIMAL;
 constructor(public bale: PrimalBit) {}
 }
 
export type Actions = | InitPrimal | UpdatePrimal 
| ReadPrimal
| WritePrimal
| RemovePrimal
| DeletePrimal
| CreatePrimal