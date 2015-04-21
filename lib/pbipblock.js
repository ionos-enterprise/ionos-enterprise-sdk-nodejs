//	pbipblock.js



module.exports={
/**
IP blocks collection
	List reserved IP blocks
	Reserve an IP block
IP block
	Retrieve an IP block
	Release an IP block
	
	Complete
**/	

	listIpblocks : function(callback){
		pbreq.is_get([ "ipblocks"  ],callback)
	},

	reserveIpblock : function(jason,callback){
		pbreq.is_post([ "ipblocks"  ],jason,callback)
	},

	getIpblock : function(ipblock_id,callback){
		pbreq.is_get([ "ipblocks",ipblock_id  ],callback)
	},

	releaseIpblock : function(ipblock_id,callback){
		pbreq.is_del([ "ipblocks",ipblock_id  ],callback)
	}

}