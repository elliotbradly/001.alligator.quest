import Clock from "./fce/clock.interface";
import ClockBit from "./fce/clock.interface";

export class ClockModel implements Clock {

    tick:boolean = true;
    slot: Number = 0;
    slotTime:Number = 0;
    score:any;
    //idx:string;
    //clockBitList: ClockBit[] = [];
    //clockBits: any = {};
}
