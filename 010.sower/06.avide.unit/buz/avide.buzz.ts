import * as ActCol from "../../97.collect.unit/collect.action";
import * as ActAvd from "../avide.action";

import { AvideModel } from "../avide.model";
import AvideBit from "../fce/avide.bit";
import AvdBit from "../fce/avd.bit";
import State from "../../99.core/state";

var bit, val, idx, dex, lst, dat, src;

export const initAvide = (cpy: AvideModel, bal: AvideBit, ste: State) => {
    bal.slv({ intBit: { idx: "init-avide" } });
    return cpy;
};

export const updateAvide = (cpy: AvideModel, bal: AvideBit, ste: State) => {
    bal.slv({ avdBit: { idx: "update-avide" } });
    return cpy;
};

export const readAvide = async (cpy: AvideModel, bal: AvideBit, ste: State) => {
    if (bal.idx == null) bal.idx = 'avd00';
    bit = await ste.hunt(ActCol.READ_COLLECT, { idx: bal.idx, bit: ActAvd.CREATE_AVIDE });
    if (bal.slv != null) bal.slv({ avdBit: { idx: "read-avide", dat: bit.clcBit.dat } });
    return cpy;
};

export const writeAvide = async (cpy: AvideModel, bal: AvideBit, ste: State) => {
    
    if( bal.idx == null ) bal.idx = 'avd00'

    bit = await ste.hunt(ActCol.WRITE_COLLECT, { idx: bal.idx, dat: bal.dat, bit: ActAvd.CREATE_AVIDE });
    if (bal.slv != null) bal.slv({ avdBit: { idx: "write-avide", dat: bit.clcBit.dat } });
    return cpy;
};

export const removeAvide = async (cpy: AvideModel, bal: AvideBit, ste: State) => {
    bit = await ste.hunt(ActCol.REMOVE_COLLECT, { idx: bal.idx, bit: ActAvd.DELETE_AVIDE });
    if (bal.slv != null) bal.slv({ avdBit: { idx: "remove-avide", dat: bit.clcBit.dat } });
    return cpy;
};

export const deleteAvide = (cpy: AvideModel, bal: AvideBit, ste: State) => {
    if (bal.slv != null) bal.slv({ avdBit: { idx: "delete-avide" } });
    return cpy;
};

