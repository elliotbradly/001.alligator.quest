"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplaceUnit = exports.REPLACE_UNIT = exports.ListUnit = exports.LIST_UNIT = exports.StackUnit = exports.STACK_UNIT = exports.CodeUnit = exports.CODE_UNIT = exports.UpdateUnit = exports.UPDATE_UNIT = exports.CreateUnit = exports.CREATE_UNIT = exports.InitUnit = exports.INIT_UNIT = void 0;
// Unit actions
exports.INIT_UNIT = "[Unit action] Init Unit";
class InitUnit {
    constructor(bale) {
        this.bale = bale;
        this.type = exports.INIT_UNIT;
    }
}
exports.InitUnit = InitUnit;
exports.CREATE_UNIT = "[Unit action] Create Unit";
class CreateUnit {
    constructor(bale) {
        this.bale = bale;
        this.type = exports.CREATE_UNIT;
    }
}
exports.CreateUnit = CreateUnit;
exports.UPDATE_UNIT = "[Unit action] Update Unit";
class UpdateUnit {
    constructor(bale) {
        this.bale = bale;
        this.type = exports.UPDATE_UNIT;
    }
}
exports.UpdateUnit = UpdateUnit;
exports.CODE_UNIT = "[Code action] Code Unit";
class CodeUnit {
    constructor(bale) {
        this.bale = bale;
        this.type = exports.CODE_UNIT;
    }
}
exports.CodeUnit = CodeUnit;

exports.LIST_UNIT = "[Code action] List Unit";
class ListUnit {
    constructor(bale) {
        this.bale = bale;
        this.type = exports.LIST_UNIT;
    }
}
exports.ListUnit = ListUnit;

exports.SUBLIST_UNIT = "[Code action] Sublist Unit";
class SublistUnit {
    constructor(bale) {
        this.bale = bale;
        this.type = exports.SUBLIST_UNIT;
    }
}
exports.SublistUnit = SublistUnit;

exports.STACK_UNIT = "[Code action] Stack Unit";
class StackUnit {
    constructor(bale) {
        this.bale = bale;
        this.type = exports.STACK_UNIT;
    }
}
exports.StackUnit = StackUnit;


exports.REPLACE_UNIT = "[Replace action] Replace Unit";
class ReplaceUnit {
    constructor(bale) {
        this.bale = bale;
        this.type = exports.REPLACE_UNIT;
    }
}
exports.ReplaceUnit = ReplaceUnit;


exports.FILTER_UNIT = "[Replace action] Filter Unit";
class FilterUnit {
    constructor(bale) {
        this.bale = bale;
        this.type = exports.FILTER_UNIT;
    }
}
exports.FilterUnit = FilterUnit;
//# sourceMappingURL=unit.action.js.map