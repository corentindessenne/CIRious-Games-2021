let home = document.getElementById('home');
let profil = document.getElementById('profile');

home.addEventListener('click', event =>{
    window.location.href = '/menu';
});
profil.addEventListener('click', event =>{
    window.location.href = '/profile';
});