//Create a datacenter with a server, nic and a firewall rule

var pb=require('libprofitbricks')

var dc= new pb.datacenter({"name": "My New Datacenter",
				"description": "Production environment",
				"location": "de/fkb"})
				
var srv=new pb.server({"name": "My New Server1","ram": 4096,"cores": 4})

var nic=new pb.nic({"ips": [],"lan": 1})

var fw=new pb.firewallrule({"protocol": "TCP",
				"portRangeStart": "23",
				"portRangeEnd": "23"})

//build the bricks

nic.addFwrule(fw)

srv.addNic(nic)

dc.addServer(srv)

pb.setauth("username","password")

pb.createDatacenter(dc)
