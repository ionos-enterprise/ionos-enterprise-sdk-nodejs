#!/usr/bin/env node

// reserve ipblock 


var lib=require('libionosenterprise')
lib.setauth('username','password')
	
var ipblk = new lib.ipblock()

ipblk.set('location','de/fkb')
ipblk.set('size', 5)	

lib.reserveIpblock(ipblk)
