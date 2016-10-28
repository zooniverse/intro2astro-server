const GoogleAuth = require("google-auth-library");
const fetch = require('node-fetch');
const config = require('./config');

class GoogleAuthentication {
  constructor(creds, scope) {
    this.authClient = new GoogleAuth();
    this.jwtClient = new this.authClient.JWT(creds.client_email, null, creds.private_key, scope, creds.subject);
    this.googleAuthorization = null;
  }

  useJwtAuth() {
    const jwtPromise = new Promise((resolve, reject) => {
      this.jwtClient.authorize((error, response) => {
        if (error) {
          reject(console.error(error));
        } else {
          resolve(this.googleAuthorization = {
            type: response.token_type,
            value: response.access_token,
            expires: response.expiry_date
          });
        }
      });
    });

    return jwtPromise;
  }

  httpRequest(endpoint, method, data) {
    let headers = {};
    headers["Authorization"] = `Bearer ${this.googleAuthorization.value}`;

    if ( method === 'POST' || method === 'PUT' ) {
      headers['Content-Type'] = 'application/json';
    }

    return fetch(endpoint, {
        method: method,
        headers: headers,
        body: method === 'POST' || method === 'PUT' ? data : null
      }).then((response) => {
        if (response.ok) {
          return (response);
        } else {
          return `Something went wrong: ${response.status}: ${response.statusText}`;
        }
      }).catch((error) => { console.error(`Something went wrong with the fetch: ${error}`); });
  }

  makeRequest(endpoint, method, data) {
    if (!!this.googleAuthorization && this.googleAuthorization.expires > +new Date()) {
      this.useJwtAuth().then(() => {
        this.httpRequest(endpoint, method, data);
      });
    } else {
      this.httpRequest(endpoint, method, data);
    }
  }
}

module.exports = GoogleAuthentication;