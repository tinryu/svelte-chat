var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 3000;
var io = require('socket.io')(http);

var nicknames = [];
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
    socket.on('new user', function (data){
        if(nicknames.findIndex( i => i.name === data.username) != -1){
            io.sockets.emit('usernameexis', { message: 'user existing', flag: 1});
        }
        else{
            socket.nickname = data.username;
            nicknames.push({name: socket.nickname, id: socket.id, color: data.color} );
            updateNicknames();
        }
    });
    
    function updateNicknames(){
        io.sockets.emit('username', nicknames);
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
                    var recieverSocket = users[name].id;
                    socket.to(recieverSocket).emit('whisper', {message: message, handle: socket.nickname, color: data.color})
                    console.log('whisper !');
                } else {
                    io.sockets.emit('error', {message: 'Valid user'});
                }
            } else {
                io.sockets.emit('error', {message: 'Please enter your message'});
            }
        } else {
            io.sockets.emit('chat', {message: data.message, handle: socket.nickname, color: data.color});
        }
    });

    socket.on('typing', function () {
        socket.broadcast.emit('typing', socket.nickname);
    });

    socket.on('disconnect', function() {
        if(!socket.nickname) return;
        nicknames.splice(nicknames.indexOf(socket.nickname), 1);
        updateNicknames();
        console.log('user disconnected');
    });
});