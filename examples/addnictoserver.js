#!/usr/bin/env node 

var libpb=require('libprofitbricks')

libpb.setauth('username','password')
	 
dc_id = '700e1cab-99b2-4c30-ba8c-1d273ddba022' //<--- use your own data center id
srv_id = '700e1cab-99b2-4c30-ba8c-1d273ddba023' // <--- use your own server id

var jason = {   
		name:'nic11',
		ips:['10.2.2.11'],
		lan:1,
		firewall_active:true
	    }

libpb.createNic(dc_id,srv_id,jason)	