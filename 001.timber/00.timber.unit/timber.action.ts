import { Action } from "../99.core/interface/action.interface";
import  TimberBit  from "./fce/timber.bit";

// Timber actions

export const INIT_TIMBER = "[Timber action] Init Timber";
export class InitTimber implements Action {
 readonly type = INIT_TIMBER;
 constructor(public bale: TimberBit) {}
}

export const UPDATE_TIMBER = "[Timber action] Update Timber";
export class UpdateTimber implements Action {
 readonly type = UPDATE_TIMBER;
 constructor(public bale: TimberBit) {}
}

export type Actions = | InitTimber | UpdateTimber ;
