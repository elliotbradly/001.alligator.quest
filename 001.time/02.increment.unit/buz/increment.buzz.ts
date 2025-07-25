import { IncrementModel } from "../increment.model";
import IncrementBit from "../fce/increment.bit";
import State from "../../99.core/state";
import IncBit from "../fce/inc.bit";


import * as ActCol from "../../97.collect.unit/collect.action";
import * as ActInc from "../../02.increment.unit/increment.action";

var bit, val, idx, dex, lst, dat, src;


export const initIncrement = (cpy: IncrementModel, bal: IncrementBit, ste: State) => {
    bal.slv({ incBit: { idx: "init-increment" } });
    return cpy;
};


export const updateIncrement = (cpy: IncrementModel, bal: IncrementBit, ste: State) => {
    // This function would be triggered after a 'write' to an existing item.
    // Add any logic here that needs to run when an increment's data changes.
    bal.slv({ incBit: { idx: "update-increment" } });
    return cpy;
};


export const readIncrement = async (cpy: IncrementModel, bal: IncrementBit, ste: State) => {
    if (bal.idx == null) bal.idx = 'inc00';

    // The READ_COLLECT action is smart: it ensures data exists by attempting a write/create if not found.
    bit = await ste.hunt(ActCol.READ_COLLECT, { idx: bal.idx, bit: ActInc.CREATE_INCREMENT });

    if (bal.slv != null) bal.slv({ incBit: { idx: "read-increment", dat: bit.clcBit.dat } });
    return cpy;
};


export const writeIncrement = async (cpy: IncrementModel, bal: IncrementBit, ste: State) => {
    // WRITE_COLLECT handles both creating new and updating existing entries.

    

    if (bal.dat == null ) bal.dat = {}
    if (bal.dat.dat == null) bal.dat.dat = {}
    if (bal.inc != null) bal.dat.inc = bal.inc;


    bit = await ste.hunt(ActCol.WRITE_COLLECT, { idx: bal.idx, dat: bal.dat, bit: ActInc.CREATE_INCREMENT });

   
    if (bal.slv != null) bal.slv({ incBit: { idx: "write-increment", dat: bit.clcBit.dat } });
    return cpy;
};


export const removeIncrement = async (cpy: IncrementModel, bal: IncrementBit, ste: State) => {
    // REMOVE_COLLECT will internally call the DELETE_INCREMENT action if needed.
    bit = await ste.hunt(ActCol.REMOVE_COLLECT, { idx: bal.idx, bit: ActInc.DELETE_INCREMENT });

    if (bal.slv != null) bal.slv({ incBit: { idx: "remove-increment", dat: bit.clcBit.dat } });
    return cpy;
};


export const deleteIncrement = (cpy: IncrementModel, bal: IncrementBit, ste: State) => {
    // For data-only objects, there's often nothing to destroy.
    // This is a hook for more complex, stateful objects.
    if (bal.slv != null) bal.slv({ incBit: { idx: "delete-increment" } });
    return cpy;
};


export const createIncrement = (cpy: IncrementModel, bal: IncrementBit, ste: State) => {

    if (bal.dat == null) bal.dat = {}

    if (bal.dat.inc == null) {

        var incBit: IncBit = { idx: bal.idx }
        incBit.day = 0;
        incBit.hrs = 0;
        incBit.min = 0;
        incBit.mth = 0;
        incBit.sec = 6;
        incBit.yrs = 0;

        bal.dat.inc = incBit

    }

    var inc = bal.dat.inc;
    inc.idx = bal.idx

    for (var key in inc) {

        if (key == 'idx') continue

        if (inc[key] == '' || inc[key] == null) inc[key] = 0
        inc[key] = Number(inc[key])
    }

    inc
    
    //bit = await ste.hunt(ActClk.REFRESH_CLOCK, { val, dat: { clk } })
    //dat = bit.incBit.dat


    bal.slv({ incBit: { idx: "create-increment", dat: inc } });
    return cpy;


    // var dat: IncBit = {
    //     idx: bal.idx,
    //name: "Default Increment",
    //desc: "Generates resources.",
    //cost: 10,
    //baseCost: 10,
    //owned: 0,
    //cps_boost: 0, // cookies-per-second boost
    //cpc_boost: 0, // cookies-per-click boost
    //cost_scale: 1.15, // Cost increases by 15% each time
    // };

    // Overwrite defaults with any provided data
    // if (bal.dat != null) {
    //     for (var key in bal.dat) {
    //         dat[key] = bal.dat[key];
    //      }
    //   }

    //bal.slv({ incBit: { idx: "create-increment", dat: dat } });

};

export const listIncrement = async (cpy: IncrementModel, bal: IncrementBit, ste: State) => {
    dat = null

    bit = await ste.hunt(ActCol.LIST_COLLECT, { val: 0, bit: ActInc.LIST_INCREMENT })
    lst = bit.clcBit.lst

    bal.slv({ clkBit: { idx: 'list-clock', lst } });
};