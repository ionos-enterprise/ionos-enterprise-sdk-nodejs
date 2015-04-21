#!/usr/bin/env node

//Data center and server with two nics

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
	
  	
var dc = new libpb.datacenter({'name':'My Datacenter'location: 'us/las', 	
				description: "She's a brick house" })

dc.set('name','my datacenter')
	
dc.addServer(srv)
	
libpb.createDatacenter(dc)