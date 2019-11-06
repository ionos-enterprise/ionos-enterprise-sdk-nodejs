//		Image.js

module.exports = {
    /**
    Image
    Images collection
        List images
    Image
        Retrieve an image
        Replace properties of an image
        Partially update an image
        Remove an image

        Complete

    **/
    listImages: function (callback) {
        req.is_get(["images"], callback)
    },

    getImage: function (image_id, callback) {
        req.is_get(["images", image_id], callback)
    },

    updateImage: function (image_id, jason, callback) {
        req.is_put(["images", image_id], jason, callback)
    },

    patchImage: function (image_id, jason, callback) {
        req.is_patch(["images", image_id], jason, callback)
    },

    deleteImage: function (image_id, callback) {
        req.is_del(["images", image_id], callback)
    }
}
