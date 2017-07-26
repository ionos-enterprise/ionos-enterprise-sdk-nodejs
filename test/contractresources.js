var assert = require('assert-plus');
var pb = require('../lib/libprofitbricks');
var helper = require('../test/testHelper');
var config = require('../test/config');

describe('Contract resources tests', function () {
    this.timeout(10000);

    before(function (done) {
        helper.authenticate(pb);
        done();
    });

    it('List contract resources', function (done) {
        pb.listContractResources(function (error, response, body) {
            assert.equal(error, null);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.type, 'contract');
            assert.number(object.properties.contractNumber);
            done();
        });
    });
});