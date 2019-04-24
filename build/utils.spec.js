"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai = require("chai");
var expect = chai.expect;
var u = require("./utils");
var c = require("./classes");
{
    var data = [new c.Process(1, 1),
        new c.Process(2, 0),
        new c.Process(3, 4)
    ];
    expect(u.fifo(data)).to.equal(1);
}
{
    var data = [new c.Process(1, 1),
    ];
    expect(u.fifo(data)).to.equal(0);
}
{
    var data = [new c.Process(1, 1),
        new c.Process(2, 0),
        new c.Process(3, 4)
    ];
    expect(u.searchProcess(data, 2)).to.equal(1);
    expect(u.searchProcess(data, 4)).to.equal(-1);
    expect(u.searchProcess(data, 1)).to.equal(0);
}
