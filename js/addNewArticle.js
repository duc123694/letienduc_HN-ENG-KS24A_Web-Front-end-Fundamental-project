document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const title = document.getElementById("title").value.trim();
        const content = document.querySelector(".input-content").value.trim();
        const status = document.querySelector('input[name="status"]:checked');
        const moods = document.querySelectorAll('input[name="mood"]:checked');
        const imageInput = document.getElementById("image");
        const selectedImage = imageInput.files[0];
        if (!title || !content || !status) {
            Swal.fire({
                title: 'Vui lòng điền đầy đủ thông tin!',
                icon: 'error',
            });
            return;
        }
        let selectedMoods = [];
        moods.forEach((mood) => {
            const label = document.querySelector(`label[for="${mood.id}"]`);
            selectedMoods.push(label ? label.textContent.trim() : mood.id);
        });
        if (selectedImage) {
            const reader = new FileReader();
            reader.onloadend = function () {
                imageURL = reader.result;  // Lấy dữ liệu ảnh từ FileReader
                saveArticle(imageURL);
            };
            reader.readAsDataURL(selectedImage);  // Đọc file ảnh
        } else {
            saveArticle(imageURL);  // Nếu không có ảnh, sử dụng ảnh mặc định
        }
        function saveArticle(imageURL) {
            const newArticle = {
              title: title,
              content: content,
              status: status.value,
              mood: selectedMoods.join(", "),
              date: new Date().toISOString().split("T")[0],
              category: "Daily Journal", 
              image: imageURL, 
            };
            const articles = JSON.parse(localStorage.getItem("articles")) || [];
            articles.unshift(newArticle);
            localStorage.setItem("articles", JSON.stringify(articles)); // Lưu vào localStorage
            window.location.href = "../pages/index.html"; 
            form.reset();
          }
    });
});
