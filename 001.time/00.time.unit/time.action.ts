import { Action } from "../99.core/interface/action.interface";
import TimeBit from "./fce/time.bit";

// Time actions

export const INIT_TIME = "[Time action] Init Time";
export class InitTime implements Action {
  readonly type = INIT_TIME;
  constructor(public bale: TimeBit) {}
}

export const UPDATE_TIME = "[Time action] Update Time";
export class UpdateTime implements Action {
  readonly type = UPDATE_TIME;
  constructor(public bale: TimeBit) {}
}


 export const TEST_TIME = "[Reduce action] Test Time";
 export class TestTime implements Action {
 readonly type = TEST_TIME;
 constructor(public bale: TimeBit) {}
 }
 
export const RANDOM_TIME = "[Random action] Random Time";
 export class RandomTime implements Action {
 readonly type = RANDOM_TIME;
 constructor(public bale: TimeBit) {}
 }
 
export type Actions = InitTime| UpdateTime | TestTime
| RandomTime