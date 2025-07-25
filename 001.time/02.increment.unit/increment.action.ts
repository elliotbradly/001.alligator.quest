import { Action } from "../99.core/interface/action.interface";
import  IncrementBit  from "./fce/increment.bit";

// Increment actions

export const INIT_INCREMENT = "[Increment action] Init Increment";
export class InitIncrement implements Action {
 readonly type = INIT_INCREMENT;
 constructor(public bale: IncrementBit) {}
}

export const UPDATE_INCREMENT = "[Increment action] Update Increment";
export class UpdateIncrement implements Action {
 readonly type = UPDATE_INCREMENT;
 constructor(public bale: IncrementBit) {}
}

export const READ_INCREMENT = "[Read action] Read Increment";
 export class ReadIncrement implements Action {
 readonly type = READ_INCREMENT;
 constructor(public bale: IncrementBit) {}
 }
 
export const WRITE_INCREMENT = "[Write action] Write Increment";
 export class WriteIncrement implements Action {
 readonly type = WRITE_INCREMENT;
 constructor(public bale: IncrementBit) {}
 }
 
export const REMOVE_INCREMENT = "[Remove action] Remove Increment";
 export class RemoveIncrement implements Action {
 readonly type = REMOVE_INCREMENT;
 constructor(public bale: IncrementBit) {}
 }
 
export const DELETE_INCREMENT = "[Delete action] Delete Increment";
 export class DeleteIncrement implements Action {
 readonly type = DELETE_INCREMENT;
 constructor(public bale: IncrementBit) {}
 }
 
export const CREATE_INCREMENT = "[Create action] Create Increment";
 export class CreateIncrement implements Action {
 readonly type = CREATE_INCREMENT;
 constructor(public bale: IncrementBit) {}
 }

export const LIST_INCREMENT = "[List action] List Increment";
 export class ListIncrement implements Action {
 readonly type = LIST_INCREMENT;
 constructor(public bale: IncrementBit) {}
 }
 
export type Actions = 
| InitIncrement 
| UpdateIncrement
| ReadIncrement
| WriteIncrement
| RemoveIncrement
| DeleteIncrement
| CreateIncrement
| ListIncrement