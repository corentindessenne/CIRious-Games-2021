let waiting = document.getElementById('waiting');
let img = document.getElementById('img');
let validate = document.getElementById('validate');
let validateText = document.getElementById('validateText');
let topLeftBox = document.getElementById('topLeftBox');
let bottomLeftBox = document.getElementById('bottomLeftBox');
let centerBox = document.getElementById('center');
let topRightBox = document.getElementById('topRightBox');
let bottomRightBox = document.getElementById('bottomRightBox');

function makeId(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

let passwordRoom = makeId(6);

img.addEventListener('click', event =>{
    socket.emit('update');
});

validate.addEventListener('click', event =>{
    socket.emit('privateRoom', passwordRoom);
});

socket.emit('goodGame');
socket.emit('updatePrivateSocket');

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
        types: [
            {
                type: 'error',
                background: '#F2A413'
            }]
    });
    notyf.error('Vous n\êtes pas assez pour jouer');
});

socket.on('backHome', ()=>{
   window.location.href = '/menu';
});


socket.on('privateGame', ()=> {
    socket.emit('createRoom', passwordRoom);
});

socket.on('init', (roomGame) =>{
    validate.style.display = 'none';
    validateText.style.display = 'none';
    waiting.innerText = "Pour une meilleure visibilité, appuyez sur les touches fn + f11";
    topLeftBox.style.display = 'block';
    bottomLeftBox.style.display = 'block';
    centerBox.style.display = 'block';
    topRightBox.style.display = 'block';
    bottomRightBox.style.display = 'block';
    let interface = new View(roomGame);
    interface.initView();
});

socket.on('action', (roomGame) =>{

});

socket.on('test', () =>{
    validate.style.display = 'none';
    validateText.style.display = 'none';
    waiting.innerText = "ehoh";
});


//Dice
let rollButton = document.getElementById('rollDice');
rollButton.addEventListener('click', () => {
    socket.emit('rollDice');
});

socket.on('rollDiceView', (monopalim) => {
    let interface = new View(monopalim);
    interface.rollEvent();
});

//Actions on boxes
let buyButton = document.getElementById('buy');
let redeemButton = document.getElementById('redeem');
let upgradeButton = document.getElementById('upgrade');
let nothingButton = document.getElementById('nothing');
buyButton.addEventListener('click', () => {
    this.actionEvent("buy");
});
redeemButton.addEventListener('click', () => {
    this.actionEvent("redeem");
});
upgradeButton.addEventListener('click', () => {
    this.actionEvent("upgrade");
});
nothingButton.addEventListener('click', () => {
    this.actionEvent("nothing");
});

//Upgrade Buttons
let button1 = document.getElementById('upgradeChoice1');
let button2 = document.getElementById('upgradeChoice2');
let button3 = document.getElementById('upgradeChoice3');
let button4 = document.getElementById('upgradeChoice4');
button1.addEventListener('click', () => {
    this.game.upgradeRequest = button1.textContent;
    return this.actionEvent("upgrade")
});
button2.addEventListener('click', () => {
    this.game.upgradeRequest = button2.textContent;
    return this.actionEvent("upgrade")
});
button3.addEventListener('click', () => {
    this.game.upgradeRequest = button3.textContent;
    return this.actionEvent("upgrade")
});
button4.addEventListener('click', () => {
    this.game.upgradeRequest = button4.textContent;
    return this.actionEvent("upgrade")
});