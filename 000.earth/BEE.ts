import Model from "./99.core/interface/model.interface";

import EarthUnit from "./00.earth.unit/earth.unit";
import WorldUnit from "./01.world.unit/world.unit";
import FateUnit from "./02.fate.unit/fate.unit";
import ColorUnit from "./03.color.unit/color.unit";
import CollectUnit from "./97.collect.unit/collect.unit";
import BusUnit from "./99.bus.unit/bus.unit";


import Earth from "./00.earth.unit/fce/earth.interface";
import { EarthModel } from "./00.earth.unit/earth.model";
import World from "./01.world.unit/fce/world.interface";
import { WorldModel } from "./01.world.unit/world.model";
import Fate from "./02.fate.unit/fce/fate.interface";
import { FateModel } from "./02.fate.unit/fate.model";
import Color from "./03.color.unit/fce/color.interface";
import { ColorModel } from "./03.color.unit/color.model";
import Collect from "./97.collect.unit/fce/collect.interface";
import { CollectModel } from "./97.collect.unit/collect.model";
import Bus from "./99.bus.unit/fce/bus.interface";
import { BusModel } from "./99.bus.unit/bus.model";


export const list: Array<any> = [EarthUnit,WorldUnit,FateUnit,ColorUnit,CollectUnit,BusUnit];

import * as reduceFromEarth from "./00.earth.unit/earth.reduce";
import * as reduceFromWorld from "./01.world.unit/world.reduce";
import * as reduceFromFate from "./02.fate.unit/fate.reduce";
import * as reduceFromColor from "./03.color.unit/color.reduce";
import * as reduceFromCollect from "./97.collect.unit/collect.reduce";
import * as reduceFromBus from "./99.bus.unit/bus.reduce";


export const reducer: any = {
 earth : reduceFromEarth.reducer, 
 world : reduceFromWorld.reducer,
 fate : reduceFromFate.reducer,
 color : reduceFromColor.reducer,
collect : reduceFromCollect.reducer, 
bus : reduceFromBus.reducer, 

};

export default class UnitData implements Model {
 
 earth : Earth = new EarthModel();
 world : World = new WorldModel();
 fate : Fate = new FateModel();
 color : Color = new ColorModel();
collect : Collect = new CollectModel();
bus : Bus = new BusModel();

 
}
