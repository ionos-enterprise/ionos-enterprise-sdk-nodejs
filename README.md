The ProfitBricks Client Library for Node.js provides you with access to the libprofitbricks REST API. The client library supports both simple and complex requests. It is designed for developers who are building applications in Node.js. 

This guide will walk you through getting setup with the library and performing various actions against the API.  

## Table of Contents

* [Concepts](#concepts)
* [Getting Started](#getting-started)
* [Installation](#installation)
* [Authenticating](#authenticating)
* [How to: Create a Datacenter](#how-to-create-a-datacenter)
* [How to: Delete a Datacenter](#how-to-delete-a-datacenter)
* [How to: Update Cores, Memory, and Disk](#how-to-update-cores-memory-and-disk)
* [How to: List Servers, Volumes, and Data Centers](#how-to-list-servers-volumes-and-data-centers)
* [How to: Create Additional Network Interfaces](#how-to-create-additional-network-interfaces)
* [Datacenter functions](#datacenter-functions)
* [Firewall Rule functions](#firewall-rule-functions)
* [Image functions](#image-functions)
* [Lan functions](#lan-functions)
* [Loadbalancer functions](#loadbalancer-functions)
* [Location functions](#location-functions)
* [Nic functions](#nic-functions)
* [Request functions](#request-functions)
* [Server functions](#server-functions)
* [Server Commands](#server-commands)
* [Snapshot functions](#snapshot-functions)
* [Volume functions](#volume-functions)

## <a name="Concepts"></a>Concepts

The Node.js Client Library, libprofitbricks, wraps the latest version of the ProfitBricks REST API. All API operations are performed over SSL and authenticated using your libprofitbricks portal credentials. The API can be accessed within an instance running in libprofitbricks or directly over the Internet from any application that can send an HTTPS request and receive an HTTPS response. 

## Getting Started

Before you begin you will need to have [signed-up](https://www.ProfitBricks.com/signup) for a ProfitBricks account. The credentials you setup during sign-up will be used to authenticate against the API. 
 
## Installation

The Node.js Client Library is available on [npm](https://www.npmjs.com/package/libprofitbricks). You can install the latest stable version using 
npm:

    npm install libprofitbricks

Done!

## Authenticating

Connecting to ProfitBricks is handled by first setting up your authentication.  

	var libpb=require('libprofitbricks')
	libpb.setauth('username','password')

depth is used to control the depth of JSON object returned, the scale is 1 to 5.

    libpb.depth= 1,

    libpb.setdepth(5)

## <a name="how-to-create-a-datacenter"></a>How to: Create a Data Center

ProfitBricks introduces the concept of Data Centers. These are logically separated from one and the other and allow you to have a self-contained environment for all servers, volumes, networking, snapshots, and so forth. The goal is to give you the same experience as you would have if you were running your own physical data center.

You will need a data center before you can create anything else. Like the server functions, the data center functions can be used to create a simple data center or a complex one. 

To create a simple one you would do this: 
	

	var libpb=require('libprofitbricks')

	 dcData = {
            "properties": {
                "name":"Test Data Center",
                "location":"us/las",
                "description":"Test description"
            }
        };
	
	libpb.createDatacenter(dcData, function(error, response, body){
		console.log(body)
 		console.log(error)
 		console.log(response)		
	})
	
You can find more detailed information about data center creation [here](https://devops.profitbricks.com/api/rest/#create-a-data-center)

## <a name="how-to-delete-a-datacenter"></a>How to: Delete a Data Center

You will want to exercise a bit of caution here. 
Removing a data center will **destroy** all objects contained within that data center,
servers, volumes, snapshots, and so on. 


	var libpb=require('libprofitbricks')

	libpb.setauth('username','password')
	 
	datacenter_id = '700e1cab-99b2-4c30-ba8c-1d273ddba022'
    	
	libpb.deleteDatacenter(datacenter_id, callback)

## How to: Update Cores, Memory, and Disk

libprofitbricks allows users to dynamically update cores, memory, and disk independently of each other. This removes the restriction of needing to upgrade to the next size up to receive an increase in memory. You can now simply increase the instances memory keeping your costs in-line with your resource needs. 

The following code illustrates how you can update cores and memory: 

	var libpb=require('libprofitbricks')

	libpb.setauth('username','password')
	 
	var datacenter_id = '1234567-1234-1234-1234-123456789012'
	var server_id = '1234567-1234-1234-1234-123456789012'

	var data ={ cores:'16',ram:'2048' } 

	libpb.updateServer(datacenter_id, server_id, data, callback)

## How to: List Servers, Volumes, and Data Centers

Listing resources is fairly straight forward. 

Listing the datacenters:

## List Our Data Centers

   	var libpb=require('libprofitbricks')

	libpb.setauth('username','password')
	
    	libpb.listDatacenters(function(error, response, body){
			console.log(body)
     		console.log(error)
     		console.log(response)		
		})


Listing servers in a data center:

  	var libpb=require('libprofitbricks')

	libpb.setauth('username','password')
	 
	var datacenter_id = '700e1cab-99b2-4c30-ba8c-1d273ddba022'
		
	libpb.listServers(datacenter_id, callback)


Listing your volumes: 

  	var libpb=require('libprofitbricks')

	libpb.setauth('username','password')
	 
	var datacenter_id = '700e1cab-99b2-4c30-ba8c-1d273ddba022'
		
	libpb.listVolumes(datacenter_id, callback)

## How to: Create Additional Network Interfaces

The ProfitBricks platform supports adding multiple NICs to a server. 
These NICs can be used to create different, segmented networks on the platform. 

The sample below shows you how to add a second NIC to an existing server: 

  	var libpb=require('libprofitbricks')

	libpb.setauth('username','password')
	 
	dc_id = '700e1cab-99b2-4c30-ba8c-1d273ddba022'
	srv_id = '700e1cab-99b2-4c30-ba8c-1d273ddba023'

   	var jason={name:'nic11',ips:['10.2.2.11'],lan:1})

	libpb.createNic(dc_id,srv_id,jason)	

## Datacenter functions

	listDatacenters: function(callback)

	createDatacenter: function(jason,callback)

	getDatacenter: function(dc_id,callback)

	updateDatacenter: function(dc_id,jason,callback)

	patchDatacenter: function(dc_id,jason,callback)

	deleteDatacenter: function(dc_id,callback)

## Firewall Rule functions
		
	listFWRules : function(dc_id,srv_id,nic_id,callback)

	createFWRule : function(dc_id,srv_id,nic_id,jason,callback)

	getFWRule : function(dc_id,srv_id,nic_id,fwrule_id,callback)

	updateFWRule  : function(dc_id,srv_id,nic_id,fwrule_id,jason,callback)
	
	patchFWRule : function(dc_id,srv_id,nic_id,fwrule_id,jason,callback)
	
	delFWRule : function(dc_id,srv_id,nic_id,fwrule_id,callback)

## Image functions

	listImages : function(callback)

	getImage : function(image_id,callback)

	updateImage : function(image_id,jason,callback)

	patchImage : function(image_id,jason,callback)
	
	deleteImage : function(image_id,callback)

## Ipblock functions

	listIpblocks : function(callback)
	
	reserveIpblock : function(jason,callback)
	
	getIpblock : function(ipblock_id,callback)
	
	releaseIpblock : function(ipblock_id,callback)

## Lan functions

	listLans: function(dc_id,callback)

	createLan: function(dc_id,jason,callback)

	getLan: function(dc_id,lan_id,callback)

	updateLan: function(dc_id,lan_id,jason,callback)

	patchLan: function(dc_id,lan_id,jason,callback)

	deleteLan: function(dc_id,lan_id,callback)

	listLanMembers: function(dc_id,lan_id,callback)

## Loadbalancer functions


	createLoadbalancer: function(dc_id,jason,callback)
	
	deleteLoadbalancer: function(dc_id,lbal_id,callback)

	getLoadbalancer: function(dc_id,lbal_id,callback)
	
	listLoadbalancers: function(dc_id,callback)

	patchLoadbalancer: function(dc_id,lbal_id,jason,callback)
	
	updateLoadbalancer: function(dc_id,lbal_id,jason,callback)

## Location functions

	getLocation : function(location_id,callback)
	
	listLocations : function(callback)
	
## Nic functions

	createNic: function(dc_id,srv_id,jason,callback)
	
	deleteNic: function(dc_id,srv_id,nic_id,callback)

	getNic: function(dc_id,srv_id,nic_id,callback)
	
	listNics: function(dc_id,srv_id,callback)
	
	patchNic: function(dc_id,srv_id,nic_id,jason,callback)

	updateNic: function(dc_id,srv_id,nic_id,jason,callback)
	

## Request functions

	listRequests : function(callback)
	
	getRequest : function(request_id,callback)
	
	statusRequest: function(request_id,callback)
	
## Server functions

	createServer: function(dc_id,jason,callback)
	
	delServer: function(dc_id,srv_id,callback)

	getServer: function(dc_id,srv_id,callback)
	
	listServers: function(dc_id,callback)

	patchServer: function(dc_id,srv_id,jason,callback)

	updateServer: function(dc_id,srv_id,jason,callback)

## Server volumes	

	listAttachedVolumes : function(dc_id,srv_id,callback)

	attachVolume : function(dc_id,srv_id,volume_id,callback)
	
	getAttachedVolume : function(dc_id,srv_id,volume_id,callback)
	
	detachVolume : function(dc_id,srv_id,volume_id,callback)

## Server CDRoms

	listAttachedCdroms : function(dc_id,srv_id,callback)
	
	attachCdrom : function(dc_id,srv_id,cdrom_id,callback)
	
	getAttachedCdrom : function(dc_id,srv_id,cdrom_id,callback)
	
	detachCdrom : function(dc_id,srv_id,cdrom_id,callback)

## Server Commands

	rebootServer: function(dc_id,srv_id,callback)

	startServer: function(dc_id,srv_id,callback)
	
	stopServer: function(dc_id,srv_id,callback)	

## Snapshot functions

	deleteSnapshot : function(snapshot_id,callback)
	
	getSnapshot : function(snapshot_id,callback)
	
	listSnapshots : function(callback)

	patchSnapshot : function(snapshot_id,jason,callback)
	
	updateSnapshot : function(snapshot_id,jason,callback)
	
	/** createSnapshot jason can have name and/or description **/
		
	createSnapshot : function(dc_id,volume_id,jason,callback)
	
	
	restoreSnapshot : function(dc_id,volume_id,jason,callback)

## Volume functions

	listVolumes : function(dc_id,callback)

	createVolume: function(dc_id,jason,callback)

	getVolume : function(dc_id,volume_id,callback)

	updateVolume : function(dc_id,volume_id,jason,callback)
	
	patchVolume : function(dc_id,volume_id,jason,callback)
	
	deleteVolume : function(dc_id,volume_id,callback)

