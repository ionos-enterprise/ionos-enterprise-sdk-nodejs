/**
 * Created by ssabic on 06/07/15.
 */
var user = 'jasmin@stackpointcloud.com';
var pass = 'xxxxxxxxx';

var helper = {};

helper.authenticate = function(pb){
    pb.pbauth(new Buffer(user + ':' + pass, 'ascii').toString('base64'));
};

helper.getCredentials = function(){
    var creds = {};
    creds.user = user;

    return creds;

};

module.exports=(function(){ return helper})()