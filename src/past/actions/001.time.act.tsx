'use server'

import * as Import from "@time/BEE";
import State from "@time/99.core/state";

import * as ActTme from "@time/00.time.unit/time.action"

import * as ActClr from "@pixel/01.color.unit/color.action"
import * as ActPix from "@pixel/00.pixel.unit/pixel.action"


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


export const CreatePlayer = async (val) => {

  var bit = await sim.hunt(ActTme.TEST_TIME, { idx: "surface00" })
  bit['dat'] = val

  dex += 1;

  //var bit0 = await sim.hunt(ActPix.INIT_PIXEL, {})

  return { idx: 'create-bunny-gunny-foo-foo', lst: [bit], dex }

}


export const time = async ( typ,obj) => {
  return sim.hunt( typ, obj)
}
