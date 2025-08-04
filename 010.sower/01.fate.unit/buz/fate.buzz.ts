import * as ActFte from '../fate.action'


import { FateModel } from "../fate.model";
import FateBit from "../fce/fate.bit";
import State from "../../99.core/state";

var bit

export const initFate = (cpy: FateModel, bal: FateBit, ste: State) => {

    bal.slv({ intBit: { idx: "init-fate", dat: {} } });
    return cpy;
};

export const updateFate = (cpy: FateModel, bal: FateBit, ste: State) => {

    var Chance = require("chance");
    cpy.fate = new Chance(cpy.seed);
    cpy.seed += 1;

    bal.slv({ fteBit: { idx: "update-fate", dat: {} } });

    return cpy;
};


export const integerFate = async (cpy: FateModel, bal: FateBit, ste: State) => {

    if (cpy.fate == null) bit = await ste.hunt(ActFte.UPDATE_FATE, {})

    if (bal == null) bal = { idx: '' }
    if (bal.lst == null) bal.lst = [0, 9]

    var val = cpy.fate.integer({ min: bal.lst[0], max: bal.lst[1] });

    bal.slv({ fteBit: { idx: "integer-fate", val } });

    return cpy;
};

export const appleFate = async (cpy: FateModel, bal: FateBit, ste: State) => {

    if (cpy.fate == null) bit = await ste.hunt(ActFte.UPDATE_FATE, {})

    var val = cpy.fate.apple_token();

    bal.slv({ fteBit: { idx: "apple-fate", val } });

    return cpy;
};

var data = {}

export const sineFate = async (cpy: FateModel, bal: FateBit, ste: State) => {
    bit = await ste.hunt(ActFte.INTEGER_FATE, {})
    cpy.position += bit.fteBit.val + 1;
    cpy.sine = cpy.amplitude * Math.sin(cpy.frequency * cpy.position) * .1;
    cpy.sine = Number(cpy.sine.toFixed(3))

    if ( data[ 'sine' + cpy.sine ] == null ) data[ 'sine' + cpy.sine ] = 1;
    else {
    //    debugger
    }

    var dex = 0
    for ( var key in data ){
        dex += 1;
     }

    bal.slv({ fteBit: { idx: "sine-fate", val: cpy.sine, dex } });
    return cpy;
};