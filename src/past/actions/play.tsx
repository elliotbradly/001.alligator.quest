'use server'

import { time } from './001.time.act';
import { pixel } from './400.pixel.act';
import * as FS from 'fs-extra';

import * as ActTme from "@time/00.time.unit/time.action"
import * as ActPix from "@pixel/00.pixel.unit/pixel.action"
import * as ActClr from "@pixel/01.color.unit/color.action"

var dex = 0;
var bit;

let init;
let server;


export const initPivot = async () => {

  if (init == null) {
    
    init = true;
    bit = await time(ActTme.INIT_TIME, {})
    bit = await pixel(ActPix.INIT_PIXEL, { dat:{time:time} })

  }

  return { intBit: { idx: 'init-pivot' } }

}


export const selectSwatch = async (val) => {

  if (dex == 0) {

    var data = FS.readJsonSync('./src/color-list/000.color.name.json')
    debugger
    bit = await pixel(ActClr.OPEN_COLOR, { idx: "surface00", dat: data })
    bit['dat'] = val

  }

  var bit = await time(ActTme.TEST_TIME, { idx: "surface00" })
  bit['dat'] = val

  dex += 1;

  

  return { actBit:{ idx: 'select-swatch', lst: [bit], dex} }
}


export const CreatePlayer = async (val) => {

  var bit = await time(ActTme.TEST_TIME, { idx: "surface00" })
  bit['dat'] = val

  var bit0 = await pixel(ActPix.INIT_PIXEL, {})

  return { idx: 'create-player', lst: [bit, bit0], dex }
}


