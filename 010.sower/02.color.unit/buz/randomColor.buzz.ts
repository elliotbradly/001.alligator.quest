
import { ColorModel } from "../color.model";
import ColorBit from "../fce/color.bit";
import State from "../../99.core/state";

import * as ActClr from '../color.action'
import * as ActFte from '../../01.fate.unit/fate.action'

var bit, lst, idx, src, dat, val;

export const randomColor = async (cpy: ColorModel, bal: ColorBit, ste: State) => {

    bit = await ste.hunt(ActClr.LIST_COLOR)

    lst = bit.clrBit.lst

    bit = await ste.hunt( ActFte.SELECT_FATE, {lst})
    idx = bit.fteBit.dat

    bit = await ste.hunt(ActClr.READ_COLOR, {idx})

    dat = bit.clrBit.dat;

    bal.slv({ clrBit: { idx: 'randome-color', dat } });

    return cpy;
};