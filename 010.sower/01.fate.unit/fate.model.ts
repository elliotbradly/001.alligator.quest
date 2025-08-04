import Fate from "./fce/fate.interface";
import FateBit from "./fce/fate.interface";

export class FateModel implements Fate {
 //idx:string;
 //fateBitList: FateBit[] = [];
 //fateBits: any = {};
 fate:any;
 seed:number = 19250925;

 amplitude:number = 10;  // Wave height
 frequency:number = 0.1; // How many cycles
 phaseShift:number = 0;  // Horizontal offset
 position:number = 0;
 sine:number = 0;

}
