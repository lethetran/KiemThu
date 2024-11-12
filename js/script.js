function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    if (username === "nhanvien" && password === "123") {
      window.location.href = "html/nhanvien.html";
    } else if (username === "ketoan" && password === "123") {
      window.location.href = "html/ketoan.html";
    } else if (username === "truongphong" && password === "123") {
      window.location.href = "html/truongphong.html";
    } else {
      alert("Tài khoản hoặc mật khẩu không chính xác.");
    }
  }
  