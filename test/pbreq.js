/**
 * Created by ssabic on 11/07/15.
 */
var assert = require('assert');
var pb = require('../lib/libprofitbricks');
var helper = require('../test/testHelper');

describe('pbreq tests', function(){
    this.timeout(20000);

    //Set depth method doesn' work at all
    it.skip('Set depth', function(done){
        assert.equal(pb.depth, 1);
        pb.setdepth(2);
        assert.equal(pb.depth, 2);
        done();
    });

    it('Set full header', function(done){
        pb.fullheader();
        assert.equal(pb.options.headers['Content-Type'], 'application/json');
        done();
    });

    it('Set patch header', function(done){
        pb.patchheader();
        assert.equal(pb.options.headers['Content-Type'], 'application/json');
        done();
    });

    it('Set command header', function(done){
        pb.commandheader();
        assert.equal(pb.options.headers['Content-Type'], 'application/x-www-form-urlencoded');
        done();
    });

    it('PB authentication', function(done){
        var authString = new Buffer('testUser:testPassword', 'ascii').toString('base64');
        pb.pbauth(authString);
        assert.equal(pb.options.headers['Authorization'], 'Basic ' + authString);
        done();
    });

    it('Make URL', function(done){
        var url = pb.mk_url([ "datacenters", "123456789", "servers", "000000000", "cdroms", "111111111" ], function(data){});
        assert.equal(url, 'https://api.profitbricks.com/cloudapi/v4/datacenters/123456789/servers/000000000/cdroms/111111111');
        done();
    });

    it('Delete request', function(done){
        pb.is_del([ "datacenters", "123456789", "servers", "000000000", "cdroms", "111111111"], function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            assert.equal(pb.options.url, 'https://api.profitbricks.com/cloudapi/v4/datacenters/123456789/servers/000000000/cdroms/111111111');
            assert.equal(pb.options.headers['Content-Type'], 'application/json');
            assert.equal(response.request.method, "DELETE");
            done();
        });
    });

    it('Get request', function(done){
        pb.is_get([ "datacenters", "123456789", "servers", "000000000", "cdroms", "111111111"], function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            assert.equal(pb.options.url, 'https://api.profitbricks.com/cloudapi/v4/datacenters/123456789/servers/000000000/cdroms/111111111?depth=1');
            assert.equal(pb.options.headers['Content-Type'], 'application/json');
            assert.equal(response.request.method, "GET");
            done();
        });
    });

    it('Patch request', function(done){
        pb.is_patch([ "datacenters", "123456789", "servers", "000000000", "cdroms", "111111111"], {"test": "true"}, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            assert.equal(pb.options.url, 'https://api.profitbricks.com/cloudapi/v4/datacenters/123456789/servers/000000000/cdroms/111111111');
            assert.equal(pb.options.body, '{"test":"true"}');
            assert.equal(pb.options.headers['Content-Type'], 'application/json');
            assert.equal(response.request.method, "PATCH");
            done();
        });
    });

    it('Put request', function(done){
        pb.is_put([ "datacenters", "123456789", "servers", "000000000", "cdroms", "111111111"], {"test": "true"}, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            assert.equal(pb.options.url, 'https://api.profitbricks.com/cloudapi/v4/datacenters/123456789/servers/000000000/cdroms/111111111');
            assert.equal(pb.options.body, '{"test":"true"}');
            assert.equal(pb.options.headers['Content-Type'], 'application/json');
            assert.equal(response.request.method, "PUT");
            done();
        });
    });

    it('Post request', function(done){
        pb.is_post([ "datacenters", "123456789", "servers", "000000000", "cdroms", "111111111"], {"test": "true"}, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            assert.equal(pb.options.url, 'https://api.profitbricks.com/cloudapi/v4/datacenters/123456789/servers/000000000/cdroms/111111111');
            assert.equal(pb.options.body, '{"test":"true"}');
            assert.equal(pb.options.headers['Content-Type'], 'application/json');
            assert.equal(response.request.method, "POST");
            done();
        });
    });

    it('Command request', function(done){
        pb.is_command([ "datacenters", "123456789", "servers", "000000000", "cdroms", "111111111"], {"test": "true"}, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            assert.equal(pb.options.url, 'https://api.profitbricks.com/cloudapi/v4/datacenters/123456789/servers/000000000/cdroms/111111111');
            assert.equal(pb.options.body, '{"test":"true"}');
            assert.equal(pb.options.headers['Content-Type'], 'application/x-www-form-urlencoded');
            assert.equal(response.request.method, "POST");
            done();
        });
    });

    it('Restore request', function(done){
        pb.is_urlencoded([ "datacenters", "123456789", "servers", "000000000", "cdroms", "111111111"], 'test=true', function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            assert.equal(pb.options.url, 'https://api.profitbricks.com/cloudapi/v4/datacenters/123456789/servers/000000000/cdroms/111111111');
            assert.equal(pb.options.body, 'test=true');
            assert.equal(pb.options.headers['Content-Type'], 'application/x-www-form-urlencoded');
            assert.equal(response.request.method, "POST");
            done();
        });
    });

    //This method is dangerous, if used it will case epic failure on all other requests
    //Error: options.uri must be a path when using options.baseUrl
    it.skip('Set endpoint', function(done){
        pb.setendpoint('http://test.endpoint.com');
        assert.equal(pb.options.baseUrl, 'http://test.endpoint.com');
        pb.setendpoint('https://api.profitbricks.com/rest');
        done();
    });

});