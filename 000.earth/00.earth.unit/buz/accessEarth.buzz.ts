import * as ActErt from '../earth.action'
import { EarthModel } from "../earth.model";
import EarthBit from "../fce/earth.bit";
import State from "../../99.core/state";

import * as ActSpk from '../../act/spark.action'
import * as ActTme from '../../act/time.action'

import * as ActClk from '../../act/clock.action'
import * as ActInc from '../../act/increment.action'
import * as ActMap from "../../act/hexmap.action";
import * as ActFoc from "../../act/focus.action";

import * as ActPrg from "../../act/progress.action";

import * as PVT from '../../val/pivot'

import * as Increment from '../../val/increment'

var bit

export const accessEarth = async (cpy: EarthModel, bal: EarthBit, ste: State) => {

  cpy.access = bal.val

  cpy.lastUpdateTimeLong = 0;
  cpy.deltaHoldLong = 0;

  cpy.lastUpdateTimeShort = 0;
  cpy.deltaHoldShort = 0;

  cpy.shortValue = cpy.maxShort

  cpy.tinyCount = 0;

  cpy.delayUntil = Date.now() + 100;

  bit = await ste.hunt(ActErt.UPDATE_EARTH, {})

  bal.slv({ ertBit: { idx: "access-earth", val: cpy.access, dat: {} } });

  return cpy;
};




