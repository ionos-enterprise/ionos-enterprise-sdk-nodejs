/**
 * Created by ssabic on 08/07/15.
 */
var assert = require('assert');
var pb = require('../lib/libprofitbricks');
var helper = require('../test/testHelper');
var dc = {};
var server = {};
var nic = {};
var fwRule = {};

var nicJson = {
    "properties": {
        "name": "Test NIC",
        "ips": ["127.0.0.0"],
        "dhcp": "true",
        "lan": "1",
        "nat": false
    },
    "entities": {
        "firewallrules": {
            "items": [
                {
                    "properties": {
                        "name": "Open SSH port",
                        "protocol": "TCP",
                        "portRangeStart": 22,
                        "portRangeEnd": 22
                    }
                }
            ]
        }
    }
};


describe('NIC tests', function(){
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
                "cores": 2
            },
            "entities": {
                "volumes": {
                    "items": [{
                        "properties": {
                            "size": 10,
                            "name": "test volume",
                            "licenceType": "UNKNOWN",
                            "bus": "VIRTIO",
                            "type" : "HDD"
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
                done();
            });
        });
    });

    after(function(done){
        pb.deleteDatacenter(dc.id, function(error, response, body){
            assert.equal(error, null);
            done();
        });
    });

    it('List NICs - empty datacenter', function(done){
        setTimeout(function(){
            pb.listNics(dc.id, server.id, function(error, response, body){
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.items.length, 0);
                done();
            });
        }, 10000);
    });

    it('Create NIC', function(done){
        pb.createNic(dc.id, server.id, nicJson, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.notEqual(object.id, null);
            nic = object;
            setTimeout(function(){
                pb.listNics(dc.id, server.id, function(error, response, body){
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

    it('Get NIC', function(done){
        pb.getNic(dc.id, server.id, nic.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, nic.id);
            assert.equal(object.properties.name, nic.properties.name);
            assert.equal(object.properties.dhcp, true);
            done();
        });
    });

    it('Update NIC', function(done){
        var updateJson = {
            "properties": {
                "name": "Test NIC - updated",
                "ips": ["127.0.0.0"],
                "dhcp": "true",
                "lan": "1"
            }
        };
        setTimeout(function(){
            pb.updateNic(dc.id, server.id, nic.id, updateJson, function(error, response, body){
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.id, nic.id);
                assert.equal(object.properties.name, updateJson.properties.name);
                done();
            });

        }, 20000);
    });

    it('Patch NIC', function(done){
        patchJson = {
            "name": "Test NIC - patched"
        };
        setTimeout(function(){
            pb.patchNic(dc.id, server.id, nic.id, patchJson, function(error, response, body){
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.id, nic.id);
                assert.equal(object.properties.name, patchJson.name);
                done();
            });
        }, 10000);
    });

    it('List FW rules', function(done){
        setTimeout(function(){
            pb.listFWRules(dc.id, server.id, nic.id, function(error, response, body){
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.items.length, 1);
                done();
            });
        }, 10000);
    });

    it('Add FW rule', function(done){
        fwRuleJson = {
            "properties": {
                "name": "Allow PING",
                "protocol": "ICMP",
                "icmpType": 8,
                "icmpCode": 0
            }
        };
        pb.createFWRule(dc.id, server.id, nic.id, fwRuleJson, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.notEqual(object.id, null);
            fwRule = object;
            setTimeout(function(){
                pb.listFWRules(dc.id, server.id, nic.id, function(error, response, body){
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.equal(object.items.length, 2);
                    done();
                });
            }, 10000);
        });
    });

    it('Get FW rule', function(done){
        setTimeout(function(){
            pb.getFWRule(dc.id, server.id, nic.id, fwRule.id, function(error, response, body){
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.id, fwRule.id);
                done();
            });
        }, 10000)
    });

    it('Update FW rule', function(done){
        fwRuleJson = {
            "properties": {
                "name": "Allow PING - updated"
            }
        };
        pb.updateFWRule(dc.id, server.id, nic.id, fwRule.id, fwRuleJson, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, fwRule.id);
            assert.equal(object.properties.name, fwRuleJson.properties.name);
            done();
        });
    });

    it('Patch FW rule', function(done){
        fwRuleJson = {
            "name": "Allow PING - patched"
        };
        setTimeout(function(){
            pb.patchFWRule(dc.id, server.id, nic.id, fwRule.id, fwRuleJson, function(error, response, body){
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.notEqual(object.id, null);
                assert.equal(object.properties.name, fwRuleJson.name);
                done();
            });
        }, 5000);
    });

    it('Delete FW rule', function(done){
        pb.delFWRule(dc.id, server.id, nic.id, fwRule.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            setTimeout(function(){
                pb.listFWRules(dc.id, server.id, nic.id, function(error, response, body){
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.equal(object.items.length, 1);
                    done();
                });
            }, 20000);
        });
    });

    it('Delete NIC', function(done){
        pb.deleteNic(dc.id, server.id, nic.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.equal(body, "");
            done();
        });
    });
});
