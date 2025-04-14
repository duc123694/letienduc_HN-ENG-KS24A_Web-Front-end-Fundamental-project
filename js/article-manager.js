function changeStatus(selectEl) {
    const newStatus = selectEl.value;
    const statusCell = selectEl.closest("tr").querySelector("td span");
    if (statusCell) {
        statusCell.textContent = newStatus; 
        if (newStatus === "Public") {
            statusCell.classList.remove("status-private");
            statusCell.classList.add("status-public");
        } else {
            statusCell.classList.remove("status-public");
            statusCell.classList.add("status-private");
        }
        const title = selectEl.closest("tr").querySelector("td:nth-child(2)").textContent;
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        const post = posts.find(post => post.title === title);
        if (post) {
            post.status = newStatus;
            localStorage.setItem("posts", JSON.stringify(posts));
        }
    }
    const log = document.querySelector("#out");
log.addEventListener("click", function(e) {
    e.preventDefault();
    localStorage.clear();
})
}
function openModal() {
    document.getElementById("postModal").style.display = "flex";
}
function closeModal() {
    document.getElementById("postModal").style.display = "none";
}
document.getElementById("imageUpload").addEventListener("change", function () {
    const fileName = this.files[0] ? this.files[0].name : "";
    document.getElementById("fileName").textContent = fileName;
});
// Lưu bài viết vào localStorage
function addPost() {
    const title = document.querySelector("#title").value; 
    const topic = document.querySelector("#topic").value; 
    const content = document.querySelector("#center").value; 
    const status = document.querySelector('input[name="status"]:checked').value; 
    const imageUpload = document.querySelector("#imageUpload").files[0]; 
    if (title && topic && content && status) {
        const post = {
            title,
            topic,
            content,
            status,
            image: null, 
        };
        if (imageUpload) {
            const reader = new FileReader();
            reader.onload = function (e) {
                post.image = e.target.result;
                let posts = JSON.parse(localStorage.getItem("posts")) || [];
                posts.unshift(post);
                localStorage.setItem("posts", JSON.stringify(posts));
                renderPosts();
                document.getElementById("title").value = "";
                document.getElementById("topic").value = "";
                document.getElementById("center").value = "";
                document.getElementById("imageUpload").value = "";
                document.querySelector('input[name="status"][value="Public"]').checked = true; 
                document.getElementById("fileName").textContent = "";
            };
            closeModal(); 
            reader.readAsDataURL(imageUpload);
        } else {
            let posts = JSON.parse(localStorage.getItem("posts")) || [];
            posts.unshift(post);
            localStorage.setItem("posts", JSON.stringify(posts));
            renderPosts();
            document.getElementById("title").value = "";
            document.getElementById("topic").value = "";
            document.getElementById("center").value = "";
            document.getElementById("imageUpload").value = "";
            document.querySelector('input[name="status"][value="Public"]').checked = true; 
            closeModal(); 
        }
    } else {
        Swal.fire({
            title: 'Vui lòng điền đầy đủ thông tin!',
            icon: 'error',
        });
        closeModal(); 
        return;
    }
}
let currentPage = 1; 
const postsPerPage =2 ; 
function renderPosts() {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const startIdx = (currentPage - 1) * postsPerPage;
    const endIdx = startIdx + postsPerPage;
    const postsToRender = posts.slice(startIdx, endIdx);
    const table = document.getElementById("postTable");
    table.querySelector("tbody").innerHTML = "";
    postsToRender.forEach(post => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${post.image || '../assets/images/default-image.png'}" width="100px" height="70px" /></td>
            <td>${post.title}</td>
            <td>${post.topic}</td>
            <td>${post.content.substring(0, 30)}...</td>
            <td><span class="status-${post.status.toLowerCase()}">${post.status}</span></td>
            <td><select onchange="changeStatus(this)">
                <option value="Public" ${post.status === "Public" ? "selected" : ""}>Public</option>
                <option value="Private" ${post.status === "Private" ? "selected" : ""}>Private</option>
            </select></td>
            <td class ="buttons"><button class="action-btn" onclick="deleteRow(this)">Xóa</button>
                <button class="edit-btn" onclick="editPost(this)">Sửa</button></td>
        `;
        table.querySelector("tbody").appendChild(row);
    });
  updatePagination(posts.length);
}
function updatePagination(totalPosts) {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const pagiContainer = document.getElementById("paginationContainer");
    pagiContainer.innerHTML = "";
    const prevButton = document.getElementById("prevPage");
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderPosts();
        }
    });
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.classList.add("num");
        pageButton.textContent = i;
        if (i === currentPage) {
            pageButton.classList.add("active");
        }
        pageButton.addEventListener("click", () => {
            currentPage = i;
            renderPosts();
        });
        pagiContainer.appendChild(pageButton);
    }
    const nextButton = document.getElementById("nextPage");
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderPosts();
        }
    });
}
window.addEventListener('load', function () {
    renderPosts();
});
function deleteRow(buttonEl) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            const row = buttonEl.closest("tr");
            const title = row.querySelector("td:nth-child(2)").textContent;
            let posts = JSON.parse(localStorage.getItem("posts")) || [];
            posts = posts.filter(post => post.title !== title);
            localStorage.setItem("posts", JSON.stringify(posts));
            renderPosts();
            document.getElementById("fileName").textContent = ""; 
            document.getElementById("imageUpload").value = ""; 
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }
    });
}
const closes = document.getElementById("close")
closes.onclick = function () {
    document.getElementById("postModal").style.display = "none";
  };
  document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("postModal").style.display = "none"; 
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
    localStorage.clear(); 
    window.location.href = "../pages/login.html";
});

//  đóng modal trong header
const closeBtn = document.querySelector(".close-btn");
closeBtn.addEventListener("click", function () {
    document.getElementById("postModal").style.display = "none";
});
let editingPostIndex = null;

function editPost(button) {
  const row = button.closest("tr");
  editingPostIndex = row.rowIndex - 1;

  const cells = row.getElementsByTagName("td");

  const imgSrc = cells[0].querySelector("img").src;
  const title = cells[1].innerText;
  const topic = cells[2].innerText;
  const content = cells[3].innerText;
  const status = cells[4].innerText.toLowerCase();

  // Điền lại dữ liệu vào modal
  document.getElementById("title").value = title;
  document.getElementById("topic").value = topic;
  document.getElementById("center").value = content;
  document.getElementById("public").checked = status === "public";
  document.getElementById("private").checked = status === "private";
  document.getElementById("fileName").innerText = imgSrc.split("/").pop();

  // Mở modal
  openModal();

  const saveBtn = document.querySelector(".accept");
  saveBtn.textContent = "Cập nhật";
  saveBtn.onclick = updatePost;
}

function updatePost() {
  const title = document.getElementById("title").value;
  const topic = document.getElementById("topic").value;
  const content = document.getElementById("center").value;
  const status = document.querySelector('input[name="status"]:checked')?.value;

  const row = document.getElementById("postTable").rows[editingPostIndex + 1];
  const cells = row.getElementsByTagName("td");

  cells[1].innerText = title;
  cells[2].innerText = topic;
  cells[3].innerText = content;
  cells[4].innerText = status.charAt(0).toUpperCase() + status.slice(1);

  // Reset lại modal
  closeModal();
  const saveBtn = document.querySelector(".accept");
  saveBtn.textContent = "Lưu bài viết";
  saveBtn.onclick = addPost;

  Swal.fire("Cập nhật thành công!", "", "success");
}
