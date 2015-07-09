//	pbvolume.js


module.exports= {
/**
Volume
Volumes collection
	List volumes
	Create a volume
Volume
	Retrieve a volume
	Replace properties of volume
	Partially update a volume
	Remove volume
	
Create snapshot command
	Execute create snapshot
Restore snapshot command
	Execute restore snapshot
	
	Complete
**/	
	listVolumes : function(dc_id,callback){
		pbreq.is_get([ "datacenters",dc_id,"volumes" ],callback)
	},

	createVolume: function(dc_id,jason,callback){
		pbreq.is_post([ "datacenters",dc_id,"volumes" ],jason,callback)
	},

	getVolume : function(dc_id,volume_id,callback){
		pbreq.is_get([ "datacenters",dc_id,"volumes",volume_id ],callback)
	},

	updateVolume : function(dc_id,volume_id,jason,callback){
		pbreq.is_put([ "datacenters",dc_id,"volumes",volume_id ],jason,callback)
	},

	patchVolume : function(dc_id,volume_id,jason,callback){
		pbreq.is_patch([ "datacenters",dc_id,"volumes",volume_id ],jason,callback)
	},

	deleteVolume : function(dc_id,volume_id,callback){
		pbreq.is_del([ "datacenters",dc_id,"volumes",volume_id ],callback)
	},

	createSnapshot : function(dc_id,volume_id,jason,callback){
                var str=""
		if (jason){
                	if (jason['name']){
                        	str +=('&name='+jason['name'])
                	}
                	if (jason['description']){
                        	str +=('&description='+jason['description'])
                	}
		}
                pbreq.is_command([ "datacenters",dc_id,"volumes",volume_id,"create-snapshot" ],str,callback)
        },



	restoreSnapshot : function(dc_id,volume_id,jason,callback){
		var str = 'snapshotId=' + jason.snapshotId
		pbreq.is_restore([ "datacenters",dc_id,"volumes",volume_id,"restore-snapshot" ],str,callback)
	}

}