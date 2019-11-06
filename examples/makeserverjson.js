#!/usr/bin/env node

// Generate json for a server

lib=require('libionosenterprise')
	
	
var srv= new lib.server({"name":"super server", 
	                           "ram":"3192",
				   "cores":"1"}) // <--- props passed in

srv.show()
