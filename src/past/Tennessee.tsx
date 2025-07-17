'use server'

import { time } from '@time/001.time.pvt';
import { pixel } from '@pivot/400.pixel.pvt';

import * as ActTme from "@time/00.time.unit/time.action"
import * as ActPix from "@pixel/00.pixel.unit/pixel.action"

var dex = 0;

export const open = async (val) => {

  var bit = await time(ActTme.TEST_TIME, { idx: "surface00" })
  bit['dat'] = val

  dex += 1;

  var bit0 = await pixel(ActPix.INIT_PIXEL, {})

  return { idx: 'open-tennessee', lst: [bit, bit0], dex }

}


export const update = async (val) => {

  var bit = await time(ActTme.TEST_TIME, { idx: "surface00" })
  bit['dat'] = val

  dex += 1;

  var bit0 = await pixel(ActPix.INIT_PIXEL, {})

  return { idx: 'open-tennessee', lst: [bit, bit0], dex }

}