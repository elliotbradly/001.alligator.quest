import { BoundedModel } from "../bounded.model";
import BoundedBit from "../fce/bounded.bit";
import State from "../../99.core/state";
import BoundBit from "../fce/bound.bit";

import * as ActAvd from '../../06.avide.unit/avide.action'

import * as ActBnd from "../../40.bounded.unit/bounded.action";
import * as ActCol from "../../97.collect.unit/collect.action";
import * as ActBus from "../../99.bus.unit/bus.action";

import * as ActVrt from "../../act/vurt.action"
import * as ActDsk from "../../act/disk.action"
import * as ActPvt from "../../act/pivot.action"

var bit, val, idx, dex, lst, dat, src;

export const createBounded = async (cpy: BoundedModel, bal: BoundedBit, ste: State) => {
    var dat: BoundBit = { idx: bal.idx, src: bal.src }

    bit = await ste.hunt( ActAvd.CREATE_AVIDE, {idx:bal.idx})
    dat.avd = bit.avdBit.dat;

    bal.slv({ bndBit: { idx: "create-bound", dat } });
    return cpy;
};

