import Model from "./99.core/interface/model.interface";

import TimeUnit from "./00.time.unit/time.unit";
import ProgressUnit from "./01.progress.unit/progress.unit";
import IncrementUnit from "./02.increment.unit/increment.unit";
import ClockUnit from "./03.clock.unit/clock.unit";
import CollectUnit from "./97.collect.unit/collect.unit";
import BusUnit from "./99.bus.unit/bus.unit";


import Time from "./00.time.unit/fce/time.interface";
import { TimeModel } from "./00.time.unit/time.model";
import Progress from "./01.progress.unit/fce/progress.interface";
import { ProgressModel } from "./01.progress.unit/progress.model";
import Increment from "./02.increment.unit/fce/increment.interface";
import { IncrementModel } from "./02.increment.unit/increment.model";
import Clock from "./03.clock.unit/fce/clock.interface";
import { ClockModel } from "./03.clock.unit/clock.model";
import Collect from "./97.collect.unit/fce/collect.interface";
import { CollectModel } from "./97.collect.unit/collect.model";
import Bus from "./99.bus.unit/fce/bus.interface";
import { BusModel } from "./99.bus.unit/bus.model";


export const list: Array<any> = [TimeUnit,ProgressUnit,IncrementUnit,ClockUnit,CollectUnit,BusUnit];

import * as reduceFromTime from "./00.time.unit/time.reduce";
import * as reduceFromProgress from "./01.progress.unit/progress.reduce";
import * as reduceFromIncrement from "./02.increment.unit/increment.reduce";
import * as reduceFromClock from "./03.clock.unit/clock.reduce";
import * as reduceFromCollect from "./97.collect.unit/collect.reduce";
import * as reduceFromBus from "./99.bus.unit/bus.reduce";


export const reducer: any = {
 time : reduceFromTime.reducer, 
progress : reduceFromProgress.reducer, 
increment : reduceFromIncrement.reducer, 
clock : reduceFromClock.reducer, 
collect : reduceFromCollect.reducer, 
bus : reduceFromBus.reducer, 

};

export default class UnitData implements Model {
 
 time : Time = new TimeModel();
progress : Progress = new ProgressModel();
increment : Increment = new IncrementModel();
clock : Clock = new ClockModel();
collect : Collect = new CollectModel();
bus : Bus = new BusModel();

 
}
