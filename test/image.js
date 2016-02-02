/**
 * Created by ssabic on 06/07/15.
 */
var assert = require('assert');
var pb = require('../lib/libprofitbricks');
var helper = require('../test/testHelper');
var image = {};

var imageUpd = {
    "name": "Test image - updated"
};

describe('Image tests', function(){
    this.timeout(80000);

    before(function(done){
        helper.authenticate(pb);
        done();
    });

    it('List images', function(done){
        pb.listImages(function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.notEqual(object.items.length, 0);
            image = object.items[0];
            done();
        });
    });

    it('Get image', function(done){
        pb.getImage(image.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(image.id, object.id);
            done();
        })
    });

    it('Update image', function(done){
        pb.updateImage(image.id, imageUpd, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            //assert.equal(image.id, object.id);
            assert.equal(object.httpStatus, 422);
            assert.equal(object.messages[0].errorCode, '200');
            assert.equal(object.messages[0].message, 'Internal service error: Public images cannot be modified/removedPublic images cannot be modified/removed');
            done();
        })
    });

    it('Patch image', function(done){
        imageUpd.name = 'Test image - patched';
        pb.patchImage(image.id, imageUpd, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            //assert.equal(image.id, object.id);
            assert.equal(object.httpStatus, 422);
            assert.equal(object.messages[0].errorCode, '200');
            assert.equal(object.messages[0].message, 'Internal service error: Public images cannot be modified/removedPublic images cannot be modified/removed');
            done();
        })
    });

    it('Delete image', function(done){
        pb.deleteImage(image.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.httpStatus, 422);
            assert.equal(object.messages[0].errorCode, '200');
            assert.equal(object.messages[0].message, 'Internal service error: Public images cannot be modified/removedPublic images cannot be modified/removed');
            done();
        })
    });

});
