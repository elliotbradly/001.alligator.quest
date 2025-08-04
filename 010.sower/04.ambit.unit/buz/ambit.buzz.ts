import * as ActCol from "../../97.collect.unit/collect.action";
import * as ActAbt from "../ambit.action";

import { AmbitModel } from "../ambit.model";
import AmbitBit from "../fce/ambit.bit";
import AmbBit from "../fce/amb.bit";
import State from "../../99.core/state";

var bit, val, idx, dex, lst, dat, src;

export const initAmbit = (cpy: AmbitModel, bal: AmbitBit, ste: State) => {
    bal.slv({ intBit: { idx: "init-ambit" } });
    return cpy;
};

export const updateAmbit = (cpy: AmbitModel, bal: AmbitBit, ste: State) => {
    bal.slv({ abtBit: { idx: "update-ambit" } });
    return cpy;
};

export const readAmbit = async (cpy: AmbitModel, bal: AmbitBit, ste: State) => {
    if (bal.idx == null) bal.idx = 'abt00';
    bit = await ste.hunt(ActCol.READ_COLLECT, { idx: bal.idx, bit: ActAbt.CREATE_AMBIT });
    if (bal.slv != null) bal.slv({ abtBit: { idx: "read-ambit", dat: bit.clcBit.dat } });
    return cpy;
};

export const writeAmbit = async (cpy: AmbitModel, bal: AmbitBit, ste: State) => {

    if ( bal.idx == null ) bal.idx = 'amb00'

    bit = await ste.hunt(ActCol.WRITE_COLLECT, { idx: bal.idx, dat: bal.dat, bit: ActAbt.CREATE_AMBIT });
    if (bal.slv != null) bal.slv({ abtBit: { idx: "write-ambit", dat: bit.clcBit.dat } });
    return cpy;
};

export const removeAmbit = async (cpy: AmbitModel, bal: AmbitBit, ste: State) => {
    bit = await ste.hunt(ActCol.REMOVE_COLLECT, { idx: bal.idx, bit: ActAbt.DELETE_AMBIT });
    if (bal.slv != null) bal.slv({ abtBit: { idx: "remove-ambit", dat: bit.clcBit.dat } });
    return cpy;
};

export const deleteAmbit = (cpy: AmbitModel, bal: AmbitBit, ste: State) => {
    if (bal.slv != null) bal.slv({ abtBit: { idx: "delete-ambit" } });
    return cpy;
};
