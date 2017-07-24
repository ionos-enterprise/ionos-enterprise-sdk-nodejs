/**
 * Created by ssabic on 08/07/15.
 */
var assert = require('assert');
var pb = require('../lib/libprofitbricks');
var helper = require('../test/testHelper');
var config = require('../test/config');
var dc = {};
var server = {};
var nic = {};
var fwRule = {};

describe('NIC tests', function(){
    this.timeout(90000);

    before(function(done){
        helper.authenticate(pb);
        pb.createDatacenter(config.dcData, function(error, response, body){
            assert.equal(error, null);
            dc = JSON.parse(body);
            pb.createLan(dc.id, config.lan2, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                pb.createServer(dc.id, config.serverSim, function(error, response, body){
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
    });

    after(function(done){
        pb.deleteDatacenter(dc.id, function(error, response, body){
            assert.equal(error, null);
            done();
        });
    });

    it('Create NIC', function (done) {
        setTimeout(function () {
            pb.createNic(dc.id, server.id, config.nic, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.notEqual(object.id, null);
                assert.equal(object.type, 'nic');
                assert.equal(object.properties.name, config.nic.properties.name);
                assert.equal(object.properties.firewallActive, config.nic.properties.firewallActive);
                assert.ok(object.properties.ips.length > 0);
                assert.ok(object.properties.ips.indexOf(config.nic.properties.ips[0]) > -1);
                assert.equal(object.properties.dhcp, config.nic.properties.dhcp);
                assert.equal(object.properties.nat, config.nic.properties.nat);
                assert.equal(object.properties.lan, config.nic.properties.lan);
                nic = object;
                done();
            });
        }, 60000);
    });

    it('Create NIC failure', function (done) {
        var nicReq = {
            "properties": {
                "name": config.nic.properties.name
            }
        };
        pb.createNic(dc.id, server.id, nicReq, function (error, response, body) {
            var object = JSON.parse(body);
            assert.equal(object['httpStatus'], 422);
            assert.ok(object['messages'][0]['message'].indexOf("Attribute 'lan' is required") > -1);
            done();
        });
    });

    it('List NICs', function (done) {
        setTimeout(function () {
            pb.listNics(dc.id, server.id, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.items.length > 0, true);
                assert.equal(object.items[0].type, 'nic');
                nic = object.items[0];
                done();
            });
        }, 60000);
    });

    it('Get NIC', function(done){
        pb.getNic(dc.id, server.id, nic.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, nic.id);
            assert.equal(object.type, 'nic');
            assert.equal(object.properties.name, nic.properties.name);
            assert.equal(object.properties.firewallActive, nic.properties.firewallActive);
            assert.ok(object.properties.ips.length > 0);
            assert.ok(object.properties.ips.indexOf(nic.properties.ips[0]) > -1);
            assert.equal(object.properties.dhcp, nic.properties.dhcp);
            assert.equal(object.properties.nat, nic.properties.nat);
            assert.equal(object.properties.lan, nic.properties.lan);
            nic = object;
            done();
        });
    });

    it('Get NIC failure', function (done) {
        pb.getNic(dc.id, server.id, '00000000-0000-0000-0000-000000000000', function (error, response, body) {
            var object = JSON.parse(body);
            assert.equal(object['httpStatus'], 404);
            assert.equal(object['messages'][0]['message'], 'Resource does not exist');
            done();
        });
    });

    it('Update NIC', function(done){
        var updateJson = {
            "properties": {
                "name": config.nic.properties.name + " RENAME UPDATED",
                "lan": 1
            }
        };
        setTimeout(function(){
            pb.updateNic(dc.id, server.id, nic.id, updateJson, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.id, nic.id);
                assert.equal(object.type, 'nic');
                assert.equal(object.properties.name, updateJson.properties.name);
                done();
            });

        }, 20000);
    });

    it('Patch NIC', function(done){
        patchJson = {
            "name": config.nic.properties.name + " RENAME PATCHED"
        };
        setTimeout(function(){
            pb.patchNic(dc.id, server.id, nic.id, patchJson, function(error, response, body){
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.id, nic.id);
                assert.equal(object.type, 'nic');
                assert.equal(object.properties.name, patchJson.name);
                done();
            });
        }, 10000);
    });

    it('Create FW rule', function(done){
        pb.createFWRule(dc.id, server.id, nic.id, config.firewallRule, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.notEqual(object.id, null);
            assert.equal(object.type, 'firewall-rule');
            assert.equal(object.properties.name, config.firewallRule.properties.name);
            assert.equal(object.properties.protocol, config.firewallRule.properties.protocol);
            assert.equal(object.properties.sourceMac, config.firewallRule.properties.sourceMac);
            assert.equal(object.properties.portRangeStart, config.firewallRule.properties.portRangeStart);
            assert.equal(object.properties.portRangeEnd, config.firewallRule.properties.portRangeEnd);
            assert.equal(object.properties.sourceIp, null);
            assert.equal(object.properties.targetIp, null);
            assert.equal(object.properties.icmpType, null);
            assert.equal(object.properties.icmpCode, null);
            fwRule = object;
            done();
        });
    });

    it('Create FW rule failure', function (done) {
        var fwReq = {
            "properties": {
                "name": config.firewallRule.properties.name
            }
        };
        pb.createFWRule(dc.id, server.id, nic.id, fwReq, function (error, response, body) {
            var object = JSON.parse(body);
            assert.equal(object['httpStatus'], 422);
            assert.ok(object['messages'][0]['message'].indexOf("Attribute 'protocol' is required") > -1);
            done();
        });
    });

    it('List FW rules', function (done) {
        setTimeout(function () {
            pb.listFWRules(dc.id, server.id, nic.id, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.ok(object.items.length > 0);
                assert.equal(object.items[0].type, 'firewall-rule');
                done();
            });
        }, 10000);
    });

    it('Get FW rule', function(done){
        setTimeout(function(){
            pb.getFWRule(dc.id, server.id, nic.id, fwRule.id, function(error, response, body){
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.id, fwRule.id);
                assert.equal(object.type, 'firewall-rule');
                assert.equal(object.properties.name, config.firewallRule.properties.name);
                assert.equal(object.properties.protocol, config.firewallRule.properties.protocol);
                assert.equal(object.properties.sourceMac, config.firewallRule.properties.sourceMac);
                assert.equal(object.properties.portRangeStart, config.firewallRule.properties.portRangeStart);
                assert.equal(object.properties.portRangeEnd, config.firewallRule.properties.portRangeEnd);
                assert.equal(object.properties.sourceIp, null);
                assert.equal(object.properties.targetIp, null);
                assert.equal(object.properties.icmpType, null);
                assert.equal(object.properties.icmpCode, null);
                done();
            });
        }, 10000)
    });

    it('Get FW rule failure', function (done) {
        pb.getFWRule(dc.id, server.id, nic.id, '00000000-0000-0000-0000-000000000000', function (error, response, body) {
            var object = JSON.parse(body);
            assert.equal(object['httpStatus'], 404);
            assert.equal(object['messages'][0]['message'], 'Resource does not exist');
            done();
        });
    });

    it('Update FW rule', function(done){
        var fwRuleJson = {
            "properties": {
                "name": config.firewallRule.properties.name + " RENAME UPDATED"
            }
        };
        pb.updateFWRule(dc.id, server.id, nic.id, fwRule.id, fwRuleJson, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, fwRule.id);
            assert.equal(object.type, 'firewall-rule');
            assert.equal(object.properties.name, fwRuleJson.properties.name);
            done();
        });
    });

    it('Patch FW rule', function(done){
        var fwRuleJson = {
            "name": config.firewallRule.properties.name + " RENAME PATCHED"
        };
        setTimeout(function(){
            pb.patchFWRule(dc.id, server.id, nic.id, fwRule.id, fwRuleJson, function(error, response, body){
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.id, fwRule.id);
                assert.equal(object.type, 'firewall-rule');
                assert.equal(object.properties.name, fwRuleJson.name);
                done();
            });
        }, 20000);
    });

    it('Delete FW rule', function(done){
        pb.delFWRule(dc.id, server.id, nic.id, fwRule.id, function(error, response, body){
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null)
            setTimeout(function(){
                pb.listFWRules(dc.id, server.id, nic.id, function(error, response, body){
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.equal(object.items.length, 0);
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
