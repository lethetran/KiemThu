function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // URL trỏ đến file Excel trên server
  const url = '../excel_data/data_tt.xlsx';

  fetch(url)
    .then(response => response.arrayBuffer())
    .then(data => {
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]]; // Đọc sheet đầu tiên
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Sử dụng header: 1 để lấy mảng 2D, không sử dụng tiêu đề cột

      let found = false;
      for (let i = 1; i < jsonData.length; i++) {  // Bắt đầu từ dòng thứ 2 (vì dòng đầu là header)
        const row = jsonData[i];
        const rowUsername = row[0];  // Cột A là username (index 0)
        const rowPassword = row[7];  // Cột H là pass (index 7)
        const rowPosition = row[2];  // Cột C là chức vụ (index 2)

        // So sánh username và password, đảm bảo kiểu dữ liệu giống nhau
        if (String(rowUsername) === String(username) && String(rowPassword) === String(password)) {
          found = true;
          // Chuyển hướng đến trang tương ứng với chức vụ
          if (rowPosition === "Nhân viên") {
            window.location.href = "html/nhanvien.html";
          } else if (rowPosition === "Kế toán") {
            window.location.href = "html/ketoan.html";
          } else if (rowPosition === "Trưởng phòng") {
            window.location.href = "html/truongphong.html";
          }
          break;
        }
      }

      if (!found) {
        alert("Tài khoản hoặc mật khẩu không chính xác.");
      }
    })
    .catch(error => console.error('Lỗi khi xử lý file Excel:', error));
}
