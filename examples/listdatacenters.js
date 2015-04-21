#!/usr/bin/env node

// list datacenters

var libpb=require('libprofitbricks')

libpb.setauth('username','password')
	
libpb.listDatacenters()