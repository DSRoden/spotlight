/* jshint camelcase:false */

'use strict';

var pg     = require('../postgres/manager'),
AWS    = require('aws-sdk'),
crypto = require('crypto'),
User   = require('./user');

function Photo(){
}

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

        var bin    = new Buffer(b64, 'base64'),
        params = {Bucket: process.env.AWS_BUCKET, Key: loc, Body: bin, ACL: 'public-read'};
        s3.putObject(params, function(s3Response){
          console.log('s3 response>>>>>', s3Response);
          if(!s3Response){return cb();}

          //prepare image object to be sent back
          var imageId = results.rows[0].id,
          imageUrl = results.rows[0].url,
          time = results.rows[0].created_at;

          //return image object
          cb({time : time, url : imageUrl, id : imageId});
        });
      });
    });
  });
};

module.exports = Photo;
