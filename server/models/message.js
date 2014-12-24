'use strict';

var pg      = require('../postgres/manager');

function Message(){
}

Message.record = function(obj, cb){
  //console.log('obj for create', obj);
  pg.query('insert into messages (content, user_id, day_id) values ($1, $2, $3) returning id', [obj.content, obj.userId, obj.dayId], function(err, results){
    if(err){console.log(err); return cb();}
    cb(results.rows[0].id);
  });
};



module.exports = Message;
