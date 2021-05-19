let temp = document.getElementById('temp');
socket.emit('errors');

socket.on('error1', ()=>{
    let notyf = new Notyf(duration = 10000);

    // Display an error notification
    notyf.error('Vous êtes déjà connecté');
});

socket.on('error2', ()=>{
    let notyf = new Notyf(duration = 10000);

    // Display an error notification
    notyf.error('Le pseudo n\'existe pas');
});
