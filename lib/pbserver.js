//	pbserver.js


module.exports=  {
/**
Server
Servers collection
	List servers
	Create a server
	Retrieve server
	Replace properties of server
	Partially update a server
	Remove server
	
	Complete
**/	

	listServers : function(dc_id,callback){
		pbreq.is_get([ "datacenters",dc_id,"servers" ],callback)
	},

	createServer : function(dc_id,jason,callback){
		pbreq.is_post([ "datacenters",dc_id,"servers" ],jason,callback)
	},

	getServer : function(dc_id,srv_id,callback){
		pbreq.is_get([ "datacenters",dc_id,"servers",srv_id ],callback)
	},

	updateServer: function(dc_id,srv_id,jason,callback){
		pbreq.is_put([ "datacenters",dc_id,"servers",srv_id ],jason,callback)
	},

	patchServer : function(dc_id,srv_id,jason,callback){
		pbreq.is_patch([ "datacenters",dc_id,"servers",srv_id ],jason,callback)
	},

	deleteServer : function(dc_id,srv_id,callback){
		pbreq.is_del([ "datacenters",dc_id,"servers",srv_id ],callback)
	},
/**
Server volumes collection
	List volumes attached
	Attach volume to server	
**/	

	listAttachedVolumes : function(dc_id,srv_id,callback){
		pbreq.is_get([ "datacenters",dc_id,"servers",srv_id,"volumes" ],callback)
	},

	attachVolume : function(dc_id,srv_id,jason,callback){
		pbreq.is_post([ "datacenters",dc_id,"servers",srv_id,"volumes" ],jason,callback)
	},
/**
Server volume
	Retrieve attached volume
	Detach volume from server
	
	Complete
	
**/		

	getAttachedVolume : function(dc_id,srv_id,volume_id,callback){
		pbreq.is_get([ "datacenters",dc_id,"servers",srv_id,"volumes",volume_id ],callback)
	},

	detachVolume : function(dc_id,srv_id,volume_id,callback){
		pbreq.is_del([ "datacenters",dc_id,"servers",srv_id,"volumes",volume_id ],callback)
	},
/**
Server CD Roms collection
	List CD Roms attached
	Attach CD Rom to server
	
	Complete
**/		

	listAttachedCdroms : function(dc_id,srv_id,callback){
		pbreq.is_get([ "datacenters",dc_id,"servers",srv_id,"cdroms" ],callback)
	},

	attachCdrom : function(dc_id,srv_id,jason,callback){
		pbreq.is_post([ "datacenters",dc_id,"servers",srv_id,"cdroms" ],jason,callback)
	},
/**
Server CD Rom
	Retrieve attached CD Rom
	Detach CD Rom from server
	
	Complete
**/		

	getAttachedCdrom : function(dc_id,srv_id,cdrom_id,callback){
		pbreq.is_get([ "datacenters",dc_id,"servers",srv_id,"cdroms",cdrom_id ],callback)
	},

	detachCdrom : function(dc_id,srv_id,cdrom_id,callback){
		pbreq.is_del([ "datacenters",dc_id,"servers",srv_id,"cdroms",cdrom_id ],callback)
	},
/**
Start server command
	Execute start server
Stop server command
	Execute Stop Server
Reboot server command
	Execute reboot server
	
	Complete
**/		

	startServer : function(dc_id,srv_id,jason,callback){
		pbreq.is_post([ "datacenters",dc_id,"servers",srv_id,"start" ],jason,callback)
	},

	stopServer : function(dc_id,srv_id,jason,callback){
		pbreq.is_post([ "datacenters",dc_id,"servers",srv_id,"stop" ],jason,callback)
	},

	rebootServer : function(dc_id,srv_id,jason,callback){
		pbreq.is_post([ "datacenters",dc_id,"servers",srv_id,"reboot" ],jason,callback)
	}

} //

