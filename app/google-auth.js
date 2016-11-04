const GoogleAuth = require("google-auth-library");
const agent = require('superagent');

class GoogleAuthentication {
  constructor(creds, scope) {
    this.authClient = new GoogleAuth();
    this.jwtClient = new this.authClient.JWT(creds.client_email, null, creds.private_key, scope, null);
    this.googleAuthorization = null;
    this.useJwtAuth()
  }

  useJwtAuth() {
    const jwtPromise = new Promise((resolve, reject) => {
      if (!this.googleAuthorization || !!this.googleAuthorization && this.googleAuthorization.expires < +new Date()) {
        this.jwtClient.authorize((error, response) => {
          if (error) {
            reject(console.error(error));
          } else {
            resolve(this.googleAuthorization = {
              type: response.token_type,
              token: response.access_token,
              expires: response.expiry_date
            });
          }
        });
      } else {
        resolve(this.googleAuthorization);
      }
    });

    return jwtPromise;
  }

  httpRequest(endpoint, method, data = null, query = {}) {
    let headers = {};
    headers["Authorization"] = `Bearer ${this.googleAuthorization.token}`;

    if ( method === 'POST' || method === 'PUT' ) {
      headers['Content-Type'] = 'application/json';
    }

    return this.useJwtAuth().then(() => {
      return agent(method, endpoint)
        .set(headers)
        .query(query)
        .send(method === 'POST' || method === 'PUT' ? data : null)
        .then((response) => {
          if (!response.ok) {
            throw Error(`${response.status}: ${response.statusText}`);
          }

          return response.body
        }).catch((error) => { throw Error(`Error with fetch: ${error}`); });
    })
  }
}

module.exports = GoogleAuthentication;