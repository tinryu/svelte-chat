var express = require('express');
// var path = require('path');
var compression = require('compression');
var app = express();

app.use(compression());

app.use(express.static(__dirname));

app.listen(4000, function () {
    console.log('Example listening on port 4000!');
});

module.exports = app;