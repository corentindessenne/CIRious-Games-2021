/** HTML getters **/

let waiting = document.getElementById('waiting');
let validate = document.getElementById('validate');
let validateText = document.getElementById('validateText');
let topLeftBox = document.getElementById('topLeftBox');
let bottomLeftBox = document.getElementById('bottomLeftBox');
let centerBox = document.getElementById('center');
let topRightBox = document.getElementById('topRightBox');
let bottomRightBox = document.getElementById('bottomRightBox');
let rollDice = document.getElementById('rollDice');
let buy = document.getElementById('buy');
let redeem = document.getElementById('redeem');
let upgrade = document.getElementById('upgrade');
let nothing = document.getElementById('nothing');
let upgradeChoice1 = document.getElementById('upgradeChoice1');
let upgradeChoice2 = document.getElementById('upgradeChoice2');
let upgradeChoice3 = document.getElementById('upgradeChoice3');
let upgradeChoice4 = document.getElementById('upgradeChoice4');
let answerDiv = document.getElementById('answerContent');


/** variable **/

let passwordRoom = makeId(6);

/** HTML listeners **/

rollDice.addEventListener('click', event => {
    socket.emit('rollDice');
});

buy.addEventListener('click', event => {
    socket.emit('buyListener');
});

redeem.addEventListener('click', event => {
    socket.emit('redeemListener');
});

upgrade.addEventListener('click', event => {
    socket.emit('upgradeListener');
});

upgradeChoice1.addEventListener('click', event =>{
    socket.emit('upgradeView', 'upgradeChoice1');
});

upgradeChoice2.addEventListener('click', event =>{
    socket.emit('upgradeView', 'upgradeChoice2');
});

upgradeChoice3.addEventListener('click', event =>{
    socket.emit('upgradeView', 'upgradeChoice3');
});

upgradeChoice4.addEventListener('click', event =>{
    socket.emit('upgradeView', 'upgradeChoice4');
});

nothing.addEventListener('click', event => {
    socket.emit('nothingListener');
});


for (let i = 0; i < answerDiv.children.length; i++){
    answerDiv.children[i].addEventListener('click', () => {
        if (answerDiv.children[i].style.backgroundColor === "green"){
            answerDiv.children[i].style.backgroundColor = "";
        } else {
            answerDiv.children[i].style.backgroundColor = "green";
        }
    });
}
//Validate your questions button
document.getElementById('validAnswer').children[0].addEventListener('click', () => {
    this.questionEvent(answerDiv.children);
});

validate.addEventListener('click', event =>{
    socket.emit('privateRoom', passwordRoom);
});


/** automatic socket.emit **/

socket.emit('goodGame');
socket.emit('updatePrivateSocket');

/** socket.on **/

socket.on('multiplayerGame', () =>{
    socket.emit('multiplayer');
});

socket.on('admin', () =>{
    validate.style.display = 'block';
    validateText.style.display = 'block';
    waiting.innerText = 'Voici le code pour votre partie : ' + passwordRoom;
});

socket.on('notEnoughPlayers', ()=>{
    let notyf = new Notyf({
        duration: 2000,
        types: [{ type: 'error', background: '#F2A413'}]
    });
    notyf.error('Vous n\êtes pas assez pour jouer');
});

socket.on('notYourTurn', ()=>{
    let notyf = new Notyf({
        duration: 2000,
        types: [{ type: 'error', background: '#F2A413'}]
    });
    notyf.error('Ce n\'est pas à votre tour de jouer');
});

socket.on('backHome', ()=>{
   window.location.href = '/menu';
});

socket.on('privateGame', ()=> {
    socket.emit('createRoom', passwordRoom);
});

socket.on('init', (player, roomGame) =>{
    validate.style.display = 'none';
    validateText.style.display = 'none';
    waiting.innerText = "Pour une meilleure visibilité, appuyez sur les touches fn + f11";
    topLeftBox.style.display = 'block';
    bottomLeftBox.style.display = 'block';
    centerBox.style.display = 'block';
    topRightBox.style.display = 'block';
    bottomRightBox.style.display = 'block';
    let interface = new ViewServer(player, roomGame, false, false, false);
});

socket.on('action', (player, roomGame, showActions, showUpgrades, showQuestion) =>{
    let interface = new ViewServer(player, roomGame, showActions, showUpgrades, showQuestion);
});

/** function **/

function makeId(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}