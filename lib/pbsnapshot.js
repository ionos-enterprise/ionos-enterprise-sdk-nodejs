//		Snapshot.js

module.exports={

/**
Snapshot
Snapshots collection
	List snapshots
Snapshot
	Retrieve a snapshot
	Replace properties of a snapshot
	Partially update a snapshot
	Remove a snapshot
	
	Complete
**/	
	listSnapshots : function(callback){
		pbreq.is_get([ "snapshots"  ],callback)
	},

	getSnapshot : function(snapshot_id,callback){
		pbreq.is_get([ "snapshots",snapshot_id  ],callback)
	},

	updateSnapshot : function(snapshot_id,jason,callback){
		pbreq.is_put([ "snapshots",snapshot_id  ],jason,callback)
	},

	patchSnapshot : function(snapshot_id,jason,callback){
		pbreq.is_patch([ "snapshots",snapshot_id  ],jason,callback)
	},

	deleteSnapshot : function(snapshot_id,callback){
		pbreq.is_del([ "snapshots",snapshot_id  ],callback)
	}

}