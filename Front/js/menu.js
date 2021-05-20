let home = document.getElementById('home');
let profil = document.getElementById('profile');
let multijoueur = document.getElementById('multijoueur');
let validate = document.getElementById('validate');
let create = document.getElementById('create');
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
    window.location.href = '/multijoueur';
});
aPropos.addEventListener('click', event =>{
    window.location.href = '/aboutUs';
});
tutoriel.addEventListener('click', event =>{
    window.location.href = '/tutorial';
});