
const mongoose = require('mongoose');
var Message = mongoose.model('Message');
var Comment = mongoose.model('Comment');

module.exports = {
    find: function(req, res){
        console.log("*****************************************************");
        console.log("In app.js ROOT Route");
        console.log("*****************************************************");
        Message.find({})
            .populate('comments')
            .exec(function(err, messages){
            if(err){
                console.log("Error retrieving data from db... ", err);
                res.redirect('/');
            } else {
                console.log("Success getting Messages from db: ", messages);
                res.render('index', {messages: messages});
            }
        });
    },
    newmessage: function(req, res){
        const message = new Message({name: req.body.name, message: req.body.message});
        message.save(function(err){
            if(err){ 
                console.log('Error inserting into db... ', err);
            } else {
                console.log('Success: inserted message into db...');
            }
            res.redirect('/');
        });
    },
    newcomment: function(req, res){
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
    }
};