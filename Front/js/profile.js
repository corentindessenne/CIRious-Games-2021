/** HTML getters **/

let button = document.getElementById('modify');
let username = document.getElementById('username');
let username2 = document.getElementById('username2');
let mail = document.getElementById('mail');
let picture = document.getElementById('picture');
let deconnection = document.getElementById('deconnection');

/** HTML listeners **/

button.addEventListener('click', event =>{
    window.location.href = '/editProfile';
});

deconnection.addEventListener('click', event =>{
    socket.emit('logout');
});

/** socket.emit **/

socket.emit('callUsername');
socket.emit('callMail');
socket.emit('callPicture');

/** socket.on **/

socket.on('displayUsername', (usernameParam) => {
    username.innerHTML = usernameParam;
    username2.innerHTML = usernameParam;
});

socket.on('displayMail', (mailParam) => {
    mail.innerHTML = mailParam;
});

socket.on('displayPicture', (pictureParam) =>{
    picture.src = "../assets/img/avatars/" + pictureParam;
});

socket.on('bye', () =>{
    window.location.href = '/';
});