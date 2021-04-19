/**** Import npm libs ****/

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const session = require('express-session')({
    secret: "eb8fcc253281389225b4f7872f2336918ddc7f689e1fc41b64d5c4f378cdc438",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000,
        secure: false
    }
});

const sharedSession = require("express-socket.io-session");
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const fileUpload = require('express-fileupload');

/**** Import project libs ****/

//const monopalim = require('./back/monopalim.js');
const House = require('./back/house.js');


/**** Project configuration ****/

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'monopalim'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");
});

app.use(jsonParser);
app.use(express.static(path.join(__dirname, '/front/')));
app.use(urlencodedParser);
app.use(session);
app.use(fileUpload({
    createParentPath: true,
    limits:{
        fileSize: 10*1024*1024*1024,
    }
}));

io.use(sharedSession(session, {
    autoSave: true
}));

/**** prod ? secure in https ****/
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    session.cookie.secure = true // serve secure cookies
}

/**** Code ****/

let house = new House();
let playersConnected = [];

//first page when you are connected to the server
app.get('/', (req, res) => {
    if (req.session.loggedin) res.redirect('/rooms');
    else res.sendFile(__dirname + '/front/html/welcome.html');
});

//redirection registration page
app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname + '/Front/html/registration.html'));
});

//redirection connection page
app.get('/connection', (req, res) => {
    res.sendFile(path.join(__dirname + '/Front/html/connection.html'));
});

//redirection rooms page
app.get('/menu', (req, res) => {
    if (req.session.loggedin)
        res.sendFile(path.join(__dirname + '/Front/html/menu.html'));
    else res.redirect('/');
});

//login with identifiers when the person already has an account
app.post('/connect', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    con.query('SELECT * FROM accounts WHERE Username = ? AND Password = ?', [username, password], function(error, results) {
        if(error) {
            throw error;
        }
        else if (results.length > 0) {
            req.session.loggedin = true;
            req.session.username = username;
            req.session.admin = results[0].admin == 1;
            req.session.save();
            playersConnected.push(req.session.username);
            res.redirect('../menu');
            console.log(playersConnected);
        }
        else {
            res.send('Pseudo et/ou mot de passe incorrect(s) !');
        }
    });

    con.query("SELECT PLayerIndex FROM accounts WHERE Username = ? AND Password = ?", [username, password], function (err, id) {
        if (err) throw err;
        req.session.id = id;
    });

});

//login with identifiers when the person doesn't have an account
app.post('/register', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    con.query('SELECT * FROM accounts WHERE Username = ?', [username], function(error, results) {
        if (error) throw error;
        else if (results.length > 0) res.send('Ce pseudo est déjà pris !');
        else {
            con.query('INSERT INTO accounts (Username, email, Password, Admin) VALUES (?, ?, ?, ?)', [username, email, password, false], function(error) {
                if(error) throw error;
                req.session.loggedin = true;
                req.session.username = username;
                req.session.admin = false;
                req.session.save();
                res.redirect('../menu');
            });
        }
    });
    con.query("SELECT PLayerIndex FROM accounts WHERE Username = ? AND Password = ?", [username, password], function (err, result) {
        if (err) throw err;
        req.session.id = result;
    });
});

/**** interaction with front ****/

io.on('connection', socket => {

    //create a public room
    socket.on('public', () =>{
        if (house.addWaiter(socket)) {
            if (house.getWaiters().length >= 2) {
                let waiters = house.popWaiters();
                let room = house.addPublicRoom(waiters[0], waiters[1]);
                room.game = 0;
                room.board = 0;
                room.state = 0;

                //chrono
                room.timeDebut = 0;
                room.timeFin = 0;
                room.timeGame = 0;

                //to play
                room.player1Ready = false;
                room.player2Ready = false;
                room.firstClick = false;
                room.secondClick = false;

                room.player1 = waiters[0];
                room.player2 = waiters[1];
                room.player1.emit('play', 'play as player1');
                room.player2.emit('play', 'play as player2');
            } else socket.emit('public');
        }
    });

    socket.on('logout', () => {
        socket.handshake.session.loggedin = false;
        socket.handshake.session.username = undefined;
        socket.handshake.session.admin = false;
        socket.handshake.session.save();
    });
});

server.listen(3600, () => {
    console.log('Serveur lancé sur le port 3600');
});