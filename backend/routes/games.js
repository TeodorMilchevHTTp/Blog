const express = require('express');
const axios = require('axios');
const https = require('https');

const axiosInstance = axios.create({
  httpsAgent: new https.Agent({  
    family: 4  // Force IPv4
  })
});

const router = express.Router();

module.exports = router;
