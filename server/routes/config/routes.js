'use strict';

module.exports = [
{method: 'get',      path: '/{param*}',              config: require('../definitions/static/angular')},
  {method: 'post',   path: '/register',              config: require('../definitions/users/register')},
  {method: 'post',   path: '/login',                 config: require('../definitions/users/login')},
  {method: 'delete', path: '/logout',                config: require('../definitions/users/logout')},
  {method: 'get',    path: '/status',                config: require('../definitions/users/status')},
  {method: 'get',    path: '/users',                 config: require('../definitions/users/lottery')},
  {method: 'post',   path: '/winner',                config: require('../definitions/users/winner')},
  {method: 'get',    path: '/spotlightcheck',        config: require('../definitions/users/spotlight_check')},
  {method: 'post',   path: '/spotlight',             config: require('../definitions/users/spotlight_validate')},
  {method: 'get',    path: '/messages',              config: require('../definitions/messages/query')},
  {method: 'get',    path: '/messages/authenticated',config: require('../definitions/messages/query_auth')},
  {method: 'post',   path: '/photos',                config: require('../definitions/photos/upload_photos')},
  {method: 'get',    path: '/photos',                config: require('../definitions/photos/query')},
  {method: 'post',   path: '/notes',                 config: require('../definitions/notes/create')},
  {method: 'get',    path: '/notes',                 config: require('../definitions/notes/query')},
  {method: 'post',   path: '/notes/{noteId}/upload', config: require('../definitions/notes/upload')},
  {method: 'post',   path: '/notes/{noteId}/upload-mobile', config: require('../definitions/notes/upload-mobile')},
  {method: 'get',    path: '/notes/{noteId}',        config: require('../definitions/notes/show')},
  {method: 'delete', path: '/notes/{noteId}',        config: require('../definitions/notes/nuke')},
  {method: 'get',    path: '/notes/count',           config: require('../definitions/notes/count')}
];
