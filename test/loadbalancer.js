/**
 * Created by ssabic on 08/07/15.
 */
var assert = require('assert');
var pb = require('../lib/libprofitbricks');
var helper = require('../test/testHelper');
var dc = {};
var lb = {};
var server = {};
var nic = {};

var lbJson = {
    "properties": {
        "name": "Test Loadbalancer",
        "ip": "10.11.12.3",
        "dhcp": "true"
    }
};

describe('Loadbalancer tests', function(){
    this.timeout(160000);

    before(function(done){
        dcData = {
            "properties": {
                "name":"Test Data Center",
                "location":"us/lasdev",
                "description":"Test description"
            }
        };

        helper.authenticate(pb);
        pb.createDatacenter(dcData, function(error, response, body){
            assert.equal(error, null);
            dc = JSON.parse(body);
            done();
        });
    });

    after(function(done){
        pb.deleteDatacenter(dc.id, function(error, response, body){
            assert.equal(error, null);
            done();
        });
    });

    it('List loadbalancers - empty datacenter', function(done){
        pb.listLoadbalancers(dc.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.items.length, 0);
            done();
        });
    });

    it('Create loadbalancer', function(done){
        pb.createLoadbalancer(dc.id, lbJson, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.properties.name, lbJson.properties.name);
            assert.equal(object.properties.ip, lbJson.properties.ip);
            assert.equal(object.properties.dhcp, true);
            lb = object;
            setTimeout(function(){
                pb.listLoadbalancers(dc.id, function(error, response, body){
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.equal(object.items.length, 1);
                    done();
                });
            }, 5000);
        });
    });


    it('Get loadbalancer', function(done){
        pb.getLoadbalancer(dc.id, lb.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, lb.id);
            assert.equal(object.properties.name, lb.properties.name);
            assert.equal(object.properties.ip, lb.properties.ip);
            assert.equal(object.properties.dhcp, true);
            done();
        });
    });

    it('Update loadbalancer', function(done){
        lbJson.properties.name = 'Test Loadbalancer - updated';
        pb.updateLoadbalancer(dc.id, lb.id, lbJson, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            setTimeout(function(){
                pb.getLoadbalancer(dc.id, lb.id, function(error, response, body){
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.equal(object.id, lb.id);
                    assert.equal(object.properties.name, lbJson.properties.name);
                    assert.equal(object.properties.ip, lb.properties.ip);
                    assert.equal(object.properties.dhcp, true);
                    lb = object;
                    done();
                });
            }, 5000);
        });
    });

    it('Patch loadbalancer', function(done){
        var lbPatch = {
            "name": "Test Loadbalancer - patched"
        };
        pb.patchLoadbalancer(dc.id, lb.id, lbPatch, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            setTimeout(function(){
                pb.getLoadbalancer(dc.id, lb.id, function(error, response, body){
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.equal(object.id, lb.id);
                    assert.equal(object.properties.name, lbPatch.name);
                    assert.equal(object.properties.ip, lb.properties.ip);
                    assert.equal(object.properties.dhcp, true);
                    lb = object;
                    done();
                });
            }, 5000);
        });
    });

    it('List balanced NICs', function(done){
        pb.listBalancedNics(dc.id, lb.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, lb.id + "/balancednics");
            assert.equal(object.items.length, 0);
            done();
        });
    });

    it('Associate NIC', function(done){
        var serverData =  {
            "properties": {
                "name": "Test Server",
                "ram": 1024,
                "cores": 2
            },
            "entities": {
                "volumes": {
                    "items": [{
                        "properties": {
                            "size": 10,
                            "name": "test volume",
                            "licenceType": "UNKNOWN",
                            "bus": "VIRTIO"
                        }
                    }]
                }
            }
        };

        var nicJson = {
            "properties": {
                "name": "nic-name",
                "ips": ["127.0.0.0"],
                "dhcp": "true",
                "lan": "1"
            }
        };

        pb.createServer(dc.id, serverData, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.notEqual(object.id, null);
            server = object;
            setTimeout(function(){
                pb.createNic(dc.id, server.id, nicJson, function(error, response, body){
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.notEqual(object.id, null);
                    nic = object;
                    setTimeout(function(){
                        pb.associateNics(dc.id, lb.id, {"id": nic.id}, function(error, response, body){
                            assert.equal(error, null);
                            assert.notEqual(response, null);
                            assert.notEqual(body, null);
                            var object = JSON.parse(body);
                            assert.equal(object.id, nic.id);
                            setTimeout(function(){
                                pb.listBalancedNics(dc.id, lb.id, function(error, response, body){
                                    assert.equal(error, null);
                                    assert.notEqual(response, null);
                                    assert.notEqual(body, null);
                                    var object = JSON.parse(body);
                                    assert.equal(object.id, lb.id + "/balancednics");
                                    assert.equal(object.items.length, 1);
                                    done();
                                });
                            }, 30000);
                        });
                    }, 40000);
                });
            }, 10000);
        });
    });

    it('Get balanced NIC', function(done){
        pb.getBalancedNic(dc.id, lb.id, nic.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, nic.id);
            done();
        });
    });

    it('Delete balanced NIC', function(done){
        pb.deleteBalancedNic(dc.id, lb.id, nic.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            setTimeout(function(){
                pb.listBalancedNics(dc.id, lb.id, function(error, response, body){
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.equal(object.id, lb.id + "/balancednics");
                    assert.equal(object.items.length, 0);
                    done();
                });
            }, 30000);
        });
    });

    it('Delete loadbalancer', function(done){
        pb.deleteLoadbalancer(dc.id, lb.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.equal(body, "");
            done();
        });
    });

});
