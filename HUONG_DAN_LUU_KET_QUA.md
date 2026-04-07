# Huong dan luu ket qua cho GitHub Pages

Game chay tren GitHub Pages la web tinh, vi vay trinh duyet khong the ghi diem vao file trong repo hay chay PHP/Python tren server. Cach gon, de lam va re nhat la:

1. Tao 1 Google Sheet de luu ket qua.
2. Mo Apps Script gan voi Google Sheet do.
3. Deploy script thanh Web App.
4. Copy URL Web App va dan vao bien `SCORE_WEBHOOK_URL` trong file `index.html`.

## Truong du lieu hien tai game se gui
- `playedAt`
- `playerName`
- `petType`
- `score`
- `recommendedProductId`
- `recommendedProductName`
- `sessionId`
- `userAgent`
- `game`

## Cac buoc thuc hien

### 1) Tao Google Sheet
Tao 1 file Google Sheets moi, dat ten vi du: `Keos Slice Results`.

### 2) Mo Apps Script
Trong Google Sheet vao:
- Extensions
- Apps Script

### 3) Dan file script mau
Dan noi dung trong file `google-apps-script.gs` vao project Apps Script.

### 4) Deploy Web App
Trong Apps Script:
- Deploy
- New deployment
- Chon type: Web app
- Execute as: Me
- Who has access: Anyone
- Deploy

Sau do copy URL Web App.

### 5) Dan URL vao game
Mo `index.html`, tim dong:

```js
const SCORE_WEBHOOK_URL = '';
```

Dan URL vua copy vao giua dau nhay.

### 6) Dang lai len GitHub Pages
Commit file len repo va deploy lai.

## Ghi chu quan trong
- Neu chua dan webhook, game van luu tam ket qua tren localStorage cua trinh duyet hien tai.
- Neu muon trao thuong, ban nen them 1 truong lien he nhu so dien thoai, Zalo hoac email. Hien tai game moi luu ten va diem.
- Game client-side co the bi sua diem bang DevTools. Neu dung de trao thuong, ban nen kiem tra top diem thu cong hoac bo sung backend xac thuc sau.
