var express = require("express"),
    morgan  = require('morgan')
    timer = require('./server/timer.js'),
    config = require('./timer-config.json'),

    app = express()
        .use(morgan('dev'))
        .use(timer)
        .use(express.static(__dirname + '/dist'))
        .listen(config.port, function() {
            console.log("Listening on " + config.port);
        });
