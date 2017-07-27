# NodeJS SDK

Version: profitbricks-sdk-nodejs **4.0.0**

## Table of Contents

* [Description](#description)
* [Getting Started](#getting-started)
* [Installation](#installation)
* [Usage](#usage)
  * [Authentication](#authentication)
  * [How to: Create a Data Center](#how-to-create-a-data-center)
  * [How to: Delete a Data Center](#how-to-delete-a-data-center)
  * [How to: Create a Server](#how-to-create-a-server)
  * [How to: Update Cores, Memory, and Disk](#how-to-update-cores-memory-and-disk)
  * [How to: List Servers, Volumes, and Data Centers](#how-to-list-servers-volumes-and-data-centers)
  * [How to: Create Additional Network Interfaces](#how-to-create-additional-network-interfaces)
  * [How to: Create a User](#how-to-create-a-user)
  * [How to: Create a Group](#how-to-create-a-group)
* [Reference](#reference)
  * [Contract Resources Functions](#contract-resources-functions)
  * [Data Center Functions](#data-center-functions)
  * [Firewall Rule Functions](#firewall-rule-functions)
  * [Image Functions](#image-functions)
  * [LAN Functions](#lan-functions)
  * [Load Balancer Functions](#load-balancer-functions)
  * [Location Functions](#location-functions)
  * [NIC Functions](#nic-functions)
  * [Request Functions](#request-functions)
  * [Server Functions](#server-functions)
  * [Server Volume Functions](#server-volume-functions)
  * [Server CDROM Functions](#server-cdroms-functions)
  * [Server Command Functions](#server-command-functions)
  * [Snapshot Functions](#snapshot-functions)
  * [User Management Functions](#user-management-functions)
  * [Volume Functions](#volume-functions)
* [Support](#support)
* [Testing](#testing)
* [Contributing](#contributing)

## Description

The ProfitBricks Client Library for Node.js allows interaction with the ProfitBricks platform over the REST API. It is designed for developers who are building applications in Node.js. This guide will walk you through installing the library and performing various actions against the API.

The Node.js Client Library, libprofitbricks, wraps the latest version of the ProfitBricks REST API. All API operations are performed over SSL and authenticated using your ProfitBricks account credentials. The API can be accessed within a server running on the ProfitBricks platform or directly over the Internet from any application that can send and receive HTTPS requests and responses. 

## Getting Started

Before you begin you will need to have [signed-up](https://www.ProfitBricks.com/signup) for a ProfitBricks account. The credentials you setup during sign-up will be used to authenticate against the API. 
 
## Installation

The Node.js Client Library is available on [npm](https://www.npmjs.com/package/libprofitbricks). You can install the latest stable version using npm:

    npm install libprofitbricks

## Usage

### Authentication

Connecting to ProfitBricks is handled by first setting up your authentication credentials.

    var libpb = require('libprofitbricks')
    libpb.setauth('username', 'password')

The `depth` is used to control the depth of JSON object returned. The depth value can be from 1 to 5.

    libpb.depth = 1

    libpb.setdepth(5)

### How to: Create a Data Center

ProfitBricks uses the concept of data centers. These are logically separated from one another and allow you to have a self-contained environment for all servers, volumes, networking, snapshots, and so forth. The goal is to give you the same experience as you would have if you were running your own physical data center.

You will need a data center before you can create anything else. Like the server functions, the data center functions can be used to create a simple data center or a complex one. 

To create a simple one you would do this: 

    var libpb = require('libprofitbricks')

    libpb.setauth('username', 'password')
    
    dcData = {
        "properties": {
            "name": "Test Data Center",
            "location": "us/las",
            "description": "Test description"
        }
    };
    
    libpb.createDatacenter(dcData, function(error, response, body) {
        console.log(body)
        console.log(error)
        console.log(response)        
    })
    
You can find more detailed information about data center creation [here](https://devops.profitbricks.com/api/rest/#create-a-data-center)

### How to: Delete a Data Center

You will want to exercise a bit of caution here. Removing a data center will **destroy** all objects contained within that data center including servers, volumes, snapshots, and so forth. 

    datacenter_id = '700e1cab-99b2-4c30-ba8c-1d273ddba022'

    libpb.deleteDatacenter(datacenter_id, callback)

### How to: Create a Server

The following example shows you how to create a new server in the virtual data center created above.

    var datacenter_id = '1234567-1234-1234-1234-123456789012'

    var data = {
        "properties": {
            "name": "Test Server",
            "ram": 2048,
            "cores": 1,
            "cpuFamily": "AMD_OPTERON"
        }
    }

    libpb.createServer(datacenter_id, data, function(error, response, body) {
        console.log(body)
        console.log(error)
        console.log(response)
    })

One of the unique features of the ProfitBricks platform when compared with the other providers is that it allows you to define your own settings for cores, memory, and disk size without being tied to a particular size.

### How to: Update Cores, Memory, and Disk

ProfitBricks allows users to dynamically update cores, memory, and disk independently of each other. This removes the restriction of needing to upgrade to the next instance size to receive an increase in memory. You can now simply increase the server's memory thereby keeping your costs in-line with your resource needs. 

The following code illustrates how you can update the cores and memory of a server: 

    var datacenter_id = '1234567-1234-1234-1234-123456789012'
    var server_id = '1234567-1234-1234-1234-123456789012'
    
    var data = { "properties" : { "cores": 16, "ram": 4096 } }
    
    libpb.updateServer(datacenter_id, server_id, data, callback)

### How to: List Servers, Volumes, and Data Centers

Listing resources is fairly straight forward. To view all data centers:

    libpb.listDatacenters(function(error, response, body) {
        console.log(body)
        console.log(error)
        console.log(response)        
    })

Listing servers within a data center:

    var datacenter_id = '700e1cab-99b2-4c30-ba8c-1d273ddba022'
    
    libpb.listServers(datacenter_id, callback)

Listing volumes within a data center: 

    var datacenter_id = '700e1cab-99b2-4c30-ba8c-1d273ddba022'
    
    libpb.listVolumes(datacenter_id, callback)

### How to: Create Additional Network Interfaces

The ProfitBricks platform supports adding multiple NICs to a server. These NICs can be used to create segmented networks on the platform. 

The sample below shows you how to add a second NIC to an existing server: 

    dc_id = '700e1cab-99b2-4c30-ba8c-1d273ddba022'
    server_id = '700e1cab-99b2-4c30-ba8c-1d273ddba023'
    
    var data = { name: 'nic11', ips: ['10.2.2.11'], lan: 1 }
    
    libpb.createNic(dc_id, server_id, data)

### How to: Create a User

The following example shows you how to create a new user with administrator privileges.

    var data = {
        "properties": {
            "firstname": "John",
            "lastname": "Doe",
            "email": "no-reply@example.com",
            "password": "secretpassword123",
            "administrator": true,
            "forceSecAuth": false
        }
    }

    libpb.createUser(data, function(error, response, body) {
        console.log(body)
        console.log(error)
        console.log(response)
    })

### How to: Create a Group

The following example shows you how to create a new group.

    var data = {
        "properties": {
            "name": "Test Group",
            "createDataCenter": true,
            "createSnapshot": true,
            "reserveIp": true,
            "accessActivityLog": true
        }
    }

    libpb.createGroup(data)

## Reference

### Contract Resources Functions

    listContractResources: function(callback)

### Data Center Functions

    listDatacenters: function(callback)
    
    createDatacenter: function(data, callback)
    
    getDatacenter: function(dc_id, callback)
    
    updateDatacenter: function(dc_id, data, callback)
    
    patchDatacenter: function(dc_id, data, callback)
    
    deleteDatacenter: function(dc_id, callback)

### Firewall Rule Functions

    listFWRules: function(dc_id, server_id, nic_id, callback)
    
    createFWRule: function(dc_id, server_id, nic_id, data, callback)
    
    getFWRule: function(dc_id, server_id, nic_id, fwrule_id, callback)
    
    updateFWRule: function(dc_id, server_id, nic_id,fwrule_id, data, callback)
    
    patchFWRule: function(dc_id, server_id, nic_id, fwrule_id, data, callback)
    
    delFWRule: function(dc_id, server_id, nic_id, fwrule_id, callback)

### Image Functions

    listImages: function(callback)

    getImage: function(image_id,callback)
    
    updateImage: function(image_id,data,callback)
    
    patchImage: function(image_id,data,callback)
    
    deleteImage: function(image_id,callback)

### IP Block Functions

    listIpblocks: function(callback)
    
    reserveIpblock: function(data,callback)
    
    getIpblock: function(ipblock_id,callback)
    
    releaseIpblock: function(ipblock_id,callback)

### LAN Functions

    listLans: function(dc_id,callback)
    
    createLan: function(dc_id,data,callback)
    
    getLan: function(dc_id,lan_id,callback)
    
    updateLan: function(dc_id,lan_id,data,callback)
    
    patchLan: function(dc_id,lan_id,data,callback)
    
    deleteLan: function(dc_id,lan_id,callback)
    
    listLanMembers: function(dc_id,lan_id,callback)

### Load Balancer Functions

    createLoadbalancer: function(dc_id, data, callback)
    
    deleteLoadbalancer: function(dc_id, lb_id, callback)
    
    getLoadbalancer: function(dc_id, lb_id, callback)
    
    listLoadbalancers: function(dc_id, callback)
    
    patchLoadbalancer: function(dc_id, lb_id, data, callback)
    
    updateLoadbalancer: function(dc_id, lb_id, data, callback)

### Location Functions

    getLocation: function(location_id, callback)
    
    listLocations: function(callback)

### NIC Functions

    createNic: function(dc_id, server_id, data, callback)
    
    deleteNic: function(dc_id, server_id, nic_id, callback)
    
    getNic: function(dc_id, server_id, nic_id, callback)
    
    listNics: function(dc_id, server_id, callback)
    
    patchNic: function(dc_id, server_id, nic_id, data, callback)
    
    updateNic: function(dc_id, server_id, nic_id, data, callback)

### Request Functions

    listRequests: function(callback)
    
    getRequest: function(request_id, callback)
    
    statusRequest: function(request_id, callback)

### Server Functions

    createServer: function(dc_id, data, callback)
    
    delServer: function(dc_id, server_id, callback)
    
    getServer: function(dc_id, server_id, callback)
    
    listServers: function(dc_id, callback)
    
    patchServer: function(dc_id, server_id, data, callback)
    
    updateServer: function(dc_id, server_id, data, callback)

### Server Volume Functions

    listAttachedVolumes: function(dc_id, server_id, callback)
    
    attachVolume: function(dc_id, server_id, volume_id, callback)
    
    getAttachedVolume: function(dc_id, server_id, volume_id, callback)
    
    detachVolume: function(dc_id, server_id, volume_id, callback)

### Server CDROM Functions

    listAttachedCdroms: function(dc_id, server_id, callback)
    
    attachCdrom: function(dc_id, server_id, cdrom_id, callback)
    
    getAttachedCdrom: function(dc_id,server_id, cdrom_id, callback)
    
    detachCdrom: function(dc_id, server_id, cdrom_id, callback)

### Server Command Functions

    rebootServer: function(dc_id, server_id, callback)
    
    startServer: function(dc_id, server_id, callback)
    
    stopServer: function(dc_id, server_id, callback)    

### Snapshot Functions

    deleteSnapshot: function(snapshot_id, callback)
    
    getSnapshot: function(snapshot_id, callback)
    
    listSnapshots: function(callback)
    
    patchSnapshot: function(snapshot_id, data, callback)
    
    updateSnapshot: function(snapshot_id, data, callback)
        
    createSnapshot: function(dc_id, volume_id, data, callback)
    
    restoreSnapshot: function(dc_id, volume_id, data, callback)

### User Management Functions

    listGroups: function (callback)

    createGroup: function (data, callback)

    getGroup: function (group_id, callback)

    updateGroup: function (group_id, data, callback)

    deleteGroup: function (group_id, callback)

    listUsers: function (callback)

    createUser: function (data, callback)

    getUser: function (user_id, callback)

    updateUser: function (user_id, data, callback)

    deleteUser: function (user_id, callback)

    listGroupUsers: function (group_id, callback)

    addGroupUser: function (group_id, data, callback)

    removeGroupUser: function (group_id, user_id, callback)

    listShares: function (group_id, callback)

    addShare: function (group_id, resource_id, data, callback)

    getShare: function (group_id, resource_id, callback)

    updateShare: function (group_id, resource_id, data, callback)

    removeShare: function (group_id, resource_id, callback)

    listResources: function (callback)

    listResourcesByType: function (resource_type, callback)

    getResourceByType: function (resource_type, resource_id, callback)

### Volume Functions

    listVolumes: function(dc_id, callback)
    
    createVolume: function(dc_id, data, callback)
    
    getVolume: function(dc_id, volume_id, callback)
    
    updateVolume: function(dc_id, volume_id, data, callback)
    
    patchVolume: function(dc_id, volume_id, data, callback)
    
    deleteVolume: function(dc_id, volume_id, callback)

## Support

You can find additional examples in the repository `examples` directory. If you find any issues, please let us know via the [DevOps Central community](https://devops.profitbricks.com) or [GitHub's issue system](https://github.com/profitbricks/profitbricks-sdk-nodejs/issues) and we'll check it out.

## Testing

You can find a full list of tests inside the `test` directory. Before running the tests, install the package dependencies and export your ProfitBricks credentials.
Note that the test user must have administrator privileges.


    export PROFITBRICKS_USERNAME=username
    export PROFITBRICKS_PASSWORD=password

    npm install

To run all available tests:

    npm test

or

    mocha test


To run a particular test context:

    mocha -g 'Datacenter tests'

## Contributing

1. Fork it ( https://github.com/profitbricks/profitbricks-sdk-nodejs/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
