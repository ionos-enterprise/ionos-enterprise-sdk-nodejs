var lib = require('../lib/libionosenterprise');

// lib.setauth('username', 'password');

lib.listUsers((error, response, body) => {
  let users = JSON.parse(body),
      user_id = users['items'][0]['id'];

  lib.listS3Keys(user_id);

  lib.createS3Key(user_id, () => {
    lib.listS3Keys(user_id, (err, resp, raw) => {
      let keys = JSON.parse(raw);
      lib.disableS3Key(user_id, keys['items'][0]['id'], () => {
        lib.listS3Keys(user_id);
      });
    });
  });
});
