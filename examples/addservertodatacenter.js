#!/usr/bin/env node

var libpb=require('libprofitbricks')

libpb.setauth('username','password')
	
var datacenter_id = '700e1cab-99b2-4c30-ba8c-1d273ddba022'//<--change to one of your datacenters

 

var srv = new libpb.server({ name:'server1',// <--- Inits with json
                                ram:4096,
                                cores:4}
                                )

var nic =new libpb.nic({name:'nic_on_lan_one',
					lan:1,
					ips:['10.0.0.1','10.0.0.11']})

var nictoo =new libpb.nic({name:'nic_on_lan_two',
					lan:2,
					ips:['192.168.0.2']})

srv.addNic(nic)
srv.addNic(nictoo)

libpb.createServer(dcid, srv)
