import { Action } from "../99.core/interface/action.interface";
import  ColorBit  from "./fce/color.bit";

// Color actions

export const INIT_COLOR = "[Color action] Init Color";
export class InitColor implements Action {
 readonly type = INIT_COLOR;
 constructor(public bale: ColorBit) {}
}

export const UPDATE_COLOR = "[Color action] Update Color";
export class UpdateColor implements Action {
 readonly type = UPDATE_COLOR;
 constructor(public bale: ColorBit) {}
}

export const OPEN_COLOR = "[Open action] Open Color";
 export class OpenColor implements Action {
 readonly type = OPEN_COLOR;
 constructor(public bale: ColorBit) {}
 }

export const READ_COLOR = "[Read action] Read Color";
 export class ReadColor implements Action {
 readonly type = READ_COLOR;
 constructor(public bale: ColorBit) {}
 }
 
export const WRITE_COLOR = "[Write action] Write Color";
 export class WriteColor implements Action {
 readonly type = WRITE_COLOR;
 constructor(public bale: ColorBit) {}
 }
 
export const REMOVE_COLOR = "[Remove action] Remove Color";
 export class RemoveColor implements Action {
 readonly type = REMOVE_COLOR;
 constructor(public bale: ColorBit) {}
 }
 
export const DELETE_COLOR = "[Delete action] Delete Color";
 export class DeleteColor implements Action {
 readonly type = DELETE_COLOR;
 constructor(public bale: ColorBit) {}
 }
 
export const CREATE_COLOR = "[Create action] Create Color";
 export class CreateColor implements Action {
 readonly type = CREATE_COLOR;
 constructor(public bale: ColorBit) {}
 }
 
export const LIST_COLOR = "[List action] List Color";
 export class ListColor implements Action {
 readonly type = LIST_COLOR;
 constructor(public bale: ColorBit) {}
 }
 
export const RANDOM_COLOR = "[Random action] Random Color";
 export class RandomColor implements Action {
 readonly type = RANDOM_COLOR;
 constructor(public bale: ColorBit) {}
 }
 
export const BASKET_COLOR = "[Basket action] Basket Color";
 export class BasketColor implements Action {
 readonly type = BASKET_COLOR;
 constructor(public bale: ColorBit) {}
 }
 
export const ACCESS_COLOR = "[Access action] Access Color";
 export class AccessColor implements Action {
 readonly type = ACCESS_COLOR;
 constructor(public bale: ColorBit) {}
 }
 
export type Actions = | InitColor | UpdateColor 
| OpenColor
| ReadColor
| WriteColor
| RemoveColor
| DeleteColor
| CreateColor
| ListColor
| RandomColor
| BasketColor
| AccessColor