let temp = document.getElementById('temp');
socket.emit('errors');

socket.on('error1', ()=>{
    let notyf = new Notyf({
        duration: 2000,
        types: [
            {
                type: 'error',
                background: '#2484BF'
            }]
    });

    notyf.error('Vous êtes déjà connecté');
});

socket.on('error2', ()=>{
    let notyf = new Notyf({
        duration: 2000,
        types: [
        {
            type: 'error',
            background: '#F2A413'
        }]
    });

    notyf.error('Pseudo ou mot de passe incorrect(s)');
});
