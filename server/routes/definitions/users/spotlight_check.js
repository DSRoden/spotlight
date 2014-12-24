'use strict';


var User = require('../../../models/user');

module.exports = {
  description: 'Select a Winner',
  tags:['notes'],
  handler: function(request, reply){
    //console.log('getting payload in winner route', request.payload);
    User.spotlightCheck(request.auth.credentials,function(err, obj){
      //  console.log(user);
      reply(obj).code(err ? 400 : 200);
    });
  }
};
