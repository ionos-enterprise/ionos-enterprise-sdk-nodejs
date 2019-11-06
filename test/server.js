var assert = require('assert-plus');
var lib = require('../lib/libionosenterprise');
var helper = require('../test/testHelper');
var config = require('../test/config');
var dc = {};
var server = {};
var lan = {};
var volume = {};
var bootVolume = {};
var cdRom = {};
var image = '';

describe('Server tests', function() {
    this.timeout(300000);

    before(function(done) {
        helper.authenticate(lib);
        lib.listImages(function (error, response, body) {
            var object = JSON.parse(body);
            var images = object.items;
            for (var i = 0; i < images.length; i++) {
                if (images[i].properties.location == 'us/las') {
                    if (images[i].properties.imageType == "HDD") {
                        if (images[i].properties.name.indexOf('Ubuntu-16.04') > -1) {
                            image = images[i].id;
                        }
                    } else
                        if (images[i].properties.imageType == "CDROM" &&
                            images[i].properties.name.indexOf('ubuntu-17.04') > -1) {
                            cdRom = images[i];
                    }
                }
            }
            lib.createDatacenter(config.dcData, function (error, response, body) {
                assert.equal(error, null);
                dc = JSON.parse(body);
                config.bootVolume.properties.image = image;
                lib.createVolume(dc.id, config.bootVolume, function (error, response, body) {
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.notEqual(object.id, null);
                    bootVolume = object;
                    setTimeout(function () {
                        lib.createVolume(dc.id, config.volume, function (error, response, body) {
                            assert.equal(error, null);
                            assert.notEqual(response, null);
                            assert.notEqual(body, null);
                            var object = JSON.parse(body);
                            assert.notEqual(object.id, null);
                            volume = object;
                            done();
                        });
                    }, 90000);
                });
            });
        });
    });

    after(function(done) {
        lib.deleteDatacenter(dc.id, function(error, response, body) {
            assert.equal(error, null);
            done();
        });
    });

    it('List servers - empty datacenter', function(done) {
        setTimeout(function() {
            lib.listServers(dc.id, function(error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.items.length, 0);
                done();
            }, 30000);
        });
    });

    it('Create simple server', function (done) {
        config.serverSim["entities"] = {
            "volumes": {
                "items": [
                    {
                        "id": bootVolume.id
                    }
                ]
            }
        };
        lib.createServer(dc.id, config.serverSim, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.notEqual(object.id, null);
            assert.equal(object.type, 'server');
            assert.equal(object.properties.name, config.serverSim.properties.name);
            assert.equal(object.properties.ram, config.serverSim.properties.ram);
            assert.equal(object.properties.cores, config.serverSim.properties.cores);
            assert.notEqual(object.entities.volumes, null);
            setTimeout(function () {
                lib.getServer(dc.id, object.id, function (error, response, body) {
                    var object = JSON.parse(body);
                    assert.notEqual(object.id, null);
                    assert.equal(object.type, 'server');
                    assert.equal(object.properties.name, config.serverSim.properties.name);
                    assert.equal(object.properties.ram, config.serverSim.properties.ram);
                    assert.equal(object.properties.cores, config.serverSim.properties.cores);
                    assert.equal(object.properties.cpuFamily, config.serverSim.properties.cpuFamily);
                    assert.equal(object.properties.availabilityZone, config.serverSim.properties.availabilityZone);
                    assert.equal(object.properties.bootVolume.id, bootVolume.id);
                    server = object;
                    done();
                });
            }, 30000);
        });
    });

    it('Create composite server', function (done) {
        lib.createLan(dc.id, config.lan, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            config.serverCom.entities.volumes.items[0].properties.image = image;
            lib.createServer(dc.id, config.serverCom, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.notEqual(object.id, null);
                assert.equal(object.type, 'server');
                assert.equal(object.properties.name, config.serverCom.properties.name);
                assert.equal(object.properties.ram, config.serverCom.properties.ram);
                assert.equal(object.properties.cores, config.serverCom.properties.cores);
                setTimeout(function () {
                    lib.getServer(dc.id, object.id, function (error, response, body) {
                        var object = JSON.parse(body);
                        assert.notEqual(object.id, null);
                        assert.equal(object.entities.volumes.items.length > 0, true);
                        assert.equal(object.entities.nics.items.length > 0, true);
                        done();
                    });
                }, 30000);
            });
        });
    });

    it('List servers', function(done) {
        setTimeout(function() {
            lib.listServers(dc.id, function(error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.items.length > 0, true);
                assert.equal(object.items[0].type, 'server');
                done();
            });
        }, 30000);
    });

    it('Get server failure', function (done) {
        lib.getServer(dc.id, '00000000-0000-0000-0000-000000000000', function (error, response, body) {
            var object = JSON.parse(body);
            assert.equal(object['httpStatus'], 404);
            assert.equal(object['messages'][0]['message'], 'Resource does not exist');
            done();
        });
    });

    it('Create server failure', function (done) {
        var serverReq = {
            "properties": {
                "name": "NodeJS SDK Test",
                "ram": 1024
            }
        }
        lib.createServer(dc.id, serverReq, function (error, response, body) {
            var object = JSON.parse(body);
            assert.equal(object['httpStatus'], 422);
            assert.ok(object['messages'][0]['message'].indexOf("Attribute 'cores' is required") > -1);
            done();
        });
    });

    it('Stop server', function(done) {
        lib.stopServer(dc.id, server.id, function(error, response, body) {
          assert.equal(error, null);
          assert.notEqual(response, null);
          assert.equal(body, '');
          done();
        });
    });

    it('Start server', function(done) {
        setTimeout(function() {
          lib.startServer(dc.id, server.id, function(error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.equal(body, '');
            done();
          });
        }, 30000);
    });

    it('Reboot server', function(done) {
        setTimeout(function() {
          lib.rebootServer(dc.id, server.id, function(error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.equal(body, '');
            done();
          });
        }, 30000);
    });

    it('Get server', function(done) {
        lib.getServer(dc.id, server.id, function(error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.type, 'server');
            assert.equal(object.id, server.id);
            assert.equal(object.properties.name, config.serverSim.properties.name);
            assert.equal(object.properties.ram, config.serverSim.properties.ram);
            assert.equal(object.properties.cores, config.serverSim.properties.cores);
            assert.equal(object.properties.cpuFamily, config.serverSim.properties.cpuFamily);
            assert.equal(object.properties.availabilityZone, config.serverSim.properties.availabilityZone);
            assert.equal(object.properties.bootVolume.id, bootVolume.id);
            done();
        });
    });

    it('Update server', function(done) {
        updateData = {
            "properties": {
                "ram": config.serverSim.properties.ram,
                "cores": config.serverSim.properties.cores,
                "name": config.serverSim.properties.name + " - RENAME UPDATED"
            }
        };
        setTimeout(function () {
            lib.updateServer(dc.id, server.id, updateData, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.id, server.id);
                assert.equal(object.properties.name, updateData.properties.name);
                done();
            });
        }, 60000);
    });

    it('Patch server', function(done) {
        patchData = {
            "name": config.serverSim.properties.name + " - RENAME PATCHED"
        };

        lib.patchServer(dc.id, server.id, patchData, function(error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, server.id);
            setTimeout(function() {
                lib.getServer(dc.id, server.id, function(error, response, body) {
                    var object = JSON.parse(body);
                    assert.equal(object.properties.name, patchData.name);
                    done();
                });
            }, 70000);
        });
    });

    it('List attached volumes', function(done) {
        lib.listAttachedVolumes(dc.id, server.id, function(error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.items.length, 1);
            done();
        });
    });

    it('Attach volume', function(done) {
        lib.attachVolume(dc.id, server.id, volume.id, function(error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.notEqual(object.id, null);
            setTimeout(function() {
                lib.listAttachedVolumes(dc.id, server.id, function(error, response, body) {
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.equal(object.items.length, 2);
                    done();
                });
            }, 60000);
        });
    });

    it('Get attached volume', function(done) {
        setTimeout(function() {
            lib.getAttachedVolume(dc.id, server.id, volume.id, function(error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.id, volume.id);
                done();
            });
        }, 60000);
    });

    it('Detach volume', function(done) {
        lib.detachVolume(dc.id, server.id, volume.id, function(error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            setTimeout(function() {
                lib.listAttachedVolumes(dc.id, server.id, function(error, response, body) {
                    assert.equal(error, null);
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.equal(object.items.length, 1);
                    done();
                });
            }, 60000);
        });
    });

    it('Attach CDROM', function (done) {
        lib.attachCdrom(dc.id, server.id, cdRom.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, cdRom.id);
            assert.equal(object.properties.name, cdRom.properties.name);
            done();
        });
    });

    it('Get attached CDROM', function (done) {
        setTimeout(function () {
            lib.getAttachedCdrom(dc.id, server.id, cdRom.id, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.id, cdRom.id);
                assert.equal(object.properties.name, cdRom.properties.name);
                done();
            });
        }, 30000);
    });

    it('List attached CDROMs', function (done) {
        lib.listAttachedCdroms(dc.id, server.id, function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.items[0].id, cdRom.id);
            assert.equal(object.items[0].properties.name, cdRom.properties.name);
            done();
        });
    });

    it('Dettach CDROM', function (done) {
        setTimeout(function () {
            lib.detachCdrom(dc.id, server.id, cdRom.id, function (error, response, body) {
                assert.equal(error, null);
                assert.notEqual(response, null);
                assert.equal(body, '');
                setTimeout(function () {
                    lib.getAttachedCdrom(dc.id, server.id, cdRom.id, function (error, response, body) {
                        assert.equal(error, null);
                        var object = JSON.parse(body);
                        assert.equal(object.messages[0].errorCode, '309');
                        assert.equal(object.messages[0].message, 'Resource does not exist');
                        done();
                    });
                }, 30000);
            });
        }, 60000);
    });

    it('Delete server', function(done) {
        lib.deleteServer(dc.id, server.id, function(error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.equal(body, '');
            setTimeout(function() {
                lib.getServer(dc.id, server.id, function(error, response, body) {
                    assert.equal(error, null);
                    var object = JSON.parse(body);
                    assert.equal(object.messages[0].errorCode, '309');
                    assert.equal(object.messages[0].message, 'Resource does not exist');
                    done();
                });
            }, 50000);
        });
    });
});
