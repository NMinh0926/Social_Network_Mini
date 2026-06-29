# Frontend Documentation

## Entry
### `frontend/src/main.jsx`
- Render React app vào `#root` với `StrictMode`.
- Import global styles `./index.css`.

### `frontend/src/App.jsx`
- Hiện tại là template Vite/React sample (counter + hero + documentation/social links).
- Chưa tích hợp các layout/component (MainLayout/Sidebar/Topbar) vào flow app.

## Global styling
### `frontend/src/index.css`
- Khai báo theme CSS variables trong `:root` (light/dark).
- Set `body { margin: 0 }`.
- Styling chung cho `#root`, headings, `code` và `.counter`.

### `frontend/src/App.css`
- Styling cho phần demo trong `App.jsx` (hero, ticks, buttons, docs section...).

## Layout
### `frontend/src/layouts/MainLayout/MainLayout.jsx`
- Tool đọc file này trả về rỗng/không nội dung (cần kiểm tra lại trong repo thực tế nếu cần).

### `frontend/src/layouts/MainLayout/MainLayout.module.css`
- Grid layout dạng:
  - columns: `var(--sidebar-width) 1fr var(--right-panel-width)`
  - rows: `var(--topbar-height) 1fr`
- Các class:
  - `.wrapper`: grid tổng
  - `.sidebar`: sticky left
  - `.topbar`: sticky top
  - `.feed`: khu vực nội dung giữa
  - `.rightPanel`: panel bên phải
  - `.noRight .feed`: feed chiếm 2 cột (sidebar + main) khi không có right panel

## Components (placeholders hiện tại)
### `frontend/src/components/Sidebar/Sidebar.jsx`
- Placeholder: trả về `<div>Sidebar</div>`.

### `frontend/src/components/Topbar/Topbar.jsx`
- Placeholder: trả về `<div>Topbar</div>`.

## Context
### `frontend/src/context/PageContext.jsx`
- Tool đọc file trả về rỗng/không nội dung.

## Note/nhận xét nhanh
- Frontend hiện mới là scaffold/template, chưa kết nối tới backend API.
- MainLayout/Sidebar/Topbar đang có CSS/placeholder nhưng chưa được dùng trong `App.jsx`.

