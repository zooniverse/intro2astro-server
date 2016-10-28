const mocha = require('mocha');
const chai = require('chai');
const expect = require('chai').expect;
const assert = require('chai').assert;
const chaiAsPromised = require("chai-as-promised");

const GoogleAuth = require("google-auth-library");
const GoogleAuthentication = require('../app/google-auth');
const config = require('../app/config');


describe('GoogleAuthentication', function() {
  const scope = ['https://www.googleapis.com/auth/spreadsheets'];
  const googleAuth = new GoogleAuthentication(config.googleAuth, scope);

  describe('instantiation', function() {
    it('should instantiate', function(done) {
      assert.instanceOf(googleAuth, GoogleAuthentication, 'googleAuth is an instance of GoogleAuthentication');
      done();
    });

    it('should have instantiated GoogleAuth client as a property', function(done) {
      assert.instanceOf(googleAuth.authClient, GoogleAuth);
      done();
    });

    it('should have instantiated a JWT client as a property', function(done) {
      expect(googleAuth.jwtClient).to.have.deep.property('credentials.refresh_token', 'jwt-placeholder');
      done()
    });
  });

  describe('#useServiceAccountAuth', function() {
    it('should get a token', function(done) {
      googleAuth.useJwtAuth().then((auth) => {
        assert.isDefined(auth.value);
        done();
      });
    });

    it('should have Bearer token type', function(done) {
      googleAuth.useJwtAuth().then((auth) => {
        expect(auth.type).to.equal('Bearer');
        done();
      });
    });

    it('should cache token', function(done) {
      googleAuth.useJwtAuth().then((auth) => {
        assert.isDefined(googleAuth.googleAuthorization);
        done();
      });
    });
  });

  describe('#makeRequest', function() {
    it('should not renew if token is not expired');
  });

  describe('#httpRequest', function() {
    let endpoint = 'https://sheets.googleapis.com/v4/spreadsheets/';

    it('should make a GET request to Google Sheets API', function(done) {
      endpointWithID = endpoint + config.sheetID;
      googleAuth.httpRequest(endpointWithID, 'GET', null).then((response) => {
        assert.isTrue(response.ok);
        done();
      });
    });

    it('should make a POST request to Google Sheets API', function(done) {
      googleAuth.httpRequest(endpoint, 'POST', null).then((response) => {
        assert.isTrue(response.ok);
        done();
      });
    });
  });
});