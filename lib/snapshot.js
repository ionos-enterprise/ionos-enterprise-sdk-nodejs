//		Snapshot.js

module.exports = {

    /**
    Snapshot
    Snapshots collection
        List snapshots
    Snapshot
        Retrieve a snapshot
        Replace properties of a snapshot
        Partially update a snapshot
        Remove a snapshot

        Complete
    **/
    listSnapshots: function (callback) {
        req.is_get(["snapshots"], callback)
    },

    getSnapshot: function (snapshot_id, callback) {
        req.is_get(["snapshots", snapshot_id], callback)
    },

    updateSnapshot: function (snapshot_id, jason, callback) {
        req.is_put(["snapshots", snapshot_id], jason, callback)
    },

    patchSnapshot: function (snapshot_id, jason, callback) {
        req.is_patch(["snapshots", snapshot_id], jason, callback)
    },

    deleteSnapshot: function (snapshot_id, callback) {
        req.is_del(["snapshots", snapshot_id], callback)
    }
}
