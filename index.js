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

const monopalim = require('./back/monopalim.js');
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

//first page when you are connected to the server
app.get('/', (req, res) => {
    if (req.session.loggedin) res.redirect('/rooms');
    else res.sendFile(__dirname + '/front/html/welcome.html');
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