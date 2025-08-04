'use server'

import { sower } from '@sower/001.sower.pvt';
import * as ActSow from "@sower/00.sower.unit/sower.action"

var dex = 0;

export const initSower = async (val) => {
  await sower(ActSow.INIT_SOWER, { val: 0 });
  dex += 1;
  return sower
}


