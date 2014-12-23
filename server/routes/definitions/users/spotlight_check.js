'use strict';


var User = require('../../../models/user');

module.exports = {
  description: 'Select a Winner',
  tags:['notes'],
  handler: function(request, reply){
    //console.log('getting payload in winner route', request.payload);
    User.spotlightCheck(request.auth.credentials,function(err, confirmed){
      //  console.log(user);
      reply(confirmed).code(err ? 400 : 200);
    });
  }
};
