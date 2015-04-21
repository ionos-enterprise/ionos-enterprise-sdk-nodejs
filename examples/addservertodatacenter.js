#!/usr/bin/env node

var libpb=require('libprofitbricks')

libpb.setauth('username','password')
	
var datacenter_id = '700e1cab-99b2-4c30-ba8c-1d273ddba022'//<--change to one of your datacenters

 
var srv = new libpb.server(
        			{name:'server1',// <--- Inits with json 
        			ram:4096,
        			cores:4}
        			)
libpb.createServer(datacenter_id, srv)