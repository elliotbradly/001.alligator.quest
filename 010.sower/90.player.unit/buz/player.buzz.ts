
import * as ActPlr from "../player.action";

import * as ActCol from "../../97.collect.unit/collect.action";
import * as ActBus from "../../99.bus.unit/bus.action";

var bit, val, idx, dex, lst, dat, src;


export const initPlayer = (cpy: PlayerModel, bal: PlayerBit, ste: State) => {
    debugger
    return cpy;
};


export const createPlayer = async (cpy: PlayerModel, bal: PlayerBit, ste: State) => {

    if (bal.dat == null) bal.dat = {}
    var dat: ChampBit = { idx: bal.idx };

    //const mapId = $dataSystem.startMapId;
    //const x = $dataSystem.startX;
    //const y = $dataSystem.startY;

    bal.slv({ plyBit: { idx: 'create-player', dat } });
    return cpy;
};

export const updatePlayer = async (cpy: PlayerModel, bal: PlayerBit, ste: State) => {

    bit = await ste.hunt(ActPlr.READ_PLAYER, { idx: bal.idx });
    dat = bit.plyBit;

    bal.slv({ plyBit: { idx: "update-player", dat } });
    return cpy;
};


export const readPlayer = async (cpy: PlayerModel, bal: PlayerBit, ste: State) => {

    var slv = bal.slv;
    if (bal.idx == null) bal.idx = 'ply00';

    bit = await ste.hunt(ActCol.READ_COLLECT, { idx: bal.idx, bit: ActPlr.CREATE_PLAYER });

    var item = bit.clcBit.dat;

    if (slv != null) slv({ plyBit: { idx: "read-player", dat: item } });
    return cpy;
};


export const writePlayer = async (cpy: PlayerModel, bal: PlayerBit, ste: State) => {

    var slv = bal.slv;

    if (bal.idx == null) bal.idx = 'ply00';

    bit = await ste.hunt(ActCol.WRITE_COLLECT, { idx: bal.idx, src: bal.src, dat: bal.dat, bit: ActPlr.CREATE_PLAYER });
    var item = bit.clcBit.dat;

    if (bit.clcBit.val == 1) await ste.hunt(ActPlr.UPDATE_PLAYER, { idx: bal.idx, dat: bal.dat });

    if (slv != null) slv({ plyBit: { idx: "write-player", dat: item } });
    return cpy;

};
export const removePlayer = async (cpy: PlayerModel, bal: PlayerBit, ste: State) => {

    bit = await ste.hunt(ActCol.REMOVE_COLLECT, { idx: bal.idx, src: bal.src, dat: bal.dat, bit: ActPlr.DELETE_PLAYER })
    if (bal.slv != null) bal.slv({ plyBit: { idx: "remove-player", dat: bit.clcBit } });

    return cpy;
};


export const deletePlayer = (cpy: PlayerModel, bal: PlayerBit, ste: State) => {
    debugger
    return cpy;
};


export const openPlayer = (cpy: PlayerModel, bal: PlayerBit, ste: State) => {

    return cpy;
};




import { PlayerModel } from "../player.model";
import PlayerBit from "../fce/player.bit";
import State from "../../99.core/state";
import ChampBit from "../fce/champ.bit";
