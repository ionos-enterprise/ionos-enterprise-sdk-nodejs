var assert = require('assert-plus');
var pb = require('../lib/libprofitbricks');
var helper = require('../test/testHelper');
var config = require('../test/config');
var dc = {};
var volume = {};
var snapshot = {};
var image = {};
var ipblock = {};
var group = {};
var user = {};
var share = {};

describe('User management tests', function () {
    this.timeout(300000);

    before(function (done) {
        helper.authenticate(pb);
        pb.reserveIpblock(config.ipblock, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            ipblock = object;
        });
        pb.createDatacenter(config.dcData, function (error, response, body) {
            assert.equal(error, null);
            dc = JSON.parse(body);
            pb.createVolume(dc.id, config.volume, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.notEqual(object.id, null);
                volume = object;
                setTimeout(function () {
                    pb.createSnapshot(dc.id, volume.id, config.snapshot, function (error, response, body) {
                        assert.equal(error, null);
                        assert.notEqual(response, null);
                        assert.notEqual(body, null);
                        var object = JSON.parse(body);
                        snapshot = object;
                        done();
                    });
                }, 20000);
            });
        });
    });

    after(function (done) {
        pb.releaseIpblock(ipblock.id, function (error, response, body) {
            assert.equal(error, null);
        });
        
        if (group != null) {
            pb.deleteGroup(group.id, function (error, response, body) {
                assert.equal(error, null);
            });
        }

        if (user != null) {
            pb.deleteUser(user.id, function (error, response, body) {
                assert.equal(error, null);
            });
        }

        if (snapshot != null) {
            setTimeout(function () {
                pb.deleteSnapshot(snapshot.id, function (error, response, body) {
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.equal(body, "");
                });
                setTimeout(function () {
                    pb.deleteDatacenter(dc.id, function (error, response, body) {
                        assert.equal(error, null);
                        done();
                    });
                }, 60000);
            }, 90000);
        } else {
            pb.deleteDatacenter(dc.id, function (error, response, body) {
                assert.equal(error, null);
                done();
            });
        }
    });

    it('Create group', function (done) {
        pb.createGroup(config.group, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.notEqual(object.id, null);
            assert.equal(object.type, "group");
            group = object;
            assert.equal(object.properties.name, config.group.properties.name);
            assert.equal(object.properties.createDataCenter, config.group.properties.createDataCenter);
            assert.equal(object.properties.createSnapshot, config.group.properties.createSnapshot);
            assert.equal(object.properties.reserveIp, config.group.properties.reserveIp);
            assert.equal(object.properties.accessActivityLog, config.group.properties.accessActivityLog);
            done();
        });
    });

    it('Create group failure', function (done) {
        var groupReq = {
            "properties": {
                "createDataCenter": true
            }
        };
        pb.createGroup(groupReq, function (error, response, body) {
            var object = JSON.parse(body);
            assert.equal(object['httpStatus'], 422);
            assert.ok(object['messages'][0]['message'].indexOf("Attribute 'name' is required") > -1);
            done();
        });
    });

    it('List groups', function (done) {
        pb.listGroups(function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.ok(object.items.length > 0);
            assert.equal(object.items[0].type, 'group');
            done();
        });
    });

    it('Get group', function (done) {
        pb.getGroup(group.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, group.id);
            assert.equal(object.type, 'group');
            assert.equal(object.properties.name, group.properties.name);
            assert.equal(object.properties.createDataCenter, group.properties.createDataCenter);
            assert.equal(object.properties.createSnapshot, group.properties.createSnapshot);
            assert.equal(object.properties.reserveIp, group.properties.reserveIp);
            assert.equal(object.properties.accessActivityLog, group.properties.accessActivityLog);
            done();
        });
    });

    it('Get group failure', function (done) {
        pb.getGroup('00000000-0000-0000-0000-000000000000', function (error, response, body) {
            var object = JSON.parse(body);
            assert.equal(object['httpStatus'], 404);
            assert.equal(object['messages'][0]['message'], 'Resource does not exist');
            done();
        });
    });

    it('Update group', function (done) {
        var updateGroup = {
            "properties": {
                "name": config.group.properties.name + " - RENAME",
                "createDataCenter": false
            }
        };
        pb.updateGroup(group.id, updateGroup, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, group.id);
            assert.equal(object.type, 'group');
            assert.equal(object.properties.name, updateGroup.properties.name);
            assert.equal(object.properties.createDataCenter, updateGroup.properties.createDataCenter);
            done();
        });
    });

    it('Create user', function (done) {
        config.user.properties.email = "no-reply" + helper.getRandomInt(0, Number.MAX_SAFE_INTEGER) + "@example.com";
        config.user.properties.password = "secretpassword123" + helper.getRandomInt(0, Number.MAX_SAFE_INTEGER);
        pb.createUser(config.user, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.notEqual(object.id, null);
            assert.equal(object.type, "user");
            user = object;
            assert.equal(object.properties.firstname, config.user.properties.firstname);
            assert.equal(object.properties.lastname, config.user.properties.lastname);
            assert.equal(object.properties.email, config.user.properties.email);
            assert.equal(object.properties.administrator, config.user.properties.administrator);
            done();
        });
    });

    it('Create user failure', function (done) {
        var userReq = {
            "properties": {
                "firstname": "John",
                "lastname": "Doe",
                "password": "secretpassword123"
            }
        };
        pb.createUser(userReq, function (error, response, body) {
            var object = JSON.parse(body);
            assert.equal(object['httpStatus'], 422);
            assert.ok(object['messages'][0]['message'].indexOf("Attribute 'email' is required") > -1);
            done();
        });
    });

    it('List users', function (done) {
        pb.listUsers(function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.ok(object.items.length > 0);
            assert.equal(object.items[0].type, 'user');
            done();
        });
    });

    it('Get user', function (done) {
        pb.getUser(user.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, user.id);
            assert.equal(object.type, 'user');
            assert.equal(object.properties.firstname, user.properties.firstname);
            assert.equal(object.properties.lastname, user.properties.lastname);
            assert.equal(object.properties.email, user.properties.email);
            assert.equal(object.properties.administrator, user.properties.administrator);
            assert.equal(object.properties.forceSecAuth, false);
            assert.equal(object.properties.secAuthActive, false);
            done();
        });
    });

    it('Get user failure', function (done) {
        pb.getUser('00000000-0000-0000-0000-000000000000', function (error, response, body) {
            var object = JSON.parse(body);
            assert.equal(object['httpStatus'], 404);
            assert.equal(object['messages'][0]['message'], 'Resource does not exist');
            done();
        });
    });

    it('Update user', function (done) {
        var updateUser = {
            "properties": {
                "firstname": config.user.properties.firstname,
                "lastname": config.user.properties.lastname,
                "email": config.user.properties.email,
                "administrator": false,
                "forceSecAuth": false
            }
        };
        pb.updateUser(user.id, updateUser, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, user.id);
            assert.equal(object.type, 'user');
            assert.equal(object.properties.firstname, user.properties.firstname);
            assert.equal(object.properties.lastname, user.properties.lastname);
            assert.equal(object.properties.email, user.properties.email);
            assert.equal(object.properties.administrator, updateUser.properties.administrator);
            assert.equal(object.properties.forceSecAuth, updateUser.properties.forceSecAuth);
            assert.equal(object.properties.secAuthActive, false);
            done();
        });
    });

    it('Add user to group', function (done) {
        var userReq = { "id": user.id };
        pb.addGroupUser(group.id, userReq, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, user.id);
            assert.equal(object.type, 'user');
            done();
        });
    });

    it('List group users', function (done) {
        pb.listGroupUsers(group.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.ok(object.items.length > 0);
            assert.equal(object.items[0].type, 'user');
            done();
        });
    });

    it('Create share', function (done) {
        pb.addShare(group.id, ipblock.id, config.share, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.notEqual(object.id, null);
            assert.equal(object.type, "resource");
            share = object;
            assert.equal(object.properties.editPrivilege, config.share.properties.editPrivilege);
            assert.equal(object.properties.sharePrivilege, config.share.properties.sharePrivilege);
            done();
        });
    });

    it('List shares', function (done) {
        pb.listShares(group.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.ok(object.items.length > 0);
            assert.equal(object.items[0].type, 'resource');
            done();
        });
    });

    it('Get share', function (done) {
        pb.getShare(group.id, ipblock.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, share.id);
            assert.equal(object.type, "resource");
            assert.equal(object.properties.editPrivilege, share.properties.editPrivilege);
            assert.equal(object.properties.sharePrivilege, share.properties.sharePrivilege);
            done();
        });
    });

    it('Get share failure', function (done) {
        pb.getShare(group.id, '00000000-0000-0000-0000-000000000000', function (error, response, body) {
            var object = JSON.parse(body);
            assert.equal(object['httpStatus'], 404);
            assert.equal(object['messages'][0]['message'], 'Resource does not exist');
            done();
        });
    });

    it('Update share', function (done) {
        var shareReq = {
            "properties": {
                "editPrivilege": false
            }
        }
        pb.updateShare(group.id, ipblock.id, shareReq, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, share.id);
            assert.equal(object.type, "resource");
            assert.equal(object.properties.editPrivilege, shareReq.properties.editPrivilege);
            done();
        });
    });

    it('Remove share', function (done) {
        pb.removeShare(group.id, ipblock.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.equal(body, "");
            done();
        });
    });

    it('Remove user from group', function (done) {
        pb.removeGroupUser(group.id, user.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.equal(body, "");
            done();
        });
    });

    it('List resources', function (done) {
        pb.listResources(function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, 'resources');
            assert.ok(object.items.length > 0);
            assert.equal(object.type, 'collection');
            done();
        });
    });

    it('List datacenter resources', function (done) {
        pb.listResourcesByType("datacenter", function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, 'resources');
            assert.ok(object.items.length > 0);
            assert.equal(object.items[0].type, 'datacenter');
            done();
        });
    });

    it('List image resources', function (done) {
        pb.listResourcesByType("image", function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, 'resources');
            assert.ok(object.items.length > 0);
            assert.equal(object.items[0].type, 'image');
            image = object.items[0];
            done();
        });
    });

    it('List ipblock resources', function (done) {
        pb.listResourcesByType("ipblock", function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, 'resources');
            assert.ok(object.items.length > 0);
            assert.equal(object.items[0].type, 'ipblock');
            done();
        });
    });

    it('List snapshot resources', function (done) {
        pb.listResourcesByType("snapshot", function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, 'resources');
            assert.ok(object.items.length > 0);
            assert.equal(object.items[0].type, 'snapshot');
            done();
        });
    });

    it('List resources failure', function (done) {
        pb.listResourcesByType('unknown', function (error, response, body) {
            var object = JSON.parse(body);
            assert.equal(object['httpStatus'], 404);
            assert.equal(object['messages'][0]['message'], 'Resource does not exist');
            done();
        });
    });

    it('Get datacenter resource', function (done) {
        pb.getResourceByType("datacenter", dc.id, function(error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, dc.id);
            assert.equal(object.type, 'datacenter');
            done();
        });
    });

    it('Get image resource', function (done) {
        pb.getResourceByType("image", image.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, image.id);
            assert.equal(object.type, 'image');
            done();
        });
    });

    it('Get ipblock resource', function (done) {
        pb.getResourceByType("ipblock", ipblock.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, ipblock.id);
            assert.equal(object.type, 'ipblock');
            done();
        });
    });

    it('Get snapshot resource', function (done) {
        pb.getResourceByType("snapshot", snapshot.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, snapshot.id);
            assert.equal(object.type, 'snapshot');
            done();
        });
    });

    it('Get resources failure', function (done) {
        pb.getResourceByType('datacenter', '00000000-0000-0000-0000-000000000000', function (error, response, body) {
            var object = JSON.parse(body);
            assert.equal(object['httpStatus'], 404);
            assert.equal(object['messages'][0]['message'], 'Resource does not exist');
            done();
        });
    });

    it('Delete group', function (done) {
        pb.deleteGroup(group.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.equal(body, "");
            group = null;
            done();
        });
    });

    it('Delete user', function (done) {
        pb.deleteUser(user.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.equal(body, "");
            user = null;
            done();
        });
    });

});