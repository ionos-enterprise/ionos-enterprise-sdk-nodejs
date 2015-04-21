/** 	merge concats modules
*	Heads up. it's clobber on write. 
	The dst module should already be present,
	the src module will be required in as to not 
	pollute the namespace. 
	If dst module has a function or property with the same name as the src module, 
	the dst module's function or property will be replaced. 
	check the dst module's 'clobbered' 
**/
module.exports=function merge(src,dst){
	// merging means merging src.prop to dst.prop, so we require here to avoid having dst.prop and dst.src.prop.
	var rsrc=require(src)
	
	// I don't want to clobber any exiting clobbered messages.
	if (!dst['clobbered']){
		dst['clobbered']=[]
	}	
	var rsrckeys=Object.keys(rsrc)
	
	var idx=rsrckeys.length //it's an temp var and a index

	while (idx--){
		var key=rsrckeys[idx] // Make sense? 

		// If something gets clobbered we log it and also append a timestamped message to dst['clobbered']
		if (dst[key]){
			var msg=Date.now()+" : merge clobbered "+key +' with '+src.slice(2)+'.'+key
			console.error(msg)
			dst['clobbered'].push(msg)
		}
		dst[key]=rsrc[key]
	}
	return dst
		
}
	

	