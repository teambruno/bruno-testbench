
const express = require('express');
const bodyParser = require('body-parser');
const xmlparser = require('express-xml-bodyparser');
const cors = require('cors');
const config = require('config');
const multer = require('multer');

const app = new express();
const port = config.port;
const upload = multer();

app.use(cors());
app.use(xmlparser());
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const authBearer = require('./auth/bearer');
const authBasic = require('./auth/basic');
const authCookie = require('./auth/cookie');
const { set } = require('lodash');

app.use('/api', authBearer);
app.use('/api', authBasic);
app.use('/api', authCookie);

app.get("/ping", function(req, res) {
  return res.send("pong");
});

app.get("/headers", function(req, res) {
  return res.json(req.headers);
});

app.get("/query", function(req, res) {
  return res.json(req.query);
});

app.get("/echo/json", function(req, res) {
  return res.json({ping: "pong"});
});

app.post("/echo/json", function(req, res) {
  return res.json(req.body);
});

app.post("/echo/text", function(req, res) {
  // set res headers as text/plain
  res.setHeader("Content-Type", "text/plain");

  return res.send('{ "ping": "pong" }');
});

app.post("/echo/edn", function(req, res) {
  // set res headers as text/plain
  res.setHeader("Content-Type", "application/edn");

  return res.send('{ "ping": "pong" }');
});

app.post("/echo/html", function(req, res) {
  // set res headers as text/plain
  res.setHeader("Content-Type", "text/html");

  return res.send('<html><body><h1>Hello, World!</h1></body></html>');
});

app.post("/echo/xml-parsed", function(req, res) {
  return res.send(req.body);
});

app.post("/echo/xml-raw", function(req, res) {
  // set res headers as text/plain
  res.setHeader("Content-Type", "application/xml");

  return res.send(req.rawBody);
});

app.post("/echo/multipartForm", upload.none(), function(req, res) {
  return res.json(req.body);
});

app.get("/redirect-to-ping", function(req, res) {
  return res.redirect("/ping");
});

app.listen(port, function() {
  console.log(`Testbench started on port: ${port}`);
});