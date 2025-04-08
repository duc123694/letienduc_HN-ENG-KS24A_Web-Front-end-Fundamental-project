document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Lấy giá trị từ các input
    let firstName = document.getElementById("first-name");
    let lastName = document.getElementById("last-name");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("confirm-password");
    let message = document.getElementById("message");

    message.textContent = ""; // Reset thông báo lỗi trước khi kiểm tra

    // Kiểm tra nhập liệu
    if (firstName.value === "" || lastName.value === "" || email.value === "" || password.value === "" || confirmPassword.value === "") {
        message.textContent = "Vui lòng nhập đầy đủ thông tin";
        message.style.color = "red";
        return;
    }

    // Kiểm tra định dạng email
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        message.textContent = "Email không đúng định dạng";
        message.style.color = "red";
        return;
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
        message.textContent = "Mật khẩu phải có ít nhất 6 ký tự";
        message.style.color = "red";
        return;
    }

    // // Kiểm tra mật khẩu xác nhận
    if (password === confirmPassword) {
        message.textContent = "Mật khẩu xác nhận không khớp";
        message.style.color = "red";
        return;
    }

    // Lưu tài khoản vào localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let existingUser = users.find(u => u.email === email);

    if (existingUser) {
        message.textContent = "Email đã tồn tại";
        message.style.color = "red";
        return;
    }

    // Thêm người dùng mới vào mảng và lưu vào localStorage
    users.push({ firstName, lastName, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    message.textContent = "Đăng ký thành công";
    message.style.color = "green";

    setTimeout(() => {
        window.location.href = "../pages/login.html"; // Chuyển sang trang đăng nhập
    }, 500);
  });