import * as ActCol from "../../97.collect.unit/collect.action";
import * as ActAvo from "../avaou.action";

import { AvaouModel } from "../avaou.model";
import AvaouBit from "../fce/avaou.bit";
import AvoBit from "../fce/avo.bit";
import State from "../../99.core/state";

var bit, val, idx, dex, lst, dat, src;

export const initAvaou = (cpy: AvaouModel, bal: AvaouBit, ste: State) => {
    bal.slv({ intBit: { idx: "init-avaou" } });
    return cpy;
};

export const updateAvaou = (cpy: AvaouModel, bal: AvaouBit, ste: State) => {
    bal.slv({ avoBit: { idx: "update-avaou" } });
    return cpy;
};

export const readAvaou = async (cpy: AvaouModel, bal: AvaouBit, ste: State) => {
    if (bal.idx == null) bal.idx = 'avo00';
    bit = await ste.hunt(ActCol.READ_COLLECT, { idx: bal.idx, bit: ActAvo.CREATE_AVAOU });
    if (bal.slv != null) bal.slv({ avoBit: { idx: "read-avaou", dat: bit.clcBit.dat } });
    return cpy;
};

export const writeAvaou = async (cpy: AvaouModel, bal: AvaouBit, ste: State) => {

    if ( bal.idx == null ) bal.idx = 'avo00'

    bit = await ste.hunt(ActCol.WRITE_COLLECT, { idx: bal.idx, dat: bal.dat, bit: ActAvo.CREATE_AVAOU });
    if (bal.slv != null) bal.slv({ avoBit: { idx: "write-avaou", dat: bit.clcBit.dat } });
    return cpy;
};

export const removeAvaou = async (cpy: AvaouModel, bal: AvaouBit, ste: State) => {
    bit = await ste.hunt(ActCol.REMOVE_COLLECT, { idx: bal.idx, bit: ActAvo.DELETE_AVAOU });
    if (bal.slv != null) bal.slv({ avoBit: { idx: "remove-avaou", dat: bit.clcBit.dat } });
    return cpy;
};

export const deleteAvaou = (cpy: AvaouModel, bal: AvaouBit, ste: State) => {
    if (bal.slv != null) bal.slv({ avoBit: { idx: "delete-avaou" } });
    return cpy;
};

