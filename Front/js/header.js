let home = document.getElementById('home');
let profil = document.getElementById('profil');

home.addEventListener('click', event =>{
    window.location.href = '/menu';
});
profil.addEventListener('click', event =>{
    window.location.href = '/profil';
});