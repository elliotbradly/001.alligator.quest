import { Action } from "../99.core/interface/action.interface";
import  SowerBit  from "./fce/sower.bit";

// Sower actions

export const INIT_SOWER = "[Sower action] Init Sower";
export class InitSower implements Action {
 readonly type = INIT_SOWER;
 constructor(public bale: SowerBit) {}
}

export const UPDATE_SOWER = "[Sower action] Update Sower";
export class UpdateSower implements Action {
 readonly type = UPDATE_SOWER;
 constructor(public bale: SowerBit) {}
}

export const DEV_SOWER = "[Dev action] Dev Sower";
 export class DevSower implements Action {
 readonly type = DEV_SOWER;
 constructor(public bale: SowerBit) {}
 }
 
export const OPEN_SOWER = "[Open action] Open Sower";
 export class OpenSower implements Action {
 readonly type = OPEN_SOWER;
 constructor(public bale: SowerBit) {}
 }
 
export const TEST_SOWER = "[Test action] Test Sower";
 export class TestSower implements Action {
 readonly type = TEST_SOWER;
 constructor(public bale: SowerBit) {}
 }
 
export type Actions = | InitSower | UpdateSower 
| DevSower
| OpenSower
| TestSower