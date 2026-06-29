# Social_Network_Mini - Repo Documentation

Tài liệu này được tạo từ việc đọc code trong các thư mục `frontend/src` và `backend/src`.

## Cấu trúc chính
- **Frontend**: React (Vite)
  - `src/App.jsx`, `src/main.jsx`, `src/index.css`
  - `src/layouts/MainLayout/*`
  - `src/components/*` (Sidebar/Topbar đang là placeholder)
- **Backend**: Node.js + Express + Mongoose
  - `src/index.js`: khởi động server, connect MongoDB, mount route `/social/api`
  - `src/routes/*`: routers
  - `src/controllers/*`: business logic cho posts/users/comments/interaction
  - `src/models/*`: schema Mongoose

## Ghi chú quan trọng (code hiện tại)
- Frontend hiện tại chủ yếu là template Vite; `MainLayout`/`Sidebar`/`Topbar` chưa được tích hợp vào `App.jsx`.
- Backend controllers có tham chiếu tới `req.user.id` (có vẻ cần auth middleware). Tuy nhiên **middleware auth không nằm trong các file đã đọc**.
- Có một số lỗi/không nhất quán trong controller:
  - `postsControllers.js` dùng `User`/`post.author_id` nhưng trong file không import `User` và model `Post.js` lại define field `author` (không có `author_id`).
  - `interactionControllers.js` dùng `User.findByIdAndUpdate` nhưng controller không import `User`.
  - `toggleLike` cập nhật `$inc: { "stats.likes_count": -1 }` khi unlike, nhưng ở else lại `$inc: { "stats.like_count": 1 }` (khác key).
  - `toggleFollow` cần import `User` nhưng hiện không có.

Các phần chi tiết endpoint/model/component có trong các file bên dưới.

- `DOCS/BACKEND.md`
- `DOCS/FRONTEND.md`
- `DOCS/API.md`

