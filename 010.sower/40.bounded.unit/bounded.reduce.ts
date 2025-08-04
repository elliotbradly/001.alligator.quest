import * as clone from "clone-deep";
import * as Act from "./bounded.action";
import { BoundedModel } from "./bounded.model";
import * as Buzz from "./bounded.buzzer";
import State from "../99.core/state";

export function reducer(model: BoundedModel = new BoundedModel(), act: Act.Actions, state?: State) {
    switch (act.type) {

        case Act.UPDATE_BOUNDED:
            return Buzz.updateBounded(clone(model), act.bale, state);

        case Act.INIT_BOUNDED:
            return Buzz.initBounded(clone(model), act.bale, state);

        case Act.READ_BOUNDED:
            return Buzz.readBounded(clone(model), act.bale, state);

        case Act.WRITE_BOUNDED:
            return Buzz.writeBounded(clone(model), act.bale, state);

        case Act.REMOVE_BOUNDED:
            return Buzz.removeBounded(clone(model), act.bale, state);

        case Act.DELETE_BOUNDED:
            return Buzz.deleteBounded(clone(model), act.bale, state);

        case Act.CREATE_BOUNDED:
            return Buzz.createBounded(clone(model), act.bale, state);

        default:
            return model;
    }
}
