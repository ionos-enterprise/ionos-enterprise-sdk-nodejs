//  s3.js


module.exports = {

    listS3Keys: function (user_id, callback) {
        req.is_get(["um/users", user_id, "s3keys"], callback)
    },

    createS3Key: function (user_id, callback) {
        req.is_post(["um/users", user_id, "s3keys"], {}, callback)
    },

    getS3Key: function (user_id, key_id, callback) {
        req.is_get(["um/users", user_id, "s3keys", key_id], callback)
    },

    deleteS3Key: function (user_id, key_id, callback) {
        req.is_delete(["um/users", user_id, "s3keys", key_id], callback)
    },

    enableS3Key: function (user_id, key_id, callback) {
        body = {
            "properties" : {
                "active": true
            }
        }

        req.is_put(["um/users", user_id, "s3keys", key_id], body, callback)
    },

    disableS3Key: function (user_id, key_id, callback) {
        body = {
            "properties" : {
                "active": false
            }
        }

        req.is_put(["um/users", user_id, "s3keys", key_id], body, callback)
    },

    getS3SsoUrl: function (user_id, callback) {
        req.is_get(["um/users", user_id, "s3ssourl"], callback)
    }

}