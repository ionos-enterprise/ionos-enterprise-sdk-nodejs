//		pblocations.js

module.exports = {

    listLocations: function (callback) {
        pbreq.is_get(["locations"], callback)
    },

    getLocation: function (location_id, callback) {
        pbreq.is_get(["locations", location_id], callback)
    }
}