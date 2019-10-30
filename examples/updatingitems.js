/**
	How to update properties for items
	
**/	



var lib=require('libionosenterprise')

lib.setauth('username','password') 		// <---- Your username and password

var dc_id='f355b51d-1c9c-4150-bc55-a616fe3bf437' // <----- Your data center id


var srv_id='52c64bc2-5e71-4b28-a8b6-e71d86586fb3'  // <---- Your server id

var nic_id='54y33b4b-1b78-4522-8f5d-b8b726aab961' // <---- Your nic id



var srvupdate={name:"new server name"}

lib.updateServer(dc_id,srv_id,srvupdate)


var nicuppdate= { ips: ['10.1.1.3'], name: 'nic3'}

lib.updateNic(dc_id,srv_id,nic_id,nicupdate)



lib.updateDatacenter(dcid,{name: 'New and Improved Data Center',description: 'A new description'} )
