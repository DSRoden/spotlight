/* jshint camelcase:false */

'use strict';

var pg     = require('../postgres/manager'),
AWS    = require('aws-sdk'),
crypto = require('crypto'),
User   = require('./user'),
_       = require('underscore');

function Photo(){
}

Photo.query = function(cb){
  //find id of most recent day
  pg.query('select * from days order by created_at desc limit 1', [], function(err, results){
    //console.log('results from photos query', results);
    //use day id to collect all photos in descending order
    pg.query('select * from images where day_id= $1 order by created_at desc', [results.rows[0].id], function(err2, results2){
      //console.log('results2 from photos query', results2.rows);
      var photos =  _.map(results2.rows, function(obj){
        /*jshint camelcase: false */
        return {time: obj.created_at, url: obj.url, id: obj.id, likes: obj.likes};
      });
      cb(null, photos);
    });
  });
};

Photo.queryAuth = function(user, cb){
  //find id of most recent day
  pg.query('select * from days order by created_at desc limit 1', [], function(err, results){
    console.log('results from message query', results);
    //use day id to collect all messages in descending order
    pg.query('select * from images where day_id= $1 order by created_at desc', [results.rows[0].id], function(err2, results2){
      console.log('results2 from message query', results2.rows);
      var images =  _.map(results2.rows, function(obj){
        /*jshint camelcase: false */
        return {time: obj.created_at, url: obj.url, id: obj.id, likes: obj.likes};
      });
      console.log('images collected', images);
      //get ids of photos that the current user has liked
      pg.query('select * from ilikes where day_id= $1 and user_id= $2', [results.rows[0].id, user.id], function(err3, results3){
        console.log('ids of photos that user has liked', results3.rows);
        if(results3.rows.length === 0){return cb(null, images);}
        var likedPhotos = results3.rows,
        newArray = [];
        likedPhotos.forEach(function(obj){
          for(var i = 0; i < images.length; i++){
            if(obj.image_id === images[i].id){
              delete obj.user_id;
              delete obj.day_id;
              delete obj.image_id;
              obj.time = images[i].time;
              obj.url = images[i].url;
              obj.id = images[i].id;
              obj.likes = images[i].likes;
              obj.liked = 'yes';
              images[i].id = null;
              newArray.push(obj);
            } else if(obj.id !== images[i].id && obj.image_id !== images[i].id){newArray.push(images[i]);} else { return;}
            }
          });
          var finalArray = _.uniq(newArray);
          finalArray = _.filter(finalArray, function(item){return item.id !== null;});
          console.log('finalArray', finalArray);
          cb(null, finalArray);
        });
      });
    });
  };


Photo.like = function(data, cb){
  //console.log('data being received by message.like in message model >>>>', data);
  //data.userId and data.messageId
  var increment = 1;
  pg.query('select * from ilikes where user_id= $1 and image_id= $2 limit 1', [data.userId, data.imageId], function(err, res){
    //console.log('response from checking to see if a user has liked a message in the past>>>', res);
    console.log('error from checking to see if a user has liked a message in the past>>>', res);
    if(res.rows.length !== 0){return cb();}
    pg.query('select * from days order by created_at desc limit 1', [], function(err1, res2){
      console.log('err1', err1);
      pg.query('update images SET likes= likes + $1 where id = $2 returning likes', [increment, data.imageId], function(err, response){
        if(err){
          console.log('error in updated in message likes', err);
          return cb();
        }
        console.log('response from images like', response);
        pg.query('insert into ilikes (user_id, image_id, day_id) values($1, $2, $3)', [data.userId, data.imageId, res2.rows[0].id], function(err2, response2){
          if(err2){
            console.log('error in inserting into likes table', err2);
            return cb();
          }
          console.log('response2 from images like', response2);
          cb({likes: response.rows[0].likes, id: data.imageId});
        });
      });
    });
  });
};


Photo.uploadmobile = function(user, b64, cb){
  //implement secure spotlight check
  User.secureSpotlight(user.id, function(dayObj){
    if(!dayObj){return cb();}
    //if user validated implement photo upload to S3
    var s3   = new AWS.S3();

    crypto.randomBytes(48, function(ex, buf){
      var hex = buf.toString('hex'),
      loc = dayObj.dayId + '/' + hex + '.jpg',
      url = 'https://s3.amazonaws.com/' + process.env.AWS_BUCKET + '/' + loc;

      pg.query('insert into images (url, day_id, user_id) values ($1, $2, $3) returning id, url, created_at', [url, dayObj.dayId, user.id], function(err, results){
        //make sure the image is being added to database
        console.log('error inserting image into db>>>>>', err);
        if(err){return cb(err);}
        console.log('results from inserting image into db>>>>', results);

        //prepare image object to be sent back
        var imageId = results.rows[0].id,
        imageUrl = results.rows[0].url,
        time = results.rows[0].created_at,
        imageObj = {time: time, url: imageUrl, id: imageId};
        console.log('image object inside model', imageObj);

        var bin    = new Buffer(b64, 'base64'),
        params = {Bucket: process.env.AWS_BUCKET, Key: loc, Body: bin, ACL: 'public-read'};
        s3.putObject(params, function(s3object){
          cb(imageObj);
        });
      });
    });
  });
};


module.exports = Photo;
