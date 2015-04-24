//              bricks.js

// Used to update properties of a brick from the json passed in 
function updateprops(src,dst){
                var srckeys=Object.keys(src)
                var idx=srckeys.length 

                while (idx--){
                        var key=srckeys[idx] 
                        dst[key]=src[key]
                }
                return dst
}


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
                if (this.properties[prop]){
                        this.properties[prop]=val
                        console.log(this.properties[prop])
                }
}
module.exports={


        datacenter: function(props){

                this.set=setprop
                this.show=show
                this.properties={
                                name : "a Fine Data Center",
                                location : "us/las",
                                description:"a good one"
                                }

                this.entities= {
                                servers: { items: []},
                                lans: {items: []},
                                loadbalancers: {items: []},
                                volumes: {items: [] }
                                }

        if (props){this.properties=updateprops(props,this.properties) }

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
                        name : "f",
                        ram : "3192",
                        cores : "1"
                                }

                this.entities={
                        cdroms: { items: []},
                        nics: {items: []},
                        volumes: {items: [] }
                              }

                if (props){this.properties=updateprops(props,this.properties) }

                this.addNic=function(anic){ 
                        this.entities.nics.items.push(anic) 
                }

                return this 
        },


        nic: function(props){
                if (props){this.properties=updateprops(props,this.properties) }
                this.set=setprop
                this.show=show
                this.properties={
                                name: "name",
                                ips: [],
                                lan:1 
                                }

                this.entities={
                                firewallrules: {items: []}
                                }

                this.addFwrule=function(afwrule){
                        this.entities.firewallrules.items.push(afwrule)
                }

                return this 
        },

        firewallrule:   function (props){
                if (props){this.properties=updateprops(props,this.properties) }
                this.set=setprop
                this.show=show
                this.properties={
                        name: "port",
                        protocol: "TCP",
                        sourceMac: "",
                        sourceIp: '',
                        targetIp: '',
                        portRangeStart: 0,
                        portRangeEnd: "",
                        icmpType: "",
                        icmpCode: ""
                }
        },

        image: function (props){
                if (props){this.properties=updateprops(props,this.properties) }
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

                return this      
        },

        ipblock: function(props){
                if (props){this.properties=updateprops(props,this.properties) }
                this.set=setprop
                this.show=show
                this.properties= {
                        size: 5,
                        location: "de/fra"
	                }

                return this
        },


        loadbalancer: function (props){
                if (props){this.properties=updateprops(props,this.properties) }
                this.set=setprop
                this.show=show
                this.properties={
                        name: "",
                        ip: "",
                        dhcp: ""
                                }

                this.entities={
                        balancednics: { items: [] } 
                                }


                this.addBalancedNic=function(abalnic){
                        this.entities.balancednics.items.push(abalnic)
                }

                return this
        },


        lan: function(props){
                if (props){this.properties=updateprops(props,this.properties) }
                this.set=setprop
                this.show=show
                this.properties={
                                name: "",
                                public: ""
                                }

                this.entities={
                        nics: { items: [] } 
                }



                this.addNic=function(anic){
                        this.entities.nics.items.push(anic)
                }

                return this
        },

        snapshot: function(props){
                if (props){this.properties=updateprops(props,this.properties) }
                this.set=setprop
                this.show=show
                this.properties= {
                        name: "The Snapshot",
                        description: "description of a snapshot",
                        location: "de/fkb",
                        size: 28,
                        licenceType: "UNKNOWN"
                        }

                return this
        },

        volume: function(props){
                if (props){this.properties=updateprops(props,this.properties) }
                this.set=setprop
                this.show=show
                this.properties= {
                        name: "v is for volume",
                        size: 80,
                        bus: "VIRTIO",
                        type: "HDD",
                        licenceType: "UNKNOWN"
                }

                return this
        }

  
}
