'use client'

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


  setTimeout(async () => {

    //bit = await sim.hunt(ActVsg.MOUNT_VISAGE, { idx: "vsg00", src: "indexCanvas", dat: { width: 960, height: 960 } });

    //bit = await sim.hunt(ActVsg.REMOVE_VISAGE, { idx: "vsg00" })
    //bit = await sim.hunt(ActVsg.MOUNT_VISAGE, { idx: "vsg00", src: "indexCanvas", dat: { width: 960, height: 960 } })

    //bit = await sim.hunt(ActVsg.READ_VISAGE, { idx: "vsg00" })

    //bit = await sim.hunt(ActCan.WRITE_CONTAINER, { idx: "can00", src: 'vsg00' })
    //var container = bit.canBit.dat.bit

    //bit = await sim.hunt(ActCan.SURFACE_CONTAINER, { idx: 'fce-can-00', src: "vsg00" });

    //bit = await sim.hunt(ActCan.ADD_CONTAINER, { idx: "fce-can-00", dat: { bit: container } })

    //bit = await sim.hunt(ActTxt.WRITE_TEXT, { idx: 'txt00', dat: { txt: "text 00" } })
    //bit = await sim.hunt(ActCan.ADD_CONTAINER, { idx: "can00", dat: { bit: bit.txtBit.dat.bit } })

    //bit = await sim.hunt(ActTxt.WRITE_TEXT, { idx: 'txt01', dat: { txt: "text 01", y: 15 } })
    //bit = await sim.hunt(ActCan.ADD_CONTAINER, { idx: "can00", dat: { bit: bit.txtBit.dat.bit } })

    //bit = await sim.hunt(ActTxt.WRITE_TEXT, { idx: 'txt02', dat: { txt: "text 02", y: 30 } })
    //bit = await sim.hunt(ActCan.ADD_CONTAINER, { idx: "can00", dat: { bit: bit.txtBit.dat.bit } })

    //bit = await sim.hunt(ActTxt.WRITE_TEXT, { idx: 'txt03', dat: { txt: "text 03", y: 45 } })
    //bit = await sim.hunt(ActCan.ADD_CONTAINER, { idx: "can00", dat: { bit: bit.txtBit.dat.bit } })

    //bit = await sim.hunt(ActSpr.WRITE_SPRITE, { idx: 'spr00', dat: { src: './img/000.png', x: 40, y: 80 } })
    //bit = await sim.hunt(ActCan.ADD_CONTAINER, { idx: "can00", dat: { bit: bit.sprBit.dat.bit } })

    //bit = await sim.hunt(ActGph.WRITE_GRAPHIC, { idx: 'gph00', dat: { h: 100, w: 40, x: 40, y: 40 } })
    //bit = await sim.hunt(ActCan.ADD_CONTAINER, { idx: "can00", dat: { bit: bit.gphBit.dat.bit } })

    //bit = await sim.hunt(ActGph.WRITE_GRAPHIC, { idx: 'gph01', dat: { h: 100, w: 40, x: 40, y: 40 } })
    //bit = await sim.hunt(ActCan.ADD_CONTAINER, { idx: "can00", dat: { bit: bit.gphBit.dat.bit } })

    //bit = await sim.hunt(ActGph.WRITE_GRAPHIC, { idx: 'gph02', dat: { h: 100, w: 40, x: 40, y: 40 } })
    //bit = await sim.hunt(ActCan.ADD_CONTAINER, { idx: "can00", dat: { bit: bit.gphBit.dat.bit } })

    //bit = await sim.hunt(ActHex.WRITE_HEXAGON, { idx: 'hex00', dat: { src: 'gph00', frm: 'hexmap', sze: 111, bit: map } })

    //bit = await sim.hunt(ActFgn.WRITE_FOCIGON, { idx: focus.idx, dat: { src: 'gph01', clr: 0x0FF000, sze: 111, fce: focus.face, bit: focus } })

    if (typeof document !== "undefined") {

      var bit = await sim.hunt(ActFce.WRITE_SURFACE, { idx: 'surface', src: "indexCanvas" })


    }



  }, 333)




  const externalFunction: Function = async () => {

    if (once == true) return

    once = true;


  }


  return (

    <div id='indexCanvas'></div>

  )
}

export default PixiCanvas
