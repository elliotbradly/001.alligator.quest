import { Action } from "../99.core/interface/action.interface";
import  SparkBit  from "./fce/spark.bit";

// Spark actions

export const INIT_SPARK = "[Spark action] Init Spark";
export class InitSpark implements Action {
 readonly type = INIT_SPARK;
 constructor(public bale: SparkBit) {}
}

export const UPDATE_SPARK = "[Spark action] Update Spark";
export class UpdateSpark implements Action {
 readonly type = UPDATE_SPARK;
 constructor(public bale: SparkBit) {}
}

export const READ_SPARK = "[Read action] Read Spark";
 export class ReadSpark implements Action {
 readonly type = READ_SPARK;
 constructor(public bale: SparkBit) {}
 }
 
export const WRITE_SPARK = "[Write action] Write Spark";
 export class WriteSpark implements Action {
 readonly type = WRITE_SPARK;
 constructor(public bale: SparkBit) {}
 }
 
export const REMOVE_SPARK = "[Remove action] Remove Spark";
 export class RemoveSpark implements Action {
 readonly type = REMOVE_SPARK;
 constructor(public bale: SparkBit) {}
 }
 
export const DELETE_SPARK = "[Delete action] Delete Spark";
 export class DeleteSpark implements Action {
 readonly type = DELETE_SPARK;
 constructor(public bale: SparkBit) {}
 }
 
export const CREATE_SPARK = "[Create action] Create Spark";
 export class CreateSpark implements Action {
 readonly type = CREATE_SPARK;
 constructor(public bale: SparkBit) {}
 }
 
export type Actions = | InitSpark | UpdateSpark 
| ReadSpark
| WriteSpark
| RemoveSpark
| DeleteSpark
| CreateSpark