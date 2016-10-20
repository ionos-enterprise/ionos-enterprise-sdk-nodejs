/**
 * Created by ssabic on 10/07/15.
 */
var assert = require('assert');
var pb = require('../lib/libprofitbricks');
var helper = require('../test/testHelper');
var dc = {};
var server = {};
var drive = {};

describe('Drive tests', function(){
    this.timeout(80000);

    before(function(done){
        dcData = {
            "properties": {
                "name":"Test Data Center",
                "location":"us/las",
                "description":"Test description"
            }
        };

        var serverData =  {
            "properties": {
                "name": "Test Server",
                "ram": 1024,
                "cores": 1
            },
            "entities": {
                "volumes": {
                    "items": [{
                        "properties": {
                            "size": 1,
                            "name": "Test volume",
                            "licenceType": "UNKNOWN",
                            "bus": "VIRTIO",
                            "type": "HDD"
                        }
                    }]
                }
            }
        };

        helper.authenticate(pb);
        pb.createDatacenter(dcData, function(error, response, body){
            assert.equal(error, null);
            dc = JSON.parse(body);
            pb.createServer(dc.id, serverData, function(error, response, body){
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.notEqual(object.id, null);
                server = object;
                pb.listImages(function(error, response, body){
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.notEqual(object.items.length, 0);
                    for (var i = 0; i < object.items.length; i++) {
                        if (object.items[i].properties.imageType == 'CDROM' && object.items[i].properties.location == 'us/las') {
                            drive = object.items[i];
                            done();
                            break;
                        };
                    };
                });
            });
        });
    });

    after(function(done){
        pb.deleteDatacenter(dc.id, function(error, response, body){
            assert.equal(error, null);
            done();
        });
    });

    it('List drives - empty server', function(done){
        setTimeout(function(){
            pb.listAttachedCdroms(dc.id, server.id, function(error, response, body){
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.items.length, 0);
                done();
            });
        }, 20000);
    });

    it('Attach CDROM', function(done){
        pb.attachCdrom(dc.id, server.id, drive.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
          //  assert.notEqual(object.id, null);
            setTimeout(function(){
                pb.listAttachedCdroms(dc.id, server.id, function(error, response, body){
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.equal(object.items.length, 1);
                    done();
                });
            }, 40000);
        });
    });

    it('Get attached CDROM', function(done){
        pb.getAttachedCdrom(dc.id, server.id, drive.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, drive.id);
            assert.equal(object.properties.imageType, drive.properties.imageType);
            assert.equal(object.properties.licenceType, drive.properties.licenceType);
            assert.equal(object.properties.name, drive.properties.name);
            done();
        });
    });

    it('Detach CDROM', function(done){
        pb.detachCdrom(dc.id, server.id, drive.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.equal(body, "");
            setTimeout(function(){
                pb.listAttachedCdroms(dc.id, server.id, function(error, response, body){
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.equal(object.items.length, 0);
                    done();
                });
            }, 50000);
        });
    });
});