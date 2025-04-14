document.addEventListener('DOMContentLoaded', function () {
  const showViewButton = document.querySelector(".show");
  const commentsContainer = document.querySelector(".comments-container");
  const addCommentBtn = document.getElementById("addCommentBtn");
  const commentInput = document.getElementById("commentInput");
  const addComment = document.querySelector(".add-comment"); 
  const showComment = document.querySelector(".showComment");


  let savedComments = JSON.parse(localStorage.getItem("comments")) || [];
  savedComments.forEach(commentText => {
    const commentElement = createCommentElement(commentText);
    commentsContainer.appendChild(commentElement);
  });

  // Toggle hiển thị/ẩn tất cả bình luận
  showViewButton.addEventListener("click", function () {
    const allComments = document.querySelectorAll(".viewComment");
    let isVisible = false;

    allComments.forEach(comment => {
      if (comment.style.display !== "none") {
        isVisible = true;
      }
    });

    allComments.forEach(comment => {
      if (isVisible) {
        comment.style.display = "none";
      } else {
        comment.style.display = "flex";
      }
    });

    if (isVisible) {
      showViewButton.innerHTML = "&or;";
    } else {
      showViewButton.innerHTML = "&and;";
    }
  });

  showComment?.addEventListener("click", function () {
    if (addComment.style.display === "block") {
      addComment.style.display = "none";
    } else {
      addComment.style.display = "block";
    }
  });

  // Thêm sự kiện xoá cho bình luận
  const defaultDeleteBtn = document.querySelector(".viewComment .delete-btn");
  if (defaultDeleteBtn) {
    defaultDeleteBtn.addEventListener("click", function () {
      const commentElement = defaultDeleteBtn.closest(".viewComment");
      if (commentElement) {
        commentElement.remove();
      }
    });
  }

  // Xử lý thêm bình luận mới
  addCommentBtn.addEventListener('click', () => {
    const commentText = commentInput.value.trim();
    if (commentText === "") return;

    const commentElement = createCommentElement(commentText);
    commentsContainer.appendChild(commentElement);
    commentInput.value = '';
    commentsContainer.style.display = "block";
    updateReplyCount();


    // Lưu vào localStorage
    savedComments.push(commentText);
    localStorage.setItem("comments", JSON.stringify(savedComments));
  });

  // Hàm tạo 1 comment element
  function createCommentElement(commentText) {
    const commentElement = document.createElement('div');
    commentElement.className = 'viewComment';
    commentElement.style.display = "none";

    commentElement.innerHTML = `
      <div>
        <img src="../assets/icons/Avatar1.png" alt="" width="32px" height="32px" />
      </div>
      <div class="container">
        <p class="text-comment">${commentText}</p>
        <div class="post-actions">
          <span>0 Likes <img src="../assets/icons/like.png" alt="" width="16px" height="16px" /></span>
          <span class="comment">0 Replies <img src="../assets/icons/comment.png" alt="" width="16px" height="16px" /></span>
          <button class="delete-btn">Xoá</button>
        </div>
      </div>
    `;

 
    const deleteBtn = commentElement.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function () {
      commentElement.remove();
      savedComments = savedComments.filter(comment => comment !== commentText);
      localStorage.setItem("comments", JSON.stringify(savedComments));
    });

    return commentElement;
  }

const likeBtn = document.querySelector(".like-btn");

let liked = false; 

if (likeBtn) {
  likeBtn.addEventListener("click", function () {
    const text = likeBtn.textContent.trim();
    const currentLikes = parseInt(text.split(" ")[0]) || 0;

    let newLikes;
    if (!liked) {
      newLikes = currentLikes + 1;
      liked = true;
      likeBtn.classList.add("liked");
    } else {
      newLikes = currentLikes - 1;
      liked = false;
      likeBtn.classList.remove("liked");
    }
    

    likeBtn.innerHTML = `${newLikes} Likes <img src="../assets/icons/like.png" alt="" width="16px" height="16px" />`;
  });
}

const replyCountSpan = document.querySelector(".comment-count");

function updateReplyCount(increase = 1) {
  if (replyCountSpan) {
    const text = replyCountSpan.textContent.trim();
    const currentCount = parseInt(text.split(" ")[0]) || 0;
    const newCount = currentCount + increase;
    replyCountSpan.innerHTML = `${newCount} Replies <img src="../assets/icons/comment.png" alt="" width="16px" height="16px" />`;
  }
}

});
