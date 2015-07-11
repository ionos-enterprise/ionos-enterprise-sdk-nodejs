var assert = require('assert');
var pb = require('../lib/libprofitbricks');
var helper = require('../test/testHelper');
var creds = helper.getCredentials();

describe('Authentication tests', function(){
    this.timeout(20000);

    it('pbauth authentication', function(done){
        var authString = new Buffer(creds.user + ':' + creds.pass, 'ascii').toString('base64');
        assert.equal(pb.options.headers['Authorization'], undefined);
        pb.pbauth(authString);
        assert.equal(pb.options.headers['Authorization'], 'Basic ' + authString);
        done();
    });

    it('setauth authentication', function(done){
        //assert.equal(pb.options.headers['Authorization'], undefined);
        pb.setauth(creds.user, creds.pass);
        assert.notEqual(pb.options.auth, null);
        assert.equal(pb.options.auth.user, creds.user);
        assert.equal(pb.options.auth.pass, creds.pass);
        assert.equal(pb.options.auth.sendImmediately, false);
        done();
    });
});
