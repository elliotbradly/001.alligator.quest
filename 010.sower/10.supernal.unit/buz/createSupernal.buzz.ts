import { SupernalModel } from "../supernal.model";
import SupernalBit from "../fce/supernal.bit";
import State from "../../99.core/state";
import SuperBit from "../fce/super.bit";

import * as ActAvo from '../../05.avaou.unit/avaou.action'

import * as ActSup from "../../10.supernal.unit/supernal.action";
import * as ActCol from "../../97.collect.unit/collect.action";
import * as ActBus from "../../99.bus.unit/bus.action";

import * as ActVrt from "../../act/vurt.action"
import * as ActDsk from "../../act/disk.action"
import * as ActPvt from "../../act/pivot.action"


var bit, val, idx, dex, lst, dat, src;


export const createSupernal = async (cpy: SupernalModel, bal: SupernalBit, ste: State) => {
    var dat: SuperBit = { idx: bal.idx, src: bal.src }

    bit = await ste.hunt( ActAvo.CREATE_AVAOU, {idx:bal.idx})
    dat.avo = bit.avoBit.dat;

    bal.slv({ supBit: { idx: "create-supernal", dat } });
    return cpy;
};

