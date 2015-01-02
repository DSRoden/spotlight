'use strict';

var pg      = require('../postgres/manager'),
    _       = require('underscore');


function Day(){
}


Day.query = function(cb){
  //find id of most recent day
  pg.query('select * from days order by created_at desc', [], function(err, response){
  if(err){return cb();}
  var array = response.rows;
  //console.log(response.rows);
  for(var i = 0; i < array.length; i++){
    delete array[i].password;
  }
  cb(null, array);
  });
};

Day.show = function(dayId, cb){
  console.log('dayId inside day model show', dayId);
  pg.query('select * from show_day($1)', [dayId], function(err, results){
    if(err){console.log('error from show day', err);}
    pg.query('select count(*) from mlikes where day_id= $1', [dayId], function(err, results2){
      pg.query('select count(*) from ilikes where day_id= $1', [dayId], function(err, results3){
        pg.query('select * from messages where day_id= $1', [dayId], function(err, messages){
          pg.query('select * from images where day_id= $1', [dayId], function(err, images){
            console.log('results from show day', results.rows);
            console.log('results2 from show day', results2.rows);
            console.log('results3 from show day', results3.rows);
            console.log('messages from show day', messages);
            console.log('images from show day', images);

            var likes = parseInt(results2.rows[0].count)  + parseInt(results3.rows[0].count);
            console.log('likes in show day', likes);
            console.log('username from show day', results);

            var day = results.rows[0];
            day.likes = likes;
            var messagesArray = messages.rows,
            imagesArray = (images.rows.length !== 0) ? images.rows : [];

            day.updates =_.union(messagesArray, imagesArray);

            cb(null, day);

          });
        });
      });
    });
  });
};


module.exports = Day;
