# Notes / nhận xét nhanh

## Frontend
- App.jsx đang là template demo Vite (hero + counter + links). Chưa dùng các component/layout cho social network.
- MainLayout/Sidebar/Topbar hiện có placeholder.
- PageContext.jsx: hiện tại không thấy nội dung (khi đọc tool trả về rỗng).

## Backend
- Entry `backend/src/index.js` chỉ mount `postsRouters`.
  - Vì vậy các route `users`, `comments`, `interaction` sẽ không hoạt động (trừ khi được mount thêm ở nơi khác).

## Auth middleware
- Nhiều controller dùng `req.user.id`.
- Trong code đã đọc không thấy middleware gắn `req.user`.
  - Nếu không có auth middleware sẽ crash (req.user undefined).

## Model/controller mismatch (đáng chú ý)
- `models/Post.js` define field `author`, nhưng `postsControllers.js` lại dùng `author_id`.
- `postsControllers.js` tham chiếu `User` nhưng không import User.
- `interactionControllers.js` tham chiếu `User` nhưng không import User.
- `toggleLike` decrement stats dùng `stats.likes_count` nhưng increment/else dùng `stats.like_count`.
- `getNewsfeed` dùng `User.findById(myId).select('following')` trong khi Follow schema dùng `follower_id/following_id`.

