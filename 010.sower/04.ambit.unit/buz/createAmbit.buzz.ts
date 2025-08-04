import * as ActCol from "../../97.collect.unit/collect.action";
import * as ActAbt from "../ambit.action";

import { AmbitModel } from "../ambit.model";
import AmbitBit from "../fce/ambit.bit";
import AmbBit from "../fce/amb.bit";
import State from "../../99.core/state";

import * as ActClr from "../../02.color.unit/color.action";
import * as ActSpk from '../../03.spark.unit/spark.action'
import PivotalBit from "010.sower/03.spark.unit/fce/talent/pivotal.bit";

var bit, val, idx, dex, lst, dat, src;

export const createAmbit = async (cpy: AmbitModel, bal: AmbitBit, ste: State) => {
    var dat: AmbBit = { idx: bal.idx, src: "default-ambit-source", orb:null };
    
    if (bal.dat != null) {
        for (var key in bal.dat) {
            dat[key] = bal.dat[key];
        }
    }

    bit = await ste.hunt( ActSpk.CREATE_SPARK, {idx:bal.idx})
    dat.orb = bit.spkBit.dat.bit;

    var pvl:PivotalBit = { contribution:null, gravity:null, providence:null };
    
    bit = await ste.hunt( ActClr.BASKET_COLOR, {})
    pvl.contribution = bit.clrBit.dat

    bit = await ste.hunt( ActClr.BASKET_COLOR, {})
    pvl.gravity = bit.clrBit.dat

    bit = await ste.hunt( ActClr.BASKET_COLOR, {})
    pvl.providence = bit.clrBit.dat
    
    dat.pvl = pvl;
    
    bal.slv({ abtBit: { idx: "create-ambit", dat: dat } });
    return cpy;
};