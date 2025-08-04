import * as ActCol from "../../97.collect.unit/collect.action";
import * as ActArt from "../artes.action";

import { ArtesModel } from "../artes.model";
import ArtesBit from "../fce/artes.bit";
import ArtBit from "../fce/art.bit";
import State from "../../99.core/state";

import * as ActClr from "../../02.color.unit/color.action";
import * as ActSpk from '../../03.spark.unit/spark.action'

import ImaginativeBit from "010.sower/03.spark.unit/fce/talent/imaginative.bit";

var bit, val, idx, dex, lst, dat, src;

export const createArtes = async (cpy: ArtesModel, bal: ArtesBit, ste: State) => {
    var dat: ArtBit = { idx: bal.idx, src: "default-artes-source" };
    
    if (bal.dat != null) {
        for (var key in bal.dat) {
            dat[key] = bal.dat[key];
        }
    }

    bit = await ste.hunt( ActSpk.CREATE_SPARK, {idx:bal.idx})
    dat.orb = bit.spkBit.dat.bit;

    var img:ImaginativeBit = { style:null, ingenuity:null, vision:null };

    bit = await ste.hunt( ActClr.BASKET_COLOR, {})
    img.style = bit.clrBit.dat

    bit = await ste.hunt( ActClr.BASKET_COLOR, {})
    img.ingenuity = bit.clrBit.dat

    bit = await ste.hunt( ActClr.BASKET_COLOR, {})
    img.vision = bit.clrBit.dat
    
    dat.img = img;

    
    bal.slv({ artBit: { idx: "create-artes", dat: dat } });
    return cpy;
};