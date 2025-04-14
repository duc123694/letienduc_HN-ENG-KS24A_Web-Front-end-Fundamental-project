document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let firstName = document.getElementById("first-name");
    let lastName = document.getElementById("last-name");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirm-password");
    let message = document.getElementById("message");
    message.textContent = ""; 
    if (firstName.value === "" || lastName.value === "" || email.value === "" || password.value === "" || confirmPassword.value === "") {
        Swal.fire({
            icon: "error",
            title: "Vui lòng điền đủ thông tin!",
          });
        return;
    }
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        Swal.fire({
            icon: "error",
            title: "email không đúng định dạng!",
          });
        return;
    }
    if (password.length < 6) {
        Swal.fire({
            icon: "error",
            title: "Mật khẩu tối thiểu 6 ký tự!",
          });
        return;
    }
    if (password === confirmPassword) {
        Swal.fire({
            icon: "error",
            title: "Mật khẩu xác nhận không khớp!",
          });
        return;
    }
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let existingUser = users.find(u => u.email === email);

    if (existingUser) {
        Swal.fire({
            icon: "error",
            title: "Email đã tồn tại!",
          });
        return;
    }
    users.push({ firstName, lastName, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    Swal.fire({
        title: "Đăng ký thành công!",
        icon: "success",
        draggable: true
      });
    setTimeout(() => {
        window.location.href = "../pages/login.html"; 
    }, 500);
  });
