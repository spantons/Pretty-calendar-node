
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , alluser = require('./routes/alluser')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/', alluser.login);
app.post('/registrar', alluser.registrar);
app.post('/registrarSend', alluser.registrarSend);
app.post('/disponibilidad/email', alluser.disponibilidadEmail);
app.post('/disponibilidad/ci', alluser.disponibilidadCi);
app.post('/loginSend', alluser.loginSend);
//USER
app.post('/user', user.index);
app.get('/logout', user.logout);
app.post('/newEvent', user.newEvent);
app.post('/getEvents', user.getEvents);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port') + " in " + app.settings.env + " mode");
});
