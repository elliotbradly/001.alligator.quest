import * as ActCol from "../../97.collect.unit/collect.action";
import * as ActAvo from "../avaou.action";

import { AvaouModel } from "../avaou.model";
import AvaouBit from "../fce/avaou.bit";
import AvoBit from "../fce/avo.bit";
import State from "../../99.core/state";

import * as ActClr from "../../02.color.unit/color.action";
import * as ActSpk from '../../03.spark.unit/spark.action'
import VigorousBit from "010.sower/03.spark.unit/fce/talent/vigorous.bit";


var bit, val, idx, dex, lst, dat, src;


export const createAvaou = async (cpy: AvaouModel, bal: AvaouBit, ste: State) => {
    var dat: AvoBit = { idx: bal.idx, src: "default-avaou-source" };
    
    if (bal.dat != null) {
        for (var key in bal.dat) {
            dat[key] = bal.dat[key];
        }
    }

    bit = await ste.hunt( ActSpk.CREATE_SPARK, {idx:bal.idx})
    dat.orb = bit.spkBit.dat.bit;

    var vig:VigorousBit = { pizazz:null, oomph:null, zing:null };
    
    bit = await ste.hunt( ActClr.BASKET_COLOR, {})
    vig.pizazz = bit.clrBit.dat

    bit = await ste.hunt( ActClr.BASKET_COLOR, {})
    vig.oomph = bit.clrBit.dat

    bit = await ste.hunt( ActClr.BASKET_COLOR, {})
    vig.zing = bit.clrBit.dat
    
    dat.vig = vig;
    
    bal.slv({ avoBit: { idx: "create-avaou", dat: dat } });
    return cpy;
};