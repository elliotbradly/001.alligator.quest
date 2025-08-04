'use server'

import { earth } from '@earth/000.earth.pvt';
import * as ActErt from "@earth/00.earth.unit/earth.action"

var dex = 0;

export const initEarth = async (val) => {
  await earth(ActErt.INIT_EARTH, { val: 0 });
  dex += 1;
  return earth
}

export const updateEarth = async (val) => {
  await earth(ActErt.UPDATE_EARTH, { val: 0 });
  dex += 1;
  return earth
}
