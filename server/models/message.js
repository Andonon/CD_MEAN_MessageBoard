const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

const MessageSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 4 }, 
    message: { type: String, required: true }, 
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, { timestamps: true });

mongoose.model('Message', MessageSchema);
const Message = mongoose.model('Message');

const CommentSchema = new mongoose.Schema({
    // since this is a reference to a different document, the _ is the naming convention!
    _message: {type: Schema.Types.ObjectId, ref: 'Message'},
    name: { type: String, required: true },
    comment: { type: String, required: true }, 
    }, { timestamps: true });

mongoose.model('Comment', CommentSchema);
const Comment = mongoose.model('Comment');