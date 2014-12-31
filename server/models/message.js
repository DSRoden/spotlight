/* jshint camelcase:false */
'use strict';

var pg      = require('../postgres/manager'),
    _       = require('underscore');

function Message(){
}

Message.record = function(obj, cb){
  //console.log('obj for create', obj);
  /*jshint camelcase: false */
  pg.query('insert into messages (content, user_id, day_id) values ($1, $2, $3) returning id, created_at, likes', [obj.content, obj.userId, obj.dayId], function(err, results){
    if(err){console.log(err); return cb();}
    //console.log('results from message recording and chat', results);
    /*jshint camelcase: false */
    var time = results.rows[0].created_at,
        id = results.rows[0].id,
        likes = results.rows[0].likes;
    cb({time : time, id : id, likes: likes});
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
        return {time: obj.created_at, content: obj.content, id: obj.id, likes: obj.likes};
      });
      cb(null, messages);
    });
  });
};


Message.queryAuth = function(user, cb){
  //find id of most recent day
  pg.query('select * from days order by created_at desc limit 1', [], function(err, results){
    //console.log('results from message query', results);
    //use day id to collect all messages in descending order
    pg.query('select * from messages where day_id= $1 order by created_at desc', [results.rows[0].id], function(err2, results2){
      //console.log('results2 from message query', results2.rows);
      var messages =  _.map(results2.rows, function(obj){
        /*jshint camelcase: false */
        return {time: obj.created_at, content: obj.content, id: obj.id, likes: obj.likes};
      });
      //console.log('messages collected', messages);
      //get ids of messages that the current user has liked
      pg.query('select * from mlikes where day_id= $1 and user_id= $2', [results.rows[0].id, user.id], function(err3, results3){
        //console.log('ids of messages that user has liked', results3.rows);
        if(results3.rows.length === 0){return cb(null, messages);}
        var likedMessages = results3.rows,
            newArray = [];
            likedMessages.forEach(function(obj){
              for(var i = 0; i < messages.length; i++){
                if(obj.message_id === messages[i].id){
                  delete obj.user_id;
                  delete obj.day_id;
                  delete obj.message_id;
                  obj.time = messages[i].time;
                  obj.content = messages[i].content;
                  obj.id = messages[i].id;
                  obj.likes = messages[i].likes;
                  obj.liked = 'yes';
                  messages[i].id = null;
                  newArray.push(obj);
                } else if(obj.id !== messages[i].id && obj.message_id !== messages[i].id){newArray.push(messages[i]);} else { return;}
              }
            });
        var finalArray = _.uniq(newArray);
        finalArray = _.filter(finalArray, function(item){return item.id !== null;});
        //console.log('finalArray', finalArray);
        cb(null, finalArray);
      });
    });
  });
};



Message.like = function(data, cb){
  //console.log('data being received by message.like in message model >>>>', data);
  //data.userId and data.messageId
  var increment = 1;
  pg.query('select * from mlikes where user_id= $1 and message_id= $2 limit 1', [data.userId, data.messageId], function(err, res){
    //console.log('response from checking to see if a user has liked a message in the past>>>', res);
    console.log('error from checking to see if a user has liked a message in the past>>>', res);
    if(res.rows.length !== 0){return cb();}
    pg.query('select * from days order by created_at desc limit 1', [], function(err1, res2){
      console.log('err1', err1);
      pg.query('update messages SET likes= likes + $1 where id = $2 returning likes', [increment, data.messageId], function(err, response){
        if(err){
          console.log('error in updated in message likes', err);
          return cb();
        }
        pg.query('insert into mlikes (user_id, message_id, day_id) values($1, $2, $3)', [data.userId, data.messageId, res2.rows[0].id], function(err2, response2){
          if(err2){
            console.log('error in inserting into likes table', err2);
            return cb();
          }
          cb({likes: response.rows[0].likes, id: data.messageId});
        });
      });
    });
  });
};


module.exports = Message;
