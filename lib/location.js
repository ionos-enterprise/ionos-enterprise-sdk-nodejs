//		locations.js

module.exports = {

    listLocations: function (callback) {
        req.is_get(["locations"], callback)
    },

    getLocation: function (location_id, callback) {
        req.is_get(["locations", location_id], callback)
    }
}