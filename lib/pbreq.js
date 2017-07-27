//	 pbreq.js

module.exports= { 

        request:  require('request'),

        options: {      
		headers:{}
        //auth : {}, // if the auth obj is present, it won't allow other auth to be used.
        },
        
        endpoint: "https://api.profitbricks.com/cloudapi/v4",

        setendpoint: function(ep){pbreq.options.baseUrl=ep
	} ,

	fullheader: function(){
		pbreq.options.headers['Content-Type'] = 'application/json'
        pbreq.options.headers['User-Agent'] = 'profitbricks-sdk-nodejs/4.0.0'
	},
	
	patchheader: function(){
        pbreq.options.headers['Content-Type'] = 'application/json'  
		pbreq.options.headers['User-Agent'] = 'profitbricks-sdk-nodejs/4.0.0'
	},
	
	pbauth: function(sixfourstring){
		pbreq.options.headers['Authorization']='Basic '+sixfourstring
	},
	setauth: function(u,p){
		var header = u + ':' + p
		pbreq.options.headers['Authorization']='Basic '+(new Buffer(header || '', 'ascii')).toString('base64')
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
                pbreq.options.url=aray.join("/")
               
                return pbreq.options.url
        },

        is_del: function(aray,callback){
                if (!callback){callback=pbreq.fallback}
           
	        pbreq.mk_url(aray)
                pbreq.fullheader()
		
                pbreq.request.del(pbreq.options,callback)
        },

        is_get: function(aray,callback){
                if (!callback){callback=pbreq.fallback}

                pbreq.mk_url(aray)
                pbreq.options.url+=('?depth='+pbreq.depth)
                pbreq.fullheader()

                pbreq.request.get(pbreq.options,callback)

        },


        is_patch: function(aray,jason,callback){
                if (!callback){callback=pbreq.fallback}
             
	        pbreq.mk_url(aray)
                pbreq.options.body=JSON.stringify(jason)
                pbreq.patchheader()

                pbreq.request.patch(pbreq.options,callback)
        },

        is_put: function(aray,jason,callback){
                if (!callback){callback=pbreq.fallback}
           
	        pbreq.mk_url(aray)
                pbreq.options.body=JSON.stringify(jason)
                pbreq.fullheader()

                pbreq.request.put(pbreq.options,callback)
        },


        is_post: function(aray,jason,callback){
                if (!callback){callback=pbreq.fallback}
              
	        pbreq.mk_url(aray)
                pbreq.options.body=JSON.stringify(jason)
                pbreq.fullheader()

                pbreq.request.post(pbreq.options,callback)
         },

        is_command: function(aray,jason,callback){
                if (!callback){callback=pbreq.fallback}
          
                pbreq.mk_url(aray)
                pbreq.options.body = JSON.stringify(jason)
                pbreq.commandheader()

                pbreq.request.post(pbreq.options,callback)
         },

        is_urlencoded: function(aray,str,callback){
                if (!callback){callback=pbreq.fallback}

                pbreq.mk_url(aray)
                pbreq.options.body=str
                pbreq.commandheader()

                pbreq.request.post(pbreq.options,callback)
        }

}
