//  usermanagement.js


module.exports = {

    listGroups: function (callback) {
        req.is_get(["um/groups"], callback)
    },

    createGroup: function (jason, callback) {
        req.is_post(["um/groups"], jason, callback)
    },

    getGroup: function (group_id, callback) {
        req.is_get(["um/groups", group_id], callback)
    },

    updateGroup: function (group_id, jason, callback) {
        req.is_put(["um/groups", group_id], jason, callback)
    },

    deleteGroup: function (group_id, callback) {
        req.is_del(["um/groups", group_id], callback)
    },


    listShares: function (group_id, callback) {
        req.is_get(["um/groups", group_id, "shares"], callback)
    },

    addShare: function (group_id, resource_id, jason, callback) {
        req.is_post(["um/groups", group_id, "shares", resource_id], jason, callback)
    },

    getShare: function (group_id, resource_id, callback) {
        req.is_get(["um/groups", group_id, "shares", resource_id], callback)
    },

    updateShare: function (group_id, resource_id, jason, callback) {
        req.is_put(["um/groups", group_id, "shares", resource_id], jason, callback)
    },

    removeShare: function (group_id, resource_id, callback) {
        req.is_del(["um/groups", group_id, "shares", resource_id], callback)
    },


    listUsers: function (callback) {
        req.is_get(["um/users"], callback)
    },

    createUser: function (jason, callback) {
        req.is_post(["um/users"], jason, callback)
    },

    getUser: function (user_id, callback) {
        req.is_get(["um/users", user_id], callback)
    },

    updateUser: function (user_id, jason, callback) {
        req.is_put(["um/users", user_id], jason, callback)
    },

    deleteUser: function (user_id, callback) {
        req.is_del(["um/users", user_id], callback)
    },


    listGroupUsers: function (group_id, callback) {
        req.is_get(["um/groups", group_id, "users"], callback)
    },

    addGroupUser: function (group_id, jason, callback) {
        req.is_post(["um/groups", group_id, "users"], jason, callback)
    },

    removeGroupUser: function (group_id, user_id, callback) {
        req.is_del(["um/groups", group_id, "users", user_id], callback)
    },


    listResources: function (callback) {
        req.is_get(["um/resources"], callback)
    },

    listResourcesByType: function (resource_type, callback) {
        req.is_get(["um/resources", resource_type], callback)
    },

    getResourceByType: function (resource_type, resource_id, callback) {
        req.is_get(["um/resources", resource_type, resource_id], callback)
    }

}