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

export const advanceEarth = async (cpy: EarthModel, bal: EarthBit, ste: State) => {

    cpy.dex += 1;

    
    

   bit = await global['TIME'](ActPrg.UPDATE_PROGRESS, { idx: cpy.idxInc, src: cpy.idxClk });

    

     
  bal.slv({ ertBit: { idx: "advance-earth" } });

    return cpy;
};




