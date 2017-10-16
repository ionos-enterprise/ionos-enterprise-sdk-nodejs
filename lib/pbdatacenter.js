//	pbdatacenter.js
module.exports = {


    listDatacenters: function (callback) {
        pbreq.is_get(["datacenters"], callback)
    },

    createDatacenter: function (jason, callback) {
        pbreq.is_post(["datacenters"], jason, callback)
    },

    getDatacenter: function (dc_id, callback) {

        pbreq.is_get(["datacenters", dc_id], callback)
    },

    updateDatacenter: function (dc_id, jason, callback) {
        pbreq.is_put(["datacenters", dc_id], jason, callback)
    },

    patchDatacenter: function (dc_id, jason, callback) {
        pbreq.is_patch(["datacenters", dc_id], jason, callback)
    },

    deleteDatacenter: function (dc_id, callback) {
        pbreq.is_del(["datacenters", dc_id], callback)
    }

}
