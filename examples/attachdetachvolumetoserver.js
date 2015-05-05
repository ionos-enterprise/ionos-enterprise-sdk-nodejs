
var libpb=require('libprofitbricks')

libpb.setauth('username','password') 		// <---- Your username and password

var dc_id='f355b51d-1c9c-4150-bc55-a616fe3bf437' // <----- Your data center id


var srv_id='52c64bc2-5e71-4b28-a8b6-e71d86586fb3'  // <---- Your server id

var vol_id='5e033b4b-1b78-4522-8f5d-b8b726aab961'  // <----- Your volume id


// attach volume to server 

libpb.attachVolume(dc_id,srv_id,vol_id)


// get properties of an attached volume

libpb.getAttachedVolume(dc_id,srv_id,vol_id)


// list volumes attached to the server

libpb.listAttachedVolumes(dc_id,srv_id)


// detach a volume from the server

libpb.detachVolume(dc_id,srv_id,vol_id)
