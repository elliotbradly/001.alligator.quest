'use server'

import { earth } from '@earth/000.earth.pvt';
import * as ActErt from "@earth/00.earth.unit/earth.action"


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

export const initEarth = async (val) => {

  const localBit = { idx: 'local', src: host };
  //fictiq(ActFtq.INIT_FICTIQ, { val: 0,  });

  bit = await earth(ActErt.INIT_EARTH, { val: 0, dat: MQTT, src: [localBit] });
  //bus = bit.intBit.dat

  //bit = await time(ActTme.TEST_TIME, { idx: "surface00" })
  //bit0 = await TIME.init(0)  
  //bit1 = await pixel(ActPix.INIT_PIXEL, {})
  //bit2 = await SPACE.init(0)

  dex += 1;
  return { idx: 'init-earth', dex, val: bit.intBit.dat }
}
export const openEarth = async (val) => {

  ////if (init == false) {
  ////  bit = await initFictiq(0)
  /// init = true;
  // }

  bit = await earth (ActErt.OPEN_EARTH, {});

  const millisecondsSinceEpoch = Date.now();
  const secondsSinceEpoch = Math.floor(millisecondsSinceEpoch / 1000);

  now = secondsSinceEpoch

  dex += 1;
  return { idx: 'open-earth', dat: bit['ertBit'].dat }
}


export const updateEarth = async (val) => {


  // if (open == false) {
  //var bitOpen = await okwierdo(0)
  //   open = true;
  // }


  // now = Date.now();

  // if (now < next) {

  // bit = await time(ActClk.WRITE_CLOCK, { idx: 'clk00', dat: { sec: 3 } })
  // var dat = bit['clkBit'].dat.src
  //var dat

  //  return { idx: 'update-okwierdo', lst: [dat] }
  // }


  // next = now + 6000;

  // console.log(" dex: " + dex)

  // var bit = await okwierdo(ActOkw.UPDATE_KWIERDO, {});
  // dex += 1;

  bit = await earth (ActErt.UPDATE_EARTH, {});


  // lastList = bit['okwBit'].lst
  return { idx: 'update-earth', dat: bit }
}



export const initTime = async (val) => {

  //if (bus == null) { return { idx: 'init-time-error', src: 'no-bus' } }
  //bit = await bus(ActTme.TEST_TIME, {});

  return { idx: 'init-Time', dex }

  dex += 1;
  return
}



export const mqtt = async (val) => {


  //var client = MQTT.connect(host);

  //client.on('message', (tpc, msg) => {

  //messageBus(cpy, { idx: tpc, src: msg }, ste) 
  //})

  //client.on('connect', async () => {

  // var bit = await client.publish( '[Library action] Test Library',  JSON.stringify({}))

  //console.log("connected to mqtt " + JSON.stringify( bit ))

  //})


  return { idx: 'update-fictiq', dex }

}


export const loadProse = async () => {

  var FS = require('fs-extra')
  var dat = FS.readFileSync('./base/prose.md').toString()
  return dat

}


export const saveProse = async (dat) => {

  var src = './base/prose.md';

  var FS = require('fs-extra')
  var dat = FS.writeFileSync(src, String(dat))

  return { idx: 'sav-prose', dex }

}


