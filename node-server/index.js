const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const fs = require('fs');
const util = require('util');
const moment = require('moment');

function logger(type, message) {
    var type_string = "";
    if (type == "s") {
        type_string = " status";
    }
    else if (type == "p") {
        type_string = "publish";
    }
    
    console.log(
        moment().utcOffset("-05:00").format() + "    " + 
        type_string + ":                " + 
        message
    );
};

var port = 8888;
var settings = JSON.parse(fs.readFileSync('/home/ubuntu/web/json/settings.json', 'utf8')).settings;
logger("s", "Using User Settings: \n\n" + util.inspect(settings, false, null) + "\n\n");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post('/on_publish', (req, res) => {
    logger("p", "New Publishing Attempt");
    var check = false;

    settings.users.forEach(function(element){
        if (req.body.addr == element.addr && req.body.name == element.streamkey) {
            check = true;
            logger("p", "Publishing allowed for: " + element.username);
            res.status(200).send('OK');
        }
    });
    if (!check) {
        logger("p", "Publishing blocked for IP: " + req.body.addr + " on streamkey: " + req.body.name);
        res.status(404).send('Blocked');
    }
});

app.listen(port, () => {logger("s", "Application listening on port: " + port);});
