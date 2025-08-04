
import { ColorModel } from "../color.model";
import ColorBit from "../fce/color.bit";
import State from "../../99.core/state";
import * as clone from "clone-deep";

import * as ActClr from '../color.action'
import * as ActFte from '../../01.fate.unit/fate.action'

var bit, lst, idx, src, dat, val;

export const basketColor = async (cpy: ColorModel, bal: ColorBit, ste: State) => {

    

    var nowColor;

    if (cpy.basket.length == 0) {
        lst = clone(cpy.nameList)
        var fteBit = await ste.hunt(ActFte.SHUFFLE_FATE, { lst })
        cpy.basket = fteBit.fteBit.lst
    }

    if (cpy.basket.length == 1) {
        nowColor = basketColor[0]

        //BASKET RESET!!!

    } else {

        var fteBit = await ste.hunt(ActFte.SELECT_FATE, { lst: cpy.basket })

        nowColor = fteBit.fteBit.dat

        var index = 0;

        cpy.basket.forEach( (a,b)=>{
            if ( a !=  nowColor ) return 
            index = b
        })

        cpy.basket.splice(index, 1);

    }

    bal.slv({ clrBit: { idx: 'basket-color', dat: nowColor, val:cpy.basket.length } });

    return cpy;
};