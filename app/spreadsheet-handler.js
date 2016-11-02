const GoogleAuthentication = require('./google-auth');
const config = require('./config');

class SpreadsheetHandler {
  constructor() {
    this.scope = ['https://www.googleapis.com/auth/spreadsheets'];
    this.endpoint = 'https://sheets.googleapis.com/v4/spreadsheets/';
    this.authenticator = new GoogleAuthentication(config.googleAuth, this.scope)
  }

  getSheet(sheetID, query = {}) {
    const endpointWithID = this.endpoint + sheetID;
    
    const getSheetPromise = this.authenticator.httpRequest(endpointWithID, 'GET', null, query)
      .then((response) => {
        return response;
      }).catch((error) => { throw Error(error) });

    return getSheetPromise;
  }
}

module.exports = SpreadsheetHandler;
