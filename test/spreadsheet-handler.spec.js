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
      // this.timeout(5000);
      return spreadsheetHandler.getSheet(config.sheetID)
        .then((response) => {
          expect(response)
            .to.have.property('spreadsheetId')
            .that.is.a('string')
            .that.equals(config.sheetID);
        });
    });
  });
});