module.exports=function merge(src,dst){
	// merging means merging src.prop to dst.prop, so we require here to avoid having dst.prop and dst.src.prop.
	
	var rsrc=require(src)
	
	// I don't want to clobber any exiting clobbered messages.
	
	if (!dst['clobbered']){
		dst['clobbered']=[]
	}	
	
	var rsrckeys=Object.keys(rsrc)
	
		// If something gets clobbered we log it and also append a timestamped message to dst['clobbered']
		
	function chkkey(key){
			if (dst[key]){
			var msg=Date.now()+" : merge clobbered "+key +' with '+src.slice(2)+'.'+key
			console.error(msg)
			dst['clobbered'].push(msg)
			}
		dst[key]=rsrc[key]
	}
	rsrckeys.map(chkkey)
	return dst
		
}
	