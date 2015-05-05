//Create Volume

var libpb=require('libprofitbricks')

libpb.setauth('username','password') 		// <---- Your username and password


var dcid='f355b51d-1c9c-4150-bc55-a616fe3bf437' 	 // <--- Your data center id

var vol=new libpb.volume( {'name': 'My Favorite Volume',
                        'size': 80,
                        'bus': "VIRTIO",
                        'type': "HDD",
                        'licenceType': "UNKNOWN"})

libpb.createVolume(dcid,vol)
