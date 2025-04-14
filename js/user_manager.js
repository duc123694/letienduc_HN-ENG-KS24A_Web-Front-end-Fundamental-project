let currentPage = 1;
const usersPerPage = 5;
const STORAGE_KEY = "userListData";
let users = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
  {
    name: "Olivia Rhye",
    username: "@olivia",
    email: "olivia@untitledui.com",
    status: "hoạt động",
    avatar: "../assets/icons/avartar4.png",
    isBlocked: false,
  },
  {
    name: "Phoenix Baker",
    username: "@phoenix",
    email: "phoenix@untitledui.com",
    status: "hoạt động",
    avatar: "../assets/icons/avartar3.png",
    isBlocked: false,
  },
];

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

// Lưu vào localStorage
function saveUsersToLocal() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}
const log = document.querySelector("#out");
log.addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "../pages/index.html";
})
function renderUsers() {
  const userList = document.getElementById("user-list");
  userList.innerHTML = "";
  const start = (currentPage - 1) * usersPerPage;
  const end = start + usersPerPage;
  const usersToRender = users.slice(start, end);
  usersToRender.forEach((user, i) => {
    const row = document.createElement("tr");
    row.classList.add("user-list");
    if (user.isBlocked) {
      row.classList.add("blocked");
    }
    const userIndex = start + i;
    row.innerHTML = `
      <td>
        <div class="center-name">
          <div>
            <img class="img-name" src="${user.avatar}" alt="" width="40px" height="40px" />
          </div>
          <div class="text-name">
            <p class="text-name1">${user.name}</p>
            <p class="text-name2">${user.username}</p>
          </div>
        </div>
      </td>
      <td>${user.isBlocked ? "Bị chặn" : "Hoạt động"}</td>
      <td class="text-name2">${user.email}</td>
      <td>
        <button class="block" onclick="blockUser(${userIndex})" ${user.isBlocked ? "disabled" : ""}>Block</button>
        <button class="unblock" onclick="unblockUser(${userIndex})" ${!user.isBlocked ? "disabled" : ""}>Unblock</button>
      </td>`;
    userList.appendChild(row);
  });

  updatePagination(users.length);
}
function blockUser(index) {
  users[index].isBlocked = true;
  saveUsersToLocal(); // lưu lại
  renderUsers();
}
function unblockUser(index) {
  users[index].isBlocked = false;
  saveUsersToLocal(); // lưu lại
  renderUsers();
}
function updatePagination(totalUsers) {
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const pagiContainer = document.getElementById("paginationContainer");
  pagiContainer.innerHTML = "";
  const prevBtn = document.getElementById("prevPage");
  prevBtn.disabled = currentPage === 1;
  prevBtn.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderUsers();
    }
  };
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.classList.add("num");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("active");
    btn.addEventListener("click", () => {
      currentPage = i;
      renderUsers();
    });
    pagiContainer.appendChild(btn);
  }
  const nextBtn = document.getElementById("nextPage");
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderUsers();
    }
  };
}
window.blockUser = blockUser;
window.unblockUser = unblockUser;
window.addEventListener("DOMContentLoaded", () => {
  renderUsers();
});
