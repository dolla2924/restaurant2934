// =====================
// 🔥 Import Firebase
// =====================
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";


// =====================
// 🔥 Firebase Config (بياناتك الحقيقية)
// =====================
const firebaseConfig = {
  apiKey: "AIzaSyDa9q4UvDPvrUZyXXd09A7aqFDkcpdXfW0",
  authDomain: "project-d4387.firebaseapp.com",
  projectId: "project-d4387",
  storageBucket: "project-d4387.firebasestorage.app",
  messagingSenderId: "445154827614",
  appId: "1:445154827614:web:8dcef989cb7c70d60d43cf"
};


// =====================
// 🔥 Initialize Firebase
// =====================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// =====================
// ✅ SIGN UP (index.html)
// =====================
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        message.style.color = "green";
        message.textContent = "تم إنشاء الحساب بنجاح ✔";

        setTimeout(() => {
          window.location.href = "home.html";
        }, 1000);
      })
      .catch((error) => {
        message.style.color = "red";

        if (error.code === "auth/email-already-in-use") {
          message.textContent = "هذا الإيميل مستخدم بالفعل";
        } else if (error.code === "auth/weak-password") {
          message.textContent = "كلمة المرور ضعيفة (6 أحرف على الأقل)";
        } else {
          message.textContent = error.message;
        }
      });
  });
}


// =====================
// ✅ LOGIN (login.html)
// =====================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("emailLogin").value;
    const password = document.getElementById("passLogin").value;
    const loginMsg = document.getElementById("loginMsg");

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        loginMsg.style.color = "green";
        loginMsg.textContent = "تم تسجيل الدخول بنجاح ✔";

        setTimeout(() => {
          window.location.href = "home.html";
        }, 1000);
      })
      .catch((error) => {
        loginMsg.style.color = "red";
        loginMsg.textContent = "تعذر الوصول للحساب. تأكد من الإيميل وكلمة المرور.";
      });
  });
}


// =====================
// 🔒 PROTECT HOME PAGE
// =====================
onAuthStateChanged(auth, (user) => {
  if (!user && window.location.pathname.includes("home.html")) {
    window.location.href = "login.html";
  }
});
