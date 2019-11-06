//Create Volume

var lib=require('libionosenterprise')

lib.setauth('username','password') 		// <---- Your username and password


var dcid='f355b51d-1c9c-4150-bc55-a616fe3bf437' 	 // <--- Your data center id

var vol=new lib.volume( {'name': 'My Favorite Volume',
                        'size': 80,
                        'bus': "VIRTIO",
                        'type': "HDD",
                        'licenceType': "UNKNOWN"})

lib.createVolume(dcid,vol)
