import * as ActPrm from "../../50.primal.unit/primal.action";
import * as ActCol from "../../97.collect.unit/collect.action";
import * as ActBus from "../../99.bus.unit/bus.action";

import * as ActVrt from "../../act/vurt.action"
import * as ActDsk from "../../act/disk.action"
import * as ActPvt from "../../act/pivot.action"


var bit, val, idx, dex, lst, dat, src;


export const initPrimal = async (cpy: PrimalModel, bal: PrimalBit, ste: State) => {
    debugger
    return cpy;
};



export const updatePrimal = async (cpy: PrimalModel, bal: PrimalBit, ste: State) => {
    return cpy;
};


export const readPrimal = async (cpy: PrimalModel, bal: PrimalBit, ste: State) => {
    if (bal.idx == null) bal.idx = 'bnd00';
    bit = await ste.hunt(ActCol.READ_COLLECT, { idx: bal.idx, bit: ActPrm.CREATE_PRIMAL })

    bal.slv({ priBit: { idx: "read-primal", dat: bit.clcBit.dat } });
    return cpy;
};

export const writePrimal = async (cpy: PrimalModel, bal: PrimalBit, ste: State) => {

    if ( bal.idx == null ) bal.idx = 'prm00'

    bit = await ste.hunt(ActCol.WRITE_COLLECT, { idx: bal.idx, src: bal.src, dat: bal.dat, bit: ActPrm.CREATE_PRIMAL })

    if (bal.slv != null) bal.slv({ priBit: { idx: "write-primal", dat: bit.clcBit.dat } });
    return cpy;
};


export const removePrimal = async (cpy: PrimalModel, bal: PrimalBit, ste: State) => {
    debugger
    return cpy;
};
export const deletePrimal = async (cpy: PrimalModel, bal: PrimalBit, ste: State) => {
    debugger
    return cpy;
};



import { PrimalModel } from "../primal.model";
import PrimalBit from "../fce/primal.bit";
import State from "../../99.core/state";
import PrimeBit from "../fce/prime.bit";
