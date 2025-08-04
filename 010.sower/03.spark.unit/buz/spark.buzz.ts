import * as ActSpk from "../../03.spark.unit/spark.action";
import * as ActCol from "../../97.collect.unit/collect.action";
import * as ActBus from "../../99.bus.unit/bus.action";


import * as ActVrt from "../../act/vurt.action"
import * as ActDsk from "../../act/disk.action"
import * as ActPvt from "../../act/pivot.action"


var bit, val, idx, dex, lst, dat, src;

export const initSpark = async (cpy: SparkModel, bal: SparkBit, ste: State) => {

    //set up colors 
    //src = '000.color.name.json'
    //bit = await ste.bus(ActDsk.READ_DISK, { src: './data/color-list/' + src })
    //var colorList = bit.dskBit.dat;

    //lst = JSON.parse(colorList)
   
    //bit = await ste.bus(ActClr.WRITE_COLOR, { idx: 'clr00', dat: { lst } });

    //var staveDataLoc = './data/stave/'
    //src = staveDataLoc + '002.genisi.txt';

    //bit = await ste.bus(ActStv.WRITE_STAVE, { src });
    
    bal.slv({ intBit: { idx: "init-spark" } });

    return cpy;
};


export const updateSpark = async (cpy: SparkModel, bal: SparkBit, ste: State) => {
    return cpy;
};


export const readSpark = async (cpy: SparkModel, bal: SparkBit, ste: State) => {

    if (bal.idx == null) bal.idx = 'spk00';
    bit = await ste.hunt(ActCol.READ_COLLECT, { idx: bal.idx, bit: ActSpk.CREATE_SPARK })

    bal.slv({ spkBit: { idx: "read-spark", dat: bit.clcBit.dat } });
    return cpy;
};

export const writeSpark = async (cpy: SparkModel, bal: SparkBit, ste: State) => {

    bit = await ste.hunt(ActCol.WRITE_COLLECT, { idx: bal.idx, src: bal.src, dat: bal.dat, bit: ActSpk.CREATE_SPARK })

    if (bal.slv != null) bal.slv({ spkBit: { idx: "write-spark", dat: bit.clcBit.dat } });
    return cpy;
};



export const removeSpark = async (cpy: SparkModel, bal: SparkBit, ste: State) => {
    debugger
    return cpy;
};


export const deleteSpark = async (cpy: SparkModel, bal: SparkBit, ste: State) => {
    debugger
    return cpy;
};




import { SparkModel } from "../spark.model";
import SparkBit from "../fce/spark.bit";
import State from "../../99.core/state";
import OrbBit from "../fce/orb.bit";
