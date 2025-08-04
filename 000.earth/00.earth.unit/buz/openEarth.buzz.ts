import { EarthModel } from "../earth.model";
import EarthBit from "../fce/earth.bit";
import State from "../../99.core/state";

import * as ActSpk from '../../act/spark.action'
import * as ActTme from '../../act/time.action'

import * as ActClk from '../../act/clock.action'
import * as ActInc from '../../act/increment.action'
import * as ActMap from "../../act/hexmap.action";
import * as ActFoc from "../../act/focus.action";

import * as PVT from '../../val/pivot'

import * as Increment from '../../val/increment'

var bit

export const openEarth = async (cpy: EarthModel, bal: EarthBit, ste: State) => {

    if (cpy.opened == 1) {
        bal.slv({ ertBit: { idx: "open-earth", dat: { val: cpy.opened } } });
        return cpy
    }

    cpy.opened = 1

    cpy.idxClk = 'clk00'
    cpy.idxInc = 'inc00'

    var clk = { day: 0, hrs: 0, min: 0, mth: 0, sec: 0, yrs: 1974 }

    bit = await global[PVT.TIME](ActClk.WRITE_CLOCK, { idx: cpy.idxClk, clk })

    var incDft = { day: 0, hrs: 0, min: 0, mth: 0, sec: 6, yrs: 0 }

    var incHrs = { day: 0, hrs: 1, min: 0, mth: 0, sec: 0, yrs: 0 }
    var incMin = { day: 0, hrs: 0, min: 1, mth: 0, sec: 0, yrs: 0 }
    var incDay = { day: 0, hrs: 16, min: 0, mth: 0, sec: 0, yrs: 0 }
    var incSec = { day: 0, hrs: 0, min: 0, mth: 0, sec: 1, yrs: 0 }

    bit = await global[PVT.TIME](ActInc.WRITE_INCREMENT, { idx: Increment.DEFAULT, inc: incDft })

    bit = await global[PVT.TIME](ActInc.WRITE_INCREMENT, { idx: Increment.HOURS, inc: incHrs })
    bit = await global[PVT.TIME](ActInc.WRITE_INCREMENT, { idx: Increment.MINUTES, inc: incMin })
    bit = await global[PVT.TIME](ActInc.WRITE_INCREMENT, { idx: Increment.DAYS, inc: incDay })
    bit = await global[PVT.TIME](ActInc.WRITE_INCREMENT, { idx: Increment.SECONDS, inc: incSec })

    bit = await global[PVT.TIME](ActTme.RANDOM_TIME, { idx: 'clk00' })

    //ste.hunt(ActCtl.INCREMENT_CONTROL, { src: Increment.DEFAULT })

    bit = await global[PVT.SPACE](ActMap.WRITE_HEXMAP, { idx: 'map00' })
    var map = bit.mapBit.dat.bit
  
    bit = await global[PVT.SPACE](ActFoc.WRITE_FOCUS, { idx: 'foc00', src: 'map00' })
    var focus = bit.focBit.dat


    bit = await global[PVT.SOWER](ActSpk.WRITE_SPARK, { idx: 'spk00' })

    

    bal.slv({ ertBit: { idx: "open-earth", dat: { val: cpy.opened } } });

    return cpy;
};




