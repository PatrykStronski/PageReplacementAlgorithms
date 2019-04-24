"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Process = /** @class */ (function () {
    function Process(id, order) {
        this.needed = false;
        this.id = id;
        this.order = order;
        this.used = 0;
    }
    return Process;
}());
exports.Process = Process;
;
