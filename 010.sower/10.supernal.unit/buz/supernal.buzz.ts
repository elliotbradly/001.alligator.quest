
import { SupernalModel } from "../supernal.model";
import SupernalBit from "../fce/supernal.bit";
import State from "../../99.core/state";
import SuperBit from "../fce/super.bit";

import * as ActSup from "../../10.supernal.unit/supernal.action";
import * as ActCol from "../../97.collect.unit/collect.action";
import * as ActBus from "../../99.bus.unit/bus.action";

import * as ActVrt from "../../act/vurt.action"
import * as ActDsk from "../../act/disk.action"
import * as ActPvt from "../../act/pivot.action"


var bit, val, idx, dex, lst, dat, src;

export const initSupernal = async (cpy: SupernalModel, bal: SupernalBit, ste: State) => {
    debugger
    return cpy;
};




export const updateSupernal = async (cpy: SupernalModel, bal: SupernalBit, ste: State) => {
    return cpy;
};


export const readSupernal = async (cpy: SupernalModel, bal: SupernalBit, ste: State) => {

    if (bal.idx == null) bal.idx = 'sup00';
    bit = await ste.hunt(ActCol.READ_COLLECT, { idx: bal.idx, bit: ActSup.CREATE_SUPERNAL })

    bal.slv({ spkBit: { idx: "read-spark", dat: bit.clcBit.dat } });
    return cpy;
};

export const writeSupernal = async (cpy: SupernalModel, bal: SupernalBit, ste: State) => {

    if ( bal.idx == null ) bal.idx ='spr00'

    bit = await ste.hunt(ActCol.WRITE_COLLECT, { idx: bal.idx, src: bal.src, dat: bal.dat, bit: ActSup.CREATE_SUPERNAL })

    if (bal.slv != null) bal.slv({ spkBit: { idx: "write-spark", dat: bit.clcBit.dat } });
    return cpy;
};


export const removeSupernal = async (cpy: SupernalModel, bal: SupernalBit, ste: State) => {
    debugger
    return cpy;
};
export const deleteSupernal = async (cpy: SupernalModel, bal: SupernalBit, ste: State) => {
    debugger
    return cpy;
};

