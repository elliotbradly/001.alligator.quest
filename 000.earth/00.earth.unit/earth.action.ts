import { Action } from "../99.core/interface/action.interface";
import  EarthBit  from "./fce/earth.bit";

// Earth actions

export const INIT_EARTH = "[Earth action] Init Earth";
export class InitEarth implements Action {
 readonly type = INIT_EARTH;
 constructor(public bale: EarthBit) {}
}

export const OPEN_EARTH = "[Earth action] Open Earth";
export class OpenEarth implements Action {
 readonly type = OPEN_EARTH;
 constructor(public bale: EarthBit) {}
}

export const UPDATE_EARTH = "[Earth action] Update Earth";
export class UpdateEarth implements Action {
 readonly type = UPDATE_EARTH;
 constructor(public bale: EarthBit) {}
}

export const TEST_EARTH = "[Test action] Test Earth";
 export class TestEarth implements Action {
 readonly type = TEST_EARTH;
 constructor(public bale: EarthBit) {}
 }
 
export type Actions = | InitEarth | UpdateEarth | OpenEarth 
| TestEarth