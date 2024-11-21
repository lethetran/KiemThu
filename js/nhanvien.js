
function logout() {
    console.log("Logging out...");
    // Xóa thông tin đăng nhập (nếu có dùng sessionStorage hoặc localStorage)
    sessionStorage.clear();
    localStorage.clear();

    // Điều hướng về trang đăng nhập hoặc hiển thị thông báo đăng xuất
    alert("Bạn đã đăng xuất thành công!");
    window.location.href = "../index.html"; // Giả sử trang đăng nhập là login.html
}

function showPersonalInfo() {
    hideAllSections();
    document.getElementById("personalInfo").style.display = "block";
}


function showSalary() {
    hideAllSections();
    document.getElementById("viewSalary").style.display = "block";
    const salary = 15000000;
    document.getElementById("salaryTable").innerHTML = `
        <tr><th>Thông tin</th><th>Giá trị</th></tr>
        <tr><td>Họ và tên</td><td>${document.getElementById("name").value}</td></tr>
        <tr><td>Chức vụ</td><td>${document.getElementById("position").value}</td></tr>
        <tr><td>Email</td><td>${document.getElementById("email").value}</td></tr>
        <tr><td>Số điện thoại</td><td>${document.getElementById("phone").value}</td></tr>
        <tr><td>Lương cơ bản</td><td>${salary.toLocaleString()} VNĐ</td></tr>
    `;
}

// Hàm để hiển thị phần tính thử thuế
function showTestThue() {
    // Ẩn các phần khác
    document.getElementById("personalInfo").style.display = "none";
    document.getElementById("viewSalary").style.display = "none";
    document.getElementById("monthlyTax").style.display = "none";
    document.getElementById("annualTax").style.display = "none";

    // Hiển thị phần tính thử thuế
    document.getElementById("taxCalculation").style.display = "block";
}

// Hàm tính thuế dựa trên lương và số người phụ thuộc
function calculateTestTax() {
    const salary = parseFloat(document.getElementById("salary").value);
    const dependents = parseInt(document.getElementById("dependent").value);

    // Kiểm tra xem lương và số người phụ thuộc có hợp lệ không
    if (isNaN(salary) || isNaN(dependents) || salary <= 0 || dependents < 0) {
        alert("Vui lòng nhập đúng số lương và số người phụ thuộc.");
        return;
    }

    // Gọi hàm tính toán thuế với các giá trị nhập vào
    const tax = calculateTax(salary, dependents);

    // Hiển thị kết quả trên bảng
    const table = document.getElementById("testTaxTable");
    table.innerHTML = `
        <tr><th>Số tiền lương</th><td>${salary.toLocaleString()} VND</td></tr>
        <tr><th>Số người phụ thuộc</th><td>${dependents}</td></tr>
        <tr><th>Thuế thu nhập phải nộp</th><td>${tax.toLocaleString()} VND</td></tr>
    `;
}

// Hàm tính toán thuế dựa trên mức giảm trừ gia cảnh và mức thuế suất
function calculateTax(salary, dependents) {
    const personalDeduction = 11000000; // Mức giảm trừ bản thân
    const dependentDeduction = 4400000; // Mức giảm trừ mỗi người phụ thuộc

    // Tính mức giảm trừ tổng cộng
    const totalDeduction = personalDeduction + dependents * dependentDeduction;

    // Tính thu nhập chịu thuế sau khi giảm trừ
    const taxableIncome = salary - totalDeduction;

    // Nếu thu nhập chịu thuế dương thì tính thuế, ngược lại thì thuế = 0
    let tax = 0;
    if (taxableIncome > 0) {
        tax = taxableIncome * 0.05; // Giả sử thuế suất là 5%
    }

    return tax;
}



function calculateMonthlyTax() {
    hideAllSections();
    document.getElementById("monthlyTax").style.display = "block";
    const deduction = 11000000 + parseInt(document.getElementById("dependents").value) * 4400000;
    const salary = 15000000;
    const taxableIncome = salary - deduction;
    const monthlyTax = taxableIncome > 0 ? taxableIncome * 0.05 : 0;
    document.getElementById("monthlyTaxTable").innerHTML = `
        <tr><th>Mục</th><th>Giá trị</th></tr>
        <tr><td>Thu nhập</td><td>${salary.toLocaleString()} VNĐ</td></tr>
        <tr><td>Giảm trừ</td><td>${deduction.toLocaleString()} VNĐ</td></tr>
        <tr><td>Thu nhập chịu thuế</td><td>${taxableIncome.toLocaleString()} VNĐ</td></tr>
        <tr><td>Thuế thu nhập cá nhân</td><td>${monthlyTax.toLocaleString()} VNĐ</td></tr>
    `;
}

// Hàm tính thuế cho từng tháng và quyết toán thuế cả năm
function calculateAnnualTax() {
    hideAllSections();
    document.getElementById("annualTax").style.display = "block";

    // Lấy thông tin cá nhân
    const name = document.getElementById("name").value;
    const position = document.getElementById("position").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const dependents = parseInt(document.getElementById("dependents").value);

    const salary = 15000000; // Giả sử lương cố định
    const deduction = 11000000 + dependents * 4400000;

    const monthlyData = [];
    let totalAnnualTax = 0;

    // Tính thuế cho từng tháng
    for (let month = 1; month <= 12; month++) {
        const taxableIncome = salary - deduction;
        const monthlyTax = taxableIncome > 0 ? taxableIncome * 0.05 : 0;

        totalAnnualTax += monthlyTax;

        monthlyData.push({
            month: month,
            salary: salary,
            deduction: deduction,
            taxableIncome: taxableIncome,
            monthlyTax: monthlyTax
        });
    }

    // Hiển thị thông tin cá nhân
    let personalInfoContent = `
        <p><strong>Họ và tên:</strong> ${name}</p>
        <p><strong>Chức vụ:</strong> ${position}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Số điện thoại:</strong> ${phone}</p>
        <p><strong>Số người phụ thuộc:</strong> ${dependents}</p>
    `;

    // Hiển thị bảng thuế hàng tháng
    let tableContent = `
        <tr><th>Tháng</th><th>Lương</th><th>Giảm trừ</th><th>Thu nhập chịu thuế</th><th>Thuế thu nhập</th></tr>
    `;
    
    monthlyData.forEach(data => {
        tableContent += `
            <tr>
                <td>${data.month}</td>
                <td>${data.salary.toLocaleString()} VNĐ</td>
                <td>${data.deduction.toLocaleString()} VNĐ</td>
                <td>${data.taxableIncome.toLocaleString()} VNĐ</td>
                <td>${data.monthlyTax.toLocaleString()} VNĐ</td>
            </tr>
        `;
    });

    // Tổng thuế
    tableContent += `
        <tr><td colspan="4">Tổng thuế thu nhập cá nhân cả năm</td><td>${totalAnnualTax.toLocaleString()} VNĐ</td></tr>
    `;

    // Chèn thông tin cá nhân và bảng thuế vào trang
    document.getElementById("annualTaxPersonalInfo").innerHTML = personalInfoContent;
    document.getElementById("annualTaxTable").innerHTML = tableContent;
}


function exportToExcel() {
    // Lấy thông tin cá nhân
    const name = document.getElementById("name").value;
    const position = document.getElementById("position").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const dependents = parseInt(document.getElementById("dependents").value);

    // Tính toán giảm trừ
    const salary = 15000000; // Lương cố định
    const deduction = 11000000 + dependents * 4400000;

    // Dữ liệu thuế mỗi tháng
    const monthlyData = [];
    let totalTax = 0; // Biến để tính tổng thuế

    for (let month = 1; month <= 12; month++) {
        const taxableIncome = salary - deduction;
        const tax = taxableIncome > 0 ? taxableIncome * 0.05 : 0;

        // Cộng dồn tổng thuế
        totalTax += tax;

        monthlyData.push({
            "Tháng": month,
            "Lương": salary,
            "Giảm trừ": deduction,
            "Thu nhập chịu thuế": taxableIncome,
            "Thuế thu nhập": tax
        });
    }

    // Dữ liệu cá nhân
    const personalInfo = [
        ["Họ và tên", name],
        ["Chức vụ", position],
        ["Email", email],
        ["Số điện thoại", phone],
        ["Số người phụ thuộc", dependents],
        []
    ];

    // Dữ liệu thuế hàng tháng
    const data = personalInfo.concat([["Mục", "Giá trị"]]).concat(monthlyData.map(item => {
        return [item["Tháng"], item["Lương"], item["Giảm trừ"], item["Thu nhập chịu thuế"], item["Thuế thu nhập"]];
    }));

    // Thêm dòng "Tổng tiền đóng"
    data.push(["", "", "", "Tổng tiền đóng", totalTax.toLocaleString() + " VNĐ"]);

    // Tạo sheet từ dữ liệu
    const ws = XLSX.utils.aoa_to_sheet(data);

    // Tạo workbook và thêm sheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Thuế nhân viên");

    // Xuất file Excel
    XLSX.writeFile(wb, "QTnhanvien.xlsx");
}

function hideAllSections() {
    const sections = document.querySelectorAll(".section");
    sections.forEach(section => section.style.display = "none");
}

