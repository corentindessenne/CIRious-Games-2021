let currentPseudo = document.getElementById('currentPseudo');
let currentMail = document.getElementById('currentMail');

socket.emit('callPseudo');
socket.emit('callMail');

socket.on('displayPseudo', (pseudoParam) => {
    currentPseudo.innerHTML = pseudoParam;
});

socket.on('displayMail', (mailParam) => {
    currentMail.innerHTML = mailParam;
});

//Checks if both usernames typed are the same
function checkUsername(){
    let newUsername = document.getElementById('newUsername');
    let confirmUsername = document.getElementById('confirmNewUsername');
    let userMessage = document.getElementById('userMessage');
    let userButton = document.getElementById('changeUsername');

    if(newUsername.value === confirmUsername.value) {
        if(confirmUsername.value.trim() === '' && newUsername.value.trim() === ''){
            userButton.setAttribute('disabled', 'disabled');
            userMessage.innerHTML = 'Erreur. Les pseudos ne contiennent pas de lettres.';
        }
        else{
            userButton.removeAttribute("disabled");
            userMessage.innerHTML = '';
        }
    }
    else{
        userButton.setAttribute('disabled', 'disabled');
        userMessage.innerHTML = 'Erreur. Les pseudos ne correspondent pas';
    }
}

//Checks if both mail addresses typed are the same
function checkMailAddress(){
    let newEmail = document.getElementById('newEmail');
    let confirmEmail = document.getElementById('confirmNewEmail');
    let emailMessage = document.getElementById('emailMessage');
    let emailButton = document.getElementById('changeEmail');

    if(newEmail.value === confirmEmail.value) {
        if(!confirmEmail.value.includes('@') && !newEmail.value.includes('@')){
            emailButton.setAttribute('disabled', 'disabled');
            emailMessage.innerHTML = "Erreur. Adresse non valide.";
        }
        else{
            emailButton.removeAttribute("disabled");
            emailMessage.innerHTML = '';
        }
    }
    else{
        emailButton.setAttribute('disabled', 'disabled');
        emailMessage.innerHTML = 'Erreur. Les adresses ne correspondent pas';
    }
}

//Checks if both passwords typed are the same
function checkPassword(){
    let newPassword = document.getElementById('newPassword');
    let confirmPassword = document.getElementById('confirmNewPassword');
    let passwordMessage = document.getElementById('passwordMessage');
    let passwordButton = document.getElementById('changePassword');

    if(newPassword.value === confirmPassword.value){
        if(newPassword.value.trim() === '' && confirmPassword.value.trim() === ''){
            passwordButton.setAttribute('disabled', 'disabled');
            passwordMessage.innerHTML = 'Erreur. Les mots de passe sont vides.';
        }
        else{
            passwordButton.removeAttribute('disabled');
            passwordMessage.innerHTML = '';
        }
    }
    else{
        passwordButton.setAttribute('disabled', 'disabled');
        passwordMessage.innerHTML = 'Erreur. Les mots de passe ne correspondent pas.';
    }
}

function checkDeletion(){
    let confirmDeletion = document.getElementById('confirmDeletion');
    let deleteButton = document.getElementById('deleteAccount');
    if(confirmDeletion.value !== ''){
        deleteButton.removeAttribute('disabled');
    }
    else{
        deleteButton.setAttribute('disabled','disabled');
    }
}