#!/usr/bin/env node

// list datacenters

var lib=require('libionosenterprise')

lib.setauth('username','password')
	
lib.listDatacenters()