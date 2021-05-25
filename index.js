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
//password encoding
const bcrypt = require('bcrypt');
const saltRounds = 12;
const salt = bcrypt.genSaltSync(saltRounds);

/**** Import project libs ****/

//rooms lib
const House = require('./back/house.js');
//game lib
const monopalim = require('./back/serverGameBack.js');


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
let privateRoom = [];
let privateRoomDeconnected = [];

/**** Redirection ****/

//first page when you are connected to the server
app.get('/', (req, res) => {
    if (req.session.loggedin) //checks if the player is already logged in
        res.redirect('/menu');
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
    //will look for the input informations on the page
    let username = req.body.username;
    let password = req.body.password;

    if(!playersConnected.includes(username)) { //if the player is not already connected
        con.query('SELECT * FROM accounts WHERE BINARY username = ? collate utf8_bin', [username], function(error, result){
            if (error) {
                throw error;
            } else if (result.length === 0) {
                req.session.error = 'error2'; //username doesn't exist
                res.redirect('../connection');
            } else {
                //hash of the password
                let passwordHash = bcrypt.hashSync(password, result[0].salt);
                if (passwordHash === result[0].password) {
                    //registration of session data
                    req.session.loggedin = true;
                    req.session.username = username;
                    req.session.password = passwordHash;
                    req.session.hash = result[0].salt;
                    req.session.height = result[0].height;
                    req.session.age = result[0].age;
                    req.session.secuPassword = 0;
                    req.session.error = '';
                    req.session.game = '';
                    req.session.save();
                    playersConnected.push(req.session.username);
                    res.redirect('../menu');
                } else {
                    req.session.error = 'error2'; //password is not correct
                    res.redirect('../connection');
                }
            }
        });
    } else {
        req.session.error = 'error1'; //player already connected
        res.redirect('../connection');
    }

});

//login with identifiers when the person doesn't have an account
app.post('/register', (req, res) => {
    //will look for the input informations on the page
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    //hash of the password
    let passwordHash = bcrypt.hashSync(password, salt);

    //registration in the database
    con.query('SELECT * FROM accounts WHERE BINARY username = ?', [username], function(error, results) {
        if (error) throw error;
        else if (results.length > 0) res.send('Ce pseudo est déjà pris !');
        else {
            con.query('INSERT INTO accounts (username, email, password, salt) VALUES (?, ?, ?, ?)', [username, email, passwordHash, salt], function(error, results) {
                if(error) throw error;
                res.redirect('../connection');
            });
        }
    });
});

//username modification
app.post('/changeUsername', (req,res)=>{
    let newUsername = req.body.newUsername;
    let username = req.session.username;

    con.query('UPDATE accounts SET Username = ? WHERE Username = ?', [newUsername, username], function(error){
        if(error)throw error;
        req.session.username = newUsername;
        res.redirect('../editProfile');
    });
});

//mail modification
app.post('/changeMail', (req, res) => {
    let username = req.session.username;
    let newMail = req.body.newEmail;

    con.query('UPDATE accounts SET email = ? WHERE Username = ?', [newMail, username], function(err){
        if(err)throw err;
        res.redirect('../editProfile');
    });
});

//picture modification
app.post('/changePicture', (req, res) => {
    let username = req.session.username;
    let newPicture = req.body.newPicture;
    let height = req.session.height;
    let age = req.session.age;

    if(newPicture === 'random'){ height = 162; age = 18; }
    else if (newPicture === 'random2'){ height = 164; age = 25; }
    else if (newPicture === 'random3'){ height = 166; age = 40; }
    else if (newPicture === 'random4'){ height = 168; age = 50; }
    else if (newPicture === 'random5'){ height = 170; age = 60; }
    else if (newPicture === 'random6'){ height = 174; age = 18; }
    else if (newPicture === 'random7'){ height = 178; age = 25; }
    else if (newPicture === 'random8'){ height = 182; age = 40; }
    else if (newPicture === 'random7'){ height = 184; age = 50; }
    else{ height = 188; age = 60; }

    con.query('UPDATE accounts SET picture = ?, height = ?, age = ? WHERE Username = ?', [newPicture + '.png', height, age, username], function(err){
        if(err)throw err;
        res.redirect('../editProfile');
    });
});

//check if the password input is correct in order to change the password in the database
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

//password modification
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

//when a player has made a difficult choice
app.post('/deletion',(req, res) => {
    let username = req.session.username;
    let usernameDelete = req.body.usernameDelete;

    if(username === usernameDelete){
        con.query('DELETE FROM accounts WHERE Username = ?', [username], function(err){
            if(err)throw err;
            let index = playersConnected.indexOf(req.session.username);
            if (index > -1) {
                playersConnected.splice(index, 1);
            }
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

    /** Interaction with registration and connection **/

    //check if the password input is correct in order to change the password in the database
    socket.on('checkLastPassword', () =>{
        if(socket.handshake.session.secuPassword === 1){
            socket.emit('lastPasswordIsChecked');
            socket.handshake.session.secuPassword = 0;
        }
    });

    //handle connection and registration errors and send a notification
    socket.on('errors', () =>{
        if(socket.handshake.session.error === 'error1'){ //player already connected
            socket.emit('error1');
        }
        else if(socket.handshake.session.error === 'error2'){ //username doesn't exist or password doesn't match
            socket.emit('error2');
        }
        socket.handshake.session.error = '';
    });

    //handle deconnection of a game and send a notification to the other players
    socket.on('errors2', () =>{
        for(let i = 0; i < privateRoomDeconnected.length; i++) {
            if (privateRoomDeconnected[i].handshake.sessionID === socket.handshake.sessionID) {
                socket.handshake.session.error = privateRoomDeconnected[i].handshake.session.error;
            }
        }
        if(socket.handshake.session.error === 'deconnection'){
            socket.emit('errorDeconnection');
        }
        socket.handshake.session.error = '';
    });


    /** Interaction with profile and profile edition **/

    socket.on('callUsername', () =>{
        socket.emit('displayUsername', socket.handshake.session.username);
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

    /** Create a game **/

    //type of game registration (multiplayer, private...)
    socket.on('typeGame', (typeGame) => {
        socket.handshake.session.game = typeGame;
        if(typeGame === 'gameAlreadyCreated'){
            socket.emit('redirectToGame');
        }
    });

    //return the game that the player choose
    socket.on('goodGame', () => {
        if(socket.handshake.session.game === 'multiplayer'){
            socket.emit('multiplayerGame');
        }
        else if(socket.handshake.session.game !== 'gameAlreadyCreated'){
            socket.emit('privateGame');
        }
    });

    //create a multiplayer room with 4 players
    socket.on('multiplayer', ()=>{
        house.setNbPlayers(4);
        if (house.addWaiter(socket)) {
            if (house.getWaiters().length >= 4) {
                let waiters = house.popWaiters();
                let room = house.addRoom(0, [waiters[0], waiters[1], waiters[2], waiters[3]]);
                let player1 = [0, waiters[0].handshake.session.username, waiters[0].handshake.session.height, waiters[0].handshake.session.age, "../assets/img/pawn/amongUs40x40.gif", "red"];
                let player2 = [1, waiters[1].handshake.session.username, waiters[1].handshake.session.height, waiters[1].handshake.session.age, "../assets/img/pawn/spaceshipOpen40x40.gif", "blue"];
                let player3 = [2, waiters[2].handshake.session.username, waiters[2].handshake.session.height, waiters[2].handshake.session.age, "../assets/img/pawn/booman40x40.gif", "green"];
                let player4 = [3, waiters[3].handshake.session.username, waiters[3].handshake.session.height, waiters[3].handshake.session.age, "../assets/img/pawn/dog40x40.gif", "orange"];

                room.game = new monopalim(player1, player2,  player3,  player4);
                room.board = room.game.getBoard();
                room.nbPlayer = 4;
                room.password = '';
                room.state = 0;
                room.winner = '';
                //chrono
                room.timeDebut = new Date;
                room.timeFin = 0;
                room.timeGame = 0;

                room.player1 = waiters[0];
                room.player2 = waiters[1];
                room.player3 = waiters[2];
                room.player4 = waiters[3];
                room.player1.emit('init', room.game.getPlayer(0), room.game);
                room.player2.emit('init', room.game.getPlayer(1), room.game);
                room.player3.emit('init', room.game.getPlayer(2), room.game);
                room.player4.emit('init', room.game.getPlayer(3), room.game);

            } else socket.emit('multiplayer');
        }
    });

    //create a private room
    socket.on('createRoom', password => {
        let playersPrivate = [password, socket];
        privateRoom[privateRoom.length] = playersPrivate;
        socket.emit('admin');
    });

    //search a room to join
    socket.on('searchRoom', password => {
        for(let i = 0; i < privateRoom.length; i++){
            if(privateRoom[i][0] === password){
                if(privateRoom[i].length < 7) {
                    privateRoom[i].push(socket);
                    socket.emit('findRoom');
                } else { socket.emit('noPlace'); }
            } else { socket.emit('errorSearch'); }
        }
    });

    //there was  redirection, we have to update the sockets in order to have the possibility to update the page
    socket.on('updatePrivateSocket', ()=>{
        if(socket.handshake.session.game !== 'multiplayer'){
            for(let i = 0; i < privateRoom.length; i++) {
                for (let j = 1; j < privateRoom[i].length; j++) {
                    if (privateRoom[i][j].handshake.sessionID === socket.handshake.sessionID) {
                        privateRoom[i][j] = socket;
                    }
                }
            }
        }
    });

    //when the admin validate the room
    socket.on('privateRoom', (passwordRoom) =>{
        let index;
        for(let i = 0; i < privateRoom.length; i++){
            if(privateRoom[i][1] === socket){
                index = i;
            }
        }
        //privateRoom[index].length = all players of this room + 1 (password)
        if(privateRoom[index].length === 4){
            house.setNbPlayers(3);
            let room = house.addRoom(passwordRoom, [privateRoom[index][1], privateRoom[index][2], privateRoom[index][3]]);
            let player1 = [0, privateRoom[index][1].handshake.session.username, privateRoom[index][1].handshake.session.height, privateRoom[index][1].handshake.session.age, "../assets/img/pawn/amongUs40x40.gif", "red"];
            let player2 = [1, privateRoom[index][2].handshake.session.username, privateRoom[index][2].handshake.session.height, privateRoom[index][2].handshake.session.age, "../assets/img/pawn/spaceshipOpen40x40.gif", "blue"];
            let player3 = [2, privateRoom[index][3].handshake.session.username, privateRoom[index][3].handshake.session.height, privateRoom[index][3].handshake.session.age, "../assets/img/pawn/booman40x40.gif", "green"];

            room.game = new monopalim(player1,  player2,  player3);
            room.board = room.game.getBoard();
            room.nbPlayer = 3;
            room.password = passwordRoom;
            room.state = 0;
            room.winner = '';
            //chrono
            room.timeDebut = new Date;
            room.timeFin = 0;
            room.timeGame = 0;

            room.player1 = privateRoom[index][1];
            room.player2 = privateRoom[index][2];
            room.player3 = privateRoom[index][3];
            room.player1.emit('init', room.game.getPlayer(0), room.game);
            room.player2.emit('init', room.game.getPlayer(1), room.game);
            room.player3.emit('init', room.game.getPlayer(2), room.game);
        }
        else if(privateRoom[index].length === 5){
            house.setNbPlayers(4);
            let room = house.addRoom(passwordRoom, [privateRoom[index][1], privateRoom[index][2], privateRoom[index][3], privateRoom[index][4]]);
            let player1 = [0, privateRoom[index][1].handshake.session.username, privateRoom[index][1].handshake.session.height, privateRoom[index][1].handshake.session.age, "../assets/img/pawn/amongUs40x40.gif", "red"];
            let player2 = [1, privateRoom[index][2].handshake.session.username, privateRoom[index][2].handshake.session.height, privateRoom[index][2].handshake.session.age, "../assets/img/pawn/spaceshipOpen40x40.gif", "blue"];
            let player3 = [2, privateRoom[index][3].handshake.session.username, privateRoom[index][3].handshake.session.height, privateRoom[index][3].handshake.session.age, "../assets/img/pawn/booman40x40.gif", "green"];
            let player4 = [3, privateRoom[index][4].handshake.session.username, privateRoom[index][4].handshake.session.height, privateRoom[index][4].handshake.session.age, "../assets/img/pawn/dog40x40.gif", "orange"];

            room.game = new monopalim( player1,  player2,  player3,  player4);
            room.board = room.game.getBoard();
            room.nbPlayer = 4;
            room.password = passwordRoom;
            room.state = 0;
            //chrono
            room.timeDebut = new Date;
            room.timeFin = 0;
            room.timeGame = 0;

            room.player1 = privateRoom[index][1];
            room.player2 = privateRoom[index][2];
            room.player3 = privateRoom[index][3];
            room.player4 = privateRoom[index][4];
            room.player1.emit('init', room.game.getPlayer(0), room.game);
            room.player2.emit('init', room.game.getPlayer(1), room.game);
            room.player3.emit('init', room.game.getPlayer(2), room.game);
            room.player4.emit('init', room.game.getPlayer(3), room.game);
        }
        else if(privateRoom[index].length === 6){
            house.setNbPlayers(5);
            let room = house.addRoom(passwordRoom, [privateRoom[index][1], privateRoom[index][2], privateRoom[index][3], privateRoom[index][4], privateRoom[index][5]]);
            let player1 = [0, privateRoom[index][1].handshake.session.username, privateRoom[index][1].handshake.session.height, privateRoom[index][1].handshake.session.age, "../assets/img/pawn/amongUs40x40.gif", "red"];
            let player2 = [1, privateRoom[index][2].handshake.session.username, privateRoom[index][2].handshake.session.height, privateRoom[index][2].handshake.session.age, "../assets/img/pawn/spaceshipOpen40x40.gif", "blue"];
            let player3 = [2, privateRoom[index][3].handshake.session.username, privateRoom[index][3].handshake.session.height, privateRoom[index][3].handshake.session.age, "../assets/img/pawn/booman40x40.gif", "green"];
            let player4 = [3, privateRoom[index][4].handshake.session.username, privateRoom[index][4].handshake.session.height, privateRoom[index][4].handshake.session.age, "../assets/img/pawn/dog40x40.gif", "orange"];
            let player5 = [4, privateRoom[index][5].handshake.session.username, privateRoom[index][5].handshake.session.height, privateRoom[index][5].handshake.session.age, "../assets/img/pawn/popoRun40x40.gif", "violet"];

            room.game = new monopalim( player1,  player2,  player3,  player4,  player5);
            room.board = room.game.getBoard();
            room.nbPlayer = 5;
            room.password = passwordRoom;
            room.state = 0;
            room.winner = '';
            //chrono
            room.timeDebut = new Date;
            room.timeFin = 0;
            room.timeGame = 0;

            room.player1 = privateRoom[index][1];
            room.player2 = privateRoom[index][2];
            room.player3 = privateRoom[index][3];
            room.player4 = privateRoom[index][4];
            room.player5 = privateRoom[index][5];
            room.player1.emit('init', room.game.getPlayer(0), room.game);
            room.player2.emit('init', room.game.getPlayer(1), room.game);
            room.player3.emit('init', room.game.getPlayer(2), room.game);
            room.player4.emit('init', room.game.getPlayer(3), room.game);
            room.player5.emit('init', room.game.getPlayer(4), room.game);
        }
        else if(privateRoom[index].length === 7){
            house.setNbPlayers(6);
            let room = house.addRoom(passwordRoom, [privateRoom[index][1], privateRoom[index][2], privateRoom[index][3], privateRoom[index][4], privateRoom[index][5], privateRoom[index][6]]);
            let player1 = [0, privateRoom[index][1].handshake.session.username, privateRoom[index][1].handshake.session.height, privateRoom[index][1].handshake.session.age, "../assets/img/pawn/amongUs40x40.gif", "red"];
            let player2 = [1, privateRoom[index][2].handshake.session.username, privateRoom[index][2].handshake.session.height, privateRoom[index][2].handshake.session.age, "../assets/img/pawn/spaceshipOpen40x40.gif", "blue"];
            let player3 = [2, privateRoom[index][3].handshake.session.username, privateRoom[index][3].handshake.session.height, privateRoom[index][3].handshake.session.age, "../assets/img/pawn/booman40x40.gif", "green"];
            let player4 = [3, privateRoom[index][4].handshake.session.username, privateRoom[index][4].handshake.session.height, privateRoom[index][4].handshake.session.age, "../assets/img/pawn/dog40x40.gif", "orange"];
            let player5 = [4, privateRoom[index][5].handshake.session.username, privateRoom[index][5].handshake.session.height, privateRoom[index][5].handshake.session.age, "../assets/img/pawn/popoRun40x40.gif", "violet"];
            let player6 = [5, privateRoom[index][6].handshake.session.username, privateRoom[index][6].handshake.session.height, privateRoom[index][6].handshake.session.age, "../assets/img/pawn/slime40x40.gif", "black"];

            room.game = new monopalim(player1, player2, player3, player4, player5, player6);
            room.board = room.game.getBoard();
            room.nbPlayer = 6;
            room.password = passwordRoom;
            room.state = 0;
            room.winner = '';
            //chrono
            room.timeDebut = new Date;
            room.timeFin = 0;
            room.timeGame = 0;

            room.player1 = privateRoom[index][1];
            room.player2 = privateRoom[index][2];
            room.player3 = privateRoom[index][3];
            room.player4 = privateRoom[index][4];
            room.player5 = privateRoom[index][5];
            room.player6 = privateRoom[index][6];
            room.player1.emit('init', room.game.getPlayer(0), room.game);
            room.player2.emit('init', room.game.getPlayer(1), room.game);
            room.player3.emit('init', room.game.getPlayer(2), room.game);
            room.player4.emit('init', room.game.getPlayer(3), room.game);
            room.player5.emit('init', room.game.getPlayer(4), room.game);
            room.player6.emit('init', room.game.getPlayer(5), room.game);
        }
        else{
            socket.emit('notEnoughPlayers');
        }
    });

    /** Update game **/

    let room;

    socket.on('rollDice', ()=>{
        room = house.joinRoom(socket);
        if(!room.game.getIsFinished()){
            if (!room.game.getCast() && room.game.getOrderIndexUsername() === socket.handshake.session.username) {
                room.game.castTheDice();
                if(room.game.getPlayer(0) === room.game.getOrderIndex()) {
                    room.game.executeMove(room.game.getPlayer(0), room.game.getCastValue());
                    room.game.executeInteraction(room.game.getPlayer(0));
                    room.player1.emit('action', room.game.getPlayer(0), room.game, true, false, false);
                    room.player2.emit('action', room.game.getPlayer(1), room.game, false, false, false);
                    room.player3.emit('action', room.game.getPlayer(2), room.game, false, false, false);
                    if (room.player4) room.player4.emit('action', room.game.getPlayer(3), room.game, false, false, false);
                    if (room.player5) room.player5.emit('action', room.game.getPlayer(4), room.game, false, false, false);
                    if (room.player6) room.player6.emit('action', room.game.getPlayer(5), room.game, false, false, false);
                }
                else if(room.game.getPlayer(1) === room.game.getOrderIndex()) {
                    room.game.executeMove(room.game.getPlayer(1), room.game.getCastValue());
                    room.game.executeInteraction(room.game.getPlayer(1));
                    room.player1.emit('action', room.game.getPlayer(0), room.game, false, false, false);
                    room.player2.emit('action', room.game.getPlayer(1), room.game, true, false, false);
                    room.player3.emit('action', room.game.getPlayer(2), room.game, false, false, false);
                    if (room.player4) room.player4.emit('action', room.game.getPlayer(3), room.game, false, false, false);
                    if (room.player5) room.player5.emit('action', room.game.getPlayer(4), room.game, false, false, false);
                    if (room.player6) room.player6.emit('action', room.game.getPlayer(5), room.game, false, false, false);
                }
                else if(room.game.getPlayer(2) === room.game.getOrderIndex()) {
                    room.game.executeMove(room.game.getPlayer(2), room.game.getCastValue());
                    room.game.executeInteraction(room.game.getPlayer(2));
                    room.player1.emit('action', room.game.getPlayer(0), room.game, false, false, false);
                    room.player2.emit('action', room.game.getPlayer(1), room.game, false, false, false);
                    room.player3.emit('action', room.game.getPlayer(2), room.game, true, false, false);
                    if (room.player4) room.player4.emit('action', room.game.getPlayer(3), room.game, false, false, false);
                    if (room.player5) room.player5.emit('action', room.game.getPlayer(4), room.game, false, false, false);
                    if (room.player6) room.player6.emit('action', room.game.getPlayer(5), room.game, false, false, false);
                }
                else if(room.nbPlayer > 3){
                    if(room.game.getPlayer(3) === room.game.getOrderIndex()) {
                        room.game.executeMove(room.game.getPlayer(3), room.game.getCastValue());
                        room.game.executeInteraction(room.game.getPlayer(3));
                        room.player1.emit('action', room.game.getPlayer(0), room.game, false, false, false);
                        room.player2.emit('action', room.game.getPlayer(1), room.game, false, false, false);
                        room.player3.emit('action', room.game.getPlayer(2), room.game, false, false, false);
                        room.player4.emit('action', room.game.getPlayer(3), room.game, true, false, false);
                        if (room.player5) room.player5.emit('action', room.game.getPlayer(4), room.game, false, false, false);
                        if (room.player6) room.player6.emit('action', room.game.getPlayer(5), room.game, false, false, false);
                    }
                }
                else if(room.nbPlayer > 4){
                    if(room.game.getPlayer(4) === room.game.getOrderIndex()) {
                        room.game.executeMove(room.game.getPlayer(4), room.game.getCastValue());
                        room.game.executeInteraction(room.game.getPlayer(4));
                        room.player1.emit('action', room.game.getPlayer(0), room.game, false, false, false);
                        room.player2.emit('action', room.game.getPlayer(1), room.game, false, false, false);
                        room.player3.emit('action', room.game.getPlayer(2), room.game, false, false, false);
                        room.player4.emit('action', room.game.getPlayer(3), room.game, false, false, false);
                        room.player5.emit('action', room.game.getPlayer(4), room.game, true, false, false);
                        if (room.player6) room.player6.emit('action', room.game.getPlayer(5), room.game, false, false, false);
                    }
                }
                else if(room.nbPlayer > 5){
                    if(room.game.getPlayer(5) === room.game.getOrderIndex()) {
                        room.game.executeMove(room.game.getPlayer(5), room.game.getCastValue());
                        room.game.executeInteraction(room.game.getPlayer(5));
                        room.player1.emit('action', room.game.getPlayer(0), room.game, false, false, false);
                        room.player2.emit('action', room.game.getPlayer(1), room.game, false, false, false);
                        room.player3.emit('action', room.game.getPlayer(2), room.game, false, false, false);
                        room.player4.emit('action', room.game.getPlayer(3), room.game, true, false, false);
                        room.player5.emit('action', room.game.getPlayer(4), room.game, false, false, false);
                        room.player6.emit('action', room.game.getPlayer(5), room.game, false, false, false);
                    }
                }
            }

            else{
                socket.emit('notYourTurn');
            }
        }
        else {
            room.timeFin = new Date;
            room.timeGame = room.timeFin.getTime() - room.timeDebut.getTime();

            let h, m, s;
            h = Math.floor(room.timeGame / 1000 / 60 / 60);
            m = Math.floor((room.timeGame / 1000 / 60 / 60 - h) * 60);
            s = Math.floor(((room.timeGame / 1000 / 60 / 60 - h) * 60 - m) * 60);
            if (s < 10) s = '0' + s;
            if (m < 10) m = '0' + m;
            if (h < 10) h = '0' + h;

            let username1 = room.player1.handshake.session.username;
            let username2 = room.player2.handshake.session.username;
            let username3 = room.player3.handshake.session.username;
            if (room.player4) {
                let username4 = room.player4.handshake.session.username;
                if (room.player5) {
                    let username5 = room.player5.handshake.session.username;
                    if (room.player6) {
                        let username6 = room.player6.handshake.session.username;
                    } else {
                        let username6 = '';
                    }
                } else {
                    let username5 = '';
                    let username6 = '';
                }
            } else {
                let username4 = '';
                let username5 = '';
                let username6 = '';
            }

            con.query('SELECT * FROM monopalimsave', (error, results) => {
                if (!error) {
                    con.query('INSERT INTO monopalimsave (player1, player2, player3, player4, player5, player6, time, gameState, nbTurns, winner) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [username1, username2, username3, username4, username5, username6, h + ':' + m + ':' + s, room.state, room.game.getNbTurns(), room.winner]);
                }
            });
        }
    });

    socket.on('buyListener', () =>{
        room.game.executeAction('buy');
        room.player1.emit('action', room.game.getPlayer(0), room.game, false, false, false);
        room.player2.emit('action', room.game.getPlayer(1), room.game, false, false, false);
        room.player3.emit('action', room.game.getPlayer(2), room.game, false, false, false);
        if (room.player4) room.player4.emit('action', room.game.getPlayer(3), room.game, false, false, false);
        if (room.player5) room.player5.emit('action', room.game.getPlayer(4), room.game, false, false, false);
        if (room.player6) room.player6.emit('action', room.game.getPlayer(5), room.game, false, false, false);
    });

    socket.on('redeemListener', () =>{
        room.game.executeAction('redeem');
        room.player1.emit('action', room.game.getPlayer(0), room.game, false, false, false);
        room.player2.emit('action', room.game.getPlayer(1), room.game, false, false, false);
        room.player3.emit('action', room.game.getPlayer(2), room.game, false, false, false);
        if (room.player4) room.player4.emit('action', room.game.getPlayer(3), room.game, false, false, false);
        if (room.player5) room.player5.emit('action', room.game.getPlayer(4), room.game, false, false, false);
        if (room.player6) room.player6.emit('action', room.game.getPlayer(5), room.game, false, false, false);
    });

    socket.on('upgradeListener', () =>{
        if(room.game.getPlayer(0) === room.game.getOrderIndex()){
            room.player1.emit('action', room.game.getPlayer(0), room.game, false, true, false);
        }
        else if(room.game.getPlayer(1) === room.game.getOrderIndex()){
            room.player2.emit('action', room.game.getPlayer(1), room.game, false, true, false);
        }
        else if(room.game.getPlayer(2) === room.game.getOrderIndex()){
            room.player3.emit('action', room.game.getPlayer(2), room.game, false, true, false);
        }
        else if (room.nbPlayer > 3){
            if(room.game.getPlayer(3) === room.game.getOrderIndex()){
                room.player4.emit('action', room.game.getPlayer(3), room.game, false, true, false);
            }
        }
        else if (room.nbPlayer > 4){
            if(room.game.getPlayer(4) === room.game.getOrderIndex()){
                room.player5.emit('action', room.game.getPlayer(4), room.game, false, true, false);
            }
        }
        else if (room.nbPlayer > 5){
            if(room.game.getPlayer(5) === room.game.getOrderIndex()){
                room.player6.emit('action', room.game.getPlayer(5), room.game, false, true, false);
            }
        }
    });

    socket.on('upgradeView', (upgradeChoice) => {
        room.game.setUpgrade(upgradeChoice);
        room.game.executeAction('upgrade');
        room.player1.emit('action', room.game.getPlayer(0), room.game, false, false, false);
        room.player2.emit('action', room.game.getPlayer(1), room.game, false, false, false);
        room.player3.emit('action', room.game.getPlayer(2), room.game, false, false, false);
        if (room.player4) room.player4.emit('action', room.game.getPlayer(3), room.game, false, false, false);
        if (room.player5) room.player5.emit('action', room.game.getPlayer(4), room.game, false, false, false);
        if (room.player6) room.player6.emit('action', room.game.getPlayer(5), room.game, false, false, false);


    })

    socket.on('nothingListener', () =>{
        room.game.executeAction('nothing');
        room.player1.emit('action', room.game.getPlayer(0), room.game, false, false, false);
        room.player2.emit('action', room.game.getPlayer(1), room.game, false, false, false);
        room.player3.emit('action', room.game.getPlayer(2), room.game, false, false, false);
        if (room.player4) room.player4.emit('action', room.game.getPlayer(3), room.game, false, false, false);
        if (room.player5) room.player5.emit('action', room.game.getPlayer(4), room.game, false, false, false);
        if (room.player6) room.player6.emit('action', room.game.getPlayer(5), room.game, false, false, false);
    });

    //handle the deconnection of someone
    socket.on('disconnect', ()=>{
        if (house.isWaiter(socket)) house.deleteWaiter(socket);
        else if (room) {

            //if room.player1 exist and socket is different of the room.player1 to send the msg to the concerned people
            if (room.player1 && socket.handshake.sessionID !== room.player1.handshake.sessionID) {
                room.player1.emit('backHome');
                room.player1.handshake.session.error = 'deconnection';
                privateRoomDeconnected.push(room.player1);
            }
            if (room.player2 && socket.handshake.sessionID !== room.player2.handshake.sessionID){
                room.player2.emit('backHome');
                room.player2.handshake.session.error = 'deconnection';
                privateRoomDeconnected.push(room.player2);
            }
            if (room.player3 && socket.handshake.sessionID !== room.player3.handshake.sessionID) {
                room.player3.emit('backHome');
                room.player3.handshake.session.error = 'deconnection';
                privateRoomDeconnected.push(room.player3);
            }
            if (room.player4 && socket.handshake.sessionID !== room.player4.handshake.sessionID) {
                room.player4.emit('backHome');
                room.player4.handshake.session.error = 'deconnection';
                privateRoomDeconnected.push(room.player4);
            }
            if (room.player5 && socket.handshake.sessionID !== room.player5.handshake.sessionID) {
                room.player5.emit('backHome');
                room.player5.handshake.session.error = 'deconnection';
                privateRoomDeconnected.push(room.player5);
            }
            if (room.player6 && socket.handshake.sessionID !== room.player6.handshake.sessionID) {
                room.player6.emit('backHome');
                room.player6.handshake.session.error = 'deconnection';
                privateRoomDeconnected.push(room.player6);
            }
            room.state = 'abandonment';
        }
    });

    /** score **/

    socket.on('displayScore', ()=>{
        let player1, player2, player3, player4, player5, player6, time, nbTurns, gameState,  winner;

        con.query('SELECT * FROM strategosave', function(error, results) {
            if(!error) {
                let x = 0;
                if(results.length > 10) x = results.length - 10;
                for(let i = 0 + x; i < results.length; i++){
                    player1 = results[i].player1;
                    player2 = results[i].player2;
                    player3 = results[i].player3;
                    player4 = results[i].player4;
                    player5 = results[i].player5;
                    player6 = results[i].player6;
                    time = results[i].time;
                    nbTurns = results[i].nbTurns;
                    gameState = results[i].gameState;
                    winner = results[i].winner;
                    socket.emit('scoreDisplay', i, player1, player2, player3, player4, player5, player6, time, nbTurns, gameState, winner);
                }
            }

        });
    });

    /** leave our wonderful game **/

    //log out a player and redirect him at the welcome page
    socket.on('logout', () => {
        let index = playersConnected.indexOf(socket.handshake.session.username);
        if (index > -1) {
            playersConnected.splice(index, 1);
        }
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