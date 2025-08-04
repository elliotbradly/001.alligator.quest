

import * as ActCol from "../../97.collect.unit/collect.action";
import * as ActClr from "../color.action";

import { ColorModel } from "../color.model";
import ColorBit from "../fce/color.bit";

import State from "../../99.core/state";

var bit, val, idx, dex, lst, dat, src;

export const initColor = (cpy: ColorModel, bal: ColorBit, ste: State) => {
    bal.slv({ intBit: { idx: "init-color" } });
    return cpy;
};



export const updateColor = async (cpy: ColorModel, bal: ColorBit, ste: State) => {
    // Logic for updating color properties would go here.
    bal.slv({ clrBit: { idx: "update-color", dat: bal.dat } });
    return cpy;
};

export const readColor = async (cpy: ColorModel, bal: ColorBit, ste: State) => {
    if (bal.idx == null) bal.idx = 'clr00';
    bit = await ste.hunt(ActCol.READ_COLLECT, { idx: bal.idx, bit: ActClr.CREATE_COLOR });
    if (bal.slv != null) bal.slv({ clrBit: { idx: "read-color", dat: bit.clcBit.dat } });
    return cpy;
};

export const writeColor = async (cpy: ColorModel, bal: ColorBit, ste: State) => {
    bit = await ste.hunt(ActCol.WRITE_COLLECT, { idx: bal.idx, dat: bal.dat, bit: ActClr.CREATE_COLOR });
    if (bal.slv != null) bal.slv({ clrBit: { idx: "write-color", dat: bit.clcBit.dat } });
    return cpy;
};

export const removeColor = async (cpy: ColorModel, bal: ColorBit, ste: State) => {
    bit = await ste.hunt(ActCol.REMOVE_COLLECT, { idx: bal.idx, bit: ActClr.DELETE_COLOR });
    if (bal.slv != null) bal.slv({ clrBit: { idx: "remove-color", dat: bit.clcBit.dat } });
    return cpy;
};

export const deleteColor = async (cpy: ColorModel, bal: ColorBit, ste: State) => {
    // No complex resources to clean up for a simple data object.
    if (bal.slv != null) bal.slv({ clrBit: { idx: "delete-color" } });
    return cpy;
};


export const listColor = async (cpy: ColorModel, bal: ColorBit, ste: State) => {

    dat = null

    bit = await ste.hunt(ActCol.LIST_COLLECT, { val: 0, bit: ActClr.CREATE_COLOR })
    lst = bit.clcBit.lst

    bal.slv({ clrBit: { idx: 'list-color', val: lst.length, lst } });

    return cpy;
};