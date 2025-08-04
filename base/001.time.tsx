'use server'

import { time } from '@time/001.time.pvt';
import * as ActTme from "@time/00.time.unit/time.action"

var dex = 0;

export const initTime = async (val) => {
  await time(ActTme.INIT_TIME, { val: 0 });
  dex += 1;
  return time
}


