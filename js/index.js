document.addEventListener("DOMContentLoaded", () => {
    const avatar = document.getElementById("avatar");
    const dropdownMenu = document.getElementById("dropdown-menu");
    const logoutButton = document.getElementById("logout");
    const register = document.getElementById("register");
    const account = document.getElementById("account");
    const currentUser = localStorage.getItem("currentUser"); 
    if (currentUser) {
        register.style.display = "none";
        account.style.display = "none";
        avatar.style.display = "inline-block"; 
        avatar.addEventListener("click", () => {
            if (dropdownMenu.style.display === "block") {
                dropdownMenu.style.display = "none";
              } else {
                dropdownMenu.style.display = "block";
              }
              
        });
        // Đăng xuất khi người dùng nhấn "Log Out"
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("currentUser"); 
            avatar.style.display = "none"; 
            register.style.display = "inline-block"; 
            account.style.display = "inline-block"; 
            dropdownMenu.style.display = "none"; 
            window.location.reload(); 
        });
    } else {
        register.style.display = "inline-block";
        account.style.display = "inline-block";
        avatar.style.display = "none"; 
    }
    const postsContainer = document.getElementById("postsContainer");
    const paginationContainer = document.getElementById("paginationContainer");
    const prevButton = document.getElementById("prevPage");
    const nextButton = document.getElementById("nextPage");
    const fixedPosts = [
        {
            imgSrc: "../assets/images/Image1-article.png",
            date: "2025-02-25",
            title: "A Productive Day at Work",
            description: "Today was a really productive day at work. I managed to finish a report ahead of schedule and received positive feedback from my manager.",
            badge: "Daily Journal"
        },
        {
            imgSrc: "../assets/images/imge2-article.png",
            date: "2025-02-24",
            title: "My First Job Interview ",
            description: "I had my first job interview today! I was nervous at first, but as the conversation went on, I felt more confident. ",
            badge: "Work & Career"
        },
        {
            imgSrc: "../assets/images/imge3-article.png",
            date: "2025-02-23",
            title: "Overthinking Everything",
            description: "Lately, I have been overthinking everything, from small decisions to bigger life choices.I know I should trust myself.",
            badge: "Personal Thoughts"
        },
        {
            imgSrc: "../assets/images/Image4-article.png",
            date: "2025-02-16",
            title: "How collaboration makes us better designers",
            description: "Collaboration can make our teams stronger, and our individual designs better.",
            badge: "Work & Career"
        },
        {
            imgSrc: "../assets/images/Image5-article.png",
            date: "2025-02-15",
            title: "Our top 10 Javascript frameworks to use",
            description: "JavaScript frameworks make development easy with extensive features and functionalities.",
            badge: "Work & Career"
        },
        {
            imgSrc: "../assets/images/Image6-article.png",
            date: "2025-02-05",
            title: "Podcast: Creating a better CX Community",
            description: "Starting a community doesn’t need to be complicated, but how do you get started?",
            badge: "Emotions & Feelings"
        }
    ];

    const storedPosts = JSON.parse(localStorage.getItem("articles")) || [];
    //  Trộn bài viết fix cứng và dynamic
    const combinedPosts = [
        ...fixedPosts.map(post => ({
            imgSrc: post.imgSrc,
            date: post.date,
            title: post.title,
            description: post.description,
            badge: post.badge,
            isFixed: true 
        })),
        ...storedPosts.map(post => ({
            imgSrc: post.image || "../assets/images/default-article.png",
            date: post.date,
            title: post.title,
            description: post.content,
            badge: post.category,
            isFixed: false
        }))
    ];

    let currentPage = 1;
    const postsPerPage = 6;
    function renderPosts() {
        const start = (currentPage - 1) * postsPerPage;
        const end = start + postsPerPage;
        const postsToDisplay = combinedPosts.slice(start, end);
        postsContainer.innerHTML = ""; // Xóa toàn bộ
        postsToDisplay.forEach(post => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerHTML = `
                <img src="${post.imgSrc}" alt="Post Image" width="384px" height="240px"/>
                <p class="date">${post.date}</p>
                <div class="title-imgs">
                    <h4 class="small-title">${post.title}</h4>
                    <a href="../pages/entries_manager.html">
                        <img src="../assets/icons/Icon wrap.png" alt="Edit Icon" width="24px" height="28px"/>
                    </a>
                </div>
                <p class="texts">${post.description}</p>
                <p class="badge">${post.badge}</p>`;
            postsContainer.appendChild(postElement);
        });
        updatePagination();
    }
    function updatePagination() {
        paginationContainer.innerHTML = "";
        const totalPages = Math.ceil(combinedPosts.length / postsPerPage);
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;

        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement("button");
            btn.classList.add("num");
            btn.textContent = i;
            if (i === currentPage) {
                btn.classList.add("active");
            }    
            btn.addEventListener("click", () => {
                currentPage = i;
                renderPosts();
            });
            paginationContainer.appendChild(btn);
        }
    }
    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderPosts();
        }
    });
    nextButton.addEventListener("click", () => {
        const totalPages = Math.ceil(combinedPosts.length / postsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderPosts();
        }
    });
    renderPosts();
});
