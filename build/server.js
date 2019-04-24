"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var main = require("./main");
var cors = require("cors");
var app = express();
app.use(cors());
app.post('/getData', function (req, res) {
    console.log("getdata queried");
    console.log(req.body);
    res.send(main.runProcess(req.body.progs, req.body.ram, req.body.coefficient, req.body.tasks));
});
app.listen(8080);
