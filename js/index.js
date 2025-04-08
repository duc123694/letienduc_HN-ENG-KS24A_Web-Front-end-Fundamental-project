document.addEventListener("DOMContentLoaded", () => {
    const avatar = document.getElementById("avatar");
    const dropdownMenu = document.getElementById("dropdown-menu");
    const logoutButton = document.getElementById("logout");

    const register = document.getElementById("register");
    const account = document.getElementById("account");
    
    // Kiểm tra nếu người dùng đã đăng nhập
    const currentUser = localStorage.getItem("currentUser");
  
    if (currentUser) {
        // Ẩn mục đăng ký và đăng nhập nếu người dùng đã đăng nhập
        register.style.display = "none";
        account.style.display = "none";
        
        // Hiển thị ảnh đại diện và thông tin cá nhân khi người dùng đã đăng nhập
        avatar.style.display = "inline-block";  // Hiển thị avatar
  
        // Hiển thị menu khi người dùng nhấn vào ảnh đại diện
        avatar.addEventListener("click", () => {
            // Chuyển trạng thái hiển thị của menu
            dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
        });
  
        // Đăng xuất khi người dùng nhấn "Log Out"
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("currentUser"); // Xóa dữ liệu đăng nhập
            avatar.style.display = "none"; // Ẩn avatar khi đăng xuất
            register.style.display = "inline-block"; // Hiển thị lại nút đăng ký
            account.style.display = "inline-block"; // Hiển thị lại nút đăng nhập
            dropdownMenu.style.display = "none"; // Ẩn menu khi đăng xuất
            window.location.reload(); // Tải lại trang để làm mới trạng thái
        });
    } else {
        // Nếu người dùng chưa đăng nhập, hiển thị nút đăng ký và đăng nhập
        register.style.display = "inline-block";
        account.style.display = "inline-block";
        avatar.style.display = "none"; // Ẩn avatar nếu chưa đăng nhập
    }
});
