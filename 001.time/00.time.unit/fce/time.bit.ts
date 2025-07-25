import ClockBit from "./clock.bit";

export default interface TimeBit {
  idx: string;
  val?: number;
  src?:string;
  slv?:Function;
  prt?:any;
  dat?:any;
  bit?:any;
  clk?:ClockBit
}
