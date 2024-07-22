const fs = require("fs");
const https = require("https");
const express = require("express");

const app = express();

const options = {
  key: fs.readFileSync("./server_certs/server.key"),
  cert: fs.readFileSync("./server_certs/server.crt"),
  ca: fs.readFileSync("./client_certs/ca.crt"),
  requestCert: true,
  rejectUnauthorized: true,
};

app.use((req, res, next) => {
  console.log("Received request:", req.method, req.url);
  if (!req.client.authorized) {
    console.error(
      "Client certificate not authorized:",
      req.client.authorizationError
    );
    return res.status(401).send("Client certificate authentication failed.");
  }
  next();
});

app.get("/", (req, res) => {
  res.send("Hello, secure world!");
});

const httpsServer = https.createServer(options, app);

httpsServer.listen(8443, () => {
  console.log("HTTPS Server running on port 8443");
});
