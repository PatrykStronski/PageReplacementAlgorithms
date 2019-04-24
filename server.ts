import express = require("express");
import main = require("./main");
import cors = require("cors");

const app: express.Application = express();

app.use(cors());

app.post('/getData',(req,res) => {
	console.log("getdata queried");
	console.log(req.body);
	res.send(main.runProcess(req.body.progs, req.body.ram, req.body.coefficient, req.body.tasks));
});

app.listen(8080);

