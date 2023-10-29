const https = require('https');
const fs = require('fs');
const path = require('path');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const options = {
  key: fs.readFileSync(path.resolve(__dirname, '../certs/server.key')),
  cert: fs.readFileSync(path.resolve(__dirname, '../certs/server.crt')),
  rejectUnauthorized: false
};

const server = https.createServer(options, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, secure World!\n');
});

const port = 4443;

server.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});