let categories = JSON.parse(localStorage.getItem("categories")) || [];
let currentPage = 1;
const itemsPerPage = 5;
let isSearching = false;
let filteredCategories = [];

// Khi load trang
window.addEventListener("DOMContentLoaded", () => {
    renderCategories();
});
// Hàm mở dropdown menu khi click vào Avatar
document.getElementById('avatar').addEventListener('click', function (e) {
    const dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

// Hàm đóng dropdown menu khi click vào bên ngoài
document.addEventListener('click', function (e) {
    const dropdownMenu = document.getElementById('dropdown-menu');
    const avatar = document.getElementById('avatar');
    if (!dropdownMenu.contains(e.target) && e.target !== avatar) {
        dropdownMenu.style.display = 'none';
    }
});

// Đăng xuất và xóa localStorage
document.getElementById('logout').addEventListener('click', function (e) {
    e.preventDefault();
    localStorage.clear(); // Xóa tất cả dữ liệu trong localStorage
    window.location.href = "../pages/login.html"; // Điều hướng đến trang đăng nhập
});

// Thêm danh mục mới
function addCategory() {
    const input = document.getElementById("categoryInput");
    const name = input.value.trim();

    if (name === "") {
      Swal.fire({
        icon: "error",
        title: "Vui lòng nhập tên danh mục!",
      });
        return;
    }

    if (categories.some(cat => cat.toLowerCase() === name.toLowerCase())) {
      Swal.fire({
        icon: "error",
        title: "Danh mục đã tồn tại!",
      });
        return;
    }

    categories.push(name);
    localStorage.setItem("categories", JSON.stringify(categories));
    input.value = "";
    currentPage = 1;
    renderCategories();
}

// Xoá danh mục
function deleteCategory(index, isFromSearch = false) {
    if (Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    })) {
        if (isFromSearch) {
            const nameToDelete = filteredCategories[index];
            const originalIndex = categories.indexOf(nameToDelete);
            if (originalIndex !== -1) {
                categories.splice(originalIndex, 1);
            }
        } else {
            const globalIndex = (currentPage - 1) * itemsPerPage + index;
            categories.splice(globalIndex, 1);
        }

        localStorage.setItem("categories", JSON.stringify(categories));
        isSearching ? renderFilteredCategories() : renderCategories();
    }
}

function editCategory(index) {
  const globalIndex = (currentPage - 1) * itemsPerPage + index;
  const currentName = categories[globalIndex];

  const newName = prompt("Chỉnh sửa tên danh mục:", currentName);
  if (newName === null) return; // Người dùng nhấn Cancel

  const trimmedName = newName.trim();

  if (trimmedName === "") {
    Swal.fire({
      icon: "error",
      title: "Tên danh mục không được để trống!",
    });
      return;
  }

  if (categories.some((cat, i) => cat.toLowerCase() === trimmedName.toLowerCase() && i !== globalIndex)) {
    Swal.fire({
      icon: "error",
      title: "Tên danh mục đã tồn tại!",
    });
      return;
  }

  categories[globalIndex] = trimmedName;
  localStorage.setItem("categories", JSON.stringify(categories));
  renderCategories();
}

// Hiển thị danh mục (mặc định)
function renderCategories() {
    isSearching = false;
    const tableBody = document.getElementById("categoryTableBody");
    tableBody.innerHTML = "";

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const visibleCategories = categories.slice(start, end);

    visibleCategories.forEach((name, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${start + index + 1}</td>
            <td>${name}</td>
            <td>
            <button class="edit" onclick="editCategory(${index})">Edit</button>
                <button class="block" onclick="deleteCategory(${index})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    updatePagination(categories.length);
}

// Hiển thị khi tìm kiếm
function renderFilteredCategories() {
    isSearching = true;
    const tableBody = document.getElementById("categoryTableBody");
    tableBody.innerHTML = "";

    filteredCategories.forEach((name, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${name}</td>
            <td>
                <button class="block" onclick="deleteCategory(${index}, true)">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    // Ẩn phân trang khi tìm kiếm
    document.getElementById("paginationContainer").innerHTML = "";
    document.getElementById("prevPage").style.display = "none";
    document.getElementById("nextPage").style.display = "none";
}
const log = document.querySelector("#out");
log.addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "../pages/index.html";
})
// Cập nhật phân trang
function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagiContainer = document.getElementById("paginationContainer");
    pagiContainer.innerHTML = "";

    document.getElementById("prevPage").style.display = "inline-block";
    document.getElementById("nextPage").style.display = "inline-block";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.classList.add("num");
        if (i === currentPage) btn.classList.add("active");
        btn.innerText = i;
        btn.onclick = () => {
            currentPage = i;
            renderCategories();
        };
        pagiContainer.appendChild(btn);
    }

    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = currentPage === totalPages;

    document.getElementById("prevPage").onclick = () => {
        if (currentPage > 1) {
            currentPage--;
            renderCategories();
        }
    };
    document.getElementById("nextPage").onclick = () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderCategories();
        }
    };
}

// Tìm kiếm danh mục
document.getElementById("search").addEventListener("input", function () {
    const keyword = this.value.trim().toLowerCase();
    if (keyword === "") {
        isSearching = false;
        renderCategories();
        return;
    }

    filteredCategories = categories.filter(cat => cat.toLowerCase().includes(keyword));
    renderFilteredCategories();
});
