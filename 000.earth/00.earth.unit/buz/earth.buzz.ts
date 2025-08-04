
import { EarthModel } from "../earth.model";
import EarthBit from "../fce/earth.bit";
import State from "../../99.core/state";

export const initEarth = (cpy: EarthModel, bal: EarthBit, ste: State) => {

    bal.slv({ intBit: { idx: "init-earth", dat: { src: 'genesis' } } });

    return cpy;
};





