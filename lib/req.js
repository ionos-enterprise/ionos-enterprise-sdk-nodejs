//	 req.js

module.exports = {

    request: require('request'),

    options: {
        headers: {}
        //auth : {}, // if the auth obj is present, it won't allow other auth to be used.
    },

    endpoint: "https://api.ionos.com/cloudapi/v5",

    setendpoint: function (ep) {
        req.options.baseUrl = ep
    },

    setuseragent: function (ua) {
        req.options.userAgent = ua
    },

    fullheader: function () {
        req.options.headers['Content-Type'] = 'application/json'
        req.options.headers['User-Agent'] = 'ionosenterprise-sdk-nodejs/5.1.1'

        if (req.options.userAgent)
            req.options.headers['User-Agent'] += ' ' + req.options.userAgent
    },

    patchheader: function () {
        req.options.headers['Content-Type'] = 'application/json'
        req.options.headers['User-Agent'] = 'ionosenterprise-sdk-nodejs/5.1.1'

        if (req.options.userAgent)
            req.options.headers['User-Agent'] += ' ' + req.options.userAgent
    },

    auth: function (sixfourstring) {
        req.options.headers['Authorization'] = 'Basic ' + sixfourstring
    },
    setauth: function (u, p) {
        var header = u + ':' + p
        req.options.headers['Authorization'] = 'Basic ' + (new Buffer(header || '', 'ascii')).toString('base64')
    },
    commandheader: function () {
        req.options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    },

    depth: 1,

    setdepth: function (newdepth) {
        req.depth = newdepth
    },

    fallback: function (error, response, body) {
        if (error) {
            return (console.log("Error", error))
        }
        if (response) {
            console.log('Status:', response.statusCode);
            console.log('Headers:', JSON.stringify(response.headers));
        }

        if (body) {
            console.log("Body", body)

        }
    },


    mk_url: function (aray, callback) {

        aray.unshift(req.endpoint)
        req.options.url = aray.join("/")

        if (!req.options.headers['Authorization']) {
            if (process.env.IONOSENTERPRISE_USERNAME && process.env.IONOSENTERPRISE_PASSWORD) {
                req.options.headers['Authorization'] = 'Basic ' + new Buffer(process.env.IONOSENTERPRISE_USERNAME + ':' + process.env.IONOSENTERPRISE_PASSWORD).toString('base64');
            }
        }

        return req.options.url
    },

    is_del: function (aray, callback) {
        if (!callback) { callback = req.fallback }

        req.mk_url(aray)
        req.fullheader()

        req.request.del(req.options, callback)
    },

    is_get: function (aray, callback) {
        if (!callback) { callback = req.fallback }

        req.mk_url(aray)
        req.options.url += ('?depth=' + req.depth)
        req.fullheader()

        req.request.get(req.options, callback)
    },


    is_patch: function (aray, jason, callback) {
        if (!callback) { callback = req.fallback }

        req.mk_url(aray)
        req.options.body = JSON.stringify(jason)
        req.patchheader()

        req.request.patch(req.options, callback)
    },

    is_put: function (aray, jason, callback) {
        if (!callback) { callback = req.fallback }

        req.mk_url(aray)
        req.options.body = JSON.stringify(jason)
        req.fullheader()

        req.request.put(req.options, callback)
    },


    is_post: function (aray, jason, callback) {
        if (!callback) { callback = req.fallback }

        req.mk_url(aray)
        req.options.body = JSON.stringify(jason)
        req.fullheader()

        req.request.post(req.options, callback)
    },

    is_command: function (aray, jason, callback) {
        if (!callback) { callback = req.fallback }

        req.mk_url(aray)
        req.options.body = JSON.stringify(jason)
        req.commandheader()

        req.request.post(req.options, callback)
    },

    is_urlencoded: function (aray, str, callback) {
        if (!callback) { callback = req.fallback }

        req.mk_url(aray)
        req.options.body = str
        req.commandheader()

        req.request.post(req.options, callback)
    }

}
