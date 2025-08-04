import { ColorModel } from "../color.model";
import ColorBit from "../fce/color.bit";
import State from "../../99.core/state";

import ClrBit from "../fce/clr.bit";

import * as ActClr from '../color.action'
import * as ActFte from '../../01.fate.unit/fate.action'

var bit, lst, idx, src, dat, val;

export const createColor = (cpy: ColorModel, bal: ColorBit, ste: State) => {
    var dat: ClrBit = { idx: bal.idx, hex: '#FFFFFF' }; // Default color is white

    if (bal.dat != null) {
        for (var key in bal.dat) {
            dat[key] = bal.dat[key];
        }
    }

    if (cpy.names[bal.idx] == null) {
        cpy.nameList.push(bal.idx)
        cpy.names[bal.idx] = 1
    }

    bal.slv({ clrBit: { idx: "create-color", dat: dat } });
    return cpy;
};
