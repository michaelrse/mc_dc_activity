const axios = require('axios');
const fs = require('fs');
const dotenv = require('dotenv');
const jsforce = require('jsforce');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const querystring = require('querystring');
const url = require('url');

dotenv.config({ path: './config.env' });



const getSalesforceToken = async (req, res) => {
  try {
    const privatekey = fs.readFileSync('config/private.pem');
    const jwtparams = {
      iss: process.env.CLIENT_ID,
      prn: process.env.USERNAME,
      aud: process.env.REDIRECT_URI,
      exp: parseInt(moment().add(2, 'minutes').format('X')),
    };

    const token = jwt.sign(jwtparams, privatekey, { algorithm: 'RS256' });

    const params = {
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: token,
    };

    const token_url = new url.URL('/services/oauth2/token', process.env.REDIRECT_URI).toString();

    const resToken = await axios.post(token_url, querystring.stringify(params));
    const conn = new jsforce.Connection({
      instanceUrl: resToken.data.instance_url,
      accessToken: resToken.data.access_token,
    });

    const tokn = conn.accessToken;
;

    console.log(conn.accessToken);
    
    await getOffcoreToken(tokn);

    console.log('Salesforce token retrieved successfully');

  } catch (error) {
    console.error('Error getting Core Access Token:', error);
    res.status(500).send('Error getting Core Access Token');
  }
};

const getOffcoreToken = async (token) => {
  try {
    const mySfEndpoint = process.env.MY_SF_URL;

    const reqBody = {
      grant_type: 'urn:salesforce:grant-type:external:cdp',
      subject_token: token,
      subject_token_type: 'urn:ietf:params:oauth:token-type:access_token',
    };

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const response = await axios.post(`${mySfEndpoint}/services/a360/token`, new URLSearchParams(reqBody), { headers });

    const body = response.data.access_token;
    process.env.OFFCORE_TOKEN = body;



    console.log('Offcore token received successfully');
    return body
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};

module.exports = getSalesforceToken;
