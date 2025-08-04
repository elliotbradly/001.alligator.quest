
import { ColorModel } from "../color.model";
import ColorBit from "../fce/color.bit";
import State from "../../99.core/state";

import * as ActClr from '../color.action'

var lst, idx, src, dat, val;

export const openColor = async (cpy: ColorModel, bal: ColorBit, ste: State) => {

 

    lst = bal.lst

    var dex = 0;

    var action = async () => {

 

        dex
        var itm = lst[dex];
        if (itm == null) {
            bal.slv({ clrBit: { idx: "open-color-error", src: 'no item present' } });
        }

        var name = itm.name;

        var S = require('string')
        idx = S(name).slugify().s
        src = itm.value
        dat = itm.rgb
        val = itm.value

        await ste.hunt(ActClr.WRITE_COLOR, { idx, src, val, dat })

        dex += 1;

        if (dex >= lst.length) {

            bal.slv({ clrBit: { idx: "open-color", val: lst.length } });
            return
        }

        await action()

    }

    await action()

    return cpy;
};
