/**
	How to delete items
	
**/	



var libpb=require('libprofitbricks')

libpb.setauth('username','password') 		// <---- Your username and password

var dc_id='f355b51d-1c9c-4150-bc55-a616fe3bf437' // <----- Your data center id


var srv_id='52c64bc2-5e71-4b28-a8b6-e71d86586fb3'  // <---- Your server id

var snapshot_id='54y33b4b-1b78-4522-8f5d-b8b726aab961' // <---- Your snapshot id

var loadbalancer_id='at633b4b-1b78-4522-8f5d-b8b726aab765' // <---- Your loadbalancer id


libpb.deleteServer(dc_id,srv_id)


libpb.deleteSnapshot(snapshot_id)


libpb.deleteLoadbalancer(dcid,loadbalancer_id)


libpb.deleteDatacenter(dcid)
