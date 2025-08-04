import { SpaceModel } from "../space.model";
import SpaceBit from "../fce/space.bit";
import State from "../../99.core/state";

import * as S from 'string'


import * as ActSpc from "../../00.space.unit/space.action";
import * as ActGeo from "../../03.geojson.unit/geojson.action";
import * as ActMap from "../../01.hexmap.unit/hexmap.action";
import * as ActFoc from "../../02.focus.unit/focus.action";

import * as ActCol from "../../97.collect.unit/collect.action";

import * as ActCns from "../../act/console.action";


import * as ActPvt from "../../act/pivot.action";
import * as ActDsk from "../../act/disk.action";

import * as ActBus from "../../99.bus.unit/bus.action";

var bit, lst, dex, src, dat;

export const initSpace = async (cpy: SpaceModel, bal: SpaceBit, ste: State) => {

 // bit = await ste.hunt(ActBus.INIT_BUS, { idx: cpy.idx, src: bal.src, lst: [ActSpc, ActGeo, ActMap, ActFoc], dat: bal.dat });

  //if (bal.val == 1) {
  //  bit = await ste.hunt(ActTrm.INIT_TERMINAL, {});

  //  patch(ste, ActMnu.INIT_MENU, {});
  // }

  bal.slv({ intBit: { idx: "init-space" } });

  return cpy;
};

export const updateSpace = (cpy: SpaceModel, bal: SpaceBit, ste: State) => {

  var unitList = ['00.space.unit', '01.focus.unit', '02.geojson.unit', '03.hexmap.unit', '97.collect.unit', '99.bus.unit', '99.core']

  const path = require('path');
  var FS = require('fs-extra')

  var containers = FS.readdirSync('../')

  containers = containers.map(dirName => "../" + dirName);
  containers = containers.filter(dirName => dirName !== "../002.space");

  function isDirectorySync(path) {
    if (!FS.existsSync(path)) {
      return false; // Path doesn't exist
    }

    const stats = FS.lstatSync(path);
    return stats.isDirectory();
  }

  function getAllFilesAndDirsSync(dirPath) {
    let results = [];

    const entries = FS.readdirSync(dirPath);

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry);
      results.push(fullPath); // Add current entry

      if (FS.lstatSync(fullPath).isDirectory()) {
        // Recursively call for subdirectories
        results = results.concat(getAllFilesAndDirsSync(fullPath));
      }
    }

    return results;
  }

  var check = []

  containers.forEach((a) => {

    if (isDirectorySync(a) == false) return
    check.push(a)

  })

  check
  var yes = []

  check.forEach((a) => {

    var looking = FS.readdirSync(a)

    looking.forEach((b) => {
      if (b != '002.space') return
      yes.push(a)
    })

  })

  yes.forEach((a, b) => {

    var remove = a + '/002.space'
    //FS.removeSync(remove);

    bit = ste.hunt(ActCns.UPDATE_CONSOLE, { idx: 'cns00', src: 'removing --- ' + remove })

    unitList.forEach((c) => {

      var dest = a + ''

      var source = './002.space/' + c;
      var output = a + '/002.space/' + c

      bit = ste.hunt(ActCns.UPDATE_CONSOLE, { idx: 'cns00', src: source + ' --- ' + output })

      FS.copySync(source, output);

    })
  })


  bal.slv({ spcBit: { idx: "update-space" } });

  return cpy;

};

export const testSpace = async (cpy: SpaceModel, bal: SpaceBit, ste: State) => {

  //bit = await ste.hunt(ActCns.UPDATE_CONSOLE, { idx: "cns00", src: "-----------" });
  //bit = await ste.hunt(ActCns.UPDATE_CONSOLE, { idx: "cns00", src: "Testing Space" });
  //bit = await ste.hunt(ActCns.UPDATE_CONSOLE, { idx: "cns00", src: "-----------" });

  bal.slv({ spcBit: { idx: "test-space", src: "testing-space", val: 1 } });

  return cpy;
};



var patch = (ste, type, bale) => ste.dispatch({ type, bale });