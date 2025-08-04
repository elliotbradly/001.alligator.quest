import * as ActBls from "../../20.blessed.unit/blessed.action";
import * as ActCol from "../../97.collect.unit/collect.action";
import * as ActBus from "../../99.bus.unit/bus.action";


var bit, val, idx, dex, lst, dat, src;


export const initBlessed = async (cpy: BlessedModel, bal: BlessedBit, ste: State) => {
    debugger
    return cpy;
};


export const updateBlessed = async (cpy: BlessedModel, bal: BlessedBit, ste: State) => {
    return cpy;
};


export const readBlessed = async (cpy: BlessedModel, bal: BlessedBit, ste: State) => {

    if (bal.idx == null) bal.idx = 'bls00';
    bit = await ste.hunt(ActCol.READ_COLLECT, { idx: bal.idx, bit: ActBls.CREATE_BLESSED })

    bal.slv({ blsBit: { idx: "read-blessed", dat: bit.clcBit.dat } });
    return cpy;

};

export const writeBlessed = async (cpy: BlessedModel, bal: BlessedBit, ste: State) => {

    if ( bal.idx == null ) bal.idx = 'bls00'

    bit = await ste.hunt(ActCol.WRITE_COLLECT, { idx: bal.idx, src: bal.src, dat: bal.dat, bit: ActBls.CREATE_BLESSED })

    if (bal.slv != null) bal.slv({ blsBit: { idx: "write-blessed", dat: bit.clcBit.dat } });
    return cpy;


};


export const removeBlessed = async (cpy: BlessedModel, bal: BlessedBit, ste: State) => {
    debugger
    return cpy;
};
export const deleteBlessed = async (cpy: BlessedModel, bal: BlessedBit, ste: State) => {
    debugger
    return cpy;
};



import { BlessedModel } from "../blessed.model";
import BlessedBit from "../fce/blessed.bit";
import State from "../../99.core/state";
import BlessBit from "../fce/bless.bit";
