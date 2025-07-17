import Model from "./99.core/interface/model.interface";

import EarthUnit from "./00.earth.unit/earth.unit";
import CollectUnit from "./97.collect.unit/collect.unit";
import BusUnit from "./99.bus.unit/bus.unit";


import Earth from "./00.earth.unit/fce/earth.interface";
import { EarthModel } from "./00.earth.unit/earth.model";
import Collect from "./97.collect.unit/fce/collect.interface";
import { CollectModel } from "./97.collect.unit/collect.model";
import Bus from "./99.bus.unit/fce/bus.interface";
import { BusModel } from "./99.bus.unit/bus.model";


export const list: Array<any> = [EarthUnit,CollectUnit,BusUnit];

import * as reduceFromEarth from "./00.earth.unit/earth.reduce";
import * as reduceFromCollect from "./97.collect.unit/collect.reduce";
import * as reduceFromBus from "./99.bus.unit/bus.reduce";


export const reducer: any = {
 earth : reduceFromEarth.reducer, 
collect : reduceFromCollect.reducer, 
bus : reduceFromBus.reducer, 

};

export default class UnitData implements Model {
 
 earth : Earth = new EarthModel();
collect : Collect = new CollectModel();
bus : Bus = new BusModel();

 
}
