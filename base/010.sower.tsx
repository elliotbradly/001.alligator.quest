'use server'

import { sower } from '@sower/001.sower.pvt';
import * as ActSow from "@sower/00.sower.unit/sower.action"


//import { time } from '@time/001.time.pvt';
//import * as ActTme from "@time/00.time.unit/time.action"
//import * as ActClk from "@time/03.clock.unit/clock.action"

//import * as TIME from './001.time';
//import * as SPACE from './002.space';

//import * as ActPix from "@pixel/00.pixel.unit/pixel.action"
//import * as ActSpc from "@space/00.space.unit/space.action"

var dex = 0;
var now = 0;

var init = false;
var open = false;

var bit
var bit0, bit1, bit2
var idx;

const MQTT = require('async-mqtt')
//var host = 'ws://agent-network-8af0ee89ad26.herokuapp.com'
//var host = 'ws://localhost:80';
var host = 'ws://agent-network-8af0ee89ad26.herokuapp.com'

let bus;

export const initSower = async (val) => {

  const localBit = { idx: 'local', src: host };
  //fictiq(ActFtq.INIT_FICTIQ, { val: 0,  });

  bit = await sower(ActSow.INIT_SOWER, { val: 0, dat: MQTT, src: [localBit] });
  //bus = bit.intBit.dat

  //bit = await time(ActTme.TEST_TIME, { idx: "surface00" })
  //bit0 = await TIME.init(0)  
  //bit1 = await pixel(ActPix.INIT_PIXEL, {})
  //bit2 = await SPACE.init(0)

  dex += 1;
  return bit
}


