import express = require("express");
import cl = require("./classes");
import u = require("./utils");
type Process = cl.Process;
// opt: 1-fifo 2-opt 3-lru 4-rand 5-alru
const alias: cl.AlgAlias = {1:"fifo",2:"opt",3:"lru",4:"rand",5:"alru"};
export function runProcess(numberOfProg: number, ramSize: number, coefficient: number, sizeOfPredefinedTasks:number){
	var order: number;
	var faults: number = 0;
	var fulFaults: cl.FaultList = {};
	var proc: Process[] = [];
	for(let x:number = 0; x<numberOfProg; x++){
		proc.push(new cl.Process(x,x));
	}
	var ram: Process[] = [];
	var disk: Process[] = [];
	for(let opt = 1; opt<=4; opt++){
		order = 0;
		faults = 0;
		fulFaults[opt] = 0;
		for(let x:number = 0; x<numberOfProg; x++){
			let newProc: Process = proc[x] || new cl.Process(0,0);
			newProc.order = order;
			let predefinedTaskNmb: number = u.getRandomNumber(sizeOfPredefinedTasks)+1;
			let taskList: number[] = [];
			for(let z:number = 0; z<predefinedTaskNmb; z++){
				taskList.push(u.randomizeUsage(x,coefficient));
			}
			if(ram.length<ramSize){
				ram.push(newProc);
			} else {
				//remove program from ram according to algorithm and instert newProc there.	
				let ind:number;
				switch(opt){
					case 2:
						ind = u.opt(taskList,ram);
					break;
					case 3:
						ind = u.lru(ram);
					break;
					case 4:
						ind = u.rand(ram);
					break
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
			while(taskList.length>0){
				let id:number = taskList.pop() || -1;
				if(id>-1){
					let i:number = u.searchProcess(ram,id);
					if(i>-1){
						ram[i].used++;
					} else {
						//choose algotrithm
						let ind: number; // index of first out
						switch(opt){
							case 2:
								ind = u.opt(taskList,ram);
							break;
							case 3:
								ind = u.lru(ram);
							break;
							case 4:
								ind = u.rand(ram);
							break
							case 5:
								ind = u.alru(ram);
							break;
							default: 
								ind = u.fifo(ram);
							break;
						}
						let indDisk: number = u.searchProcess(disk,id); // index of wanna to use program
						let p: Process = ram[ind];
						ram[ind] = disk[indDisk];
						ram[ind].order = order;
						order++;
						ram[ind].used++;
						ram[ind].needed=true;
						disk.splice(indDisk,1);
						disk.push(p);
						faults++;
					}
				}
			}
		}
		fulFaults[opt]=faults;
	}
	return fulFaults;
}

	/*console.log(runProcess(100,10,0.6,5));
console.log(alias);*/
