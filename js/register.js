const form = document.getElementById("registerForm");

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const showPassword = document.getElementById("showPassword");

const message = document.getElementById("message");

// Show / Hide Password
showPassword.addEventListener("change", () => {

    const type = showPassword.checked ? "text" : "password";

    password.type = type;
    confirmPassword.type = type;

});

// Form Validation
form.addEventListener("submit", (e) => {

    e.preventDefault();

    message.style.color = "#ff4d4d";

    if(password.value.length < 8){

        message.textContent = "Password must be at least 8 characters.";

        return;

    }

    if(password.value !== confirmPassword.value){

        message.textContent = "Passwords do not match.";

        return;

    }

    message.style.color = "#00e676";

    message.textContent = "Validation successful. Firebase integration is next!";

});