/**
 * Created by ssabic on 06/07/15.
 */
var user = 'jasmin@stackpointcloud.com';
var pass = 'L@xu6Ef8zw';

var helper = {};

helper.authenticate = function(pb){
    pb.pbauth(new Buffer(user + ':' + pass, 'ascii').toString('base64'));
}

module.exports=(function(){ return helper})()