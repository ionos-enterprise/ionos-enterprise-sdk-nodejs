//		pbreq.js
module.exports= { 

	request:  require('request'),

	options: {	
	//auth : {}, // if the auth obj is present, it won't allow other auth to be used.
	headers:{}	
	},
	
	//endpoint:	"http://private-anon-041470838-profitbricksrestapi.apiary-mock.com",
	endpoint: "https://spc.profitbricks.com/rest",
	
	fullheader: function(){
		pbreq.options.headers['Content-Type'] = 'application/vnd.profitbricks.resource+json'
	},
	
	patchheader: function(){
		pbreq.options.headers['Content-Type'] = 'application/vnd.profitbricks.partial-properties+json'	
	},
	
	pbauth: function(sixfourstring){
		pbreq.options.headers['Authorization']='Basic '+sixfourstring		
	},
	setauth: function(u,p){
		pbreq.options['auth']= {
        			user : u,
	 			pass : p,
        			sendImmediately :false
				}
	},
	commandheader: function(){
		pbreq.options.headers['Content-Type']= 'application/x-www-form-urlencoded'
	},
	
	depth: 1,
	
	setdepth:function(newdepth){
				pbreq.depth=newdepth
	},

	fallback: function(error, response, body) {
			if (error){ 
				return( console.log("Error", error))
			}
			if (response){
				console.log('Status:', response.statusCode);
				console.log('Headers:', JSON.stringify(response.headers));
			}	
		
			if (body){
				console.log("Body", body)
				
			}
	},
	
	

	mk_url: function(aray,callback){
		
		aray.unshift(pbreq.endpoint)
    		pbreq.options.url=aray.join("/")+'?depth='+pbreq.depth
		return pbreq.options.url
	},	
	
	is_del: function(aray,callback){
		if (!callback){callback=pbreq.fallback}
		pbreq.mk_url(aray)
		
		pbreq.request.del(pbreq.options,callback)
	},
	
	is_get: function(aray,callback){
		if (!callback){callback=pbreq.fallback}

		pbreq.mk_url(aray)
		
		pbreq.request.get(pbreq.options,callback)
		
	},
	
	is_patch: function(aray,jason,callback){
		if (!callback){callback=pbreq.fallback}
		pbreq.mk_url(aray)
		pbreq.options.body=JSON.stringify(jason)
		pbreq.patchheader()
		
		pbreq.request.patch(pbreq.options,callback)
	},
	
	is_post: function(aray,jason,callback){
		if (!callback){callback=pbreq.fallback}
		pbreq.mk_url(aray)
		pbreq.options.body=JSON.stringify(jason)		
		pbreq.fullheader()
		
		pbreq.request.post(pbreq.options,callback)
	 }
}

