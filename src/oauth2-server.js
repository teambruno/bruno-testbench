const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const clients = [
  {
    client_id: 'client_id_1',
    client_secret: 'client_secret_1',
    redirect_uri: 'http://localhost:3000/callback',
  },
];

const tokens = [];

function generateCode() {
  return crypto.randomBytes(16).toString('hex');
}

app.get('/authorize', (req, res) => {
  const { client_id, redirect_uri, response_type } = req.query;
  const client = clients.find((c) => c.client_id === client_id);

  if (!client) {
    return res.status(401).json({ error: 'Invalid client' });
  }

  const authorizationCode = generateCode();
  tokens.push({
    code: authorizationCode,
    client_id,
    redirect_uri,
  });

  const redirectUrl = `${redirect_uri}?code=${authorizationCode}`;
  res.redirect(redirectUrl);
});

// Handle the authorization callback
app.get('/callback', (req, res) => {
  const { code } = req.query;

  // Check if the code is valid.
  const token = tokens.find((t) => t.code === code);

  if (!token) {
    return res.status(401).json({ error: 'Invalid authorization code' });
  }

  return  res.json({ message: 'Authorization successful', code });
});

app.post('/token', (req, res) => {
  const { grant_type, client_id, client_secret, code } = req.body;
  const client = clients.find((c) => c.client_id === client_id);

  if (!client || client_secret !== client.client_secret) {
    return res.status(401).json({ error: 'Invalid client credentials' });
  }

  const token = tokens.find((t) => t.code === code);

  if (!token) {
    return res.status(401).json({ error: 'Invalid authorization code' });
  }

  const access_token = generateCode();
  res.json({ access_token });
});

const port = 3000;
app.listen(port, () => {
  console.log(`OAuth2 server is running on port ${port}`);
});
