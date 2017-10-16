//      pbcontractresources.js

module.exports = {

    listContractResources: function (callback) {
        pbreq.is_get(["contracts"], callback)
    }

}