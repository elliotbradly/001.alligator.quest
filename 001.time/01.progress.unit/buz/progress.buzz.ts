import { ProgressModel } from "../progress.model";
import ProgressBit from "../fce/progress.bit";
import State from "../../99.core/state";

import * as ActClk from '../../03.clock.unit/clock.action'
import * as ActInc from '../../02.increment.unit/increment.action'

var bit, dat;

export const initProgress = (cpy: ProgressModel, bal: ProgressBit, ste: State) => {
    debugger
    return cpy;
};

export const updateProgress = async (cpy: ProgressModel, bal: ProgressBit, ste: State) => {

    bit = await ste.hunt( ActInc.READ_INCREMENT, { idx: bal.idx })
    var increment = bit.incBit.dat;
    
    

    var obj = { hours: 0, minutes: 0, days: 0, seconds: 0 }

    obj.hours = increment.hrs;
    obj.minutes = increment.min;
    obj.days = increment.day;
    obj.seconds = increment.sec;

    

    bit = await ste.hunt(ActClk.READ_CLOCK, { idx: bal.src })
    dat = bit.clkBit.dat;

    

    dat.bit = dat.bit.plus( obj );
    dat.bit

    bit = await ste.hunt(ActClk.ADAPT_CLOCK, { dat: dat.bit })

    var now =  bit.clkBit.dat
    
    bit = await ste.hunt(ActClk.WRITE_CLOCK, { idx:bal.src, dat: {clk: now } })
    bal.slv({ prgBit: { idx: 'update-progress', dat:bit.clkBit.dat } });
    return cpy;
};


