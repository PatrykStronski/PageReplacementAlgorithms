import P = require('./classes');
type Process = P.Process;

export function getRandomNumber(max:number):number{
	return Math.floor(Math.random()*max)+1;
}

export function fifo(ram: Process[]): number{
	let min: number = ram[0].order;
	let mind: number = 0;
	let x:number = 1;
	for(; x<ram.length; x++){
		if(ram[x].order<min){
			min=ram[x].order;
			mind=x;
		}
	}
	return mind;
}

export function opt(shortTaskList: number[],ram: Process[]): number{
	let ind: number;
	for(let x:number = shortTaskList.length-1; x>=0 ;x--){
		ind = searchProcess(ram,shortTaskList[shortTaskList.length-1]);
		if(ind>-1){
			return ind
		}
	}
	return fifo(ram);
}

export function lru(ram: Process[]): number{
	let min: number = ram[0].used;
	let mind: number = 0;
	let x:number = 1;
	for(; x<ram.length; x++){
		if(ram[x].used<min){
			min=ram[x].used;
			mind=x;
		}
	}
	return mind;
}

export function alru(ram: Process[]): number{
	for(let x in ram){
		if(ram[x].needed ===false){
			return parseInt(x);
		}
	}
	for(let x in ram){
		ram[x].needed=false;
	}
	return 0;
}

export function rand(ram: Process[]): number{
	return getRandomNumber(ram.length-1);
}

export function randomizeUsage(max:number, coef:number):number{
	let chance:number =  getRandomNumber(100);
	if(chance>coef*100){
		return getRandomNumber(max);
	} else {
		return -1;
	}
}

export function searchProcess(ar: Process[],id: number): number{
	let x: number = 0;
	if(ar.length===1) return 0;
	for(;x<ar.length;x++){
		if(ar[x].id===id){
			return x;
		}
	}
	return -1;
}
