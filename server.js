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

// event Socket
io.on('connection', function (socket) {
    socket.on('new user', function (data){
        if(nickname.indexOf(data.username) != -1)
            console.log('existing');
        else{
            socket.nickname = data.username;
            nickname.push({name: socket.nickname, id: socket.id, color: data.color} );
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