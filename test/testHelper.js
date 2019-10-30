/**
 * Created by ssabic on 06/07/15.
 */
var user = process.env.IONOS_USERNAME;
var pass = process.env.IONOS_PASSWORD;

var helper = {};

helper.authenticate = function(lib){
    lib.auth(new Buffer(user + ':' + pass, 'ascii').toString('base64'));
};

helper.getCredentials = function(){
    var creds = {};
    creds.user = user;

    return creds;

};

helper.getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

module.exports=(function(){ return helper})()
