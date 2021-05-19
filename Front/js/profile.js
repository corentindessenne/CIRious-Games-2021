let button = document.getElementById('modify');
let pseudo = document.getElementById('pseudo');
let pseudo2 = document.getElementById('pseudo2');
let mail = document.getElementById('mail');
let picture = document.getElementById('picture');

button.addEventListener('click', event =>{
    window.location.href = '/editProfile';
});

socket.emit('callPseudo');
socket.emit('callMail');
socket.emit('callPicture');

socket.on('displayPseudo', (pseudoParam) => {
    pseudo.innerHTML = pseudoParam;
    pseudo2.innerHTML = pseudoParam;
});

socket.on('displayMail', (mailParam) => {
    mail.innerHTML = mailParam;
});

socket.on('displayPicture', (pictureParam) =>{
    picture.src = "../assets/img/avatars/" + pictureParam;
});