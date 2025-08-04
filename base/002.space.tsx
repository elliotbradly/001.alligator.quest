'use server'

import { space } from '@space/002.space.pvt';
import * as ActSpc from "@space/00.space.unit/space.action"

var dex = 0;

export const initSpace = async (val) => {
  await space(ActSpc.INIT_SPACE, { val: 0 });
  dex += 1;
  return space
}


