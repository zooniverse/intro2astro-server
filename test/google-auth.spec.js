const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;

const GoogleAuth = require("google-auth-library");
const GoogleAuthentication = require('../app/google-auth');
const config = require('../app/config');

describe('GoogleAuthentication', function() {
  const scope = ['https://www.googleapis.com/auth/spreadsheets'];
  const googleAuth = new GoogleAuthentication(config.googleAuth, scope);

  describe('instantiation', function() {
    it('should instantiate', function(done) {
      expect(googleAuth).to.be.an.instanceof(GoogleAuthentication);
      done();
    });

    it('should have instantiated GoogleAuth client as a property', function(done) {
      expect(googleAuth.authClient).to.be.an.instanceof(GoogleAuth);
      done();
    });

    it('should have instantiated a JWT client as a property', function(done) {
      expect(googleAuth.jwtClient).to.have.deep.property('credentials.refresh_token', 'jwt-placeholder');
      done();
    });
  });

  describe('#useJwtAuth', function() {
    it('should get a token', function() {
      return googleAuth.useJwtAuth().then((auth) => {
        expect(auth.token).to.exist;
      });
    });

    it('should have Bearer token type', function() {
      return googleAuth.useJwtAuth().then((auth) => {
        expect(auth.type).to.equal('Bearer');
      });
    });

    it('should cache token', function() {
      return googleAuth.useJwtAuth().then((auth) => {
        expect(googleAuth.googleAuthorization).to.exist;
      });
    });
  });

  describe('#httpRequest', function() {
    this.timeout(5000); // Doesn't seem right to have to increase timeout here...
    let endpoint = 'https://sheets.googleapis.com/v4/spreadsheets/';

    it('should make a GET request to Google Sheets API', function() {
      const endpointWithID = endpoint + config.sheetID;

      return googleAuth.httpRequest(endpointWithID, 'GET').then((response) => {
        expect(response).to.have.property('spreadsheetId')
          .that.is.a('string')
          .that.equals(config.sheetID);
      });
    });
  });
});