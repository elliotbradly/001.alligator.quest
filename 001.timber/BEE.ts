import Model from "./99.core/interface/model.interface";

import ControlUnit from "./00.control.unit/control.unit";
import TurnUnit from "./01.turn.unit/turn.unit";
import CollectUnit from "./97.collect.unit/collect.unit";
import BusUnit from "./99.bus.unit/bus.unit";


import Control from "./00.control.unit/fce/control.interface";
import { ControlModel } from "./00.control.unit/control.model";
import Turn from "./01.turn.unit/fce/turn.interface";
import { TurnModel } from "./01.turn.unit/turn.model";
import Collect from "./97.collect.unit/fce/collect.interface";
import { CollectModel } from "./97.collect.unit/collect.model";
import Bus from "./99.bus.unit/fce/bus.interface";
import { BusModel } from "./99.bus.unit/bus.model";


export const list: Array<any> = [ControlUnit,TurnUnit,CollectUnit,BusUnit];

import * as reduceFromControl from "./00.control.unit/control.reduce";
import * as reduceFromTurn from "./01.turn.unit/turn.reduce";
import * as reduceFromCollect from "./97.collect.unit/collect.reduce";
import * as reduceFromBus from "./99.bus.unit/bus.reduce";


export const reducer: any = {
 control : reduceFromControl.reducer, 
turn : reduceFromTurn.reducer, 
collect : reduceFromCollect.reducer, 
bus : reduceFromBus.reducer, 

};

export default class UnitData implements Model {
 
 control : Control = new ControlModel();
turn : Turn = new TurnModel();
collect : Collect = new CollectModel();
bus : Bus = new BusModel();

 
}
