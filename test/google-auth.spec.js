const mocha = require('mocha');
const expect = require('chai').expect;
const assert = require('chai').assert
const chaiAsPromised = require("chai-as-promised");
const GoogleAuthentication = require('../app/google-auth');
const credentials = require('../app/Intro2Astro-fc288f39a1b9.json');

describe('GoogleAuthentication', function() {
  const scope = ['https://www.googleapis.com/auth/spreadsheets'];
  const googleAuth = new GoogleAuthentication(credentials, scope);

  describe('instantiation', function() {
    it('should instantiate', function(done) {
      assert.instanceOf(googleAuth, GoogleAuthentication, 'googleAuth is an instance of GoogleAuthentication');
      done();
    });

    it('should have instantiated GoogleAuth client as a property');

    it('should have instantiated a JWT client as a property');
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
    it('should make a request to Google Sheets API');
  });
});