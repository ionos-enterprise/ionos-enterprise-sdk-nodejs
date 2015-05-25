var assert = require('assert');
var pb = require('../lib/libprofitbricks');

var user = 'test@profitbricks.com';
var pass = 'testPass123';

describe('Authentication tests', function(){
    this.timeout(20000);

    it('pbauth authentication', function(done){
        var authString = new Buffer(user + ':' + pass, 'ascii').toString('base64');
        assert.equal(pb.options.headers['Authorization'], undefined);
        pb.pbauth(authString);
        assert.equal(pb.options.headers['Authorization'], 'Basic ' + authString);
        done();
    });

    it('setauth authentication', function(done){
        //assert.equal(pb.options.headers['Authorization'], undefined);
        pb.setauth(user, pass);
        assert.notEqual(pb.options.auth, null);
        assert.equal(pb.options.auth.user, user);
        assert.equal(pb.options.auth.pass, pass);
        assert.equal(pb.options.auth.sendImmediately, false);
        done();
    });
});
