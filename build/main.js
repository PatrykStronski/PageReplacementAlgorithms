"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cl = require("./classes");
var u = require("./utils");
// opt: 1-fifo 2-opt 3-lru 4-rand 5-alru
var alias = { 1: "fifo", 2: "opt", 3: "lru", 4: "rand", 5: "alru" };
function runProcess(numberOfProg, ramSize, coefficient, sizeOfPredefinedTasks) {
    var order;
    var faults = 0;
    var fulFaults = {};
    var proc = [];
    for (var x = 0; x < numberOfProg; x++) {
        proc.push(new cl.Process(x, x));
    }
    var ram = [];
    var disk = [];
    for (var opt = 1; opt <= 4; opt++) {
        order = 0;
        faults = 0;
        fulFaults[opt] = 0;
        for (var x = 0; x < numberOfProg; x++) {
            var newProc = proc[x] || new cl.Process(0, 0);
            newProc.order = order;
            var predefinedTaskNmb = u.getRandomNumber(sizeOfPredefinedTasks) + 1;
            var taskList = [];
            for (var z = 0; z < predefinedTaskNmb; z++) {
                taskList.push(u.randomizeUsage(x, coefficient));
            }
            if (ram.length < ramSize) {
                ram.push(newProc);
            }
            else {
                //remove program from ram according to algorithm and instert newProc there.	
                var ind = void 0;
                switch (opt) {
                    case 2:
                        ind = u.opt(taskList, ram);
                        break;
                    case 3:
                        ind = u.lru(ram);
                        break;
                    case 4:
                        ind = u.rand(ram);
                        break;
                    case 5:
                        ind = u.alru(ram);
                        break;
                    default:
                        ind = u.fifo(ram);
                        break;
                }
                disk.push(ram[ind]);
                ram[ind] = newProc;
                faults++;
            }
            order++;
            while (taskList.length > 0) {
                var id = taskList.pop() || -1;
                if (id > -1) {
                    var i = u.searchProcess(ram, id);
                    if (i > -1) {
                        ram[i].used++;
                    }
                    else {
                        //choose algotrithm
                        var ind = void 0; // index of first out
                        switch (opt) {
                            case 2:
                                ind = u.opt(taskList, ram);
                                break;
                            case 3:
                                ind = u.lru(ram);
                                break;
                            case 4:
                                ind = u.rand(ram);
                                break;
                            case 5:
                                ind = u.alru(ram);
                                break;
                            default:
                                ind = u.fifo(ram);
                                break;
                        }
                        var indDisk = u.searchProcess(disk, id); // index of wanna to use program
                        var p = ram[ind];
                        ram[ind] = disk[indDisk];
                        ram[ind].order = order;
                        order++;
                        ram[ind].used++;
                        ram[ind].needed = true;
                        disk.splice(indDisk, 1);
                        disk.push(p);
                        faults++;
                    }
                }
            }
        }
        fulFaults[opt] = faults;
    }
    return fulFaults;
}
exports.runProcess = runProcess;
/*console.log(runProcess(100,10,0.6,5));
console.log(alias);*/
