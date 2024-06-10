let loggedInUser;
document.addEventListener('DOMContentLoaded', function () {
  loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  if (loggedInUser) {
    const name = loggedInUser.username;
    const welcome = document.querySelector('#welcome-message');
    welcome.textContent = `Welcome ${name}`;
  } else {
    // Redirect to login page
    window.location.href = 'index.html';
  }
});

const logoutBtn = document.querySelector('.logout');

logoutBtn.addEventListener('click', function () {
  localStorage.removeItem('loggedInUser');
  // Redirect to login page
  window.location.href = 'index.html';
});
