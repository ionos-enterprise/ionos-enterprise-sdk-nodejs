// test data configuration

var config = {
    locations: ["us/las", "us/ewr", "de/fra", "de/fkb"],
    imageType: ["HDD", "CDROM"],
    licenceType: ["LINUX", "WINDOWS", "WINDOWS2016", "OTHER", "UNKNOWN"],
    dcData: {
        "properties": {
            "name": "NodeJS SDK Test",
            "location": "us/las",
            "description": "NodeJS SDK test datacenter"
        }
    },
    dcDataCom: {
        "properties": {
            "name": "NodeJS SDK Test Composite",
            "description": "NodeJS SDK test composite datacenter",
            "location": "us/las"
        },
        "entities": {
            "servers": {
                "items": [{
                    "properties": {
                        "cpuFamily": "INTEL_XEON",
                        "cores": 1,
                        "ram": 1024,
                        "name": "NodeJS SDK Test"
                    }
                }]
            },
            "volumes": {
                "items": [{
                    "properties": {
                        "availabilityZone": "ZONE_3",
                        "name": "NodeJS SDK Test",
                        "bus": "VIRTIO",
                        "licenceType": "UNKNOWN",
                        "type": "HDD",
                        "size": 2
                    }
                }]
            }
        }
    },
    lan: {
        "properties": {
            "public": "true",
            "name": "NodeJS SDK Test"
        }
    },
    lan2: {
        "properties": {
            "public": "false",
            "name": "NodeJS SDK Test"
        }
    },
    serverSim: {
        "properties": {
            "name": "NodeJS SDK Test",
            "ram": 1024,
            "cores": 1,
            "cpuFamily": "INTEL_XEON",
            "availabilityZone": "ZONE_1"
        }
    },
    serverCom: {
        "properties": {
            "name": "NodeJS SDK Test Composite",
            "ram": 1024,
            "cores": 1,
            "cpuFamily": "INTEL_XEON",
            "availabilityZone": "ZONE_1"
        },
        "entities": {
            "volumes": {
                "items": [{
                    "properties": {
                        "size": 2,
                        "name": "NodeJS SDK Test",
                        "bus": "VIRTIO",
                        "type": "HDD",
                        "image": "",
                        "availabilityZone": "ZONE_3",
                        "sshKeys": ["ssh-rsa AAAAB3NzaC1"]
                    }
                }]
            },
            "nics": {
                "items": [
                    {
                        "properties": {
                            "name": "NodeJS SDK Test",
                            "lan": 1,
                            "firewallActive": true,
                            "dhcp": true,
                            "nat": false
                        },
                        "entities": {
                            "firewallrules": {
                                "items": [{
                                    "properties": {
                                        "name": "SSH",
                                        "protocol": "TCP",
                                        "portRangeStart": 22,
                                        "portRangeEnd": 22,
                                        "sourceMac": "01:23:45:67:89:00"
                                    }
                                }]
                            }
                        }
                    }
                ]
            }
        }
    },
    bootVolume: {
        "properties": {
            "name": "NodeJS SDK Test",
            "size": 2,
            "bus": "VIRTIO",
            "type": "HDD",
            "image": "",
            "availabilityZone": "ZONE_3",
            "sshKeys": ["ssh-rsa AAAAB3NzaC1"]
        }
    },
    volume: {
        "properties": {
            "name": "NodeJS SDK Test",
            "size": 2,
            "bus": "VIRTIO",
            "licenceType": "LINUX",
            "type": "HDD",
            "availabilityZone": "ZONE_3"
        }
    },
    nic: {
        "properties": {
            "name": "NodeJS SDK Test",
            "ips": ["10.0.0.1"],
            "dhcp": true,
            "lan": 1,
            "nat": false,
            "firewallActive": true
        }
    },
    firewallRule: {
        "properties": {
            "name": "SSH",
            "protocol": "TCP",
            "portRangeStart": 22,
            "portRangeEnd": 22,
            "sourceMac": "01:23:45:67:89:00"
        }
    },
    loadbalancer: {
        "properties": {
            "name": "NodeJS SDK Test",
            "dhcp": "true"
        }
    },
    ipblock: {
        "properties": {
            "name": "NodeJS SDK Test",
            "location": "us/las",
            "size": 2
        }
    },
    snapshot: {
        "name": "NodeJS SDK Test",
        "description": "NodeJS SDK test snapshot"
    },
    group: {
        "properties": {
            "name": "NodeJS SDK Test",
            "createDataCenter": true,
            "createSnapshot": true,
            "reserveIp": true,
            "accessActivityLog": true
        }
    },
    user: {
        "properties": {
            "firstname": "John",
            "lastname": "Doe",
            "email": "",
            "password": "",
            "administrator": true,
            "forceSecAuth": false
        }
    },
    share: {
        "properties": {
            "editPrivilege": true,
            "sharePrivilege": true
        }
    }
};

module.exports = config;
