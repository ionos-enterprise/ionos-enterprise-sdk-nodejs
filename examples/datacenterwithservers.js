#!/usr/bin/env node

// build a datacenter with 37 servers

	
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
	
libpb.createDatacenter(brickhouse)
