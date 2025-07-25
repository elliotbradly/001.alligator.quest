import { Action } from "../99.core/interface/action.interface";
import  ProgressBit  from "./fce/progress.bit";

// Progress actions

export const INIT_PROGRESS = "[Progress action] Init Progress";
export class InitProgress implements Action {
 readonly type = INIT_PROGRESS;
 constructor(public bale: ProgressBit) {}
}

export const UPDATE_PROGRESS = "[Progress action] Update Progress";
export class UpdateProgress implements Action {
 readonly type = UPDATE_PROGRESS;
 constructor(public bale: ProgressBit) {}
}

export type Actions = | InitProgress | UpdateProgress ;
