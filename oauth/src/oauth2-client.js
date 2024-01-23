const axios = require('axios');

// OAuth2 server details
const oauthServerUrl = 'http://localhost:3000'; // Update with the actual URL of your OAuth2 server.
const clientId = 'client_id_1'; // Your client ID.
const clientSecret = 'client_secret_1'; // Your client secret.
const redirectUri = 'http://localhost:3000/callback'; // Your redirect URI.

// Step 1: Make an authorization request to obtain an authorization code.
async function getAuthorizationCode() {
  const authorizationEndpoint = `${oauthServerUrl}/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`;
  console.log('Authorization Endpoint:', authorizationEndpoint);
  
  try {
    const response = await axios.get(authorizationEndpoint);
    const authorizationCode = response.data.code;
    return authorizationCode;
  } catch (error) {
    console.error('Authorization request failed', error.message);
    throw error;
  }
}

// Step 2: Exchange the authorization code for an access token.
async function exchangeAuthorizationCodeForToken(authorizationCode) {
  const tokenEndpoint = `${oauthServerUrl}/token`;
  
  const data = {
    grant_type: 'authorization_code',
    client_id: clientId,
    client_secret: clientSecret,
    code: authorizationCode,
  };
  
  try {
    const response = await axios.post(tokenEndpoint, data);
    const accessToken = response.data.access_token;
    return accessToken;
  } catch (error) {
    console.error('Token exchange failed', error);
    throw error;
  }
}

// Example usage:
(async () => {
  try {
    const authorizationCode = await getAuthorizationCode();
    console.log('Authorization Code:', authorizationCode);

    const accessToken = await exchangeAuthorizationCodeForToken(authorizationCode);
    console.log('Access Token:', accessToken);
  } catch (error) {
    console.error('OAuth2 flow failed', error.message);
  }
})();
