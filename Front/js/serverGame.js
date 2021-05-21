let connection = document.getElementById('connection');
let waiting = document.getElementById('waiting');
let img = document.getElementById('img');

img.addEventListener('click', event =>{
    socket.emit('update');
});

socket.emit('goodGame');

socket.on('multiplayerGame', () =>{
    socket.emit('multiplayer');
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