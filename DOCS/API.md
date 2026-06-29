# API Documentation (from backend code)

Base path trong code hiện tại: `/social/api`

> ⚠️ Quan trọng: Các controller đều truy cập `req.user.id` => bắt buộc phải có auth middleware phía trước. Trong các file đã đọc không thấy middleware decode/attach `req.user`. Vì vậy docs endpoint dưới đây giả định request đã được auth.

## Feed / Posts
### GET `/social/api/posts/feed`
- Query:
  - `page` (default 1)
  - `limit` (default 10)
- Logic: lấy posts từ những user mà `req.user` đang follow + posts của chính user.
- Response: JSON array posts (đã populate author).

### GET `/social/api/posts/:id`
- Response: post by id (populate author)
- Errors: 404 nếu không tìm thấy.

### POST `/social/api/posts`
- Body: `{ content, media, visibility }`
- Create: `author_id = req.user.id`
- Response: 201 JSON savedPost

### PUT `/social/api/posts/:id`
- Body: `{ content?, media?, visibility? }`
- Quyền: chỉ author mới được sửa
- Response: 200 JSON updatedPost

### DELETE `/social/api/posts/:id`
- Quyền: chỉ author mới được xoá
- Response: 200 `{ message: "Post deleted successfully" }`

## Users
### GET `/social/api/users`
- Response: list users (loại password)

### GET `/social/api/users/:id`
- Response: `{ user, isFollowing }`
- `isFollowing` tính bằng Follow.exists({ follower_id: req.user.id, following_id: :id })

### PUT `/social/api/users/profile`
- Body: `{ display_name, avatar, bio }`
- Update `profile.*` cho chính `req.user.id`

### GET `/social/api/users/search?username=...`
- Regex case-insensitive
- Response: list `{ username, profile }`

### GET `/social/api/users/:id/followers`
- Response: list follower users

### GET `/social/api/users/:id/following`
- Response: list following users

## Comments
### POST `/social/api/comments`
- Body: `{ post_id, content, parent_id? }`
- Response: 201 JSON comment (populate auth_id)

### GET `/social/api/post/:postId/comments`
- Query:
  - `page` (default 1)
  - `limit` (default 10)
  - `parent_id?` (để lấy replies)
- Response:
  - `{ data: comments[], pagination: { total, page, limit, totalPages, hasNextPage } }`

### PUT `/social/api/comments/:id`
- Body: `{ content }`
- Quyền: chỉ owner comment

## Interactions
### POST `/social/api/follow/:id`
- Toggle follow/unfollow
- Response: `{ followed: boolean, message: ... }`

### POST `/social/api/likes/toggle`
- Body: `{ target_id, target_types }` where `target_types` in `["Post","Comment"]`
- Response: `{ liked: boolean, message: ... }`

---

## Các điểm lỗi/không khớp (nên fix)
- `backend/src/index.js` chỉ mount `postsRouters` => các route users/comments/interactions hiện chưa được public.
- `postsControllers.js`: dùng `req.user.id` và `User` nhưng không import `User`. Đồng thời schema `Post` trong `models/Post.js` dùng field `author` chứ không có `author_id`.
- `interactionControllers.js`: dùng `User.findByIdAndUpdate` nhưng không import `User`.
- `toggleLike`: unlike dùng `$inc.stats.likes_count`, nhưng like dùng `$inc.stats.like_count` (typo key).
- `getNewsfeed`: gọi `User.findById(myId).select('following')` nhưng model Follow dùng `follower_id/following_id`, không có field `following` dạng array.

