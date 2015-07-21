/**
 * Created by ssabic on 09/07/15.
 */
var assert = require('assert');
var pb = require('../lib/libprofitbricks');
var helper = require('../test/testHelper');

var location = {};

describe('Location tests', function(){
    this.timeout(20000);

    before(function(done){
        helper.authenticate(pb);
        done();
    });

    it('List locations', function(done){
        pb.listLocations(function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.items.length > 0, true);
            location = object.items[0];
            done();
        });
    });

    it('Get location', function(done){
        pb.getLocation(location.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, location.id);
            assert.equal(object.type, location.type);
            assert.equal(object.properties.name, location.properties.name);
            done();
        });
    });
});