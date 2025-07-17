

import { useMemo } from 'react';
import React, { useState, useEffect } from 'react';


import * as Import from "@shade/BEE";
import State from "@shade/99.core/state";

import * as ActShd from "@shade/00.shade.unit/shade.action"
import * as ActVsg from "@shade/01.visage.unit/visage.action"
import * as ActCan from "@shade/03.container.unit/container.action"
import * as ActTxt from "@shade/05.text.unit/text.action"
import * as ActSpr from "@shade/06.sprite.unit/sprite.action"
import * as ActGph from "@shade/04.graphic.unit/graphic.action"
import * as ActHex from "@shade/07.hexagon.unit/hexagon.action"
import * as ActFgn from "@shade/08.focigon.unit/focigon.action"

import * as ActFce from "@shade/02.surface.unit/surface.action"

var once = false

function PixiCanvas() {

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

  var bit;

  setTimeout(() => {
    if (typeof window === 'undefined') {
      return
    }

    if (once == false) {
      once = true
      sim.hunt(ActFce.WRITE_SURFACE, { idx: "surface00" })
      return
    }

  }, 3)


  return (

    <div id='indexCanvas'></div>

  )
}

export default PixiCanvas
