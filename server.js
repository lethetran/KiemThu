const express = require('express');
const bodyParser = require('body-parser');
const xlsx = require('xlsx');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Đọc dữ liệu từ file Excel
function getUserData(email) {
    const workbook = xlsx.readFile('data.xlsx'); // Thay bằng tên file Excel của bạn
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);

    // Tìm thông tin theo email
    return data.find(user => user.Email === email);
}

// API đăng nhập
app.post('/login', (req, res) => {
    const { email } = req.body;

    const userData = getUserData(email);
    if (userData) {
        res.json({
            success: true,
            data: userData
        });
    } else {
        res.json({
            success: false,
            message: 'Không tìm thấy thông tin người dùng!'
        });
    }
});

// Chạy server
app.listen(3000, () => {
    console.log('Server đang chạy tại http://localhost:3000');
});
