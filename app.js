///////////////////////////////////////////////////
//   Main app.js file for Coding Dojo Message board app. 
// by: Troy Center, Coding Dojo, July 2017
///////////////////////////////////////////////////
//
///////////////////////////////////////////////////
//          Required programs
///////////////////////////////////////////////////
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

///////////////////////////////////////////////////
//              Setup Express App. 
///////////////////////////////////////////////////
const app = express();

///////////////////////////////////////////////////
//              Setup App variables 
///////////////////////////////////////////////////

app.use(express.static(path.join(__dirname + '/static/')));
app.set('views', path.join(__dirname + '/views/'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

///////////////////////////////////////////////////
//   Setup Mongo DB with Messages <<1/Many>> Comments
///////////////////////////////////////////////////
mongoose.connect('mongodb://localhost/message_board');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;

var MessageSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 4 }, 
    message: { type: String, required: true }, 
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, { timestamps: true });

mongoose.model('Message', MessageSchema);
var Message = mongoose.model('Message');

var CommentSchema = new mongoose.Schema({
    // since this is a reference to a different document, the _ is the naming convention!
    _message: {type: Schema.Types.ObjectId, ref: 'Message'},
    name: { type: String, required: true },
    comment: { type: String, required: true }, 
    }, { timestamps: true });

mongoose.model('Comment', CommentSchema);
var Comment = mongoose.model('Comment');

///////////////////////////////////////////////////
//                  Routes
///////////////////////////////////////////////////
app.get('/', function (req, res){
    console.log("*****************************************************");
    console.log("In app.js ROOT Route")
    console.log("*****************************************************");
    Message.find({})
        .populate('comments')
        .exec(function(err, messages){
        if(err){
            console.log("Error retrieving data from db... ", err);
            res.redirect('/');
        } else {
            console.log("Success getting Messages from db: ", messages);
            console.log("88888888", messages[0].comments.length)
            res.render('index', {messages: messages});
        }
    });
});

app.post('/newmessage', function(req, res){
    const message = new Message({name: req.body.name, message: req.body.message});
    message.save(function(err){
        if(err){ 
            console.log('Error inserting into db... ', err);
        } else {
            console.log('Success: inserted message into db...');
        }
        res.redirect('/');
    });
});

app.post('/newcomment', function(req, res){
    Message.findOne({_id: req.body.messageid}, function(err, message){
        if(err){
            console.log("Could not find message in db, error... ");
            res.redirect('/');
        } else {
            const comment = new Comment({name: req.body.name, comment: req.body.comment, _message: req.body.messageid});
            message.comments.push(comment);
            comment.save(function(err){
                message.save(function(err){
                        if(err){ 
                            console.log('Error inserting message or comment into db... ', err);
                        } else {
                            console.log('Success: inserted comment into db...');
                        }
                        res.redirect('/');
                });
            });
        }
    });
});
///////////////////////////////////////////////////
//          Listener on port 8000
///////////////////////////////////////////////////
port = 8000; 
app.listen(port, function(){
    console.log("Web Server Listening on port: ", port);
});