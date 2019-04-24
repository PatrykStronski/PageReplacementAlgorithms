import chai = require('chai');
const expect = chai.expect;
import u = require('./utils');
import c = require('./classes');

{
	const data: c.Process[] = [new c.Process(1,1),
		new c.Process(2,0),
		new c.Process(3,4)
	]
	expect(u.fifo(data)).to.equal(1);
}
{
	const data: c.Process[] = [new c.Process(1,1),
	]
	expect(u.fifo(data)).to.equal(0);
}
{
	const data: c.Process[] = [new c.Process(1,1),
		new c.Process(2,0),
		new c.Process(3,4)
	]
	expect(u.searchProcess(data,2)).to.equal(1);
	expect(u.searchProcess(data,4)).to.equal(-1);
	expect(u.searchProcess(data,1)).to.equal(0);
}
