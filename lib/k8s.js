//  s3.js


module.exports = {

    listK8SClusters: function (callback) {
        req.is_get(["k8s"], callback)
    },

    createK8SCluster: function (name, callback) {
        let body = {
            "properties": {
                "name": name
            }
        }

        req.is_post(["k8s"], body, callback)
    },

    getK8SCluster: function (id, callback) {
        req.is_get(["k8s", id], callback)
    },

    updateK8SCluster: function (id, name, callback) {
        let body = {
            "properties": {
                "name": name
            }
        }

        req.is_put(["k8s", id], body, callback)
    },

    deleteK8SCluster: function (id, callback) {
        req.is_delete(["k8s", id], callback)
    },

    getK8SClusterConfig: function (id, callback) {
        req.is_get(["k8s", id, "kubeconfig"], callback)
    },

    listK8SClusterNodePools: function (id, callback) {
        req.is_get(["k8s", id, "nodepools"], callback)
    },

    /*
    Example body:
    {
      "properties": {
        "name": "[kubernetes-nodepool-name]",
        "datacenterId": "{dataCenterId}",
        "nodeCount": [nodeCount],
        "cpuFamily": "[cpuFamily]",
        "coresCount": [coresCount],
        "ramSize": [ramSize]],
        "availabilityZone": "[availabilityZone]",
        "storageType": "[storageType]",
        "storageSize": [storageSize]
      }
    }
    */
    createK8SClusterNodePool: function (id, jason, callback) {
        req.is_post(["k8s", id, "nodepools"], jason, callback)
    },

    getK8SClusterNodePool: function (cluster_id, nodepool_id, callback) {
        req.is_get(["k8s", cluster_id, "nodepools", nodepool_id], callback)
    },

    /*
    Example body:
    {
      "properties": {
        "name": "[kubernetes-nodepool-name]",
        "datacenterId": "{dataCenterId}",
        "nodeCount": [nodeCount],
        "cpuFamily": "[cpuFamily]",
        "coresCount": [coresCount],
        "ramSize": [ramSize]],
        "availabilityZone": "[availabilityZone]",
        "storageType": "[storageType]",
        "storageSize": [storageSize]
      }
    }
    */
    updateK8SClusterNodePool: function (cluster_id, nodepool_id, jason, callback) {
        req.is_put(["k8s", cluster_id, "nodepools", nodepool_id], jason, callback)
    },

    deleteK8SClusterNodePool: function (cluster_id, nodepool_id, callback) {
        req.is_delete(["k8s", cluster_id, "nodepools", nodepool_id], callback)
    }

}
