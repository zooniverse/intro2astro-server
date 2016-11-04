const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;

const SpreadsheetHandler = require('../app/spreadsheet-handler');
const GoogleAuthentication = require('../app/google-auth');
const config = require('../app/config');


describe('SpreadsheetHandler', function() {
  const spreadsheetHandler = new SpreadsheetHandler();

  describe('instantiation', function() {
    it('should instantiate', function(done) {
      expect(spreadsheetHandler).to.be.an.instanceof(SpreadsheetHandler);
      done();
    });

    it('should have instantiated an auth client as a property', function(done) {
      expect(spreadsheetHandler.authenticator).to.be.an.instanceof(GoogleAuthentication);
      done();
    })
  });

  describe('#getSheet', function() {
    it('should return a spreadsheet', function() {
      return spreadsheetHandler.getSheet(config.sheetID)
        .then((response) => {
          expect(response)
            .to.have.property('spreadsheetId')
            .that.is.a('string')
            .that.equals(config.sheetID);
        });
    });
  });

  describe('#getSheetValues', function() {
    const range = "'Student Responses'!A1:A";

    it('should return sheet values', function() {
      return spreadsheetHandler.getSheetValues(config.sheetID, range)
        .then((response) => {
          expect(response).to.have.property('values')
            .to.be.an.instanceof(Array);
        });
    });
  });

  describe('#appendRow', function() {
    const values = [[
      new Date(),
      "Chicago, IL, United States",
      "Adler Planetarium, Chicago, IL, United States",
      "41.8781136",
      "-87.6297982",
      "41.8663817",
      "-87.6066765",
      null
    ]];

    it('should append sheet row', function() {
      return spreadsheetHandler.getSheet(config.sheetID).then((data) => {
        return `'Student Responses'!A1:H${data.sheets[0].properties.gridProperties.rowCount}`
      }).then((range) => {
        return spreadsheetHandler.appendRow(config.sheetID, values, range)
          .then((response) => {
            expect(response).to.have.deep.property('updates.updatedRows', 1);
          });
      });
    });
  });
});