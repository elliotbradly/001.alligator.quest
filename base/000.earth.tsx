'use server'

import { earth } from '@earth/000.earth.pvt';
import * as ActErt from "@earth/00.earth.unit/earth.action"

var dex = 0;

export const initEarth = async (val) => {
  var bit = await earth(ActErt.INIT_EARTH, { val: 0 });
  dex += 1;
  return bit
}

export const updateEarth = async (val) => {
 var bit = await earth(ActErt.UPDATE_EARTH, { val: 0 });
  dex += 1;
  return bit
}

export const openEarth = async (val) => {
  var bit = await earth(ActErt.OPEN_EARTH, { val: 0 });
   dex += 1;
   return bit
 }
