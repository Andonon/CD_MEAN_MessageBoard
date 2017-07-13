

const mongoose = require('mongoose');
var Message = mongoose.model('Message');
var Comment = mongoose.model('Comment');
var messages = require('../controllers/messages.js');


///////////////////////////////////////////////////
//                  Routes
///////////////////////////////////////////////////
module.exports = function(app) {
    app.get('/', function (req, res){
        messages.find(req, res);
    });

    app.post('/newmessage', function(req, res){
        messages.newmessage(req, res);
    });

    app.post('/newcomment', function(req, res){
        messages.newcomment(req, res);
    });
};