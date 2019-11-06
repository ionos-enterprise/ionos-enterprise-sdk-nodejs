//	datacenter.js
module.exports = {


    listDatacenters: function (callback) {
        req.is_get(["datacenters"], callback)
    },

    createDatacenter: function (jason, callback) {
        req.is_post(["datacenters"], jason, callback)
    },

    getDatacenter: function (dc_id, callback) {

        req.is_get(["datacenters", dc_id], callback)
    },

    updateDatacenter: function (dc_id, jason, callback) {
        req.is_put(["datacenters", dc_id], jason, callback)
    },

    patchDatacenter: function (dc_id, jason, callback) {
        req.is_patch(["datacenters", dc_id], jason, callback)
    },

    deleteDatacenter: function (dc_id, callback) {
        req.is_del(["datacenters", dc_id], callback)
    }

}
