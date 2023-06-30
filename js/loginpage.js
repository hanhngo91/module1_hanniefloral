const eyeIcons = document.querySelectorAll(".eyeIcon");
const form = document.querySelector("form"),
  emailField = form.querySelector(".email-field"),
  passField = form.querySelector(".create-password"),
  cPassField = form.querySelector(".confirm-password"),
  cPassInput = document.getElementById("confirmPass");

//Email validation
let emailInput1 = document.getElementById("email1");
function checkEmailLogin() {
  let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let keyEmail1 = false;
  if (emailInput1.value != "" && emailInput1.value.match(emailPattern)) {
    document.getElementById("emailValid1").style.display = "none";
    keyEmail1 = true;
  } else {
    emailInput1.focus();
    document.getElementById("emailValid1").style.display = "flex";
  }
  return keyEmail1;
}
emailInput1.addEventListener("keyup", checkEmailLogin);

let emailInput2 = document.getElementById("email2");
function checkEmailReg() {
  let emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let keyEmail2 = false;
  if (emailInput2.value != "" && emailInput2.value.match(emailPattern)) {
    document.getElementById("emailValid2").style.display = "none";
    keyEmail2 = true;
  } else {
    emailInput2.focus();
    document.getElementById("emailValid2").style.display = "flex";
  }
  return keyEmail2;
}
emailInput2.addEventListener("keyup", checkEmailReg);

//Hide and show password
eyeIcons.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    const pInput = eyeIcon.parentElement.querySelector("input");
    if (pInput.type === "password") {
      eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
      return (pInput.type = "text");
    }
    eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
    pInput.type = "password";
  });
});

//Login password validation
let password = document.getElementById("pass");
function passValid() {
  let passPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  let keyPass = false;
  if (password.value != "" && password.value.match(passPattern)) {
    document.getElementById("passValid1").style.display = "none";
    keyPass = true;
  } else {
    password.focus();
    document.getElementById("passValid1").style.display = "flex";
  }
  return keyPass;
}
password.addEventListener("keyup", passValid);

//Register Password validation
let passInput = document.getElementById("createPass");
function createPass() {
  let passPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
  let keyCrePass = false;
  if (passInput.value != "" && passInput.value.match(passPattern)) {
    document.getElementById("passValid2").style.display = "none";
    keyCrePass = true;
  } else {
    passInput.focus();
    document.getElementById("passValid2").style.display = "flex";
  }
  return keyCrePass;
}
passInput.addEventListener("keyup", createPass);

//Confirm Password validation
function confirmPass() {
  let keyCPass = false;
  if (passInput.value === cPassInput.value) {
    document.getElementById("cPassValid").style.display = "none";
    keyCPass = true;
  } else {
    cPassInput.focus();
    document.getElementById("cPassValid").style.display = "flex";
  }
  return keyCPass;
}
cPassInput.addEventListener("keyup", confirmPass);

//Calling function on form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkEmailReg();
  createPass();
  confirmPass();
  emailInput2.addEventListener("keyup", checkEmailReg);
  passInput.addEventListener("keyup", createPass);
  cPassInput.addEventListener("keyup", confirmPass);
  if (
    !emailField.classList.contains("error") &&
    !passField.classList.contains("error") &&
    !cPassField.classList.contains("error")
  ) {
    location.href = "./html/loginpage.html";
    const snackbar = document.createElement("div");
    snackbar.classList.add("snackbar");
    snackbar.innerText = "Please login before shopping!";
    document.body.appendChild(snackbar);

    setTimeout(() => {
      snackbar.remove();
    }, 3000);
  }
});
//Signup
document
  .getElementById("registerBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    signUp();
  });
function signUp() {
  let signUpMail = document.getElementById("email2").value;
  let signUpPass = document.getElementById("createPass").value;
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo == null) {
    userInfo = [];
  }
  let flag = true;
  for (let i = 0; i < userInfo.length; i++) {
    if (userInfo[i].email == signUpMail) {
      flag = false;
      break;
    }
  }
  let flagNull = true;
  if (signUpMail == "" || signUpPass == "") {
    flagNull = false;
  }
  if (!flag) {
    const snackbar = document.createElement("div");
    snackbar.classList.add("snackbar");
    snackbar.innerText = "Email is already used!";
    document.body.appendChild(snackbar);

    setTimeout(() => {
      snackbar.remove();
    }, 3000);
    return;
  } else if (!flagNull) {
    const snackbar = document.createElement("div");
    snackbar.classList.add("snackbar");
    snackbar.innerText = "Please enter all the information";
    document.body.appendChild(snackbar);

    setTimeout(() => {
      snackbar.remove();
    }, 3000);
  } else {
    let newUser = {
      id: userInfo.length == 0 ? 0 : userInfo[userInfo.length - 1].id + 1,
      email: signUpMail,
      password: signUpPass,
      status: "Active",
    };
    userInfo.push(newUser);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    let cart;
    let localCart = JSON.parse(localStorage.getItem("cart", cart));
    if (localCart == null) {
      cart = {};
    } else {
      cart = localCart;
    }
    cart = { ...cart, [newUser.email]: [] };
    localStorage.setItem("cart", JSON.stringify(cart));

    const snackbar = document.createElement("div");
    snackbar.classList.add("snackbar");
    snackbar.innerText = "New account is registered successfully!";
    document.body.appendChild(snackbar);

    setTimeout(() => {
      snackbar.remove();
    }, 3000);

    document.getElementById("email2").value = "";
    document.getElementById("createPass").value = "";
    document.getElementById("confirmPass").value = "";
  }
}

//Signin
function signIn() {
  let dataLogin = JSON.parse(localStorage.getItem("userInfo"));
  if (dataLogin == null) {
    dataLogin = [];
  }
  let signInMail = document.getElementById("email1").value;
  let signInPass = document.getElementById("pass").value;
  let statusLogIn;
  let flag = true;
  if (signInMail == "hanhngo1991@gmail.com" && signInPass == "HanhNgo91#") {
    location.href = "./admin-homepage.html";
  } else {
    for (let i = 0; i < dataLogin.length; i++) {
      if (
        dataLogin[i].email == signInMail &&
        dataLogin[i].password == signInPass
      ) {
        if (dataLogin[i].status == "Locked") {
          const snackbar = document.createElement("div");
          snackbar.classList.add("snackbar");
          snackbar.innerText =
            "Your account is locked! Please contact for more information.";
          document.body.appendChild(snackbar);

          setTimeout(() => {
            snackbar.remove();
          }, 3000);
          return;
        }
        flag = false;
        statusLogIn = dataLogin[i].email;
        break;
      } else {
        flag = true;
      }
    }
    //--------------------------------------------
    let flagNull = true;
    if (signInMail == "") {
      flagNull = false;
    }

    if (!flag) {
      flagSignIn = statusLogIn;
      localStorage.setItem("flagSignIn", flagSignIn);
      window.location.href = "../index.html";
      document.getElementById(
        "userName"
      ).innerHTML = `<button>Log Out</button>`;
    } else if (!flagNull) {
      const snackbar = document.createElement("div");
      snackbar.classList.add("snackbar");
      snackbar.innerText = "Please enter your email!";
      document.body.appendChild(snackbar);

      setTimeout(() => {
        snackbar.remove();
      }, 3000);
    } else {
      const snackbar = document.createElement("div");
      snackbar.classList.add("snackbar");
      snackbar.innerText = "Your acc password is not right!";
      document.body.appendChild(snackbar);

      setTimeout(() => {
        snackbar.remove();
      }, 3000);
    }
  }
  document.getElementById("email2").value = "";
  document.getElementById("createPass").value = "";
  document.getElementById("confirmPass").value = "";
}
