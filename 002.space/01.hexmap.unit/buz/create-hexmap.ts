
import { HexmapModel } from "../hexmap.model";
import HexmapBit from "../fce/hexmap.bit";
import State from "../../99.core/state";
import * as SHAPE from "../../val/shape";
import * as Honeycomb from "honeycomb-grid";

import * as HEXMAP from "../../val/hexmap";
import * as S from 'string'
import MapBit from "../fce/map.bit";
import * as SPACE from '../../val/space'
import SpotBit from "../../02.focus.unit/fce/spot.bit";

import * as ActMap from "../hexmap.action";

import * as ActFoc from "../../02.focus.unit/focus.action";

import * as ActSpc from "../../00.space.unit/space.action";
import * as ActCol from "../../97.collect.unit/collect.action";

import * as ActDsk from "../../act/disk.action";
import * as ActVrt from "../../act/vurt.action";

var bit, idx, lst, dat, val, src;

export const createHexmap = async (cpy: HexmapModel, bal: HexmapBit, ste: State) => {

  if (bal == null) bal = { idx, src, frm: null, val, typ: null, dat: {} }

  if (bal.dat == null) bal.dat = {}

  if (bal.dat.bit != null) {
    bal.slv({ mapBit: { idx: "create-hexmap", dat: bal.dat.bit } });
    return
  }

  var clone = require("clone-deep");

  var dat: MapBit = { idx: bal.idx, typ: HEXMAP.AMBT, val: bal.dat.val, ver: '00.00' }


  for (var key in bal.dat) {
    dat[key] = bal.dat[key]
  }

  dat



  const Hex = Honeycomb.extendHex({
    size: Number(1), // default: 1
    orientation: "flat", //needs to be flat
  });

  const Grid = Honeycomb.defineGrid(Hex);

  dat.bit

  if (dat.bit == null) {
    bit = await ste.hunt(ActMap.SHAPE_HEXMAP, { dat })
    var shape = bit.mapBit.dat.bit
    dat.bit.grid = shape.bit
  }

  dat.bit.grid

  var copied = clone(dat.bit.grid);

  dat.grid = Grid(copied);

  var size = dat.grid.length

  if (dat.bit == null) {
    if (bal.slv != null) bal.slv({ mapBit: { idx: "create-hexmap-error", dat: { src: "no bit present" } } });
    return
  }

  dat

  bal.slv({ mapBit: { idx: "create-hexmap", val: size, dat } });
  return cpy;
};
