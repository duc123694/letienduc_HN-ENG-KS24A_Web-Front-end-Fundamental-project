document.addEventListener("DOMContentLoaded", () => {
    // Kiểm tra nếu người dùng đã đăng nhập, thì không cho phép quay lại trang đăng nhập
    if (localStorage.getItem("currentUser")) {
        window.location.href = "../pages/index.html";
    }

    // Lắng nghe sự kiện click vào nút Login
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

    // Xóa thông báo cũ trước khi kiểm tra
    message.textContent = "";

    // Lấy dữ liệu người dùng từ localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Kiểm tra xem email và mật khẩu có khớp không
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        message.textContent = "Email hoặc mật khẩu không đúng.";
        message.style.color = "red";
        return;
    }

    // Nếu thông tin hợp lệ, lưu trữ thông tin người dùng đang đăng nhập
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Hiển thị thông báo đăng nhập thành công
    message.textContent = "Đăng nhập thành công";
    message.style.color = "green";

    // Chuyển hướng người dùng đến trang chính
    setTimeout(() => {
        window.location.href = "../pages/index.html"; // Chuyển đến trang chủ
    }, 500); // Đợi 1 giây trước khi chuyển trang
};
