const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  // Define the target server you want to proxy to
  const target = 'http://localhost:6000';

  console.log(`Proxying request for: ${req.url}`);

  // Proxy the incoming request to the target server
  proxy.web(req, res, { target });

  // Handle errors
  proxy.on('error', (err) => {
    console.error('Proxy Error:', err);
    res.statusCode = 500;
    res.end('Proxy Error');
  });
});

// Listen on a specific port
const port = 4000;
server.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
