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

socket.on('3playersGame', ()=> {
    socket.emit('createRoom', '1234');
});

socket.on('players3', (password)=> {
    socket.emit('playerToJoin', password);
});

socket.on('play', (pseudo) =>{
    connection.innerText = "bonjour " + pseudo;
    waiting.style.visibility = 'hidden';
});

socket.on('updatePlease', () =>{
    connection.innerText = "bonjour stp fonctionne";
});