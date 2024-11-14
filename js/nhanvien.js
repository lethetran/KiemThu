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

function calculateAnnualTax() {
    hideAllSections();
    document.getElementById("annualTax").style.display = "block";
    const deduction = 11000000 + parseInt(document.getElementById("dependents").value) * 4400000;
    const salary = 15000000;
    const taxableIncome = (salary - deduction) * 12;
    const annualTax = taxableIncome > 0 ? taxableIncome * 0.05 : 0;
    document.getElementById("annualTaxTable").innerHTML = `
        <tr><th>Mục</th><th>Giá trị</th></tr>
        <tr><td>Thu nhập cả năm</td><td>${(salary * 12).toLocaleString()} VNĐ</td></tr>
        <tr><td>Giảm trừ cả năm</td><td>${(deduction * 12).toLocaleString()} VNĐ</td></tr>
        <tr><td>Thu nhập chịu thuế</td><td>${taxableIncome.toLocaleString()} VNĐ</td></tr>
        <tr><td>Thuế thu nhập cá nhân cả năm</td><td>${annualTax.toLocaleString()} VNĐ</td></tr>
    `;
}

function hideAllSections() {
    const sections = document.querySelectorAll(".section");
    sections.forEach(section => section.style.display = "none");
}
