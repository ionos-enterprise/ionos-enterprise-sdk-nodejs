var pb = require('../lib/libprofitbricks');

// pb.setauth('username', 'password');

pb.listK8SClusters((error, response, body) => {
  let data = JSON.parse(body);

  pb.getK8SClusterConfig(data['items'][0]['id']);

  pb.listDatacenters((e, r, b) => {
    let dcs = JSON.parse(b);

    pb.listK8SClusterNodePools(data['items'][0]['id']);

    // pb.createK8SClusterNodePool(
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

  // pb.createK8SCluster('k1', (error, response, body) => {
  //   console.log(body);
  // });
});
