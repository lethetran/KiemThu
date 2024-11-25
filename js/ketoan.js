
// Hiển thị dữ liệu người dùng khi tải trang
window.onload = function () {
    const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (!user) {
        alert("Bạn chưa đăng nhập!");
        window.location.href = "../index.html";
        return;
    }

    // Hiển thị thông tin trong phần thông tin cá nhân
    document.getElementById("name").value = user.name || "";
    document.getElementById("position").value = user.position || "";
    document.getElementById("email").value = user.email || "";
    document.getElementById("phone").value = user.phone || "";
    document.getElementById("dependents").value = user.dependents || "";
    document.getElementById("salary").value = user.salary || "";

    // Cập nhật vai trò trong tiêu đề
    document.getElementById("user-role").innerHTML = `${user.position}: <strong>${user.name}</strong>`;
};

// Chuyển đổi giữa các phần
function showPersonalInfo() {
    toggleSection("personalInfo");
}

function showTestThue() {
    toggleSection("taxCalculation");
}

function showSetReduction() {
    toggleSection("setReduction");
}

function showMonthlyTax() {
    toggleSection("monthlyTax");
    calculateMonthlyTax();
}

function showAnnualTax() {
    toggleSection("annualTax");
    calculateAnnualTax();
}
function showEmployeeTax() {
    toggleSection("employeeTax");
}

function showEmployeeList() {
    toggleSection("employeeList");
    employeeList();
}

function toggleSection(sectionId) {
    const sections = document.querySelectorAll(".section");
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? "block" : "none";
    });
}

// Đăng xuất
function logout() {
    sessionStorage.clear();
    window.location.href = "../index.html";
}
//xem thuế nhân viên
function viewEmployeeTax() {
    const IDuser = parseInt(document.getElementById("searchEmployeeId").value); // Lấy ID nhân viên từ input
    const url = '../excel_data/data_tt.xlsx';
    fetch(url)
        .then(response => response.arrayBuffer())  // Lấy dữ liệu tệp Excel dưới dạng binary array
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });  // Đọc dữ liệu tệp Excel
            const sheet = workbook.Sheets[workbook.SheetNames[0]];  // Lấy bảng đầu tiên trong tệp
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Chuyển đổi bảng Excel thành mảng dữ liệu 2D

            // Biến lưu thông tin nhân viên và thuế
            let employee = null;
            let tax = 0;

            // Duyệt qua từng nhân viên và tính thuế
            for (let i = 1; i < jsonData.length; i++) {  // Bắt đầu từ hàng thứ 2 (hàng đầu là tiêu đề)
                const row = jsonData[i];  // Mỗi dòng dữ liệu của nhân viên
                const id = parseInt(row[0]);  // Cột A là ID nhân viên

                if (id === IDuser) {
                    // Lưu thông tin nhân viên khi tìm thấy ID
                    const name = row[1];  // Cột B là tên nhân viên
                    const position = row[2];  // Cột C là chức vụ
                    const email = row[5];  // Cột F là email
                    const phone = row[4];  // Cột E là số điện thoại
                    const salary = row[3];  // Cột D là lương hàng tháng
                    const dependents = row[6];  // Cột G là số người phụ thuộc

                    // Tính thuế thu nhập cá nhân (theo biểu thuế lũy tiến)
                    const exemptionForSelf = 11000000; // Giảm trừ gia cảnh cho bản thân (11 triệu đồng)
                    const exemptionPerDependent = 4400000; // Giảm trừ cho mỗi người phụ thuộc (4 triệu đồng)

                    // Tính tổng giảm trừ và thu nhập tính thuế
                    const totalExemption = exemptionForSelf + (exemptionPerDependent * dependents);
                    const taxableIncome = salary - totalExemption;

                    if(taxableIncome <= 0) {
                        tax = 0;  // Không phải nộp thuế nếu thu nhập âm hoặc bằng 0
                    } else {
                        // Áp dụng biểu thuế lũy tiến để tính thuế
                        if (taxableIncome <= 5000000) {
                            tax = taxableIncome * 0.05;  // Thuế suất 5% nếu thu nhập dưới 5 triệu
                        } else if (taxableIncome <= 10000000) {
                            tax = taxableIncome * 0.1 - 250000;  // Thuế suất 10% nếu thu nhập từ 5 triệu đến 10 triệu
                        } else if (taxableIncome <= 18000000) {
                            tax = taxableIncome * 0.15 - 750000;  // Thuế suất 15% nếu thu nhập từ 10 triệu đến 18 triệu
                        } else if (taxableIncome <= 32000000) {
                            tax = taxableIncome * 0.2 - 1650000;  // Thuế suất 20% nếu thu nhập từ 18 triệu đến 32 triệu
                        } else if (taxableIncome <= 52000000) {
                            tax = taxableIncome * 0.25 - 3250000;  // Thuế suất 25% nếu thu nhập từ 32 triệu đến 52 triệu
                        } else if (taxableIncome <= 80000000) {
                            tax = taxableIncome * 0.3 - 5850000;  // Thuế suất 30% nếu thu nhập từ 52 triệu đến 80 triệu
                        } else {
                            tax = taxableIncome * 0.35 - 9850000;  // Thuế suất 35% nếu thu nhập trên 80 triệu
                        }
                    }

                    // Lưu thông tin nhân viên tìm thấy
                    employee = { name, position, salary, phone, email, dependents };
                    break;  // Dừng lại khi tìm thấy nhân viên
                }
            }

            if (employee) {
                // Hiển thị thông tin nhân viên và thuế lên giao diện
                document.getElementById("employeeTaxTable").innerHTML = `
                    <h3>Thông tin nhân viên</h3>
                    <table class="output-table">
                        <tr>
                            <th>ID</th>
                            <td>${IDuser}</td>
                        </tr>
                        <tr>
                            <th>Họ tên</th>
                            <td>${employee.name}</td>
                        </tr>
                        <tr>
                            <th>Chức vụ</th>
                            <td>${employee.position}</td>
                        </tr>
                        <tr>
                            <th>Lương</th>
                            <td>${employee.salary}</td>
                        </tr>
                        <tr>
                            <th>Số điện thoại</th>
                            <td>${employee.phone}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>${employee.email}</td>
                        </tr>
                        <tr>
                            <th>Người phụ thuộc</th>
                            <td>${employee.dependents}</td>
                        </tr>
                        <tr>
                            <th>Thuế thu nhập cá nhân</th>
                            <td>${tax.toFixed(2)} VND</td>
                        </tr>
                    </table>
                `;
            } else {
                alert('Không tìm thấy nhân viên với mã ID này!');
            }

        })
        .catch(error => {
            console.error('Error loading Excel file:', error);  // Xử lý lỗi nếu có khi đọc tệp Excel
        });
}

function calculateTestTax() {
    const salary = parseFloat(document.getElementById("salary1").value);
    const dependents = parseInt(document.getElementById("dependent1").value);

    if (isNaN(salary) || isNaN(dependents)) {
        alert("Vui lòng nhập đầy đủ và chính xác thông tin!");
        return;
    }

    const exemptionForSelf = 11000000; // Giảm trừ gia cảnh cho bản thân
    const exemptionPerDependent = 4400000; // Giảm trừ cho mỗi người phụ thuộc

    // Tính thu nhập chịu thuế
    const totalExemption = exemptionForSelf + (exemptionPerDependent * dependents);
    const taxableIncome = salary - totalExemption;

    if (taxableIncome <= 0) {
        alert("Thu nhập không đủ để tính thuế.");
        return;
    }

    // Khai báo các mức thuế lũy tiến theo Cách 2
    let taxAmount = 0;

    if (taxableIncome <= 5000000) {
        taxAmount = taxableIncome * 0.05;
    } else if (taxableIncome <= 10000000) {
        taxAmount = taxableIncome * 0.1 - 250000;
    } else if (taxableIncome <= 18000000) {
        taxAmount = taxableIncome * 0.15 - 750000;
    } else if (taxableIncome <= 32000000) {
        taxAmount = taxableIncome * 0.2 - 1650000;
    } else if (taxableIncome <= 52000000) {
        taxAmount = taxableIncome * 0.25 - 3250000;
    } else if (taxableIncome <= 80000000) {
        taxAmount = taxableIncome * 0.3 - 5850000;
    } else {
        taxAmount = taxableIncome * 0.35 - 9850000;
    }

    // Hiển thị kết quả
    const resultTable = document.getElementById("testTaxTable");
    resultTable.innerHTML = `
    <tr>
        <th>Lương hàng tháng</th>
        <th>Số người phụ thuộc</th>
        <th>Thuế thu nhập cá nhân</th>
    </tr>
    <tr>
        <td>${salary.toFixed(2)} VND</td>
        <td>${dependents}</td>
        <td>${taxAmount.toFixed(2)} VND</td>
    </tr>
    `;
}

function saveReduction() {
    const IDuser = parseInt(document.getElementById("employeeId2").value);
    const salary = parseFloat(document.getElementById("salary2").value);
    const dependents = parseInt(document.getElementById("dependents2").value);

    if (isNaN(salary) || isNaN(dependents) || isNaN(IDuser)) {
        alert("Vui lòng nhập đầy đủ và chính xác thông tin!");
        return;
    }

    // Đường dẫn đến file Excel
    const filePath = '../excel_data/data_tt.xlsx';

    try {
        // Đọc file Excel
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Chuyển sheet thành JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Tìm và cập nhật dòng chứa IDuser
        let updated = false;
        for (let i = 1; i < jsonData.length; i++) {
            if (jsonData[i][0] === IDuser) { // IDuser ở cột A (index 0)
                jsonData[i][3] = salary;     // Lương ở cột D (index 3)
                jsonData[i][6] = dependents; // Người phụ thuộc ở cột G (index 6)
                updated = true;
                break;
            }
        }

        if (!updated) {
            alert("Không tìm thấy ID nhân viên!");
            return;
        }

        // Ghi lại dữ liệu vào sheet
        const newSheet = XLSX.utils.aoa_to_sheet(jsonData);
        workbook.Sheets[sheetName] = newSheet;

        // Ghi lại file Excel
        XLSX.writeFile(workbook, filePath);
        alert("Dữ liệu đã được cập nhật thành công!");
    } catch (error) {
        console.error("Lỗi khi đọc hoặc ghi file Excel:", error);
        alert("Đã xảy ra lỗi khi cập nhật file Excel.");
    }
}

function calculateMonthlyTax() {
    const salary = parseFloat(document.getElementById("salary").value);
    const dependents = parseInt(document.getElementById("dependents").value);
    const name = document.getElementById("name").value;
    const position = document.getElementById("position").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;


    const exemptionForSelf = 11000000; // Giảm trừ gia cảnh cho bản thân
    const exemptionPerDependent = 4400000; // Giảm trừ cho mỗi người phụ thuộc

    // Tính thu nhập chịu thuế
    const totalExemption = exemptionForSelf + (exemptionPerDependent * dependents);
    const taxableIncome = salary - totalExemption;

    if (taxableIncome <= 0) {
        alert("Thu nhập không đủ để tính thuế.");
        return;
    }

    // Khai báo các mức thuế lũy tiến theo Cách 2
    let taxAmount = 0;

    if (taxableIncome <= 5000000) {
        taxAmount = taxableIncome * 0.05;
    } else if (taxableIncome <= 10000000) {
        taxAmount = taxableIncome * 0.1 - 250000;
    } else if (taxableIncome <= 18000000) {
        taxAmount = taxableIncome * 0.15 - 750000;
    } else if (taxableIncome <= 32000000) {
        taxAmount = taxableIncome * 0.2 - 1650000;
    } else if (taxableIncome <= 52000000) {
        taxAmount = taxableIncome * 0.25 - 3250000;
    } else if (taxableIncome <= 80000000) {
        taxAmount = taxableIncome * 0.3 - 5850000;
    } else {
        taxAmount = taxableIncome * 0.35 - 9850000;
    }

    // Hiển thị kết quả
    const resultTable = document.getElementById("monthlyTax");
    resultTable.innerHTML = `
        <h3>Kết quả tính thuế hàng tháng</h3>
        <table class="output-table">
            <tr>
                <th>Họ và tên</th>
                <td>${name}</td>
            </tr>
            <tr>
                <th>Chức vụ</th>
                <td>${position}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td>${email}</td>
            </tr>
            <tr>
                <th>Số điện thoại</th>
                <td>${phone}</td>
            </tr>
            <tr>
                <th>Lương hàng tháng</th>
                <td>${salary.toFixed(2)} VND</td>
            </tr>
            <tr>
                <th>Số người phụ thuộc</th>
                <td>${dependents}</td>
            </tr>
            <tr>
                <th>Tổng thu nhập chịu thuế</th>
                <td>${taxableIncome.toFixed(2)} VND</td>
            </tr>
            <tr>
                <th>Thuế thu nhập cá nhân</th>
                <td>${taxAmount.toFixed(2)} VND</td>
        </table>
    `;
}

function calculateAnnualTax() {
    const salary = parseFloat(document.getElementById("salary").value);
    const dependents = parseInt(document.getElementById("dependents").value);
    const name = document.getElementById("name").value;
    const position = document.getElementById("position").value;
    const email = document.getElementById("email").value;

    const exemptionForSelf = 11000000; // Giảm trừ gia cảnh cho bản thân
    const exemptionPerDependent = 4400000; // Giảm trừ cho mỗi người phụ thuộc

    let totalAnnualTax = 0;
    let monthlyTaxDetails = '';

    for (let month = 1; month <= 12; month++) {
        const totalExemption = exemptionForSelf + (exemptionPerDependent * dependents);
        const taxableIncome = salary - totalExemption;

        let monthlyTax = 0;
        if (taxableIncome <= 0) {
            monthlyTax = 0;
        } else {
            if (taxableIncome <= 5000000) {
                monthlyTax = taxableIncome * 0.05;
            } else if (taxableIncome <= 10000000) {
                monthlyTax = taxableIncome * 0.1 - 250000;
            } else if (taxableIncome <= 18000000) {
                monthlyTax = taxableIncome * 0.15 - 750000;
            } else if (taxableIncome <= 32000000) {
                monthlyTax = taxableIncome * 0.2 - 1650000;
            } else if (taxableIncome <= 52000000) {
                monthlyTax = taxableIncome * 0.25 - 3250000;
            } else if (taxableIncome <= 80000000) {
                monthlyTax = taxableIncome * 0.3 - 5850000;
            } else {
                monthlyTax = taxableIncome * 0.35 - 9850000;
            }
        }


        // Cộng dồn thuế hàng tháng vào tổng thuế hàng năm
        totalAnnualTax += monthlyTax;

        // Hiển thị thông tin thuế của từng tháng
        monthlyTaxDetails += `
        <tr>
            <td>Tháng ${month}</td>
            <td>${salary.toFixed(2)} VND</td>
            <td>${dependents}</td>
            <td>${monthlyTax.toFixed(2)} VND</td>
        </tr>
        `;
    }

    // Cập nhật kết quả tính thuế
    document.getElementById("annual-name").innerText = name;
    document.getElementById("annual-position").innerText = position;
    document.getElementById("annual-email").innerText = email;

    const resultTable = document.getElementById("annual-tax-table");
    resultTable.innerHTML = `
        <tr>
            <th>Tháng</th>
            <th>Lương hàng tháng</th>
            <th>Số người phụ thuộc</th>
            <th>Thuế thu nhập cá nhân</th>
        </tr>
        ${monthlyTaxDetails}
        <tr>
            <td colspan="3"><strong>Tổng thuế trong năm</strong></td>
            <td><strong>${totalAnnualTax.toFixed(2)} VND</strong></td>
        </tr>
    `;
}

function exportToExcel() {
    const table = document.getElementById("annual-tax-table");
    const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet 1" });  // Chuyển bảng HTML thành workbook Excel

    let namefile = document.getElementById("name").value;
    // Tạo link tải xuống file Excel

    XLSX.writeFile(wb, `${namefile}_Thuế.xlsx`);  // Tải file Excel
}