/**
	find  server by name

**/	

var lib=require('libionosenterprise')

lib.setauth('username','password') 		// <---- Your username and password

lib.depth=5	

var dcid='f355b51d-1c9c-4150-bc55-a616fe3bf437' 	 // <--- Your data center id

var srchfor=/Server03/  	// <--- string to search for in server names 


// findname will be our callback

function findname(error, response, body) {
		if (error){
                        return error
                }
              	if (body){
			try{
				var info = JSON.parse(body)
			}
			catch(err){
				console.log(body)
				return
			}			
			if (info.items){
		        	var ilen=info.items.length
		        	while(ilen--){
		                	var it=info.items[ilen]
		                	var thename=it['properties']['name']
		                	if (thename.match(srchfor)){
		         			console.log(it) // <---- print json for server(s) that match srchfor
		                	}
                                }
                        }
                }
}


lib.listServers(dcid,findname)  