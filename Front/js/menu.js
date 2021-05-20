let home = document.getElementById('home');
let profil = document.getElementById('profile');
let multijoueur = document.getElementById('multijoueur');
let validate = document.getElementById('validate');
let passwordRoom = document.getElementById("input");
let create3 = document.getElementById('create3');
let local = document.getElementById('local');
let scor = document.getElementById('score');
let tutoriel = document.getElementById('tutoriel');
let aPropos = document.getElementById('aPropos');

home.addEventListener('click', event =>{
    window.location.href = '/menu';
});
profil.addEventListener('click', event =>{
    window.location.href = '/profile';
});
multijoueur.addEventListener('click', event =>{
    socket.emit('typeGame', 'multiplayer');
    window.location.href = '/game';
});
validate.addEventListener('click', event =>{
    if(passwordRoom.value){
        console.log(passwordRoom.value);
        socket.emit('searchRoom', passwordRoom.value);
    }
});
socket.on('findRoom', (password) =>{
    socket.emit('typeGame', password);
    window.location.href = '/game';
});
socket.on('errorSearch', ()=>{
    let notyf = new Notyf({
        duration: 2000,
        types: [
            {
                type: 'error',
                background: '#F2A413'
            }]
    });

    notyf.error('Partie inexistante');
});
create3.addEventListener('click', event =>{
    socket.emit('typeGame', '3players');
    window.location.href = '/game';
});
local.addEventListener('click', event => {
    window.location.href = '/localGame';
});
scor.addEventListener('click', event => {
    window.location.href = '/score';
});
aPropos.addEventListener('click', event =>{
    window.location.href = '/aboutUs';
});
tutoriel.addEventListener('click', event =>{
    window.location.href = '/tutorial';
});