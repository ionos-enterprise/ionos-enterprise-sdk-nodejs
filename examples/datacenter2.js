/**
Build a datacenter, 
add two servers, 
change the datacenter name, 
show the datacenter as json,
set username and password,
and Create the datacenter.
 **/

lib=require('libionosenterprise')


dc=new lib.datacenter({ name: 'fu51', location: 'us/las', description: 'sweet' })

srv1=new lib.server({name:"srvfu1",cores:"4",ram:8192})
srv2=new lib.server({name:"srvfu2",cores:"4",ram:8192})

dc.addServer(srv1)
dc.addServer(srv2)

dc.set("name","changed")

dc.show()

lib.setauth("username","password")

lib.createDatacenter(dc)