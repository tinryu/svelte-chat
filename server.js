var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 3001;
var io = require('socket.io')(http);

// var nicknames = [];
var users = {};

http.listen(port, function () {
    console.log("Listening on *:" + port);
});

app.use(express.static(__dirname));
 
app.get('/', function(request,response) {
    response.sendFile(__dirname + '/index.html');
});

// event Socket
io.sockets.on('connection', function (socket) {
    console.log('socket user id', socket.id);
    socket.on('new user', function (data){
        if(data in users){
            console.log('existing user');
        }else{
            socket.nickname = data.username;
            console.log('name:', data.username);
            console.log('id:', socket.id);
            users[socket.nickname] = socket;
            updateNicknames();
        }
    });
    
    function updateNicknames(){
        io.sockets.emit('username', Object.keys(users));
    }

    socket.on('chat', function (data) {
        var msg = data.message.trim();
        if(msg.substr(0, 3) === '/w ') {
            msg = msg.substr(3);
            var ind = msg.indexOf(' ');
            if(ind !== -1){
                var name = msg.substring(0, ind);
                var message = msg.substring(ind + 1);
                if(name in users) {
                    console.log('====', name);
                    console.log('====id:', users[name].id);
                    var recieverSocket = users[name].id;
                    socket.to(recieverSocket).emit('whisper', {message: message, handle: 'username', color: data.color})
                    console.log('whisper !');
                } else {
                    console.log('error enter valid user');
                    io.sockets.emit('error', {message: 'error enter valid user'});
                }
            } else {
                console.log('error pls enter message');
                io.sockets.emit('error', {message: 'error pls enter message'});
            }
        } else {
            io.sockets.emit('chat', data);
        }
    });

    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data);
    });

    socket.on('disconnect', function() {
        if(!socket.nickname) return;
        delete users[socket.nickname];
        console.log('user disconnected');
    });
});