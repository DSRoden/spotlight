'use strict';

var Hapi         = require('hapi'),
  server         = new Hapi.Server('0.0.0.0', process.env.PORT, {cors: {
                                                                          origin: ['http://localhost:8100'],
                                                                          credentials: true
                                                                        }, timeout: {client: 60000}}),
  io             = require('socket.io')(server.listener),
  routes         = require('./routes/config/routes'),
  plugins        = require('./routes/config/plugins'),
  authentication = require('./routes/config/authentication');

io.on('connection', require('./sockets/connection'));
io.set('origins', '*:*');

server.pack.register(plugins, function(){
  server.auth.strategy('session', 'cookie', true, authentication);
  server.route(routes);
  server.start(function(){
    server.log('info', server.info.uri);
  });
});

