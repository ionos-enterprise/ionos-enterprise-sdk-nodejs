//		pbloadbalancer.js 

module.exports= {
/**
Loadbalancer
Loadbalancers collection
	List loadbalancers
	Create a loadbalancer
Loadbalancer
	Retrieve a loadbalancer
	Replace properties of loadbalancer
	Partially update a loadbalancer
	Remove loadbalancer
Balanced nics collection
	List balanced nics
	Assiciate a nic with loadbalancer
Balanced nic
	Retrieve a balanced nic
	Remove balanced nic
**/	
	listLoadbalancers : function(dc_id,callback){
		pbreq.is_get([ "datacenters",dc_id,"loadbalancers" ],callback)
	},

	createLoadbalancer : function(dc_id,jason,callback){
		pbreq.is_post([ "datacenters",dc_id,"loadbalancers" ],jason,callback)
	},

	getLoadbalancer : function(dc_id,lbal_id,callback){
		pbreq.is_get([ "datacenters",dc_id,"loadbalancers",lbal_id ],callback)
	},

	updateLoadbalancer : function(dc_id,lbal_id,jason,callback){
		pbreq.is_put([ "datacenters",dc_id,"loadbalancers",lbal_id   ],jason,callback)
	},

	patchLoadbalancer : function(dc_id,lbal_id,jason,callback){
		pbreq.is_patch([ "datacenters",dc_id,"loadbalancers",lbal_id   ],jason,callback)
	},

	deleteLoadbalancer : function(dc_id,lbal_id,callback){
		pbreq.is_del([ "datacenters",dc_id,"loadbalancers",lbal_id   ],callback)
	},

	listBalancedNics : function(dc_id,lbal_id,callback){
		pbreq.is_get([ "datacenters",dc_id,"loadbalancers",lbal_id,"balancednics"  ],callback)
	},

	associateNics : function(dc_id,lbal_id,jason,callback){
		pbreq.is_post([ "datacenters",dc_id,"loadbalancers",lbal_id,"balancednics"  ],jason,callback)
	},

	getBalancedNic : function(dc_id,lbal_id,nic_id,callback){
		pbreq.is_get([ "datacenters",dc_id,"loadbalancers",lbal_id,"balancednics",nic_id  ],callback)
	},

	deleteBalancedNic : function(dc_id,lbal_id,nic_id,callback){
		pbreq.is_del([ "datacenters",dc_id,"loadbalancers",lbal_id,"balancednics",nic_id  ],callback)
	}

} //

