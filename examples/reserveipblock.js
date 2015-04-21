#!/usr/bin/env node

// reserve ipblock 


var libpb=require('libprofitbricks')
libpb.setauth('username','password')
	
var ipblk = new libpb.ipblock()

ipblk.set('location','de/fkb')
ipblk.set('size', 5)	

libpb.reserveIpblock(ipblk)
