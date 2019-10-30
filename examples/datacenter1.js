//Create a datacenter with a server, nic and a firewall rule

var lib=require('libionosenterprise')

var dc= new lib.datacenter({"name": "My New Datacenter",
				"description": "Production environment",
				"location": "de/fkb"})
				
var srv=new lib.server({"name": "My New Server1","ram": 4096,"cores": 4})

var nic=new lib.nic({"ips": [],"lan": 1})



srv.addNic(nic)

dc.addServer(srv)

lib.setauth("username","password")

lib.createDatacenter(dc)
