function changeStatus(selectEl) {
    const newStatus = selectEl.value;
    const statusCell = selectEl.closest("tr").querySelector("td span"); // Tìm phần tử status trong dòng hiện tại.

    if (statusCell) {
        statusCell.textContent = newStatus; // Cập nhật trạng thái mới.

        // Thêm hoặc xóa lớp CSS tương ứng với trạng thái
        if (newStatus === "Public") {
            statusCell.classList.remove("status-private");
            statusCell.classList.add("status-public");
        } else {
            statusCell.classList.remove("status-public");
            statusCell.classList.add("status-private");
        }
    }
}

function deleteRow(buttonEl) {
    // Hiển thị hộp thoại xác nhận trước khi xóa
    if (confirm("Bạn có chắc muốn xóa bài viết này không?")) {
        const row = buttonEl.closest("tr"); // Tìm dòng chứa nút bấm xóa
        if (row) {
            row.remove(); // Xóa dòng
        }
    }
}
