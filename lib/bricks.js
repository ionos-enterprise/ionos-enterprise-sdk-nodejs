//              bricks.js

function setprop(prop,val){
        this.properties[prop]=val   

}


function show(){
        try {

        console.log('{\n"properties":\n'+JSON.stringify(this.properties)+",")
        }
        catch(err){
              ;;
        }
   	if (this.entities){
       	 console.log('"entities":\n'+JSON.stringify(this.entities)+"\n}")
        }
    
}

function mkstamp(prefix){
	var t=new Date().toString().split(' ')
	var stamp=[t[0],t[1],t[2],t[3]].join('-')
return prefix+'-'+stamp
}

module.exports={
        datacenter: function(props){
                this.set=setprop
		this.show=show
		//this.required=['name','location']
		//this.optional=['description']
                this.properties={
                                name : mkstamp('Data Center'),
                                location : "us/las",
                                description:"Describe a data center"
                                }

                this.entities= {
                                servers: { items: []},
                                lans: {items: []},
                                loadbalancers: {items: []},
                                volumes: {items: [] }
                                }

        	if (props){this.properties=props }
        
                this.addServer=function(aserver){
                        this.entities.servers.items.push(aserver)
                }
                this.addLan=function(alan){
                        this.entities.lans.items.push(alan)
                }
                this.addLoadbalancer=function(aloadbalancer){
                	this.entities.loadbalancers.items.push(aloadbalancer)
                }
                this.addVolume=function(avolume){
                        this.entities.volumes.items.push(avolume)
                }

                return this
        },


        server: function(props){
                this.set=setprop
		this.show=show
		//this.required=['name','core','ram']
		//this.optional=['availabilityzone','licensetype','bootVolume','bootCdrom']
                this.properties={
                        name : mkstamp('Server'),
                        ram : "8192",
                        cores : "1"
                                }

                this.entities={
                        cdroms: { items: []},
                        nics: {items: []},
                        volumes: {items: [] }
                              }

                if (props){this.properties=props }

                this.addNic=function(anic){ 
                        this.entities.nics.items.push(anic) 
                }

                return this 
        },


        nic: function(props){
                this.set=setprop
		this.show=show
		//this.required=["name","lan"]
                //this.optional=["mac","ips","dhcp","firewallActive"]
                this.properties={
                                name: mkstamp('nic'),
                                lan:1
                                }
                if (props){this.properties=props }
                this.entities={
                                firewallrules: {items: []}
                                }
                this.addFwrule=function(afwrule){
                        this.entities.firewallrules.items.push(afwrule)
                }

                return this 
        },

// props is required 
        firewallrule:   function (props){
                this.set=setprop
		this.show=show
                this.properties=props
                
		return this
        },

 
        ipblock: function(props){
                this.set=setprop
		this.show=show
		//this.required=['size','location']
		//this.optional=[]
                this.properties= {
                        size: 5,
                        location: "de/fra"
	                }
                if (props){this.properties=props }
             
                return this
        },


        loadbalancer: function (props){
                this.set=setprop
		this.show=show
		//this.required=['name']
		//this.optional=['ip','dhcp']
                this.properties={
                        name: mkstamp("load balancer")
                                }
                this.entities={
                        balancednics: { items: [] } 
                                }
                if (props){this.properties=props }
                this.addBalancedNic=function(abalnic){
                        this.entities.balancednics.items.push(abalnic)
                }

                return this
        },


        lan: function(props){
                this.set=setprop
		this.show=show
		//this.required=[]
		//this.optional=['name','public']
                this.properties={
                                name: mkstamp("lan"),
                                public: ""
                                }
                if (props){this.properties=props }
                this.entities={
                        nics: { items: [] } 
                }
                this.addNic=function(anic){
                        this.entities.nics.items.push(anic)
                }

                return this
        },


        volume: function(props){
                this.set=setprop
		this.show=show
		//this.required=['size']
		//this.optional=['name','bus','type','licencetype']
                this.properties= {
                        name: mkstamp("Volume"),
                        'size': 80,
                        'bus': "VIRTIO",
                        'type': "HDD",
                        'licenceType': "UNKNOWN"
                }
                if (props){this.properties=props }

                return this
        }

  
}
