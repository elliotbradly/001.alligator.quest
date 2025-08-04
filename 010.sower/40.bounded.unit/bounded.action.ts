import { Action } from "../99.core/interface/action.interface";
import  BoundedBit  from "./fce/bounded.bit";

// Bounded actions

export const INIT_BOUNDED = "[Bounded action] Init Bounded";
export class InitBounded implements Action {
 readonly type = INIT_BOUNDED;
 constructor(public bale: BoundedBit) {}
}

export const UPDATE_BOUNDED = "[Bounded action] Update Bounded";
export class UpdateBounded implements Action {
 readonly type = UPDATE_BOUNDED;
 constructor(public bale: BoundedBit) {}
}

export const READ_BOUNDED = "[Read action] Read Bounded";
 export class ReadBounded implements Action {
 readonly type = READ_BOUNDED;
 constructor(public bale: BoundedBit) {}
 }
 
export const WRITE_BOUNDED = "[Write action] Write Bounded";
 export class WriteBounded implements Action {
 readonly type = WRITE_BOUNDED;
 constructor(public bale: BoundedBit) {}
 }
 
export const REMOVE_BOUNDED = "[Remove action] Remove Bounded";
 export class RemoveBounded implements Action {
 readonly type = REMOVE_BOUNDED;
 constructor(public bale: BoundedBit) {}
 }
 
export const DELETE_BOUNDED = "[Delete action] Delete Bounded";
 export class DeleteBounded implements Action {
 readonly type = DELETE_BOUNDED;
 constructor(public bale: BoundedBit) {}
 }
 
export const CREATE_BOUNDED = "[Create action] Create Bounded";
 export class CreateBounded implements Action {
 readonly type = CREATE_BOUNDED;
 constructor(public bale: BoundedBit) {}
 }
 
export type Actions = | InitBounded | UpdateBounded 
| ReadBounded
| WriteBounded
| RemoveBounded
| DeleteBounded
| CreateBounded