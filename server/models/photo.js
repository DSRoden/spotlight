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
        return {time: obj.created_at, url: obj.url, id: obj.id};
      });
      cb(null, photos);
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
