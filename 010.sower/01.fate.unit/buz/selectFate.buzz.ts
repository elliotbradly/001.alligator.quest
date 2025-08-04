import * as ActFte from '../fate.action'

import { FateModel } from "../fate.model";
import FateBit from "../fce/fate.bit";
import State from "../../99.core/state";

var bit

export const selectFate = async (cpy: FateModel, bal: FateBit, ste: State) => {

    if (cpy.fate == null) bit = await ste.hunt(ActFte.UPDATE_FATE, {})

    if (bal == null) bal = { idx: null, lst: null }

    if (bal.lst == null) bal.lst = [1, 2]
    var dat = cpy.fate.pickone(bal.lst)

    bal.slv({ fteBit: { idx: "select-fate", dat } });

    return cpy;
};
