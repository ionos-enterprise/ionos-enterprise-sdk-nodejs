#!/usr/bin/env node

// build a datacenter with 37 servers

	
var lib=require('libionosenterprise')

lib.setauth('username','password')

var brickhouse= new lib.datacenter({
				name: 'The Brick House', 
				location: 'us/las', 	
				description: "She's a brick house" })
var servers=37
	
// reverse while loop
	
while(servers--){
	
	var srvname="srvfu"+server 
		
	var srv=new lib.server({name:srvname,cores:"5",ram:16384})
	
	brickhouse.addServer(srv)
	}
	
lib.createDatacenter(brickhouse)
