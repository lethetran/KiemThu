

function showPersonalInfo() {
    hideAllSections();
    document.getElementById("personalInfo").style.display = "block";
}


function showSalary() {
    hideAllSections();
    document.getElementById("viewSalary").style.display = "block";
    const salary = 35000000;
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
    const salary = 35000000;
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
function showEmployeeList() {
    hideAllSections();
    document.getElementById("employeeList").style.display = "block";
    
    // data nhan vien
    const employees = [
        { id: 1, name: "Nguyễn Văn A", position: "Trưởng Phòng", salary: 35000000, dependents: 0 },
        { id: 2, name: "Trần Thị B", position: "Nhân viên", salary: 10000000, dependents: 1 },
        { id: 3, name: "Lê Văn C", position: "Nhân viên", salary: 12000000, dependents: 1 },
        { id: 4, name: "Phạm Minh D", position: "Phó Phòng", salary: 16000000, dependents: 0 },
        { id: 5, name: "Hoàng Thị E", position: "Nhân viên", salary: 11000000, dependents: 2 },
        { id: 6, name: "Vũ Quốc F", position: "Phó Phòng", salary: 18000000, dependents: 1 },
        { id: 7, name: "Nguyễn Thị G", position: "Nhân viên", salary: 9500000, dependents: 1 },
        { id: 8, name: "Trương Minh H", position: "Nhân viên", salary: 13000000, dependents: 2 },
        { id: 9, name: "Bùi Thanh I", position: "Nhân viên", salary: 10500000, dependents: 2 },
        { id: 10, name: "Lê Minh J", position: "Nhân viên", salary: 13000000, dependents: 0 }
    ];

    // Define the tax calculation functions
    const personalAllowance = 11000000; // Giảm trừ bản thân
    const dependentAllowance = 4400000; // Giảm trừ cho mỗi người phụ thuộc

    // Biểu thuế lũy tiến từng phần
    const taxBrackets = [
        { threshold: 5000000, rate: 0.05 },
        { threshold: 10000000, rate: 0.1 },
        { threshold: 18000000, rate: 0.15 },
        { threshold: 32000000, rate: 0.2 },
        { threshold: 52000000, rate: 0.25 },
        { threshold: 80000000, rate: 0.3 },
        { threshold: Infinity, rate: 0.35 }
    ];

    function calculateTax(income) {
        let tax = 0;
        let previousThreshold = 0;
        
        // Calculate the tax based on tax brackets
        for (const bracket of taxBrackets) {
            if (income > previousThreshold) {
                const taxableAmount = Math.min(income, bracket.threshold) - previousThreshold;
                tax += taxableAmount * bracket.rate;
                previousThreshold = bracket.threshold;
            }
        }
        return tax;
    }

    // Populate the employee table
    const tbody = document.getElementById("employeeTable").getElementsByTagName("tbody")[0];
    tbody.innerHTML = ""; // Clear the current table rows

    employees.forEach((employee, index) => {
        const totalAllowance = personalAllowance + employee.dependents * dependentAllowance;
        const taxableIncome = employee.salary - totalAllowance;
        
        // Calculate monthly tax and annual tax
        const monthlyTax = taxableIncome > 0 ? calculateTax(taxableIncome) / 12 : 0;
        const annualTax = monthlyTax * 12;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>${employee.salary.toLocaleString()} VND</td>
            <td>${employee.dependents}</td>
            <td>${monthlyTax.toLocaleString()} VND</td>
            <td>${annualTax.toLocaleString()} VND</td>
        `;
        tbody.appendChild(row);
    });
}



// Hàm hiển thị danh sách nhân viên
function displayEmployeeList() {
    const tbody = document.getElementById("employeeTable").getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Xóa dữ liệu cũ

    employeeList.forEach((employee, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${employee.name}</td>
            <td>${employee.position}</td>
            <td>${employee.salary.toLocaleString()} VND</td>
            <td>${employee.dependents}</td>
            <td>${employee.monthlyTax.toLocaleString()} VND</td>
            <td>${employee.annualTax.toLocaleString()} VND</td>
        `;
    });
}

// Hàm xuất dữ liệu nhân viên ra file Excel
function exportEmployeeData() {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(employeeList);
    XLSX.utils.book_append_sheet(wb, ws, "Danh sách nhân viên");
    XLSX.writeFile(wb, "Danh_sach_nhan_vien.xlsx");
}

// Hàm xuất thông tin quyết toán thuế ra file Excel
function exportToExcel() {
    const annualTaxInfo = {
        name: document.getElementById("name").value,
        position: document.getElementById("position").value,
        salary: parseFloat(document.getElementById("salary").value),
        dependents: parseInt(document.getElementById("dependents").value),
        totalAnnualTax: employeeList.reduce((acc, curr) => acc + curr.annualTax, 0)
    };

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([annualTaxInfo]);
    XLSX.utils.book_append_sheet(wb, ws, "Quyết toán thuế");
    XLSX.writeFile(wb, "Quyet_toan_thue_1_nam.xlsx");
}

// Hàm hiển thị thông tin quyết toán thuế cá nhân
function displayAnnualTaxInfo() {
    const annualTaxInfoDiv = document.getElementById("annualTaxPersonalInfo");
    annualTaxInfoDiv.innerHTML = `
        <p><strong>Họ và tên:</strong> ${document.getElementById("name").value}</p>
        <p><strong>Chức vụ:</strong> ${document.getElementById("position").value}</p>
        <p><strong>Lương hàng tháng:</strong> ${document.getElementById("salary").value}</p>
        <p><strong>Số người phụ thuộc:</strong> ${document.getElementById("dependents").value}</p>
        <p><strong>Tổng thuế 1 năm:</strong> ${employeeList.reduce((acc, curr) => acc + curr.annualTax, 0).toLocaleString()} VND</p>
    `;
}
