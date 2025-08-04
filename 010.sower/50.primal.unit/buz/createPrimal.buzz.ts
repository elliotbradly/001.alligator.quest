import { PrimalModel } from "../primal.model";
import PrimalBit from "../fce/primal.bit";
import State from "../../99.core/state";
import PrimeBit from "../fce/prime.bit";

import * as ActAvo from '../../05.avaou.unit/avaou.action'

import * as ActPrm from "../../50.primal.unit/primal.action";
import * as ActCol from "../../97.collect.unit/collect.action";
import * as ActBus from "../../99.bus.unit/bus.action";

import * as ActVrt from "../../act/vurt.action"
import * as ActDsk from "../../act/disk.action"
import * as ActPvt from "../../act/pivot.action"

var bit, val, idx, dex, lst, dat, src;


export const createPrimal = async (cpy: PrimalModel, bal: PrimalBit, ste: State) => {
    var dat: PrimeBit = { idx: bal.idx, src: bal.src }

    bit = await ste.hunt( ActAvo.CREATE_AVAOU, {idx:bal.idx})
    dat.avo = bit.avoBit.dat;
    
    bal.slv({ priBit: { idx: "create-primal", dat } });
    return cpy;
};
