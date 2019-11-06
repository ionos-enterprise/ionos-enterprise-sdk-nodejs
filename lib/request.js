//		request.js


module.exports = {
    /**
    Request
    Requests collection
        List requests
    Request
        Retrieve a request
    Status of a request
        Retrieve status of a request

    **/
    listRequests: function (callback) {
        req.is_get(["requests"], callback)
    },

    getRequest: function (request_id, callback) {
        req.is_get(["requests", request_id], callback)
    },

    statusRequest: function (request_id, callback) {
        req.is_get(["requests", request_id, "status"], callback)
    }
}
