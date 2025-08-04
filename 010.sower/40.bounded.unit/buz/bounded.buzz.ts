import { BoundedModel } from "../bounded.model";
import BoundedBit from "../fce/bounded.bit";
import State from "../../99.core/state";
import BoundBit from "../fce/bound.bit";

import * as ActBnd from "../../40.bounded.unit/bounded.action";
import * as ActCol from "../../97.collect.unit/collect.action";
import * as ActBus from "../../99.bus.unit/bus.action";

import * as ActVrt from "../../act/vurt.action"
import * as ActDsk from "../../act/disk.action"
import * as ActPvt from "../../act/pivot.action"

var bit, val, idx, dex, lst, dat, src;

export const initBounded = async (cpy: BoundedModel, bal: BoundedBit, ste: State) => {
    debugger
    return cpy;
};


export const updateBounded = async (cpy: BoundedModel, bal: BoundedBit, ste: State) => {
    return cpy;
};


export const readBounded = async (cpy: BoundedModel, bal: BoundedBit, ste: State) => {

    if (bal.idx == null) bal.idx = 'bnd00';
    bit = await ste.hunt(ActCol.READ_COLLECT, { idx: bal.idx, bit: ActBnd.CREATE_BOUNDED })

    bal.slv({ bndBit: { idx: "read-bounded", dat: bit.clcBit.dat } });
    return cpy;

};

export const writeBounded = async (cpy: BoundedModel, bal: BoundedBit, ste: State) => {

    if ( bal.idx == null ) bal.idx = 'bnd00'

    bit = await ste.hunt(ActCol.WRITE_COLLECT, { idx: bal.idx, src: bal.src, dat: bal.dat, bit: ActBnd.CREATE_BOUNDED })

    if (bal.slv != null) bal.slv({ bndBit: { idx: "write-bounded", dat: bit.clcBit.dat } });
    return cpy;

};


export const removeBounded = async (cpy: BoundedModel, bal: BoundedBit, ste: State) => {
    debugger
    return cpy;
};
export const deleteBounded = async (cpy: BoundedModel, bal: BoundedBit, ste: State) => {
    debugger
    return cpy;
};


