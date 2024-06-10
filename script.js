'use strict';

const container = document.querySelector('.container');
const userName = document.querySelector('.name');
const emailReg = document.querySelector('.email-reg');
const emailLog = document.querySelector('.email-log');
const password = document.querySelector('.password');
const password2 = document.querySelector('.password2');
const passwordLog = document.querySelector('.password-log');
const loginForm = document.querySelector('.form-box.login');
const registerForm = document.querySelector('.form-box.register');
const registerLink = document.querySelector('.register-link');
const loginLink = document.querySelector('.login-link');
const signUpBtn = document.querySelector('.btn-sign-up');
const loginBtn = document.querySelector('.btn-login');

let accounts = getAccounts();

// Display input error message
function showError(input, message) {
  const inputBox = input.parentElement;
  inputBox.className = 'input-box error';
  const small = inputBox.querySelector('small');

  small.textContent = message;
}

// Display input success message
function showSuccess(input) {
  const inputBox = input.parentElement;
  inputBox.className = 'input-box success';
}

// check if inputs are there
function checkRequired(inputs) {
  let isValid = true;
  inputs.forEach((input) => {
    if (input.value.trim() === '') {
      showError(input, `${input.getAttribute('data-name')} is required`);
      isValid = false;
    } else {
      showSuccess(input);
    }
  });

  return isValid;
}

// Check if username is valid (characters , numbers and _)
function isUsernameValid(username) {
  const re = /^[a-zA-Z0-9_]+$/;
  return re.test(username);
}

// Check email is valid
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Check if password length is valid
function isPasswordValid(password) {
  return password.length >= 8;
}

// Validate password match
function passwordsMatch(password1, password2) {
  return password1 === password2;
}

// check email already exists
function emailExists(email) {
  return accounts.some((account) => account.email === email);
}

// Save account to localStorage
function saveAccount(account) {
  accounts.push(account);
  localStorage.setItem('accounts', JSON.stringify(accounts));
}

// Get accounts from localStorage
function getAccounts() {
  return JSON.parse(localStorage.getItem('accounts')) || [];
}

// Create account
function createAccount(e) {
  // Prevent default form submission
  e.preventDefault();

  //  Validation functions
  const isValidInputs = checkRequired([
    userName,
    emailReg,
    password,
    password2,
  ]);

  // check if username valid
  if (!isUsernameValid(userName.value)) {
    showError(userName, 'characters , numbers and _ ONLY');
    return;
  }

  // check if email is valid
  if (!isValidEmail(emailReg.value) && emailReg.value) {
    showError(emailReg, 'Please enter a valid email.');
    return;
  }

  // check if password length are more or equal 8
  if (!isPasswordValid(password.value)) {
    showError(password, 'Password must be more or equal than 8 characters');
    return;
  }

  // check if passwords are identical
  if (!passwordsMatch(password.value, password2.value)) {
    showError(password, 'Passwords do not match.');
    showError(password2, 'Passwords do not match.');
    return;
  }

  // check if this email already there
  if (emailExists(emailReg.value)) {
    showError(emailReg, 'Already have an account');
    return;
  }

  if (isValidInputs) {
    const account = {
      username: userName.value,
      email: emailReg.value,
      password: password.value,
    };
    saveAccount(account);
    alert('success');
    // go to login
    // container.classList.remove('active');
  }
}

// Login function
function login(e) {
  e.preventDefault();

  // get accounts from local storage
  const accounts = getAccounts();

  const matchedAccount = accounts.find(
    (acc) => acc.email === emailLog.value && acc.password === passwordLog.value
  );

  if (matchedAccount) {
    localStorage.setItem('loggedInUser', JSON.stringify(matchedAccount));
    // Redirect to home page
    window.location.href = 'home.html';
  } else {
    showError(passwordLog, 'Invalid email or password.');
  }
}

function clear() {
  userName.value = '';
  emailReg.value = '';
  password.value = '';
  password2.value = '';
}

signUpBtn.addEventListener('click', createAccount);

loginBtn.addEventListener('click', login);

registerLink.addEventListener('click', function (e) {
  e.preventDefault();
  loginForm.classList.add('.form-box.login.hidden');
  registerForm.classList.remove('.form-box.login.hidden');
  loginForm.classList.add('hidden');
  registerForm.classList.remove('hidden');

  container.classList.add('active');
});

loginLink.addEventListener('click', function (e) {
  // clear();
  e.preventDefault();
  loginForm.classList.remove('.form-box.register.hidden');
  registerForm.classList.add('.form-box.register.hidden');
  loginForm.classList.remove('hidden');
  registerForm.classList.add('hidden');

  container.classList.remove('active');
});

// to reset all accounts
function reset() {
  localStorage.removeItem('accounts');
}

// reset();
