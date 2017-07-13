///////////////////////////////////////////////////
//   Main app.js file for Coding Dojo Message board app. 
///////////////////////////////////////////////////


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

app.use(express.static(path.join(__dirname + '/static/')))
app.set('views', path.join(__dirname + '/views/'))
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

///////////////////////////////////////////////////
//              Setup Mongo DB
///////////////////////////////////////////////////
mongoose.connect('mongodb://localhost/quoting_dojo');
mongoose.Promise = global.Promise;

var MessageSchema = new mongoose.Schema({
    name: String, 
    message: String,
}, { timestamps: true });

mongoose.model('Message', MessageSchema);
var Message = mongoose.model('Message');

///////////////////////////////////////////////////
//                  Routes
///////////////////////////////////////////////////
app.get('/', function (req, res){
    res.render('index');
});

app.post('/newmessage', function(req, res){
    console.log("*****************************************************")
    console.log("In NewMessage app.js | req.body: ",req.body)
    console.log("*****************************************************")
    res.redirect('/');
})

///////////////////////////////////////////////////
//          Listener on port 8000
///////////////////////////////////////////////////
port = 8000; 
app.listen(port, function(){
    console.log("Web Server Listening on port: ", port);
});