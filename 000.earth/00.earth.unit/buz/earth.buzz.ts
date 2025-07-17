

import { EarthModel } from "../earth.model";
import EarthBit from "../fce/earth.bit";
import State from "../../99.core/state";

var count = 0;

export const initEarth = (cpy: EarthModel, bal: EarthBit, ste: State) => {

    if (cpy.count == 0) {

        setInterval(() => {
            cpy.count += 1;
        }, 3333)

    }


    bal.slv({ intBit: { idx: "init-earth", dat: { src: 'genesis', val: cpy.count } } });

    return cpy;
};


export const openEarth = (cpy: EarthModel, bal: EarthBit, ste: State) => {

    if (cpy.opened == true) {
        bal.slv({ ertBit: { idx: "open-earth", dat: { val: cpy.opened } } });
        return cpy
    }

    cpy.opened = true

    bal.slv({ ertBit: { idx: "open-earth", dat: { val: cpy.opened } } });

    return cpy;
};

export const updateEarth = (cpy: EarthModel, bal: EarthBit, ste: State) => {

    bal.slv({ ertBit: { idx: "update-earth", val: cpy.count, dat: { src: 'updated' } } });

    return cpy;
};


export const testEarth = (cpy: EarthModel, bal: EarthBit, ste: State) => {
    debugger
    return cpy;
};

