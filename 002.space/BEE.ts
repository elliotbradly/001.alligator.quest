import Model from "./99.core/interface/model.interface";

import SpaceUnit from "./00.space.unit/space.unit";
import HexmapUnit from "./01.hexmap.unit/hexmap.unit";
import FocusUnit from "./02.focus.unit/focus.unit";
import GeojsonUnit from "./03.geojson.unit/geojson.unit";
import CollectUnit from "./97.collect.unit/collect.unit";
import BusUnit from "./99.bus.unit/bus.unit";


import Space from "./00.space.unit/fce/space.interface";
import { SpaceModel } from "./00.space.unit/space.model";
import Hexmap from "./01.hexmap.unit/fce/hexmap.interface";
import { HexmapModel } from "./01.hexmap.unit/hexmap.model";
import Focus from "./02.focus.unit/fce/focus.interface";
import { FocusModel } from "./02.focus.unit/focus.model";
import Geojson from "./03.geojson.unit/fce/geojson.interface";
import { GeojsonModel } from "./03.geojson.unit/geojson.model";
import Collect from "./97.collect.unit/fce/collect.interface";
import { CollectModel } from "./97.collect.unit/collect.model";
import Bus from "./99.bus.unit/fce/bus.interface";
import { BusModel } from "./99.bus.unit/bus.model";


export const list: Array<any> = [SpaceUnit,HexmapUnit,FocusUnit,GeojsonUnit,CollectUnit,BusUnit];

import * as reduceFromSpace from "./00.space.unit/space.reduce";
import * as reduceFromHexmap from "./01.hexmap.unit/hexmap.reduce";
import * as reduceFromFocus from "./02.focus.unit/focus.reduce";
import * as reduceFromGeojson from "./03.geojson.unit/geojson.reduce";
import * as reduceFromCollect from "./97.collect.unit/collect.reduce";
import * as reduceFromBus from "./99.bus.unit/bus.reduce";


export const reducer: any = {
 space : reduceFromSpace.reducer, 
hexmap : reduceFromHexmap.reducer, 
focus : reduceFromFocus.reducer, 
geojson : reduceFromGeojson.reducer, 
collect : reduceFromCollect.reducer, 
bus : reduceFromBus.reducer, 

};

export default class UnitData implements Model {
 
 space : Space = new SpaceModel();
hexmap : Hexmap = new HexmapModel();
focus : Focus = new FocusModel();
geojson : Geojson = new GeojsonModel();
collect : Collect = new CollectModel();
bus : Bus = new BusModel();

 
}
