//	ionosenterprise.js


// --enable-matt-compat

merge = require('./merge')
req = require('./req')
var ie = {}
/** 
merge is used to "flatten" functions 
into the top level namespace

instead of calling 

    ie.bricks.datacenter

with merge we can call

    ie.datacenter
**/

merge('./contractresources', ie)
merge('./datacenter', ie)
merge('./image', ie)
merge('./ipblock', ie)
merge('./lan', ie)
merge('./loadbalancer', ie)
merge('./location', ie)
merge('./nic', ie)
merge('./req', ie)
merge('./request', ie)
merge('./snapshot', ie)
merge('./server', ie)
merge('./usermanagement', ie)
merge('./volume', ie)
merge('./s3', ie)
merge('./k8s', ie)

module.exports = (function () { return ie })()

