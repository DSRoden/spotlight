'use strict';

var pg      = require('../postgres/manager'),
    _       = require('underscore');

function Message(){
}

Message.record = function(obj, cb){
  //console.log('obj for create', obj);
  /*jshint camelcase: false */
  pg.query('insert into messages (content, user_id, day_id) values ($1, $2, $3) returning id, created_at', [obj.content, obj.userId, obj.dayId], function(err, results){
    if(err){console.log(err); return cb();}
    console.log('results from message recordign and cat', results);
    /*jshint camelcase: false */
    var time = results.rows[0].created_at,
        id = results.rows[0].id;
    cb({time : time, id : id});
  });
};


Message.query = function(cb){
  //find id of most recent day
  pg.query('select * from days order by created_at desc limit 1', [], function(err, results){
    //console.log('results from message query', results);
    //use day id to collect all messages in descending order
    pg.query('select * from messages where day_id= $1 order by created_at desc', [results.rows[0].id], function(err2, results2){
      //console.log('results2 from message query', results2.rows);
      var messages =  _.map(results2.rows, function(obj){
                          /*jshint camelcase: false */
                          return {time: obj.created_at, content: obj.content, id: obj.id};
                        });
      cb(null, messages);
    });
  });
};

module.exports = Message;
