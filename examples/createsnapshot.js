/**
	Create a snapshot of a volume
	
**/	


var libpb=require('libprofitbricks')

libpb.setauth('username','password') 		// <---- Your username and password

var dc_id='f355b51d-1c9c-4150-bc55-a616fe3bf437' // <----- Your data center id


var volumeid='5e033b4b-1b78-4522-8f5d-b8b726aab961' // <----- Your volume id to snapshot

var jason={ 
	name: 'snapshot-35',
	description: 'The thirty-fifth snapshot of my favorite volume'
	}	

libpb.createSnapshot(dcid,volumeid,jason)
