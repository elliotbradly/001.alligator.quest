import * as ActCol from "../../97.collect.unit/collect.action";
import * as ActAvd from "../avide.action";

import { AvideModel } from "../avide.model";
import AvideBit from "../fce/avide.bit";
import AvdBit from "../fce/avd.bit";
import State from "../../99.core/state";

import * as ActSpk from '../../03.spark.unit/spark.action'
import VigorousBit from "010.sower/03.spark.unit/fce/talent/vigorous.bit";


import * as ActClr from "../../02.color.unit/color.action";

var bit, val, idx, dex, lst, dat, src;

export const createAvide = async (cpy: AvideModel, bal: AvideBit, ste: State) => {
    var dat: AvdBit = { idx: bal.idx, src: "default-avide-source" };

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

    bal.slv({ avdBit: { idx: "create-avide", dat: dat } });
    return cpy;
};