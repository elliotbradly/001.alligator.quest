'use server'

import * as Import from "@pixel/BEE";
import State from "@pixel/99.core/state";

import * as ActPix from "@pixel/00.pixel.unit/pixel.action"
import * as ActClr from "@pixel/01.color.unit/color.action"


import * as FS from 'fs-extra'

var dex = 0;

var sim = {
  hunt: (a, b) => { },
  state: null
};

sim.hunt = (typ, obj) => { return host(obj, typ) }

var host = (obj, typ) => {

  init();

  var slv;
  const promo = new Promise((rslv, rjct) => (slv = rslv));

  if (obj == null) obj = {};
  if (obj.slv == null) obj.slv = (val0) => slv(val0);

  sim.state.dispatch({ type: typ, bale: obj });
  return promo;
};

var init = () => {
  if (sim.state != null) return;
  sim.state = new State();
  sim.state.pivot = sim;
  sim.state.hunt = sim.hunt
  for (var k in Import.list) new Import.list[k](sim.state);
};



export const initPixel = async (val) => {

  var bit = await sim.hunt(ActPix.INIT_PIXEL, { idx: "surface00" })
  bit['dat'] = val

  dex += 1;

  var dat = FS.readJsonSync('./src/color-list/000.color.name.json')

  debugger

  sim.hunt(ActClr.OPEN_COLOR, { dat })


  return { intBit: { idx: 'create-bunny-gunny-foo-foo', dat: bit, dex } }
}


export const pixel = async (typ, obj) => {
  return sim.hunt(typ, obj)
}