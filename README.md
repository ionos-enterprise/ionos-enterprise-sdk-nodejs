The ProfitBricks Client Library for Node.js provides you with access to the libprofitbricks REST API. The client library supports both simple and complex requests. It is designed for developers who are building applications in Node.js. 

This guide will walk you through getting setup with the library and performing various actions against the API.  

## Table of Contents

* [Concepts](#concepts)
* [Getting Started](#getting-started)
* [Installation](#installation)
* [Authenticating](#authenticating)
* [Using the Module](#using-the-module)
* [Making JSON Objects (The Easy Way)](#making-json-objects-the-easy-way)
* [Fallback Callbacks](#fallback-callbacks)
* [Reserve an Ipblock](#reserve-an-ipblock)
* [Create a Server with Two Nics.](#create-a-server-with-two-nics)
* [Build a datacenter and quickly add 37 servers](#build-a-datacenter-and-quickly-add-37-servers)
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
* [Additional Documentation and Support](#additional-documentation-and-support)
* [Conclusion](#conclusion)

## Concepts

The Node.js Client Library , libprofitbricks , wraps the latest version of the ProfitBricks REST API. All API operations are performed over SSL and authenticated using your libprofitbricks portal credentials. The API can be accessed within an instance running in libprofitbricks or directly over the Internet from any application that can send an HTTPS request and receive an HTTPS response. 

## Getting Started

Before you begin you will need to have [signed-up](https://www.ProfitBricks.com/signup) for a ProfitBricks account. The credentials you setup during sign-up will be used to authenticate against the API. 
 
## Installation

The Node.js Client Library is available on [npm](https://www.npmjs.com/package/libprofitbricks). You can install the latest stable version using 
npm:
```javascript
    npm install -g libprofitbricks
```    
Done!

## Authenticating

Connecting to ProfitBricks is handled by first setting up your authentication.  
```javascript
    	var libpb=require('libprofitbricks')
	libpb.setauth('username','password')
```	
## Using the Module
* All of the functions are available in the top level libprofitbricks namespace
```javascript 
   	libpb=require('libprofitbricks')
	libpb.setauth('username','password')
	var srv= new libpb.server() 
```

## Making JSON Objects (The Easy Way)

* There are several functions you can use to assemble ProfitBricks json objects.
* These functions work as object factories, they return json objects.
* The json objects can then be used to create resources at ProfitBricks. 

For example,If you want to create a ProfitBricks data center, you can use the libprofitsbricks.datacenter function
to generate a json object with the properties of your new data center.

```javascript
	libpb=require('libprofitbricks')
	libpb.setauth('username','password')
	var props={"name":"UltraMega Data Center","location":"us/las","description":"UltraMega description"}
	var dc= new libpb.datacenter(props)// <--- dc is a json object 
```

```javascript

	> dc.show() //<--- show what dc properties are set
		{
		"properties":
			{"name":"UltraMega Data Center",
			"location":"us/las",
			"description":"UltraMega description"},
		"entities":
		{"servers":{"items":[]}, 
		"lans":{"items":[]}, 
		"loadbalancers":{"items":[]},
		"volumes":{"items":[]}}
		}
```
You can set individual properties on the object by calling it's set function.

```javascript

	dc.set('name', 'BrickHouse') // <--- Sets name for the data center dc
```

Many of the json objects, like dc, our datacenter json object, can have subobjects. 
These subobjects are listed as "entities" when you call an objects show() function.

```javascript

	> dc.show() //<--- show what dc properties are set
		{
		"properties":
			{"name":"UltraMega Data Center",
			"location":"us/las",
			"description":"UltraMega description"},
			
		"entities": // <--- Subobjects 
		{"servers":{"items":[]},
		"lans":{"items":[]},
		"loadbalancers":{"items":[]},
		"volumes":{"items":[]}}
		}
```
* Entities can be added to the json object through the json objects functions.

```javascript
	
	var srv=new libpb.server({name:srvname,cores:"5",ram:16384})
	dc.addServer(srv)
    

	>dc.show()
		{
		"properties":
		{"name":"goat","location":"us/las","description":"a good one"},
		"entities":
		{"servers":{"items":
			[{"properties":{"name":"srvname","ram":16384,"cores":"5"}]
			},
		,"lans":{"items":[]},
		"loadbalancers":{"items":[]},
		"volumes":{"items":[]}}
}

```
These are the object factory functions.
* Calling them with "new" is not required. I call then with "new" in these docs to indicate object creation 

```javascript

 	datacenter: function(props)
	
        server: function(props)

        nic: function(props)

        firewallrule: function(props)

        image: function(props)

        ipblock: function(props)

        loadbalancer: function(props)

        lan: function(props)

        snapshot: function(props)

        volume: function(props)
 ```
Another Example

```javascript
   	libpb=require('libprofitbricks')
	libpb.setauth('username','password')
	
	
	var srv= new libpb.server({"name":"f", 
	                           "ram":"3192",
				   "cores":"1"}) // <--- props passed in

 	> srv.show()
	{
	"properties":
	{"name":"f","ram":3192,"cores":1}, // <--- props passed out 
	"entities":
	{"cdroms":{"items":[]},
	"nics":{"items":[]},
	"volumes":{"items":[]}}
	}

```

* "props" can be any or all or none of the properties for the object.

* Invalid "props" keys are dropped.

```javascript
	var srv= new libpb.server({'bill':3}) // <--- Drops the 'bill' key

	> srv.show()
	{
	"properties":
	{"name":"f","ram":"3192","cores":"1"},
	"entities":
	{"cdroms":{"items":[]},"nics":{"items":[]},"volumes":{"items":[]}}
	}
```

* Bad values for valid "props" keys are passed to the server and the error is returned.
.
Show() is handy for listing the properties available to an object.
	
```javascript	
	> libpb=require('libprofitbricks')
	> new libpb.volume().show()
		{
		"properties": {
		"name":"v is for volume", 
		"size":80, 
		"bus":"VIRTIO", "image":"",
		"imagePassword":"null",
		"type":"HDD",
		"licenceType":"UNKNOWN",
		"cpuHotPlug":false,
		"cpuHotUnplug":false,
		"ramHotPlug":false,
		"ramHotUnplug":false,
		"nicHotPlug":false,
		"nicHotUnplug":false,
		"discVirtioHotPlug":false,
		"discVirtioHotUnplug":false,
		"discScsiHotPlug":false,
		"discScsiHotUnplug":false
		},
		"entities":undefined
		}
```

* Use the json objects to allocate resources at ProfitBricks. 
 

```javascript
	libpb=require('libprofitbricks')
	libpb.setauth('username','password')
	
	var dc= new libpb.datacenter() // <--- Makes the json object dc
	
	dc.set('name', 'BrickHouse') // <--- Sets name for the data center dc
	
	libpb.createDatacenter(dc)  // <--- Creates a data center at ProfitBricks


```	
  

```javascript

   	libpb=require('libprofitbricks')
	libpb.setauth('username','password')
	
	var srv= new libpb.server() // <--- Makes the server json object srv 


	 srv.set('name','srvfu57')// <--- Sets a property for the server srv

	 srvfu57
	
	 > srv.show()  // <--- Shows the json object
	
		{
		"properties":
		{"name":"srvfu57","ram":0,"cores":0},
		"entities":
		{"cdroms":{"items":[]},"nics":{"items":[]},"volumes":{"items":[]}}
		}

```
## List Our Datacenters.
```javascript
   	var libpb=require('libprofitbricks')

	libpb.setauth('username','password')
	
    	libpb.listDatacenters(myOptionalCallback)
```

## Fallback Callbacks	
* if a callback is not included, pbreq.fallback is used as the callback.
```javascript	
	
	// pbreq.fallback
	
	function fallback(error, response, body) {
			if (error){ console.log("error", error)	}
		
			if (response){ console.log('Status:', response.statusCode) }	
		
			if (body){console.log("body", body) }
	}		
	
```
## Reserve an IPBlock:
```javascript
 
   	var libpb=require('libprofitbricks')
	libpb.setauth('username','password')
	
    	var ipblk = new libpb.ipblock()

	ipblk.set('location','de/fkb')
	ipblk.set('size', 5)	

	libpb.reserveIpblock(ipblk)

```
* Simple Creation

```javascript
   	var libpb=require('libprofitbricks')

	libpb.setauth('username','password')
	
    	var datacenter_id = '700e1cab-99b2-4c30-ba8c-1d273ddba022'

 
    	var srv = new libpb.server(
        			{name:'server1',// <--- Inits with json 
        			ram:4096,
        			cores:4}
        			)
    	libpb.createServer(datacenter_id, srv)
       
```

## Create a Server with Two Nics. 
* Complex Creation

```javascript
   	var libpb=require('libprofitbricks')
	libpb.setauth('username','password')
    	var datacenter_id = '700e1cab-99b2-4c30-ba8c-1d273ddba022'
    	var srv = new libpb.server({name:'server1',
        				ram:4096,
        				cores:4} )
        
	var nic7 = libpb.nic(	{name:'nic7',
				ips:['10.2.2.7'],
				dhcp:'true',
        			lan:1,
        			firewall_active:true})
				
	var nic9 = libpb.nic(	{name:'nic9',
				ips:['10.2.2.9'],
				dhcp:'true',
        			lan:1,
        			firewall_active:true})			
	
	srv.addNic(nic7)
	srv.addNic(nic9)

		
    	libpb.createServer(datacenter_id, srv,mycallback)
```

## Build a datacenter and quickly add 37 servers
```javascript
	
	var libpb=require('libprofitbricks')

	libpb.setauth('username','password')

	var brickhouse= new libpb.datacenter({
				name: 'The Brick House', 
				location: 'us/las', 	
				description: "She's a brick house" })
	var servers=37
	
	// reverse while loop
	
	while(servers--){
	
		var srvname="srvfu"+server 
		
		var srv=new libpb.server({name:srvname,cores:"5",ram:16384})
	
		brickhouse.addServer(srv)
	}
	
	libpb.createDatacenter(brickhouse, myOptionalCallback )

```
## How to: Create a Datacenter

ProfitBricks introduces the concept of Virtual Datacenters. These are logically separated from one and the other and allow you to have a self-contained environment for all servers, volumes, networking, snapshots, and so forth. The goal is to give you the same experience as you would have if you were running your own physical datacenter.

You will need a datacenter before you can create anything else. Like the server functions, the datacenter functions can be used to create a simple vDC or a complex one. 

To create a simple one you would do this: 
```javascript	

	var libpb=require('libprofitbricks')

	libpb.setauth('username','password')
    
    	var dc = new libpb.datacenter()
	
	dc.set('name','my datacenter')
	
	libpb.createDatacenter(dc)
	
```	
	
```javascript
   	var libpb=require('libprofitbricks')

	libpb.setauth('username','password')
	 
    	var srv = new libpb.server({name:'server1',
        				ram:4096,
        				cores:4} )
        
	var nic7 = libpb.nic(	{name:'nic7',
				ips:['10.2.2.7'],
				dhcp:'true',
        			lan:1,
        			firewall_active:true})			
	
	srv.addNic(nic7)

	var nic9 = libpb.nic(	{name:'nic9',
				ips:['10.2.2.9'],
				dhcp:'true',
        			lan:1,
        			firewall_active:true})		

	srv.addNic(nic9)
	
  	
	var dc = new libpb.datacenter()

	dc.set('name','my datacenter')
	
	dc.addServer(srv)
	
	libpb.createDatacenter(dc)
```	
## How to: Delete a Datacenter

You will want to exercise a bit of caution here. 
Removing a datacenter will **destroy** all objects contained within that datacenter,
servers, volumes, snapshots, and so on. 

* The objects -- once removed -- will be unrecoverable. 
```javascript

	var libpb=require('libprofitbricks')

	libpb.setauth('username','password')
	 
    	datacenter_id = '700e1cab-99b2-4c30-ba8c-1d273ddba022'
    	
	libpb.deleteDatacenter(datacenter_id, myOptionalCallback)
	
```
## How to: Update Cores, Memory, and Disk

libprofitbricks allows users to dynamically update cores, memory, and disk independently of each other. This removes the restriction of needing to upgrade to the next size up to receive an increase in memory. You can now simply increase the instances memory keeping your costs in-line with your resource needs. 

* The following code illustrates how you can update cores and memory: 
```javascript
	var libpb=require('libprofitbricks')

	libpb.setauth('username','password')
	 
    	var datacenter_id = '700e1cab-99b2-4c30-ba8c-1d273ddba022'
    	var server_id = '700e1cab-99b2-4c30-ba8c-1d273ddba023'
	
	var jason={ cores:'16',ram:'2048' } // aka the server update values

    	libpb.updateServer(datacenter_id,server_id,jason,myOptionalCallback)
``` 
## How to: List Servers, Volumes, and Data Centers

Listing resources is fairly straight forward. 

* Listing the datacenters:

```javascript
    	var libpb=require('libprofitbricks')

	libpb.setauth('username','password')
	
	libpb.listDatacenters(myOptionalCallback)
```
* Listing servers in a data center:
```javascript
      	var libpb=require('libprofitbricks')

	libpb.setauth('username','password')
	 
    	var datacenter_id = '700e1cab-99b2-4c30-ba8c-1d273ddba022'
		
	libpb.listServers(datacenter_id,myOptionalCallback)
```

* Listing your volumes: 

```javascript

      	var libpb=require('libprofitbricks')

	libpb.setauth('username','password')
	 
    	var datacenter_id = '700e1cab-99b2-4c30-ba8c-1d273ddba022'
		
	libpb.listVolumes(datacenter_id,myOptionalCallback)
```

## How to: Create Additional Network Interfaces

* The ProfitBricks platform supports adding multiple NICs to a server. 
* These NICs can be used to create different, segmented networks on the platform. 

The sample below shows you how to add a second NIC to an existing server: 
```javascript
      	var libpb=require('libprofitbricks')

	libpb.setauth('username','password')
	 
    	dc_id = '700e1cab-99b2-4c30-ba8c-1d273ddba022'
    	srv_id = '700e1cab-99b2-4c30-ba8c-1d273ddba023'

   	var jason={name:'nic11',ips:['10.2.2.11'],dhcp:'false',lan:1,firewall_active:true})

	libpb.createNic(dc_id,srv_id,jason,myOptionalCallback)	
```


* libprofitbricks exposes the options object from the request module,

```javascript
>libpb.options
{ headers: {} }
``` 
* depth is used to control the amount of json returned, the scale is 1 to 5.
```
libpb.depth= 1,

libpb.setdepth: function(depth)
```
just to make it cleaner

```javascript		
libpb.setauth: function(username,password)
```
* pbauth takes a pre-encoded string for http basic authentication

```javascript 
libpb.pbauth: function(sixfourstring)
```
 
## Datacenter functions
```javascript
	datacenter: function(props)
		this.show=function()
		this.set=function(property,value)	
		this.properties={
			
			 	name : "",
				location : "",
				description:""
			
				}
				
		this.entities= {
				servers: { items: []},
				lans: {items: []},
				loadbalancers: {items: []},
				volumes: {items: [] }
				}		
		
		this.addServer=function(aserver)
		
		this.addLan=function(alan)
		
		this.addLoadbalancer=function(aloadbalancer)
		
		this.addVolume=function(avolume)
```

```javascript

	listDatacenters: function(callback)

	createDatacenter: function(jason,callback)

	getDatacenter: function(dc_id,callback)

	updateDatacenter: function(dc_id,jason,callback)

	patchDatacenter: function(dc_id,jason,callback)

	deleteDatacenter: function(dc_id,callback)
```	
## Firewall Rule functions
```javascript

	firewallrule:function (props)
		this.set=function(property,value)
		this.show=function()
		this.properties={
    		
			"name": "port",
			"protocol": "TCP",
			"sourceMac": "",
			"sourceIp": '',
			"targetIp": '',
			"portRangeStart": 0,
			"portRangeEnd": "",
			"icmpType": "",
			"icmpCode": ""
  		}
	
	listFWRules : function(dc_id,srv_id,nic_id,callback)

	createFWRule : function(dc_id,srv_id,nic_id,jason,callback)

	getFWRule : function(dc_id,srv_id,nic_id,fwrule_id,callback)

	updateFWRule  : function(dc_id,srv_id,nic_id,fwrule_id,jason,callback)
	
	patchFWRule : function(dc_id,srv_id,nic_id,fwrule_id,jason,callback)
	
	delFWRule : function(dc_id,srv_id,nic_id,fwrule_id,callback)

		
```
## Image functions
```javascript

	listImages : function(callback)

	getImage : function(image_id,callback)

	updateImage : function(image_id,jason,callback)

	patchImage : function(image_id,jason,callback)
	
	deleteImage : function(image_id,callback)

```
## Ipblock functions
```javascript
 
 	ipblock: function(props)
		this.show=function()	
		this.set=function(property,value)
		this.properties= {
		
			size: 5,	
			ips: [],
			location: "de/fkb"
  		}
```

```javascript		

	listIpblocks : function(callback)
	
	reserveIpblock : function(jason,callback)
	
	getIpblock : function(ipblock_id,callback)
	
	releaseIpblock : function(ipblock_id,callback)
	
```
## Lan functions
```javascript		

	lan: function(props)
		this.show=function()
		this.set=function(property,value)
		this.properties={
    			
				name: "",	
				public: ""
				}
		
			
  		this.entities={
    		
			nics: { items: [] } 	
		}
		
		this.addNic=function(anic)
```

```javascript

	listLans: function(dc_id,callback)

	createLan: function(dc_id,jason,callback)

	getLan: function(dc_id,lan_id,callback)

	updateLan: function(dc_id,lan_id,jason,callback)

	patchLan: function(dc_id,lan_id,jason,callback)

	deleteLan: function(dc_id,lan_id,callback)

	listLanMembers: function(dc_id,lan_id,callback)
```					
## Loadbalancer functions
```javascript		

	loadbalancer: function (props)
		this.show=function()
		this.set=function(property,value)
		this.properties={
    			
				name: "",		
				ip: "",
				dhcp: ""
				}
		
		  		this.entities={
    				balancednics: { items: [] } 	
							}
		
		this.addBalancedNic=function(abalnic)

```

```javascript

	createLoadbalancer: function(dc_id,jason,callback)
	
	deleteLoadbalancer: function(dc_id,lbal_id,callback)

	getLoadbalancer: function(dc_id,lbal_id,callback)
	
	listLoadbalancers: function(dc_id,callback)

	patchLoadbalancer: function(dc_id,lbal_id,jason,callback)
	
	updateLoadbalancer: function(dc_id,lbal_id,jason,callback)
```
## Location functions
```javascript

	getLocation : function(location_id,callback)
	
	listLocations : function(callback)
```	
	
## Nic functions
```javascript

	nic: function(props)
		this.show=function()
		this.set=function(property,value)
		this.properties={
				name: "",
				mac: "",
				ips: [],
				dhcp: "",
				lan :  "",
				firewallActive:""
			
				}
		
		
		this.entities={
				firewallrules: {items: []}
			
				}
		
		this.addFwrule=function(afwrule)
```

```javascript

	createNic: function(dc_id,srv_id,jason,callback)
	
	deleteNic: function(dc_id,srv_id,nic_id,callback)

	getNic: function(dc_id,srv_id,nic_id,callback)
	
	listNics: function(dc_id,srv_id,callback)
	
	patchNic: function(dc_id,srv_id,nic_id,jason,callback)

	updateNic: function(dc_id,srv_id,nic_id,jason,callback)
```	
	

## Request functions
```javascript	

	listRequests : function(callback)
	
	getRequest : function(request_id,callback)
	
	statusRequest: function(request_id,callback)
```	
	
## Server functions
```javascript	

	server: function(props)
		this.show=function()
		this.set=function(property,value)
		this.properties={
		
				name : "",
			 	ram : 0,
			 	cores : 0
				}		
	
		this.entities={
		
				cdroms: { items: []},		
				nics: {items: []},
				volumes: {items: [] }
		
				}	

		this.addNic=function(anic)
```

```javascript

	createServer: function(dc_id,jason,callback)
	
	delServer: function(dc_id,srv_id,callback)

	getServer: function(dc_id,srv_id,callback)
	
	listServers: function(dc_id,callback)

	patchServer: function(dc_id,srv_id,jason,callback)

	updateServer: function(dc_id,srv_id,jason,callback)
```	
## Server volumes	
```javascript

	listAttachedVolumes : function(dc_id,srv_id,callback)

	attachVolume : function(dc_id,srv_id,jason,callback)
	
	getAttachedVolume : function(dc_id,srv_id,volume_id,callback)
	
	detachVolume : function(dc_id,srv_id,volume_id,callback)
```
## Server CDRoms
```javascript

	listAttachedCdroms : function(dc_id,srv_id,callback)
	
	attachCdrom : function(dc_id,srv_id,jason,callback)
	
	getAttachedCdrom : function(dc_id,srv_id,cdrom_id,callback)
	
	detachCdrom : function(dc_id,srv_id,cdrom_id,callback)
```
## Server Commands
```javascript

	rebootServer: function(dc_id,srv_id,jason,callback)

	startServer: function(dc_id,srv_id,jason,callback)
	
	stopServer: function(dc_id,srv_id,jason,callback)	
```			

## Snapshot functions
```javascript

	snapshot: function(props)
		this.show=function()
		this.set=function(property,value)
	 	this.properties= {
	
			name: "The Snapshot",
			description: "description of a snapshot",
			location: "de/fkb",
			size: 28,
			cpuHotPlug: false,
			cpuHotUnplug: false,
			ramHotPlug: false,
			ramHotUnplug: false,
			nicHotPlug: false,
			nicHotUnplug: false,
			discVirtioHotPlug: false,
			discVirtioHotUnplug: false,
			discScsiHotPlug: false,
			discScsiHotUnplug: false,
			licenceType: "UNKNOWN"
  	
			}
	
```

```javascript	

	deleteSnapshot : function(snapshot_id,callback)
	
	getSnapshot : function(snapshot_id,callback)
	
	listSnapshots : function(callback)

	patchSnapshot : function(snapshot_id,jason,callback)
	
	updateSnapshot : function(snapshot_id,jason,callback)
		
	createSnapshot : function(dc_id,volume_id,str,callback)
	
	restoreSnapshot : function(dc_id,volume_id,jason,callback)
	
```
## Volume functions
```javascript	

	volume: function(props)
	
		this.show=function()
	
		this.set=function(property,value)

		this.properties= {
  
    			"name": "",
			"size": 80,
    			"bus": "VIRTIO",
    			"image": "",
    			"imagePassword": "",
    			"type": "HDD",
			"licenceType": "",
    			"cpuHotPlug": false,
			"cpuHotUnplug": false,
			"ramHotPlug": false,
			"ramHotUnplug": false,
			"nicHotPlug": false,
			"nicHotUnplug": false,
			"discVirtioHotPlug": false,
			"discVirtioHotUnplug": false,
			"discScsiHotPlug": false,
			"discScsiHotUnplug": false
  		}
```

```javascript		

	listVolumes : function(dc_id,callback)

	createVolume: function(dc_id,jason,callback)

	getVolume : function(dc_id,volume_id,callback)

	updateVolume : function(dc_id,volume_id,jason,callback)
	
	patchVolume : function(dc_id,volume_id,jason,callback)
	
	deleteVolume : function(dc_id,volume_id,callback)

```

## Additional Documentation and Support

You can find additional examples in our repo [here]. If you find any issues, please let us know via the DevOps Central community or GitHub's issue system and we'll check it out. 



## Conclusion

We touched on only a few ways you can interact with the libprofitbricks API using Node.js. 
If you have any other question, ping us in the community. 
			
		
