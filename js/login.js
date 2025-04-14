document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("currentUser")) {
        window.location.href = "../pages/index.html";
    }
    const loginButton = document.getElementById("login-btn");
    loginButton.addEventListener("click", (event) => {
        event.preventDefault();
        handleLogin();
    });
});
const handleLogin = () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");
    message.textContent = "";
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        Swal.fire({
            icon: "error",
            title: "Sai mật khẩu!",
          });
        return;
    }
    localStorage.setItem("currentUser", JSON.stringify(user));
    Swal.fire({
        title: "Đăng nhập thành công!",
        icon: "success",
        draggable: true
      });
    // Chuyển hướng người dùng đến trang chính
    setTimeout(() => {
        window.location.href = "../pages/index.html"; 
    }, 500); 
};
