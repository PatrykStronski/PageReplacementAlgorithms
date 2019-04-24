export class Process{
	public id: number;
	public order: number;
	public used: number;
	public needed: boolean;
	constructor(id:number,order: number){
		this.needed = false;
		this.id = id;
		this.order = order; 
		this.used = 0;
	}
};

export interface FaultList{
	[key: number]:number;
}
export interface AlgAlias{
	1: string;
	2: string;
	3: string;
	4: string;
	5: string;
 }
