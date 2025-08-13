import Model from "./99.core/interface/model.interface";

import SowerUnit from "./00.sower.unit/sower.unit";
import SparkUnit from "./03.spark.unit/spark.unit";
import AmbitUnit from "./04.ambit.unit/ambit.unit";
import AvaouUnit from "./05.avaou.unit/avaou.unit";
import AvideUnit from "./06.avide.unit/avide.unit";
import ArtesUnit from "./07.artes.unit/artes.unit";
import SupernalUnit from "./10.supernal.unit/supernal.unit";
import BlessedUnit from "./20.blessed.unit/blessed.unit";
import PastoralUnit from "./30.pastoral.unit/pastoral.unit";
import BoundedUnit from "./40.bounded.unit/bounded.unit";
import PrimalUnit from "./50.primal.unit/primal.unit";
import PlayerUnit from "./90.player.unit/player.unit";
import CollectUnit from "./97.collect.unit/collect.unit";
import BusUnit from "./99.bus.unit/bus.unit";


import Sower from "./00.sower.unit/fce/sower.interface";
import { SowerModel } from "./00.sower.unit/sower.model";
import Spark from "./03.spark.unit/fce/spark.interface";
import { SparkModel } from "./03.spark.unit/spark.model";
import Ambit from "./04.ambit.unit/fce/ambit.interface";
import { AmbitModel } from "./04.ambit.unit/ambit.model";
import Avaou from "./05.avaou.unit/fce/avaou.interface";
import { AvaouModel } from "./05.avaou.unit/avaou.model";
import Avide from "./06.avide.unit/fce/avide.interface";
import { AvideModel } from "./06.avide.unit/avide.model";
import Artes from "./07.artes.unit/fce/artes.interface";
import { ArtesModel } from "./07.artes.unit/artes.model";
import Supernal from "./10.supernal.unit/fce/supernal.interface";
import { SupernalModel } from "./10.supernal.unit/supernal.model";
import Blessed from "./20.blessed.unit/fce/blessed.interface";
import { BlessedModel } from "./20.blessed.unit/blessed.model";
import Pastoral from "./30.pastoral.unit/fce/pastoral.interface";
import { PastoralModel } from "./30.pastoral.unit/pastoral.model";
import Bounded from "./40.bounded.unit/fce/bounded.interface";
import { BoundedModel } from "./40.bounded.unit/bounded.model";
import Primal from "./50.primal.unit/fce/primal.interface";
import { PrimalModel } from "./50.primal.unit/primal.model";
import Player from "./90.player.unit/fce/player.interface";
import { PlayerModel } from "./90.player.unit/player.model";
import Collect from "./97.collect.unit/fce/collect.interface";
import { CollectModel } from "./97.collect.unit/collect.model";
import Bus from "./99.bus.unit/fce/bus.interface";
import { BusModel } from "./99.bus.unit/bus.model";


export const list: Array<any> = [SowerUnit,SparkUnit,AmbitUnit,AvaouUnit,AvideUnit,ArtesUnit,SupernalUnit,BlessedUnit,PastoralUnit,BoundedUnit,PrimalUnit,PlayerUnit,CollectUnit,BusUnit];

import * as reduceFromSower from "./00.sower.unit/sower.reduce";
import * as reduceFromSpark from "./03.spark.unit/spark.reduce";
import * as reduceFromAmbit from "./04.ambit.unit/ambit.reduce";
import * as reduceFromAvaou from "./05.avaou.unit/avaou.reduce";
import * as reduceFromAvide from "./06.avide.unit/avide.reduce";
import * as reduceFromArtes from "./07.artes.unit/artes.reduce";
import * as reduceFromSupernal from "./10.supernal.unit/supernal.reduce";
import * as reduceFromBlessed from "./20.blessed.unit/blessed.reduce";
import * as reduceFromPastoral from "./30.pastoral.unit/pastoral.reduce";
import * as reduceFromBounded from "./40.bounded.unit/bounded.reduce";
import * as reduceFromPrimal from "./50.primal.unit/primal.reduce";
import * as reduceFromPlayer from "./90.player.unit/player.reduce";
import * as reduceFromCollect from "./97.collect.unit/collect.reduce";
import * as reduceFromBus from "./99.bus.unit/bus.reduce";


export const reducer: any = {
 sower : reduceFromSower.reducer, 
spark : reduceFromSpark.reducer, 
ambit : reduceFromAmbit.reducer, 
avaou : reduceFromAvaou.reducer, 
avide : reduceFromAvide.reducer, 
artes : reduceFromArtes.reducer, 
supernal : reduceFromSupernal.reducer, 
blessed : reduceFromBlessed.reducer, 
pastoral : reduceFromPastoral.reducer, 
bounded : reduceFromBounded.reducer, 
primal : reduceFromPrimal.reducer, 
player : reduceFromPlayer.reducer, 
collect : reduceFromCollect.reducer, 
bus : reduceFromBus.reducer, 

};

export default class UnitData implements Model {
 
 sower : Sower = new SowerModel();
spark : Spark = new SparkModel();
ambit : Ambit = new AmbitModel();
avaou : Avaou = new AvaouModel();
avide : Avide = new AvideModel();
artes : Artes = new ArtesModel();
supernal : Supernal = new SupernalModel();
blessed : Blessed = new BlessedModel();
pastoral : Pastoral = new PastoralModel();
bounded : Bounded = new BoundedModel();
primal : Primal = new PrimalModel();
player : Player = new PlayerModel();
collect : Collect = new CollectModel();
bus : Bus = new BusModel();

 
}
