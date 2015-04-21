//	profitbricks.js


// --enable-matt-compat

merge=require('./lib/merge')
pbreq=require('./lib/pbreq')
var pb={}
/** 
merge is used to "flatten" functions 
into the top level namespace

instead of calling 

	pb.bricks.datacenter

with merge we can call
	
	pb.datacenter
**/

merge('./lib/bricks',pb)
merge('./lib/pbdatacenter',pb)
merge('./lib/pbimage',pb)
merge('./lib/pbipblock',pb)
merge('./lib/pblan',pb)
merge('./lib/pbloadbalancer',pb)
merge('./lib/pblocation',pb)
merge('./lib/pbnic',pb)
merge('./lib/pbreq',pb)
merge('./lib/pbrequest',pb)
merge('./lib/pbsnapshot',pb)
merge('./lib/pbserver',pb)
merge('./lib/pbvolume',pb)
pb.printMsg = function() {
	
	console.log("libprofitbricks is the package name")
	console.log("this message brought to you by the fine folks at Profit Bricks")

}
module.exports=(function(){ return pb})()

