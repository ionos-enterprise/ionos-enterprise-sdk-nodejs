//              bricks.js


function show(){
        try {

        console.log('{\n"properties":\n'+JSON.stringify(this.properties)+",")
        }
        catch(err){
                console.log('error showing properties')

        }
   	if (this.entities){
       	 console.log('"entities":\n'+JSON.stringify(this.entities)+"\n}\n\n")
        }else{
        console.log('no entities')
        }
    
}

function setprop(prop,val){
        
                        this.properties[prop]=val
           
                
}

function mkstamp(prefix){
	var t=new Date().toString().split(' ')
	var stamp=[t[0],t[1],t[2],t[3]].join('-')
return prefix+stamp
}

module.exports={


        datacenter: function(props){

                this.set=setprop
                this.show=show
                this.properties={
                                name : mkstamp('Data Center'),
                                location : "us/las",
                                description:"a good one"
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
                this.properties={
                                name: mkstamp('nic'),
                                ips: [],
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

        image: function (props){

                this.set=setprop
                this.show=show
                this.properties={
                        name: "Ubuntu 14.04",
                        description: "Ubuntu image description",
                        location: "de/fkb",
                        size: 28,
                        public: false,
                        imageType: "CDROM",
                        licenceType: "UNKNOWN"
                         }
                if (props){this.properties=props }

                return this      
        },

        ipblock: function(props){

                this.set=setprop
                this.show=show
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
                this.properties={
                        name: mkstamp("load balancer"),
                        ip: "",
                        dhcp: ""
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

        snapshot: function(props){

                this.set=setprop
                this.show=show
                this.properties= {
                        name: mkstamp("Snapshot"),
                        description: "description of a snapshot",
                        location: "de/fkb",
                        size: 28,
                        licenceType: "UNKNOWN"
                        }
                if (props){this.properties=props }

                return this
        },

        volume: function(props){

                this.set=setprop
                this.show=show
                this.properties= {
                        name: mkstamp("Volume"),
                        size: 80,
                        bus: "VIRTIO",
                        type: "HDD",
                        licenceType: "UNKNOWN"
                }
                if (props){this.properties=props }

                return this
        }

  
}
