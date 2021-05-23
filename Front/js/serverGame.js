let waiting = document.getElementById('waiting');
let img = document.getElementById('img');
let validate = document.getElementById('validate');
let validateText = document.getElementById('validateText');

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


socket.on('play', (pseudo) =>{
    validate.style.display = 'none';
    validateText.style.display = 'none';
    waiting.innerText = "Pour une meilleure visibilité, appuyez sur les touches fn + f11";
});

socket.on('test', () =>{
    validate.style.display = 'none';
    validateText.style.display = 'none';
    waiting.innerText = "ehoh";
});