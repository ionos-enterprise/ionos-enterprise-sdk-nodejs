#!/usr/bin/env node


libpb=require('libprofitbricks')
libpb.setauth('username','password')
var props={"name":"UltraMega Data Center",
			"location":"us/las",
			"description":"UltraMega description"}
var dc= new libpb.datacenter(props)// <--- dc is a json object 



dc.show() //<--- show what dc properties are set
		
dc.set('name', 'BrickHouse') // <--- Sets name for the data center dc
console.log( 'Setting name to BrickHouse')
dc.show()