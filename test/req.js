/**
 * Created by ssabic on 11/07/15.
 */
var assert = require('assert');
var lib = require('../lib/libionosenterprise');
var helper = require('../test/testHelper');

describe('req tests', function(){
    this.timeout(20000);

    //Set depth method doesn' work at all
    it.skip('Set depth', function(done){
        assert.equal(lib.depth, 1);
        lib.setdepth(2);
        assert.equal(lib.depth, 2);
        done();
    });

    it('Set full header', function(done){
        lib.fullheader();
        assert.equal(lib.options.headers['Content-Type'], 'application/json');
        done();
    });

    it('Set patch header', function(done){
        lib.patchheader();
        assert.equal(lib.options.headers['Content-Type'], 'application/json');
        done();
    });

    it('Set command header', function(done){
        lib.commandheader();
        assert.equal(lib.options.headers['Content-Type'], 'application/x-www-form-urlencoded');
        done();
    });

    it('authentication', function(done){
        var authString = new Buffer('testUser:testPassword', 'ascii').toString('base64');
        lib.auth(authString);
        assert.equal(lib.options.headers['Authorization'], 'Basic ' + authString);
        done();
    });

    it('Make URL', function(done){
        var url = lib.mk_url([ "datacenters", "123456789", "servers", "000000000", "cdroms", "111111111" ], function(data){});
        assert.equal(url, 'https://api.ionos.com/cloudapi/v5/datacenters/123456789/servers/000000000/cdroms/111111111');
        done();
    });

    it('Delete request', function(done){
        lib.is_del([ "datacenters", "123456789", "servers", "000000000", "cdroms", "111111111"], function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            assert.equal(lib.options.url, 'https://api.ionos.com/cloudapi/v5/datacenters/123456789/servers/000000000/cdroms/111111111');
            assert.equal(lib.options.headers['Content-Type'], 'application/json');
            assert.equal(response.request.method, "DELETE");
            done();
        });
    });

    it('Get request', function(done){
        lib.is_get([ "datacenters", "123456789", "servers", "000000000", "cdroms", "111111111"], function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            assert.equal(lib.options.url, 'https://api.ionos.com/cloudapi/v5/datacenters/123456789/servers/000000000/cdroms/111111111?depth=1');
            assert.equal(lib.options.headers['Content-Type'], 'application/json');
            assert.equal(response.request.method, "GET");
            done();
        });
    });

    it('Patch request', function(done){
        lib.is_patch([ "datacenters", "123456789", "servers", "000000000", "cdroms", "111111111"], {"test": "true"}, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            assert.equal(lib.options.url, 'https://api.ionos.com/cloudapi/v5/datacenters/123456789/servers/000000000/cdroms/111111111');
            assert.equal(lib.options.body, '{"test":"true"}');
            assert.equal(lib.options.headers['Content-Type'], 'application/json');
            assert.equal(response.request.method, "PATCH");
            done();
        });
    });

    it('Put request', function(done){
        lib.is_put([ "datacenters", "123456789", "servers", "000000000", "cdroms", "111111111"], {"test": "true"}, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            assert.equal(lib.options.url, 'https://api.ionos.com/cloudapi/v5/datacenters/123456789/servers/000000000/cdroms/111111111');
            assert.equal(lib.options.body, '{"test":"true"}');
            assert.equal(lib.options.headers['Content-Type'], 'application/json');
            assert.equal(response.request.method, "PUT");
            done();
        });
    });

    it('Post request', function(done){
        lib.is_post([ "datacenters", "123456789", "servers", "000000000", "cdroms", "111111111"], {"test": "true"}, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            assert.equal(lib.options.url, 'https://api.ionos.com/cloudapi/v5/datacenters/123456789/servers/000000000/cdroms/111111111');
            assert.equal(lib.options.body, '{"test":"true"}');
            assert.equal(lib.options.headers['Content-Type'], 'application/json');
            assert.equal(response.request.method, "POST");
            done();
        });
    });

    it('Command request', function(done){
        lib.is_command([ "datacenters", "123456789", "servers", "000000000", "cdroms", "111111111"], {"test": "true"}, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            assert.equal(lib.options.url, 'https://api.ionos.com/cloudapi/v5/datacenters/123456789/servers/000000000/cdroms/111111111');
            assert.equal(lib.options.body, '{"test":"true"}');
            assert.equal(lib.options.headers['Content-Type'], 'application/x-www-form-urlencoded');
            assert.equal(response.request.method, "POST");
            done();
        });
    });

    it('Restore request', function(done){
        lib.is_urlencoded([ "datacenters", "123456789", "servers", "000000000", "cdroms", "111111111"], 'test=true', function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            assert.equal(lib.options.url, 'https://api.ionos.com/cloudapi/v5/datacenters/123456789/servers/000000000/cdroms/111111111');
            assert.equal(lib.options.body, 'test=true');
            assert.equal(lib.options.headers['Content-Type'], 'application/x-www-form-urlencoded');
            assert.equal(response.request.method, "POST");
            done();
        });
    });

    //This method is dangerous, if used it will case epic failure on all other requests
    //Error: options.uri must be a path when using options.baseUrl
    it.skip('Set endpoint', function(done){
        lib.setendpoint('http://test.endpoint.com');
        assert.equal(lib.options.baseUrl, 'http://test.endpoint.com');
        lib.setendpoint('https://api.ionos.com/rest');
        done();
    });

});