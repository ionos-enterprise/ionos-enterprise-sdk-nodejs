//	 pbreq.js

module.exports = {

    request: require('request'),

    options: {
        headers: {}
        //auth : {}, // if the auth obj is present, it won't allow other auth to be used.
    },

    endpoint: "https://api.ionos.com/cloudapi/v5",

    setendpoint: function (ep) {
        pbreq.options.baseUrl = ep
    },

    setuseragent: function (ua) {
        pbreq.options.userAgent = ua
    },

    fullheader: function () {
        pbreq.options.headers['Content-Type'] = 'application/json'
        pbreq.options.headers['User-Agent'] = 'profitbricks-sdk-nodejs/5.0.0'

        if (pbreq.options.userAgent)
            pbreq.options.headers['User-Agent'] += ' ' + pbreq.options.userAgent
    },

    patchheader: function () {
        pbreq.options.headers['Content-Type'] = 'application/json'
        pbreq.options.headers['User-Agent'] = 'profitbricks-sdk-nodejs/5.0.0'

        if (pbreq.options.userAgent)
            pbreq.options.headers['User-Agent'] += ' ' + pbreq.options.userAgent
    },

    pbauth: function (sixfourstring) {
        pbreq.options.headers['Authorization'] = 'Basic ' + sixfourstring
    },
    setauth: function (u, p) {
        var header = u + ':' + p
        pbreq.options.headers['Authorization'] = 'Basic ' + (new Buffer(header || '', 'ascii')).toString('base64')
    },
    commandheader: function () {
        pbreq.options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    },

    depth: 1,

    setdepth: function (newdepth) {
        pbreq.depth = newdepth
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

        aray.unshift(pbreq.endpoint)
        pbreq.options.url = aray.join("/")

        if (!pbreq.options.headers['Authorization']) {
            if (process.env.IONOS_USERNAME && process.env.IONOS_PASSWORD) {
                pbreq.options.headers['Authorization'] = 'Basic ' + new Buffer(process.env.IONOS_USERNAME + ':' + process.env.IONOS_PASSWORD).toString('base64');
            }
        }

        return pbreq.options.url
    },

    is_del: function (aray, callback) {
        if (!callback) { callback = pbreq.fallback }

        pbreq.mk_url(aray)
        pbreq.fullheader()

        pbreq.request.del(pbreq.options, callback)
    },

    is_get: function (aray, callback) {
        if (!callback) { callback = pbreq.fallback }

        pbreq.mk_url(aray)
        pbreq.options.url += ('?depth=' + pbreq.depth)
        pbreq.fullheader()

        pbreq.request.get(pbreq.options, callback)
    },


    is_patch: function (aray, jason, callback) {
        if (!callback) { callback = pbreq.fallback }

        pbreq.mk_url(aray)
        pbreq.options.body = JSON.stringify(jason)
        pbreq.patchheader()

        pbreq.request.patch(pbreq.options, callback)
    },

    is_put: function (aray, jason, callback) {
        if (!callback) { callback = pbreq.fallback }

        pbreq.mk_url(aray)
        pbreq.options.body = JSON.stringify(jason)
        pbreq.fullheader()

        pbreq.request.put(pbreq.options, callback)
    },


    is_post: function (aray, jason, callback) {
        if (!callback) { callback = pbreq.fallback }

        pbreq.mk_url(aray)
        pbreq.options.body = JSON.stringify(jason)
        pbreq.fullheader()

        pbreq.request.post(pbreq.options, callback)
    },

    is_command: function (aray, jason, callback) {
        if (!callback) { callback = pbreq.fallback }

        pbreq.mk_url(aray)
        pbreq.options.body = JSON.stringify(jason)
        pbreq.commandheader()

        pbreq.request.post(pbreq.options, callback)
    },

    is_urlencoded: function (aray, str, callback) {
        if (!callback) { callback = pbreq.fallback }

        pbreq.mk_url(aray)
        pbreq.options.body = str
        pbreq.commandheader()

        pbreq.request.post(pbreq.options, callback)
    }

}
