function checkPassword(){
    let password = document.getElementById('password');
    let confirm = document.getElementById('confirm_password');
    let message = document.getElementById('confirmMessage');

    if(password.value === confirm.value){
        document.getElementById('inscription').removeAttribute('disabled');
        message.style.display = 'none';
    }
    else{
        message.style.display = 'block';
    }
}