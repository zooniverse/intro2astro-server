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

  getSheetValues(sheetID, range, query = {}) {
    const endpointForValues = this.endpoint + sheetID + '/values/' + range;

    const getValuesPromise = this.authenticator.httpRequest(endpointForValues, 'GET', null, query)
      .then((response) => {
        return response;
      }).catch((error) => { throw Error(error) });

    return getValuesPromise;
  }

  appendRow(sheetID, values, range = null, query = { insertDataOption: 'INSERT_ROWS', valueInputOption: 'RAW' }) {
    let endpointForAppend = this.endpoint + sheetID + '/values/' + range + ':append';
    let writePromise;

    if (!!range) {
      writePromise = getSheet(sheetID)
        .then((data) => {
          endpointForAppend = this.endpoint + sheetID + "/values/'Student%20Responses'!A1:H" + data.sheets[0].gridProperties.rowCount + ':append';
        }).then(() => {
          this.authenticator.httpRequest(endpointForAppend, 'POST', values, query)
            .then((response) => {
              return response;
            }).catch((error) => { throw Error(error) });
        })
    } else {
      writePromise = this.authenticator.httpRequest(endpointForAppend, 'POST', values, query)
        .then((response) => {
          return response;
        }).catch((error) => { throw Error(error) });
    }

    return writePromise;
  }
}

module.exports = SpreadsheetHandler;
