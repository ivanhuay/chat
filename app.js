var express = require('express');
var io = require('socket.io');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var msg = [];//variable global para mensajes


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
    mongoose.connect("mongodb://localhost/test");
}
var msg_user_data = mongoose.model("msg_users",{"name":String,"msg":String});
mongoose.model('msg_users').find(function (err, data){
    msg = data;//cargo la variabe global con 
});

app.get('/drawill',function (req,res){
    mongoose.model('msg_users').find(function (err, msg){
        res.send(msg);
    });

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// production error handler

// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



//module.exports = app;
server = app.listen(3000,function (){
    console.log('Listening on port %d', server.address().port);
});

io = io.listen(server);

io.sockets.on("connection",function(socket){
    
    socket.emit("msg_draw",msg);

    socket.on("msg_emit",function (data){
        msg.push(data);
        io.sockets.emit("msg_draw",msg);
        var user_data = new msg_user_data(data});
        user_data.save(function (err){
            if(err) console.log(err);
        });
    });
})