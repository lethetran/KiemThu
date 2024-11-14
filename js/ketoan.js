function showPersonalInfo() {
    hideAllSections();
    document.getElementById("personalInfo").style.display = "block";
}

function showSetReduction() {
    hideAllSections();
    document.getElementById("setReduction").style.display = "block";
}

function showEmployeeTax() {
    hideAllSections();
    document.getElementById("employeeTax").style.display = "block";
}

function showManageDepartments() {
    hideAllSections();
    document.getElementById("manageDepartments").style.display = "block";
}

function showManageEmployees() {
    hideAllSections();
    document.getElementById("manageEmployees").style.display = "block";
}

// Function to save the reduction amount with employee information
function saveReduction() {
    const employeeName = document.getElementById("employeeName").value;
    const department = document.getElementById("department").value;
    const employeeId = document.getElementById("employeeId").value;
    const reductionAmount = parseFloat(document.getElementById("reductionAmount").value);

    if (!employeeName || !department || !employeeId || isNaN(reductionAmount) || reductionAmount < 0) {
        alert("Vui lòng nhập đầy đủ và hợp lệ thông tin.");
        return;
    }

    alert(`Mức giảm trừ đã được lưu cho nhân viên ${employeeName}, Phòng ban: ${department}, ID: ${employeeId}, Mức giảm trừ: ${reductionAmount.toLocaleString()} VNĐ`);
}

// Function to display employee tax information based on ID
function viewEmployeeTax() {
    const employeeId = document.getElementById("searchEmployeeId").value;
    
    if (!employeeId) {
        alert("Vui lòng nhập ID nhân viên.");
        return;
    }

    // Example logic to retrieve employee information
    // Replace this with actual data fetching logic
    const employee = {
        id: employeeId,
        name: "Nguyễn Văn B",
        department: "Kế toán",
        salary: 15000000,
        reduction: 5000000,
        taxableIncome: 10000000,
        tax: 500000
    };

    if (employee) {
        const table = document.getElementById("employeeTaxTable");
        table.innerHTML = `
            <tr><th>Mục</th><th>Giá trị</th></tr>
            <tr><td>ID</td><td>${employee.id}</td></tr>
            <tr><td>Tên nhân viên</td><td>${employee.name}</td></tr>
            <tr><td>Phòng ban</td><td>${employee.department}</td></tr>
            <tr><td>Lương</td><td>${employee.salary.toLocaleString()} VNĐ</td></tr>
            <tr><td>Giảm trừ</td><td>${employee.reduction.toLocaleString()} VNĐ</td></tr>
            <tr><td>Thu nhập chịu thuế</td><td>${employee.taxableIncome.toLocaleString()} VNĐ</td></tr>
            <tr><td>Thuế thu nhập cá nhân</td><td>${employee.tax.toLocaleString()} VNĐ</td></tr>
        `;
    } else {
        alert("Không tìm thấy nhân viên với ID này.");
    }
}

function addDepartment() {
    const departmentName = document.getElementById("departmentName").value;
    if (!departmentName) {
        alert("Vui lòng nhập tên phòng ban.");
        return;
    }
    const departmentsTable = document.getElementById("departmentsTable");
    departmentsTable.innerHTML += `
        <tr>
            <td>${departmentName}</td>
            <td><button onclick="deleteDepartment(this)">Xóa</button></td>
        </tr>
    `;
    document.getElementById("departmentName").value = "";
}

function deleteDepartment(button) {
    const row = button.closest("tr");
    row.remove();
}

function addEmployee() {
    const employeeName = document.getElementById("employeeName").value;
    const employeeContact = document.getElementById("employeeContact").value;
    const employeeSalary = parseFloat(document.getElementById("employeeSalary").value);

    if (!employeeName || !employeeContact || isNaN(employeeSalary) || employeeSalary <= 0) {
        alert("Vui lòng nhập đầy đủ thông tin nhân viên.");
        return;
    }

    const employeesTable = document.getElementById("employeesTable");
    employeesTable.innerHTML += `
        <tr>
            <td>${employeeName}</td>
            <td>${employeeContact}</td>
            <td>${employeeSalary.toLocaleString()} VNĐ</td>
            <td><button onclick="deleteEmployee(this)">Xóa</button></td>
        </tr>
    `;

    document.getElementById("employeeName").value = "";
    document.getElementById("employeeContact").value = "";
    document.getElementById("employeeSalary").value = "";
}

function deleteEmployee(button) {
    const row = button.closest("tr");
    row.remove();
}

function exportToExcel() {
    const name = document.getElementById("name").value;
    const position = document.getElementById("position").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const dependents = parseInt(document.getElementById("dependents").value);

    const salary = 15000000;
    const deduction = 11000000 + dependents * 4400000;

    const monthlyData = [];
    let totalTax = 0;

    for (let month = 1; month <= 12; month++) {
        const taxableIncome = salary - deduction;
        const tax = taxableIncome > 0 ? taxableIncome * 0.05 : 0;
        totalTax += tax;
        monthlyData.push({ month, salary, deduction, taxableIncome, tax });
    }

    const personalInfo = [
        ["Họ và tên", name],
        ["Chức vụ", position],
        ["Email", email],
        ["Số điện thoại", phone],
        ["Số người phụ thuộc", dependents],
        []
    ];

    const data = personalInfo.concat([["Tháng", "Lương", "Giảm trừ", "Thu nhập chịu thuế", "Thuế thu nhập"]])
        .concat(monthlyData.map(item => [item.month, item.salary, item.deduction, item.taxableIncome, item.tax]));
    data.push(["", "", "", "Tổng tiền đóng", totalTax.toLocaleString() + " VNĐ"]);

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Thuế kế toán");

    XLSX.writeFile(wb, "QTketoan.xlsx");
}

function hideAllSections() {
    const sections = document.querySelectorAll(".section");
    sections.forEach(section => section.style.display = "none");
}
