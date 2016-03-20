var FB = require('fb');
FB.setAccessToken('0e744d907a577fcaac97ecd497a28941');

var body = 'My first post using facebook-node-sdk';
FB.api('me/feed', 'post', { message: body}, function (res) {
  if(!res || res.error) {
    console.log(!res ? 'error occurred' : res.error);
    return;
  }
  console.log('Post Id: ' + res.id);
});
