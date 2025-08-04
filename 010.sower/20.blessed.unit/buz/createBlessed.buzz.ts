import { BlessedModel } from "../blessed.model";
import BlessedBit from "../fce/blessed.bit";
import State from "../../99.core/state";
import BlessBit from "../fce/bless.bit";

import * as ActAvd from '../../06.avide.unit/avide.action'

import * as ActBls from "../../20.blessed.unit/blessed.action";
import * as ActCol from "../../97.collect.unit/collect.action";
import * as ActBus from "../../99.bus.unit/bus.action";

var bit, val, idx, dex, lst, dat, src;


export const createBlessed = async (cpy: BlessedModel, bal: BlessedBit, ste: State) => {
    var dat: BlessBit = { idx: bal.idx, src: bal.src }

    bit = await ste.hunt( ActAvd.CREATE_AVIDE, {idx:bal.idx})
    dat.avd = bit.avdBit.dat;

    bal.slv({ blsBit: { idx: "create-blessed", dat } });
    return cpy;
};

