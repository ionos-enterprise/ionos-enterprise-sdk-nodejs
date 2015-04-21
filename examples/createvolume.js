//Create Volume

pb=require('libprofitbricks')

pb.setauth("username","password")


var dc_id = '700e1cab-99b2-4c30-ba8c-1d273ddba022'

var vol=new pb.volume({	"size": 56,
            			"name": "Explicitly created volume",
            			"image": "<IMAGE/SNAPSHOT-ID>",
            			"bus": "VIRTIO"
        			})

pb.createVolume(dcid,vol)