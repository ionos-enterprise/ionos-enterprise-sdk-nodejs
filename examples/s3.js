var pb = require('../lib/libprofitbricks');

// pb.setauth('username', 'password');

pb.listUsers((error, response, body) => {
  let users = JSON.parse(body),
      user_id = users['items'][0]['id'];

  pb.listS3Keys(user_id);

  pb.createS3Key(user_id, () => {
    pb.listS3Keys(user_id, (err, resp, raw) => {
      let keys = JSON.parse(raw);
      pb.disableS3Key(user_id, keys['items'][0]['id'], () => {
        pb.listS3Keys(user_id);
      });
    });
  });
});
