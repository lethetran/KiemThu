// File: ../js/ketoan.js

document.addEventListener("DOMContentLoaded", function () {
    // Functions to show different sections
    function showPersonalInfo() {
        hideAllSections();
        document.getElementById("personalInfo").style.display = "block";
    }

    function showTaxSettings() {
        hideAllSections();
        document.getElementById("taxSettings").style.display = "block";
    }

    function calculatePersonalTax() {
        hideAllSections();
        document.getElementById("personalTax").style.display = "block";
    }

    function calculateMonthlyTax() {
        hideAllSections();
        document.getElementById("monthlyTax").style.display = "block";
    }

    function calculateAnnualTax() {
        hideAllSections();
        document.getElementById("annualTax").style.display = "block";
    }

    function manageDepartments() {
        hideAllSections();
        document.getElementById("departmentManagement").style.display = "block";
        loadDepartments();
    }

    function manageEmployees() {
        hideAllSections();
        document.getElementById("employeeManagement").style.display = "block";
        loadEmployees();
    }

    function hideAllSections() {
        let sections = document.querySelectorAll(".section");
        sections.forEach(section => section.style.display = "none");
    }

    // Bind functions to buttons
    document.querySelector("button[onclick='showPersonalInfo()']").addEventListener("click", showPersonalInfo);
    document.querySelector("button[onclick='showTaxSettings()']").addEventListener("click", showTaxSettings);
    document.querySelector("button[onclick='calculatePersonalTax()']").addEventListener("click", calculatePersonalTax);
    document.querySelector("button[onclick='calculateMonthlyTax()']").addEventListener("click", calculateMonthlyTax);
    document.querySelector("button[onclick='calculateAnnualTax()']").addEventListener("click", calculateAnnualTax);
    document.querySelector("button[onclick='manageDepartments()']").addEventListener("click", manageDepartments);
    document.querySelector("button[onclick='manageEmployees()']").addEventListener("click", manageEmployees);

    // Function to save tax settings
    function saveTaxSettings() {
        let taxDeduction = document.getElementById("taxDeduction").value;
        let dependentDeduction = document.getElementById("dependentDeduction").value;
        // Save these settings to localStorage or send to server
        localStorage.setItem("taxDeduction", taxDeduction);
        localStorage.setItem("dependentDeduction", dependentDeduction);
        alert("Thiết lập mức giảm trừ đã được lưu!");
    }
    document.querySelector("button[onclick='saveTaxSettings()']").addEventListener("click", saveTaxSettings);

    // Function to calculate personal income tax
    function calculateTestTax() {
        let salary = document.getElementById("salary").value;
        let dependents = document.getElementById("dependents").value;
        // Perform tax calculation logic here
        let taxDeduction = localStorage.getItem("taxDeduction") || 9000000; // Default value
        let dependentDeduction = localStorage.getItem("dependentDeduction") || 3600000; // Default value
        let taxableIncome = salary - taxDeduction - (dependents * dependentDeduction);
        let tax = taxableIncome > 0 ? taxableIncome * 0.1 : 0; // Example tax calculation
        let table = document.getElementById("personalTaxTable");
        table.innerHTML = `<tr><td>Thuế thu nhập cá nhân:</td><td>${tax}</td></tr>`;
    }
    document.querySelector("button[onclick='calculateTestTax()']").addEventListener("click", calculateTestTax);

    // Function to add department
    function addDepartment() {
        let departmentName = document.getElementById("departmentName").value;
        // Add department logic here
        let table = document.getElementById("departmentTable").getElementsByTagName("tbody")[0];
        let newRow = table.insertRow();
        newRow.innerHTML = `<tr>
            <td>${table.rows.length + 1}</td>
            <td>${departmentName}</td>
            <td>0</td>
        </tr>`;
        alert("Phòng ban đã được thêm!");
    }
    document.querySelector("button[onclick='addDepartment()']").addEventListener("click", addDepartment);

    // Function to load departments
    function loadDepartments() {
        // Load departments logic here (example static data)
        let departments = [
            { name: "Phòng Kế Toán", numberOfEmployees: 5 },
            { name: "Phòng Nhân Sự", numberOfEmployees: 3 },
            { name: "Phòng Truyền Thông", numberOfEmployees: 4}
        ];
        let table = document.getElementById("departmentTable").getElementsByTagName("tbody")[0];
        table.innerHTML = "";
        departments.forEach((dept, index) => {
            let newRow = table.insertRow();
            newRow.innerHTML = `<tr>
                <td>${index + 1}</td>
                <td>${dept.name}</td>
                <td>${dept.numberOfEmployees}</td>
            </tr>`;
        });
    }

    // Function to load employees
    function loadEmployees() {
        // Load employees logic here (example static data)
        let employees = [
            { name: "Nguyễn Văn A", position: "Nhân viên", salary: 15000000, dependents: 2, monthlyTax: 500000, annualTax: 6000000 },
            { name: "Trần Thị B", position: "Trưởng phòng", salary: 20000000, dependents: 1, monthlyTax: 1000000, annualTax: 12000000 }
        ];
        let table = document.getElementById("employeeTable").getElementsByTagName("tbody")[0];
        table.innerHTML = "";
        employees.forEach((emp, index) => {
            let newRow = table.insertRow();
            newRow.innerHTML = `<tr>
                <td>${index + 1}</td>
                <td>${emp.name}</td>
                <td>${emp.position}</td>
                <td>${emp.salary}</td>
                <td>${emp.dependents}</td>
                <td>${emp.monthlyTax}</td>
                <td>${emp.annualTax}</td>
            </tr>`;
        });
    }

    // Function to export employee data to Excel
    function exportEmployeeData() {
        let employeeData = [
            ["STT", "Họ và tên", "Chức vụ", "Lương", "Số người phụ thuộc", "Thuế 1 tháng", "Thuế 1 năm"]
        ];
        let tableRows = document.querySelectorAll("#employeeTable tbody tr");
        tableRows.forEach((row, index) => {
            let rowData = [];
            row.querySelectorAll("td").forEach(td => rowData.push(td.textContent));
            employeeData.push(rowData);
        });
        let wb = XLSX.utils.book_new();
        let ws = XLSX.utils.aoa_to_sheet(employeeData);
        XLSX.utils.book_append_sheet(wb, ws, "Employee Data");
        XLSX.writeFile(wb, "EmployeeData.xlsx");
    }
    document.querySelector("button[onclick='exportEmployeeData()']").addEventListener("click", exportEmployeeData);

    // Function to export annual tax data to Excel
    function exportToExcel() {
        // Logic to export annual tax data to Excel
        alert("Dữ liệu thuế đã được xuất ra file Excel!");
    }
    document.querySelector("button[onclick='exportToExcel()']").addEventListener("click", exportToExcel);

    // Initialize by loading default section
    showPersonalInfo();
});
