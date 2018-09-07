var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 3000;
var io = require('socket.io')(http);

var nickname = [];

http.listen(port, function () {
    console.log("Listening on *:" + port);
});

app.use(express.static(__dirname));
 
app.get('/', function(request,response) {
    response.sendFile(__dirname + '/index.html');
});

app.get('/onlineusers', function(request,response) {
    response.send(io.sockets.adapter.rooms);
});
// event Socket
io.once('connection', function (socket) {
    console.log('socket.id', socket.id);
    //Tell all clients that someone connected
    io.emit('user joined', socket.id)

    socket.on('new user', function(data, callback){
        if(nickname.indexOf(data) != -1)
            callback(false);
        else{
            callback(true);
            socket.nickname = data;
            nickname.push(socket.nickname);
            io.sockets.emit('username', nickname);
        }
    });
    socket.on('chat', function (data) {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data);
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
      });
});