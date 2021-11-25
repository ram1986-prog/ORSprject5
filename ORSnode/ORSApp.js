//Import dependencies 
var express = require('express');
var session = require("express-session")
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var cors =require('cors');
//Create express app
var app = express();

//Configure modules
app.use(bodyParser.json());//parse json data from request
app.use(bodyParser.urlencoded({ extended: true })); //parse request parameters  
app.use(cookieParser()) //Cookie parser

//Set session timeout
app.use(session({
    secret: 'test',
    saveUninitialized: false,
    resave: true,
    cookie: { maxAge: 1000000, secure: false, httpOnly: true }
}));

//Set static resources folder
//app.use(express.static('./public'));

//Allow cross-origin resource sharing (CORS)

app.use(function (req, res, next) {
    console.log(req.url);
    res.header("SunilOS", "Rays");
    //res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    next();
})
//app.use(cors());

// var env = 'dev';
// //var env = 'prod';
// if (env == 'dev') {
//     app.use(cors({
//         origin: [
//             "http://localhost:4200"//dev active prod comment
//         ], credentials: true
//     }));
// }
// if (env == 'prod') {
//     app.use(cors({
//         origin: ["http://localhost:8080"],//prod active dev comment
//         credentials: true
//     }));
// }
app.use(cors({
    origin: [
        "http://localhost:4200","http://localhost:8080"
     ], credentials: true
}));

app.use('/ORSproj5/',express.static('ORSproj5'))
//Set Routes
//Incoming requests do not need authentication 
app.use('/auth', require('./authRouter'))

//Incoming requests need authentication 
app.use('/', require('./appRouter'))

//Start server at 8080 port
var listener = app.listen(8080, "localhost", function () {
    var host = listener.address().address
    var port = listener.address().port
    console.log('listening to http://' + host + ':' + port);
});

