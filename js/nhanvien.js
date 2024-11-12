function showPersonalInfo() {
    hideAllSections();
    document.getElementById("personalInfo").style.display = "block";
}

function editPersonalInfo() {
    const inputs = document.querySelectorAll('#personalInfo input');
    inputs.forEach(input => input.removeAttribute('readonly'));
    document.querySelector('#personalInfo button:nth-child(6)').style.display = 'inline';
    document.querySelector('#personalInfo button:nth-child(5)').style.display = 'none';
}

function savePersonalInfo() {
    const inputs = document.querySelectorAll('#personalInfo input');
    inputs.forEach(input => input.setAttribute('readonly', 'true'));
    document.querySelector('#personalInfo button:nth-child(6)').style.display = 'none';
    document.querySelector('#personalInfo button:nth-child(5)').style.display = 'inline';
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
