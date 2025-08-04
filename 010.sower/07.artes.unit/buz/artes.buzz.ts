import * as ActCol from "../../97.collect.unit/collect.action";
import * as ActArt from "../artes.action";

import { ArtesModel } from "../artes.model";
import ArtesBit from "../fce/artes.bit";
import ArtBit from "../fce/art.bit";
import State from "../../99.core/state";

var bit, val, idx, dex, lst, dat, src;

export const initArtes = (cpy: ArtesModel, bal: ArtesBit, ste: State) => {
    bal.slv({ intBit: { idx: "init-artes" } });
    return cpy;
};

export const updateArtes = (cpy: ArtesModel, bal: ArtesBit, ste: State) => {
    bal.slv({ artBit: { idx: "update-artes" } });
    return cpy;
};

export const readArtes = async (cpy: ArtesModel, bal: ArtesBit, ste: State) => {
    if (bal.idx == null) bal.idx = 'art00';
    bit = await ste.hunt(ActCol.READ_COLLECT, { idx: bal.idx, bit: ActArt.CREATE_ARTES });
    if (bal.slv != null) bal.slv({ artBit: { idx: "read-artes", dat: bit.clcBit.dat } });
    return cpy;
};

export const writeArtes = async (cpy: ArtesModel, bal: ArtesBit, ste: State) => {

    if ( bal.idx == null ) bal.idx = 'art00'

    bit = await ste.hunt(ActCol.WRITE_COLLECT, { idx: bal.idx, dat: bal.dat, bit: ActArt.CREATE_ARTES });
    if (bal.slv != null) bal.slv({ artBit: { idx: "write-artes", dat: bit.clcBit.dat } });
    return cpy;
};

export const removeArtes = async (cpy: ArtesModel, bal: ArtesBit, ste: State) => {
    bit = await ste.hunt(ActCol.REMOVE_COLLECT, { idx: bal.idx, bit: ActArt.DELETE_ARTES });
    if (bal.slv != null) bal.slv({ artBit: { idx: "remove-artes", dat: bit.clcBit.dat } });
    return cpy;
};

export const deleteArtes = (cpy: ArtesModel, bal: ArtesBit, ste: State) => {
    if (bal.slv != null) bal.slv({ artBit: { idx: "delete-artes" } });
    return cpy;
};

