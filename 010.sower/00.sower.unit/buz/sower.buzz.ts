import { SowerModel } from "../sower.model";
import SowerBit from "../fce/sower.bit";
import State from "../../99.core/state";

import * as ActSow from "../../00.sower.unit/sower.action";
import * as ActCns from "../../act/console.action";
import * as ActCol from "../../97.collect.unit/collect.action";
import * as ActBus from "../../99.bus.unit/bus.action";
import * as ActDsk from "../../act/disk.action"
import * as ActPvt from "../../act/pivot.action";

import * as ActPmt from "../../act/prompt.action";
import * as ActOlm from "../../act/ollama.action";
import * as ActGeo from "../../act/geojson.action";
import * as ActMap from "../../act/hexmap.action";
import * as ActFoc from "../../act/focus.action";

var bit, val, idx, dex, lst, dat, src;

export const initSower = async (cpy: SowerModel, bal: SowerBit, ste: State) => {

    bal.slv({ intBit: { idx: "init-sower", bit } });
    return cpy;
};

export const openSower = async (cpy: SowerModel, bal: SowerBit, ste: State) => {

    bal.slv({ sowBit: { idx: "open-sower", dat: { lst: [] } } });
    return cpy;
};

export const updateSower = (cpy: SowerModel, bal: SowerBit, ste: State) => {

    bal.slv({ sowBit: { idx: "update-sower", dat: { lst: [] } } });
    return cpy;
};



export const testSower = (cpy: SowerModel, bal: SowerBit, ste: State) => {

    bal.slv({ sowBit: { idx: "test-sower", val: 1 } });
    return cpy;
};


var patch = (ste, type, bale) => ste.dispatch({ type, bale });