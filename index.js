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
const bcrypt = require('bcrypt');
const saltRounds = 12;
const salt = bcrypt.genSaltSync(saltRounds);

/**** Import project libs ****/

//const monopalim = require('./back/game/monopalim.js');
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
let playersPublic = [];


/**** Redirection ****/

//first page when you are connected to the server
app.get('/', (req, res) => {
    if (req.session.loggedin) res.redirect('/menu');
    else res.sendFile(__dirname + '/Front/html/welcome.html');
});

//redirection registration page
app.get('/registration', (req, res) => {
    res.sendFile(path.join(__dirname + '/Front/html/registration.html'));
});

//redirection connection page
app.get('/connection', (req, res) => {
    res.sendFile(path.join(__dirname + '/Front/html/connection.html'));
});

//redirection menu page
app.get('/menu', (req, res) => {
    if (req.session.loggedin)
        res.sendFile(path.join(__dirname + '/Front/html/menu.html'));
    else res.redirect('/');
});

//redirection profile page
app.get('/profile', (req, res) => {
    if (req.session.loggedin)
        res.sendFile(path.join(__dirname + '/Front/html/profile.html'));
    else res.redirect('/');
});

//redirection editProfile page
app.get('/editProfile', (req, res) => {
    if (req.session.loggedin)
        res.sendFile(path.join(__dirname + '/Front/html/editProfile.html'));
    else res.redirect('/');
});

//redirection game page
app.get('/game', (req, res) => {
    if (req.session.loggedin)
        res.sendFile(path.join(__dirname + '/Front/html/serverGame.html'));
    else res.redirect('/');
});

//redirection local game page
app.get('/localGame', (req, res) => {
    if (req.session.loggedin)
        res.sendFile(path.join(__dirname + '/Front/html/game.html'));
    else res.redirect('/');
});

//redirection score page
app.get('/score', (req, res) => {
    if (req.session.loggedin)
        res.sendFile(path.join(__dirname + '/Front/html/score.html'));
    else res.redirect('/');
});

//redirection tutorial page
app.get('/tutorial', (req, res) => {
    if (req.session.loggedin)
        res.sendFile(path.join(__dirname + '/Front/html/tutorial.html'));
    else res.redirect('/');
});

//redirection aboutUs page
app.get('/aboutUs', (req, res) => {
    if (req.session.loggedin)
        res.sendFile(path.join(__dirname + '/Front/html/aboutUs.html'));
    else res.redirect('/');
});

/**** Interaction with database ****/

//login with identifiers when the person already has an account
app.post('/connect', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if(!playersConnected.includes(username)) { //if you are not already connected
        con.query('SELECT * FROM accounts WHERE BINARY username = ? collate utf8_bin', [username], function(error, result){
            if (error) {
                throw error;
            } else if (result.length === 0) {
                req.session.error = 'error2';
                res.redirect('../connection');
            } else {
                let passwordHash = bcrypt.hashSync(password, result[0].salt);
                if (passwordHash === result[0].password) {
                    req.session.loggedin = true;
                    req.session.username = username;
                    req.session.password = passwordHash;
                    req.session.hash = result[0].salt;
                    req.session.secuPassword = 0;
                    req.session.error = '';
                    req.session.game = '';
                    req.session.save();
                    playersConnected.push(req.session.username);
                    res.redirect('../menu');
                    console.log(playersConnected);
                }
                else{
                    req.session.error = 'error2';
                    res.redirect('../connection');
                }
            }
        });
    }
    else{
        req.session.error = 'error1';
        res.redirect('../connection');
    }

});

//login with identifiers when the person doesn't have an account
app.post('/register', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let passwordHash = bcrypt.hashSync(password, salt);

    con.query('SELECT * FROM accounts WHERE BINARY username = ?', [username], function(error, results) {
        if (error) throw error;
        else if (results.length > 0) res.send('Ce pseudo est déjà pris !');
        else {
            console.log('test n°1');
            con.query('INSERT INTO accounts (username, email, password, salt, picture) VALUES (?, ?, ?, ?, ?)', [username, email, passwordHash, salt, 'random.png'], function(error, results) {
                if(error) throw error;
                res.redirect('../connection');
            });
        }
    });
    con.query("SELECT PLayerIndex FROM accounts WHERE Username = ? AND Password = ?", [username, password], function (err, result) {
        if (err) throw err;
        req.session.id = result;
    });
});

app.post('/changePseudo', (req,res)=>{
    let newPseudo = req.body.newUsername;
    let username = req.session.username;

    con.query('UPDATE accounts SET Username = ? WHERE Username = ?', [newPseudo, username], function(error){
        if(error)throw error;
        req.session.username = newPseudo;
        res.redirect('../editProfile');
    });
});

app.post('/changeMail', (req, res) => {
    let username = req.session.username;
    let newMail = req.body.newEmail;

    con.query('UPDATE accounts SET email = ? WHERE Username = ?', [newMail, username], function(err){
        if(err)throw err;
        res.redirect('../editProfile');
    });
});

app.post('/changePicture', (req, res) => {
    let username = req.session.username;
    let newPicture = req.body.newPicture;

    con.query('UPDATE accounts SET picture = ? WHERE Username = ?', [newPicture + '.png', username], function(err){
        if(err)throw err;
        res.redirect('../editProfile');
    });
});

app.post('/verifyPassword', (req, res) => {
    let password = req.session.password;
    let hash = req.session.hash;
    let currentPassword = req.body.currentPassword;
    let passwordHash = bcrypt.hashSync(currentPassword, hash);

    if(passwordHash === password){
        req.session.secuPassword = 1;
    }
    res.redirect('../editProfile');
});


app.post('/changePassword', (req, res) => {
    let username = req.session.username;
    let newPassword = req.body.newPassword;
    let passwordHash = bcrypt.hashSync(newPassword, salt);

    con.query('UPDATE accounts SET password = ? WHERE username = ?', [passwordHash, username], function(err){
        if(err)throw err;
    });
    con.query('UPDATE accounts SET salt = ? WHERE username = ?', [salt, username], function(err){
        if(err)throw err;
    });
    res.redirect('../editProfile');
});

app.post('/deletion',(req, res) => {
    let username = req.session.username;
    let pseudo = req.body.pseudoDelete;

    if(username === pseudo){
        con.query('DELETE FROM accounts WHERE Username = ?', [username], function(err){
            if(err)throw err;
            let index = playersConnected.indexOf(req.session.username);
            if (index > -1) {
                playersConnected.splice(index, 1);
            }
            console.log(playersConnected);
            req.session.loggedin = false;
            req.session.username = undefined;
            req.session.password = undefined;
            req.session.hash = undefined;
            req.session.secuPassword = 0;
            req.session.save();
            res.redirect('../')
        });
    }
    else{
        res.redirect('../profil')
    }
});

/**** Interaction with front ****/

io.on('connection', socket => {

    //take the type of game that the player choose
    socket.on('typeGame', (typeGame) => {
        socket.handshake.session.game = typeGame;
    });

    //return the game that the player choose
    socket.on('goodGame', () => {
        if(socket.handshake.session.game === 'multiplayer'){
            socket.emit('multiplayerGame');
        }
        if(socket.handshake.session.game === '3players'){
            socket.emit('3playersGame');
        }
        else{
            socket.emit('players3', socket.handshake.session.game);
        }
    });

    //create a multiplayer room
    socket.on('multiplayer', ()=>{
        house.setNbPlayers(4);
        if (house.addWaiter(socket)) {
            if (house.getWaiters().length >= 4) {
                let waiters = house.popWaiters();
                let room = house.addPublicRoom([waiters[0], waiters[1], waiters[2], waiters[3]]);

                //room.game = new stratego();
                //room.board = room.game.getBoardGame();
                room.state = 0;

                //chrono
                room.timeDebut = 0;
                room.timeFin = 0;
                room.timeGame = 0;

                room.player1 = waiters[0];
                room.player2 = waiters[1];
                room.player3 = waiters[2];
                room.player4 = waiters[3];


                room.player1.emit('play', room.player1.handshake.session.username);
                room.player2.emit('play', room.player2.handshake.session.username);
                room.player3.emit('play', room.player3.handshake.session.username);
                room.player4.emit('play', room.player4.handshake.session.username);

            } else socket.emit('public');
        }
    });

    //create a private room
    socket.on('createRoom', password => {
        let room = house.addPrivateRoom(password, socket);
        if (room) {

            room.password = password;
            room.player1 = socket;
            room.nbPlayer = 1;
            room.state = 0;

            //chrono
            room.timeDebut = 0;
            room.timeFin = 0;
            room.timeGame = 0;
            console.log('roomCreated ' + password);
            socket.emit('play', socket.handshake.session.username);
        }
    });

    //search a room to join
    socket.on('searchRoom', password => {
        if (house.joinRoom(socket, password)) {
            console.log(password);
            socket.emit('findRoom', password);
        }
        else {
            socket.emit('errorSearch');
        }
    });

    let room;

    socket.on('playerToJoin', (password)=> {
        socket.emit('play', socket.handshake.session.username);
    });

    socket.on('update', ()=>{
        room = house.joinRoom(socket);
        if(room) {
            console.log('please');
            if (room.player1) room.player1.emit('updatePlease');
            if (room.player2) room.player2.emit('updatePlease');
        }
        else{
            console.log(room);
        }

    });

    socket.on('callPseudo', () =>{
        socket.emit('displayPseudo', socket.handshake.session.username);
    });

    socket.on('callMail', () => {
        let username = socket.handshake.session.username;
        con.query('SELECT email FROM accounts WHERE username = ?', [username], function(err,res){
            if(!err){
                socket.emit('displayMail', res[0].email);
            }
        });
    });

    socket.on('callPicture', () => {
        let username = socket.handshake.session.username;
        con.query('SELECT picture FROM accounts WHERE username = ?', [username], function(err,res){
            if(!err){
                socket.emit('displayPicture', res[0].picture);
            }
        });
    });

    socket.on('temp', () =>{
        if(socket.handshake.session.secuPassword === 1){
            socket.emit('temp2');
            socket.handshake.session.secuPassword = 0;
        }
    });

    socket.on('errors', () =>{
        if(socket.handshake.session.error === 'error1'){
            socket.emit('error1');
        }
        else if(socket.handshake.session.error === 'error2'){
            socket.emit('error2');
        }
        errorType = '';
    });

    //bonus
    socket.on('invitation', (user) => {
        socket.join(user);
        io.sockets.in(user).emit('invite',socket);
    });

    socket.on('logout', () => {
        let index = playersConnected.indexOf(socket.handshake.session.username);
        console.log(index);
        if (index > -1) {
            playersConnected.splice(index, 1);
        }
        console.log(playersConnected);
        socket.handshake.session.loggedin = false;
        socket.handshake.session.username = undefined;
        socket.handshake.session.password = undefined;
        socket.handshake.session.hash = undefined;
        socket.handshake.session.secuPassword = 0;
        socket.handshake.session.save();
        socket.emit('bye');
    });
});

server.listen(3600, () => {
    console.log('Serveur lancé sur le port 3600');
});