import Earth from "./fce/earth.interface";
import EarthBit from "./fce/earth.interface";

export class EarthModel implements Earth {
   opened: number = 0

   dex: number = 0;
   //idx:string;
   //earthBitList: EarthBit[] = [];
   //earthBits: any = {};
   idxClk: string
   idxInc: string

   access: number = 0

   maxLong: number = 1000;

   lastUpdateTimeShort: number = 0;
   deltaHoldShort: number = 0;
   maxShort: number = 100;

   shortValue: number = 0;

   tinyCount:number = 0;
   tinyMax:number = 20;

   maxTiny: number = 50;

   lastUpdateTimeLong: number = 0;
   deltaHoldLong: number = 0;
   

   delayUntil: number = 0;
}
