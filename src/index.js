let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let config = require('config');

const app = new express();
const port = config.port;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/ping", function(req, res) {
  return res.send("pong");
});

app.get("/json/echo", function(req, res) {
  return res.json({ping: "pong"});
});


app.post("/json/echo", function(req, res) {
  return res.json(req.body);
});

app.listen(port, function() {
  console.log(`Testbench started on port: ${port}`);
});