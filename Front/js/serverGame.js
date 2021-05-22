let connection = document.getElementById('connection');
let waiting = document.getElementById('waiting');
let img = document.getElementById('img');
let validate = document.getElementById('validate');

img.addEventListener('click', event =>{
    socket.emit('update');
});

validate.addEventListener('click', event =>{
    socket.emit('privateRoom');
});

socket.emit('goodGame');
socket.emit('updatePrivateSocket');

socket.on('multiplayerGame', () =>{
    socket.emit('multiplayer');
});
socket.on('test', () =>{
    console.log('please');
});

socket.on('privateGame', ()=> {
    socket.emit('createRoom', '1234');
});

socket.on('joinRoom', ()=> {
    console.log('yo');
});

socket.on('play', (pseudo) =>{
    connection.innerText = "bonjour " + pseudo;
    waiting.style.visibility = 'hidden';
});

socket.on('updatePlease', () =>{
    connection.innerText = "bonjour stp fonctionne";
});