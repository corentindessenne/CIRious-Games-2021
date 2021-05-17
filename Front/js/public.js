let connection = document.getElementById('connection');
let waiting = document.getElementById('waiting');

socket.emit('multijoueur');

socket.on('play', (pseudo) =>{
    connection.innerText = "bonjour " + pseudo;
    waiting.style.visibility = 'hidden';
});