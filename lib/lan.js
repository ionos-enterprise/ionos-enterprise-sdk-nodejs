// 		lan.js

/**
Lan
Lans collection
	List lans
	Create a new lan
Lan
	retrieve a lan
	replace properties of lan / Create a new lan
	partially update a lan
	Remove lan
Lan members collection
	List lan members
**/


module.exports = {

    listLans: function (dc_id, callback) {
        req.is_get(["datacenters", dc_id, "lans"], callback)
    },

    createLan: function (dc_id, jason, callback) {
        req.is_post(["datacenters", dc_id, "lans"], jason, callback)
    },

    getLan: function (dc_id, lan_id, callback) {
        req.is_get(["datacenters", dc_id, "lans", lan_id], callback)
    },

    updateLan: function (dc_id, lan_id, jason, callback) {
        req.is_put(["datacenters", dc_id, "lans", lan_id], jason, callback)
    },

    patchLan: function (dc_id, lan_id, jason, callback) {
        req.is_patch(["datacenters", dc_id, "lans", lan_id], jason, callback)
    },

    deleteLan: function (dc_id, lan_id, callback) {
        req.is_del(["datacenters", dc_id, "lans", lan_id], callback)
    },

    listLanMembers: function (dc_id, lan_id, callback) {
        req.is_get(["datacenters", dc_id, "lans", lan_id, "nics"], callback)
    }
}
