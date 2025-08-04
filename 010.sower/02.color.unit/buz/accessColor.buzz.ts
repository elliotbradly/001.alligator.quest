import { ColorModel } from "../color.model";
import ColorBit from "../fce/color.bit";
import State from "../../99.core/state";

import ClrBit from "../fce/clr.bit";

import * as ActClr from '../color.action'
import * as ActFte from '../../01.fate.unit/fate.action'

var bit, lst, idx, src, dat, val;

export const accessColor = (cpy: ColorModel, bal: ColorBit, ste: State) => {

    

    dat = { val: cpy.basket.length }

    bal.slv({ clrBit: { idx: "access-color", dat } });

    return cpy;
};