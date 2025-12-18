// التحقق من تسجيل حساب جديد
const form = document.getElementById('signupForm');
const message = document.getElementById('message');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  if (name === '' || email === '' || password === '') {
    message.textContent = 'Please fill in all fields!';
    message.style.color = 'red';
    return;
  }

  if (!email.includes('@') || !email.includes('.')) {
    message.textContent = 'Invalid email address!';
    message.style.color = 'red';
    return;
  }

  if (password.length < 6) {
    message.textContent = 'Password must be at least 6 characters!';
    message.style.color = 'red';
    return;
  }

  message.textContent = 'Account created successfully ✔';
  message.style.color = 'green';
  form.reset();
});

// زر التوجه إلى تسجيل الدخول
document.getElementById('signInBtn').addEventListener('click', function () {
  window.location.href = "login.html";
});

// التحقق من تسجيل الدخول
const loginForm = document.getElementById('loginForm');
const loginMsg = document.getElementById('loginMsg');

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('emailLogin').value.trim();
  const pass = document.getElementById('passLogin').value;

  if (!email.includes('@') || !email.includes('.')) {
    loginMsg.textContent = 'Invalid email address!';
    loginMsg.style.color = 'red';
    return;
  }

  if (pass.length < 6) {
    loginMsg.textContent = 'Password must be at least 6 characters!';
    loginMsg.style.color = 'red';
    return;
  }

  loginMsg.textContent = 'Logged in successfully ✔';
  loginMsg.style.color = 'green';
  loginForm.reset();
});