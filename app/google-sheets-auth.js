const GoogleSpreadsheet = require('google-spreadsheet');
const config = require('./config');


class SpreadsheetHandler {
  constructor() {
    this.setup(new GoogleSpreadsheet(config.sheetID));
    this.sheet = null;
  }

  setup(doc) {
    doc.useServiceAccountAuth(config.googleAuth, (err, res) => {
      if (err) {
        console.error(err)
      }

      doc.getInfo((err, res) => {
        console.log('got a res', res);
        this.sheet = res.worksheets[0];
      });
    });
  }
}

const sheet = new SpreadsheetHandler();

module.export = sheet;
