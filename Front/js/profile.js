let button = document.getElementById('modify');
let pseudo = document.getElementById('pseudo');
let pseudo2 = document.getElementById('pseudo2');
let mail = document.getElementById('mail');

button.addEventListener('click', event =>{
    window.location.href = '/editProfile';
});

socket.emit('callPseudo');
socket.emit('callMail');

socket.on('displayPseudo', (pseudoParam) => {
    pseudo.innerHTML = pseudoParam;
    pseudo2.innerHTML = pseudoParam;
});

socket.on('displayMail', (mailParam) => {
    mail.innerHTML = mailParam;
});