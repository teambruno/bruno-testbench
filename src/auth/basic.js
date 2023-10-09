const express = require('express');
const router = express.Router();
const basicAuth = require('express-basic-auth');

const users = {
  'bruno': 'della', // Della is Bruno's girlfriend
};

const basicAuthMiddleware = basicAuth({
  users,
  challenge: true, // Sends a 401 Unauthorized response when authentication fails
  unauthorizedResponse: 'Unauthorized',
});

router.get('/auth/basic/protected', basicAuthMiddleware, (req, res) => {
  res.status(200).json({ message: 'Authentication successful' });
});

module.exports = router;
