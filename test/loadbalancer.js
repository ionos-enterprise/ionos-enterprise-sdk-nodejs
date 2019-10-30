/**
 * Created by ssabic on 08/07/15.
 */
var assert = require('assert-plus');
var lib = require('../lib/libionosenterprise');
var helper = require('../test/testHelper');
var config = require('../test/config');
var dc = {};
var lb = {};
var server = {};
var nic = {};


describe('Loadbalancer tests', function(){
    this.timeout(300000);

    before(function(done){
        helper.authenticate(lib);
        lib.createDatacenter(config.dcData, function (error, response, body) {
            assert.equal(error, null);
            dc = JSON.parse(body);
            lib.createLan(dc.id, config.lan2, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                lib.createServer(dc.id, config.serverSim, function (error, response, body) {
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.notEqual(object.id, null);
                    server = object;
                    setTimeout(function () {
                        lib.createNic(dc.id, server.id, config.nic, function (error, response, body) {
                            assert.equal(error, null);
                            assert.notEqual(response, null);
                            assert.notEqual(body, null);
                            var object = JSON.parse(body);
                            assert.notEqual(object.id, null);
                            nic = object;
                            done();
                        });
                    }, 90000);
                });
            });
        });
    });

    after(function(done){
        lib.deleteDatacenter(dc.id, function(error, response, body){
            assert.equal(error, null);
            done();
        });
    });

    it('Create loadbalancer', function (done) {
        config.loadbalancer["entities"] = {
            "balancednics": {
                "items": [{
                    "id": nic.id
                }]
            }
        };
        setTimeout(function () {
            lib.createLoadbalancer(dc.id, config.loadbalancer, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.type, 'loadbalancer');
                assert.equal(object.properties.name, config.loadbalancer.properties.name);
                assert.equal(object.properties.dhcp, true);
                assert.notEqual(object.entities.balancednics, null);
                lb = object;
                done();
            });
        }, 30000);
    });

    it('List loadbalancers', function (done) {
        setTimeout(function () {
            lib.listLoadbalancers(dc.id, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.ok(object.items.length > 0);
                assert.equal(object.items[0].type, 'loadbalancer');
                done();
            });
        }, 60000);
    });

    it('Create loadbalancer failure', function (done) {
        var lbReq = {};
        lib.createLoadbalancer(dc.id, lbReq, function (error, response, body) {
            var object = JSON.parse(body);
            assert.equal(object['httpStatus'], 422);
            assert.ok(object['messages'][0]['message'].indexOf("Resource-definition requires 'properties' attribute") > -1);
            done();
        });
    });

    it('Get loadbalancer', function(done){
        lib.getLoadbalancer(dc.id, lb.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, lb.id);
            assert.equal(object.type, 'loadbalancer');
            assert.equal(object.properties.name, lb.properties.name);
            assert.equal(object.properties.dhcp, true);
            assert.notEqual(object.properties.ip, null);
            done();
        });
    });

    it('Get loadbalancer failure', function (done) {
        lib.getServer(dc.id, '00000000-0000-0000-0000-000000000000', function (error, response, body) {
            var object = JSON.parse(body);
            assert.equal(object['httpStatus'], 404);
            assert.equal(object['messages'][0]['message'], 'Resource does not exist');
            done();
        });
    });

    it('Update loadbalancer', function (done) {
        var lbUpdate = {
            "properties": {
                "name": "NodeJS SDK Test - RENAME UPDATED"
            }
        };
        lib.updateLoadbalancer(dc.id, lb.id, lbUpdate, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, lb.id);
            assert.equal(object.type, 'loadbalancer');
            assert.equal(object.properties.name, lbUpdate.properties.name);
            done();
        });
    });

    it('Patch loadbalancer', function(done){
        var lbPatch = {
            "name": "NodeJS SDK Test - RENAME PATCHED"
        };
        lib.patchLoadbalancer(dc.id, lb.id, lbPatch, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            setTimeout(function(){
                lib.getLoadbalancer(dc.id, lb.id, function(error, response, body){
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.equal(object.id, lb.id);
                    assert.equal(object.type, 'loadbalancer');
                    assert.equal(object.properties.name, lbPatch.name);
                    lb = object;
                    done();
                });
            }, 10000);
        });
    });

    it('List balanced NICs', function(done){
        lib.listBalancedNics(dc.id, lb.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.ok(object.items.length > 0);
            assert.equal(object.items[0].type, 'nic');
            assert.equal(object.items[0].id, nic.id);
            done();
        });
    });

    it('Associate NIC', function(done){
        var nicReq = {
            "properties": {
                "name": "NodeJS SDK Test",
                "ips": ["192.168.11.11"],
                "dhcp": "true",
                "lan": "1"
            }
        };
        lib.createServer(dc.id, config.serverSim, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.notEqual(object.id, null);
            var server2 = object;
            setTimeout(function(){
                lib.createNic(dc.id, server2.id, nicReq, function(error, response, body){
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.notEqual(object.id, null);
                    var nic2 = object;
                    setTimeout(function(){
                        lib.associateNics(dc.id, lb.id, { "id": nic2.id }, function (error, response, body) {
                            assert.equal(error, null);
                            assert.notEqual(response, null);
                            assert.notEqual(body, null);
                            var object = JSON.parse(body);
                            assert.equal(object.id, nic2.id);
                            assert.equal(object.properties.name, nicReq.properties.name);
                            done();
                        });
                    }, 40000);
                });
            }, 10000);
        });
    });

    it('Get balanced NIC', function(done){
        lib.getBalancedNic(dc.id, lb.id, nic.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.type, 'nic');
            assert.equal(object.id, nic.id);
            assert.equal(object.properties.name, "NodeJS SDK Test");
            var macPattern = /^([0-9a-f]{2}[:]){5}([0-9a-f]{2})$/;
            assert.equal(macPattern.test(object.properties.mac), true);
            assert.ok(object.properties.ips.length > 0);
            assert.equal(object.properties.dhcp, true);
            assert.number(object.properties.lan);
            assert.bool(object.properties.nat);
            assert.bool(object.properties.firewallActive);
            done();
        });
    });

    it('Delete balanced NIC', function(done){
        lib.deleteBalancedNic(dc.id, lb.id, nic.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.equal(body, "");
            setTimeout(function(){
                lib.listBalancedNics(dc.id, lb.id, function(error, response, body){
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.equal(object.items.length, 1);
                    done();
                });
            }, 30000);
        });
    });

    it('Delete loadbalancer', function(done){
        lib.deleteLoadbalancer(dc.id, lb.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.equal(body, "");
            done();
        });
    });

});
