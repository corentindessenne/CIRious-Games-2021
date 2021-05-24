/** HTML getters **/

let currentUsername = document.getElementById('currentUsername');
let currentMail = document.getElementById('currentMail');
let verifyPasswordForm = document.getElementById('verifyPasswordForm');
let changePasswordForm = document.getElementById('changePasswordForm');
let navUsername = document.getElementById('nav-username');
let navUsernameTab = document.getElementById('nav-username-tab');
let navPassword = document.getElementById('nav-password');
let navPasswordTab = document.getElementById('nav-password-tab');
let profilePic = document.getElementById('profile_pic');
let avatarsTable = document.getElementById('avatarsTable');

/** HTML listeners **/

//handles the selection of an avatar and the display of the frame when selected
for (let i = 0; i < 2; ++i) {
    for (let j = 0; j < 5; ++j) {
        //When there is a click, function is called
        avatarsTable.rows[i].cells[j].addEventListener('click', event => {
            let cellI = i;
            let cellJ = j;
            let tdId = avatarsTable.rows[i].cells[j].id;
            let imgId = tdId.replace('td_','');
            document.getElementById(imgId).style.border = '5px solid #f8ca73';
            document.getElementById('newPicture').value = imgId;
            console.log( document.getElementById('newPicture').value);

            for (let k = 0; k < 2; ++k) {
                for (let l = 0; l < 5; ++l) {
                    if(k !== cellI || l !== cellJ){
                        let tdId = avatarsTable.rows[k].cells[l].id;
                        let imgId = tdId.replace('td_','');
                        document.getElementById(imgId).style.border = 'none';
                    }
                }
            }
        });
    }
}

/** automatic socket.emit **/

socket.emit('callUsername');
socket.emit('callMail');
socket.emit('callPicture');
socket.emit('chechLastPassword');

/** socket.on **/

socket.on('displayUsername', (usernameParam) => {
    currentUsername.innerHTML = usernameParam;
});

socket.on('displayMail', (mailParam) => {
    currentMail.innerHTML = mailParam;
});

socket.on('displayPicture', (pictureParam) =>{
    profilePic.src = "../assets/img/avatars/" + pictureParam;
    let pictureId = pictureParam.replace('.png', '');
    document.getElementById(pictureId).style.border = '5px solid #f8ca73';
});

socket.on('lastPasswordIsChecked', ()=>{
    verifyPasswordForm.style.display = 'none';
    changePasswordForm.style.display = 'block';
    navUsername.className = "tab-pane fade";
    navUsernameTab.className = "nav-link";
    navPassword.className = "tab-pane fade show active";
    navPasswordTab.className = "nav-link active";
});

/** functions **/

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
        } else {
            userButton.removeAttribute("disabled");
            userMessage.innerHTML = '';
        }
    } else {
        userButton.setAttribute('disabled', 'disabled');
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
        } else {
            emailButton.removeAttribute("disabled");
            emailMessage.innerHTML = '';
        }
    } else {
        emailButton.setAttribute('disabled', 'disabled');
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
        } else {
            passwordButton.removeAttribute('disabled');
            passwordMessage.innerHTML = '';
        }
    } else {
        passwordButton.setAttribute('disabled', 'disabled');
    }
}

function checkDeletion(){
    let confirmDeletion = document.getElementById('confirmDeletion');
    let deleteButton = document.getElementById('deleteAccount');
    if(confirmDeletion.value !== ''){
        deleteButton.removeAttribute('disabled');
    } else {
        deleteButton.setAttribute('disabled','disabled');
    }
}