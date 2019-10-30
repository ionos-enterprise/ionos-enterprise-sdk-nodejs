var assert = require('assert');
var lib = require('../lib/libionosenterprise');
var helper = require('../test/testHelper');
var creds = helper.getCredentials();

describe('Authentication tests', function(){
    this.timeout(20000);

    it('auth authentication', function(done){
        var authString = new Buffer(creds.user + ':' + creds.pass, 'ascii').toString('base64');
        assert.equal(lib.options.headers['Authorization'], undefined);
        lib.auth(authString);
        assert.equal(lib.options.headers['Authorization'], 'Basic ' + authString);
        done();
    });

    it('setauth authentication', function(done){
        //assert.equal(lib.options.headers['Authorization'], undefined);
        lib.setauth(creds.user, creds.pass);
        assert.notEqual(lib.options, null);
        done();
    });
});
