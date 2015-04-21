//		pbnic.js 

var mkpath= function(dc_id,srv_id,nic_id,addtopath){
		var base=[ "datacenters",dc_id,"servers",srv_id,"nics"]
		if (nic_id){
			base.concat(nic_id)
		}	
			
		if (addtopath){
			return base.concat(addtopath)
		}
		return base
	}
	

module.exports={
/**
Nic
Nics collection
	List nics
	Create a nic
Nic
	Retrieve a nic
	Replace properties of nic
	Partially update a nic
	Remove nic
Firewall rules collection
	List firewall rules
	Create a firewall rule
Firewall rule
	Retrieve a firewall rule
	Replace properties of firewall rule
	Partially update a firewall rule
	Remove firewall rule
	
	Complete

**/

	listNics : function(dc_id,srv_id,callback){
		
		var path=mkpath(dc_id,srv_id)
		pbreq.is_get(path,callback)
	},

	createNic : function(dc_id,srv_id,jason,callback){
		
		var path=mkpath(dc_id,srv_id)
		pbreq.is_post(path,jason,callback)
	},

	getNic : function(dc_id,srv_id,nic_id,callback){
	
		var path=mkpath(dc_id,srv_id,nic_id )
		pbreq.is_get(path,callback)
	},

	updateNic : function(dc_id,srv_id,nic_id,jason,callback){
	
		var path=mkpath(dc_id,srv_id,nic_id)
		pbreq.is_put(path,jason,callback)
	},

	patchNic : function(dc_id,srv_id,nic_id,jason,callback){
	
		var path=mkpath(dc_id,srv_id,nic_id )	
		pbreq.is_patch(path,jason,callback)
	},

	deleteNic : function(dc_id,srv_id,nic_id,callback){
		
		var path=mkpath(dc_id,srv_id,nic_id )
		pbreq.is_del(path,callback)
	},

	listFWRules : function(dc_id,srv_id,nic_id,callback){
		var addtopath="firewallrules"
		var path=mkpath(dc_id,srv_id,nic_id,addtopath)	
		pbreq.is_get(path,callback)
	},

	createFWRule : function(dc_id,srv_id,nic_id,jason,callback){
		
		var path=mkpath(dc_id,srv_id,nic_id,"firewallrules")	
		pbreq.is_post(path,jason,callback)
	},

	getFWRule : function(dc_id,srv_id,nic_id,fwrule_id,callback){
		
		var path=mkpath(dc_id,srv_id,nic_id,"firewallrules")	
		pbreq.is_get(path,callback)
	},

	updateFWRule  : function(dc_id,srv_id,nic_id,fwrule_id,jason,callback) {
		
		var addtopath=["firewallrules",fwrule_id]
		var path=mkpath(dc_id,srv_id,nic_id,addtopath)
		pbreq.is_put(path,jason,callback)
	},

	patchFWRule : function(dc_id,srv_id,nic_id,fwrule_id,jason,callback){
		
		var addtopath=["firewallrules",fwrule_id]
		var path=mkpath(dc_id,srv_id,nic_id,addtopath)
		pbreq.is_patch(path,jason,callback)
	},

	delFWRule : function(dc_id,srv_id,nic_id,fwrule_id,callback){
		
		var addtopath=["firewallrules",fwrule_id]
		var path=mkpath(dc_id,srv_id,nic_id,addtopath)
		pbreq.is_del(path,callback)
	}

}//
