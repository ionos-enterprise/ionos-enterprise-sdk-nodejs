var lib = require('../lib/libionosenterprise');

// lib.setauth(process.env.IONOSENTERPRISE_USERNAME, process.env.IONOSENTERPRISE_PASSWORD);

lib.listK8SClusters((error, response, body) => {
  let data = JSON.parse(body);

  if (data.items.length < 1) {
    console.warn('Please create a Kubernetes cluster first!');
    process.exit(0);
  }

  lib.getK8SClusterConfig(data['items'][0]['id']);

  lib.listDatacenters((e, r, b) => {
    let dcs = JSON.parse(b);

    lib.listK8SClusterNodePools(data['items'][0]['id']);

    // lib.createK8SClusterNodePool(
    //   data['items'][0]['id'],
    //   {
    //     "properties": {
    //       "name": "n1",
    //       "datacenterId": dcs['items'][0]['id'],
    //       "nodeCount": 4,
    //       "cpuFamily": "AMD_OPTERON",
    //       "coresCount": 2,
    //       "ramSize": 4096,
    //       "availabilityZone": "AUTO",
    //       "storageType": "SSD",
    //       "storageSize": 100
    //     }
    //   }
    // );

  });

  // lib.createK8SCluster('k1', (error, response, body) => {
  //   console.log(body);
  // });
});
