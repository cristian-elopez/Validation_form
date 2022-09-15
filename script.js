const form = document.getElementById('form');
const nameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passInput = document.getElementById('password');
const phoneInput = document.getElementById('phone');

// validacion del nombre

const checkUsername = () =>{
    let valid = false;

    const min = 3;
    const max = 25;

    const username = nameInput.value.trim();
    if (isEmpty(username)){ // funcion que verifica si esta vacio
        showError(nameInput,"El nombre es obligatorio"); // muestro un mensaje de error 
    } else if (!isBetween(username.length,min,max)){ // devuelve el resultado de si esta entre min y max
        showError(nameInput,`El nombre debe tener entre ${min} y ${max} caracteres`);
    } else {
        showSuccess(nameInput); // muestro el input como valido sin mensaje
        valid = true;
    }
    return valid
};

const isEmpty = (value) => value === "";

const isBetween = (length,min,max) => length < min || length > max ? false : true;

const showError = (input,message) => {
    const formField = input.parentElement;
    formField.classList.remove("success");
    formField.classList.add("error");
    const error = formField.querySelector("small");
    error.textContent = message;
}

const showSuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.remove("error");
    formField.classList.add("success");
    const error = formField.querySelector("small");
    error.textContent = "";
}

// validacion del email

const checkEmail = () => {
    let valid = false;
    const emailValue = emailInput.value.trim();
    if (isEmpty(emailValue)){
        showError(emailInput,"El Email es obligatorio");
    } else if (!isEmailValid(emailValue)){
        showError(emailInput,"El Email no es valido");
    } else {
        showSuccess(emailInput);
        valid = true;
    }

    return valid
}

const isEmailValid = (email) => {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email)
}

// validacion de la contraseña

const checkPassword = () => {
    let valid = false;
    const password = passInput.value.trim();
    if (isEmpty(password)){
        showError(passInput,"La contraseña es obligatorio");
    } else if (!isPassValid(password)){
        showError(passInput,"La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y un caracter especial");
    } else {
        showSuccess(passInput);
        valid = true;
    }

    return valid
}

const isPassValid = (password) => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    return re.test(password)
}

// validacion del telefono

const checkPhone = () => {
    let valid = false;
    const phoneValue = phoneInput.value.trim();
    if(!isPhoneValid(phoneValue)) {
        showError(phoneInput,"El telefono ingresado es invalido");
    } else {
        showSuccess(phoneInput);
        valid = true;
    }

    return valid
}

const isPhoneValid = (phone) => {
    const re = /^[0-9]{10}$/;
    return re.test(phone)
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();

    let isUsernameValid = checkUsername();
    let isEmailValid =  checkEmail();
    let isPasswordValid =  checkPassword();
    let isPhoneValid =  checkPhone();

    console.log("isUsernameValid",isUsernameValid)
    console.log("isEmailValid",isEmailValid)
    console.log("isPasswordValid",isPasswordValid)
    console.log("isPhoneValid",isPhoneValid)

    let isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isPhoneValid;
    if (isFormValid) {
        form.submit()
    }
})

const debounce = (fn, delay = 1000) => {
    let timeoutId;
    return(...args) => {
        if(timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(()=> {
            fn.apply(null, args)
        }, delay)
    };
};

form.addEventListener(
    "input",debounce((e)=>{
        switch(e.target.id){
            case "username":
                checkUsername();
                break;
            case "email":
                checkEmail();
                break;
            case "password":
                checkPassword();
                break;
            case "phone":
                checkPhone();
                break;
        };
    })
)