//	profitbricks.js


// --enable-matt-compat

merge=require('./merge')
pbreq=require('./pbreq')
var pb={}
/** 
merge is used to "flatten" functions 
into the top level namespace

instead of calling 

	pb.bricks.datacenter

with merge we can call
	
	pb.datacenter
**/
merge('./pbreq',pb)
merge('./pbdatacenter',pb)
merge('./pbimage',pb)
merge('./pbipblock',pb)
merge('./pblan',pb)
merge('./pbloadbalancer',pb)
merge('./pblocation',pb)
merge('./pbnic',pb)
merge('./pbrequest',pb)
merge('./pbsnapshot',pb)
merge('./pbserver',pb)
merge('./pbvolume',pb)
pb.printMsg = function() {
	
	return (console.log("libprofitbricks is the package name"))
	

}
module.exports=(function(){ return pb})()

