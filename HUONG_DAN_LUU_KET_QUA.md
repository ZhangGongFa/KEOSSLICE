# Hướng dẫn lưu kết quả KEOS Slice bằng Google Apps Script

## Vì sao bản hiện tại báo “lưu không thành công”
Có 2 lỗi hay gặp nhất:

1. `doPost()` bị đặt bên trong `myFunction()` nên Web App không gọi được hàm webhook.
2. Script không gắn đúng với Google Sheet hoặc chưa điền `SPREADSHEET_ID` khi dùng script độc lập.

Bản `google-apps-script.gs` mới trong gói này đã xử lý cả hai điểm trên.

## Dữ liệu game sẽ gửi lên Sheet
- `playedAt`
- `playerName`
- `fullName`
- `email`
- `phone`
- `petType`
- `score`
- `recommendedProductId`
- `recommendedProductName`
- `sessionId`
- `pageUrl`
- `userAgent`
- `game`
- `savedAt`

## Cách làm đúng

### 1. Tạo Google Sheet
Tạo 1 file Google Sheets mới, ví dụ: `Keos Slice Results`.

### 2. Mở Apps Script
Trong Google Sheet vào:
- Extensions
- Apps Script

### 3. Dán file script mới
Xóa code cũ và dán toàn bộ nội dung trong file `google-apps-script.gs` mới.

### 4. Nếu script không gắn trực tiếp với Sheet
Điền `SPREADSHEET_ID` ở đầu file:

```js
const SPREADSHEET_ID = 'dán ID của Google Sheet vào đây';
```

Nếu script mở từ chính Google Sheet đó thì có thể để trống.

### 5. Deploy Web App
Trong Apps Script:
- Deploy
- New deployment
- Type: Web app
- Execute as: Me
- Who has access: Anyone
- Deploy

Sau đó copy URL Web App dạng `/exec`.

### 6. Kiểm tra webhook trước khi gắn vào game
Mở URL `/exec` trên trình duyệt.
Nếu thấy JSON kiểu:

```json
{"ok":true,"message":"KEOS Slice webhook is running"}
```

thì webhook đã sống.

### 7. Gắn URL vào game
Trong `index.html`, biến này đã được điền sẵn:

```js
const SCORE_WEBHOOK_URL = '...';
```

Nếu bạn đổi Web App mới thì thay lại URL này.

### 8. Deploy lại lên Vercel hoặc GitHub Pages
Upload lại file `index.html` mới lên host.

## Ghi chú vận hành
- Game đã lưu tạm localStorage nếu gửi webhook lỗi.
- Khi người chơi mở lại game trên cùng thiết bị, hệ thống sẽ tự thử gửi lại các kết quả đang chờ.
- Vì đây là game client-side, điểm vẫn có thể bị sửa bằng DevTools. Khi trao thưởng, nên đối chiếu thêm `email`, `phone`, `sessionId` và thời gian chơi.
