var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = process.env.PORT || 3000;
var io = require('socket.io')(http);
var redis = require('redis');
var moment = require('moment');

var hostRedis = '127.0.0.1';
var portRedis = 6379;
var nicknames = [];
// Create Redis Client
let client = redis.createClient(portRedis, hostRedis);

client.on('connect', function(){
    console.log('Connected to Redis...');
});
client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

http.listen(port, function () {
    console.log("Listening on *:" + port);
});

app.use(express.static(__dirname));
 
app.get('/', function(request,response) {
    response.sendFile(__dirname + '/index.html');
});

app.get('/check', function(request,response) {
    let name = request.query.name;
    client.hgetall(name, function (err, obj) {
        if(err){
            response.send({flag: 0, meassge: err});
        }
        else if(obj){
            let info = JSON.parse(obj.info);
            if(info.name === name){
                response.send({flag: 1, meassge: 'username '+ name +' exist pls change name'});
            }else{
                response.send({flag: 0, meassge: 'create user sucess'});
            }
        }else {
            response.send({flag: 0, meassge: 'username not exist'});
        }
    });
});

app.get('/all', function(request, response) {
    client.hgetall("story", function (err, obj) {
        if(err)
            console.log(err);
        else
            response.send(obj);
            
        // client.quit();
    });
});

app.delete('/user/:name', function(request, response) {
    let name =  request.params.name;
    try{
        client.del(name);
        response.send('true');
    }
    catch(err){
        response.send(err);
    }
});

// event Socket
io.sockets.on('connection', function (socket) {
    socket.on('new user', function (data){
        if(nicknames.findIndex( i => i.name === data.username) != -1){
            socket.emit("userexist", 'username '+ data.username +' exist pls change name');
        }
        else{
            socket.nickname = data.username;
            nicknames.push({name: socket.nickname, id: socket.id, color: data.color} );
            client.hmset(data.username, "id", socket.id, "info", JSON.stringify({"name": data.username, "color": data.color}));
            updateNicknames();
            socket.emit("usersucess", 'create user sucess');
        }
    });
    
    function updateNicknames(){
        io.sockets.emit('username', nicknames);
    }

    socket.on('chat', function (data) {
        var msg = data.message.trim();
        // let datetime = new Date().getTime();
        let datetime = moment().format('MM/DD/YYYY, h:mm:ss a');
        if(msg.substr(0, 3) === '/w ') {
            msg = msg.substr(3);
            var ind = msg.indexOf(' ');
            if(ind !== -1){
                var name = msg.substring(0, ind);
                var message = msg.substring(ind + 1);
                if(name in users) {
                    var recieverSocket = users[name].id;
                    socket.to(recieverSocket).emit('whisper', {message: message, handle: socket.nickname, color: data.color})
                    // client.hmset('messagePrivateOf-'+socket.nickname+'-'+datetime, "id", socket.id, "name", socket.nickname, "time", moment().format('MM/DD/YYYY, h:mm:ss a'), "message", message, "color", data.color);
                } else {
                    io.sockets.emit('error', {message: 'Valid user'});
                }
            } else {
                io.sockets.emit('error', {message: 'Please enter your message'});
            }
        } else {
            io.sockets.emit('chat', {message: data.message, handle: socket.nickname, color: data.color});
            client.hset("story", "mess"+"-"+socket.id+"-"+socket.nickname+"-"+data.color+"-"+datetime , data.message, redis.print);
            // client.hmset('messageOf-'+socket.nickname+'-'+datetime, "id", socket.id, "name", socket.nickname, "time", moment().format('MM/DD/YYYY, h:mm:ss a'), "message", data.message, "color", data.color);
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
