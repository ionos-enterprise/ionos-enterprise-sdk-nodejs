//		nic.js 


module.exports = {
    /**
    Nic
    Nics collection
        List nics
        Create a nic
    Nic
        Retrieve a nic
        Replace properties of nic
        Partially update a nic
        Remove nic
    Firewall rules collection
        List firewall rules
        Create a firewall rule
    Firewall rule
        Retrieve a firewall rule
        Replace properties of firewall rule
        Partially update a firewall rule
        Remove firewall rule

        Complete
    
    **/

    listNics: function (dc_id, srv_id, callback) {
        var path = ["datacenters", dc_id, "servers", srv_id, "nics"]
        req.is_get(path, callback)
    },

    createNic: function (dc_id, srv_id, jason, callback) {
        var path = ["datacenters", dc_id, "servers", srv_id, "nics"]
        req.is_post(path, jason, callback)
    },

    getNic: function (dc_id, srv_id, nic_id, callback) {
        var path = ["datacenters", dc_id, "servers", srv_id, "nics", nic_id]
        req.is_get(path, callback)
    },

    updateNic: function (dc_id, srv_id, nic_id, jason, callback) {

        var path = ["datacenters", dc_id, "servers", srv_id, "nics", nic_id]
        req.is_put(path, jason, callback)
    },

    patchNic: function (dc_id, srv_id, nic_id, jason, callback) {
        var path = ["datacenters", dc_id, "servers", srv_id, "nics", nic_id]
        req.is_patch(path, jason, callback)
    },

    deleteNic: function (dc_id, srv_id, nic_id, callback) {
        var path = ["datacenters", dc_id, "servers", srv_id, "nics", nic_id]
        req.is_del(path, callback)
    },

    listFWRules: function (dc_id, srv_id, nic_id, callback) {
        var path = ["datacenters", dc_id, "servers", srv_id, "nics", nic_id, "firewallrules"]
        req.is_get(path, callback)
    },

    createFWRule: function (dc_id, srv_id, nic_id, jason, callback) {
        var path = ["datacenters", dc_id, "servers", srv_id, "nics", nic_id, "firewallrules"]
        req.is_post(path, jason, callback)
    },

    getFWRule: function (dc_id, srv_id, nic_id, fwrule_id, callback) {
        var path = ["datacenters", dc_id, "servers", srv_id, "nics", nic_id, "firewallrules", fwrule_id]
        req.is_get(path, callback)
    },

    updateFWRule: function (dc_id, srv_id, nic_id, fwrule_id, jason, callback) {
        var path = ["datacenters", dc_id, "servers", srv_id, "nics", nic_id, "firewallrules", fwrule_id]
        req.is_put(path, jason, callback)
    },

    patchFWRule: function (dc_id, srv_id, nic_id, fwrule_id, jason, callback) {
        var path = ["datacenters", dc_id, "servers", srv_id, "nics", nic_id, "firewallrules", fwrule_id]
        req.is_patch(path, jason, callback)
    },

    delFWRule: function (dc_id, srv_id, nic_id, fwrule_id, callback) {
        var path = ["datacenters", dc_id, "servers", srv_id, "nics", nic_id, "firewallrules", fwrule_id]
        req.is_del(path, callback)
    }
}
