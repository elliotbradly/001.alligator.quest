import { PastoralModel } from "../pastoral.model";
import PastoralBit from "../fce/pastoral.bit";
import State from "../../99.core/state";
import PastureBit from "../fce/pasture.bit"; import OrbBit from "010.sower/03.spark.unit/fce/orb.bit";


import * as ActAvo from '../../05.avaou.unit/avaou.action'

import * as ActPst from "../../30.pastoral.unit/pastoral.action";
import * as ActCol from "../../97.collect.unit/collect.action";
import * as ActBus from "../../99.bus.unit/bus.action";

import * as ActSpk from '../../03.spark.unit/spark.action'

var bit, val, idx, dex, lst, dat, src;

export const createPastoral = async (cpy: PastoralModel, bal: PastoralBit, ste: State) => {
   var dat: PastureBit = { idx: bal.idx, src: bal.src }

   bit = await ste.hunt( ActAvo.CREATE_AVAOU, {idx:bal.idx})
   dat.avo = bit.avoBit.dat;

   bal.slv({ pasBit: { idx: "create-pastoral", dat } });
   return cpy;
};



