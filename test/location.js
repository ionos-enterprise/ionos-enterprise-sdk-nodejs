/**
 * Created by ssabic on 09/07/15.
 */
var assert = require('assert');
var pb = require('../lib/libprofitbricks');
var helper = require('../test/testHelper');
var config = require('../test/config');

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
            assert.equal(object.items[0].type, 'location');
            for (var i = 0; i < object.items.length; i++) {
                assert.equal(config.locations.indexOf(object.items[i].id) > -1, true);
            }
            done();
        });
    });

    it('Get location', function(done){
        pb.getLocation('us/las', function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, 'us/las');
            assert.equal(object.type, 'location');
            done();
        });
    });

    it('Get location failure', function (done) {
        pb.getLocation('us/00000000-0000-0000-0000-000000000000', function (error, response, body) {
            var object = JSON.parse(body);
            assert.equal(object['httpStatus'], 404);
            assert.equal(object['messages'][0]['message'], 'Resource does not exist');
            done();
        });
    });
});