'use server'

import { time } from './001.time.act';
import { pixel } from './400.pixel.act';

import * as ActTme from "@time/00.time.unit/time.action"

import * as ActPix from "@pixel/00.pixel.unit/pixel.action"


var dex = 0;


export const CreatePlayer = async (val) => {

  var bit = await time(ActTme.TEST_TIME, { idx: "surface00" })
  bit['dat'] = val

  dex += 1;

  var bit0 = await pixel(ActPix.INIT_PIXEL, {})

  return { idx: 'create-bunny-gunny-foo-foo', lst: [bit, bit0], dex }

}