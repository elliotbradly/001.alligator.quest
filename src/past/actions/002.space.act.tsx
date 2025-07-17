'use server'

import * as Import from "@space/BEE";
import State from "@space/99.core/state";

import * as ActSpc from "@space/00.space.unit/space.action"

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



export const initSpace = async () => {

  var bit = await sim.hunt(ActSpc.INIT_SPACE, { idx: "surface00" })
  //bit['dat'] = val

  return { intBit: { idx: 'init-space', dat: bit, dex } }
}


export const space = async (typ, obj) => {
  return sim.hunt(typ, obj)
}