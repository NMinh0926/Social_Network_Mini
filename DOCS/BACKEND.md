# Backend Documentation

## Entry point
### `backend/src/index.js`
- `dotenv.config()` để load env
- `express.json()` middleware
- `connectDB()` để connect MongoDB
- Mount routes: `app.use('/social/api', postsRouters)`
- Start server on port **5002**

> Lưu ý: Trong file `index.js` chỉ mount `postsRouters`. Các routes `usersRouters`, `commentRouters`, `interactionRouter` không thấy được mount trong `index.js` đã đọc.

---

## Routes & Controllers

### Posts
#### `backend/src/routes/postsRouters.js`
- `GET /posts/feed` -> `getNewsfeed`
- `GET /posts/:id` -> `getPostById`
- `POST /posts` -> `createPost`
- `PUT /posts/:id` -> `updatePost`
- `DELETE /posts/:id` -> `deletePost`

#### `backend/src/controllers/postsControllers.js`
- **`getNewsfeed(req,res)`**
  - Lấy `myId = req.user.id`
  - Pagination: `page` (default 1), `limit` (default 10)
  - Lấy danh sách users mà current user đang follow: (code gọi `User.findById(myId).select('following')`)
  - Lấy posts có `author` thuộc danh sách following + chính mình
  - Sort theo `createAt: -1` và populate `author`

- **`createPost(req,res)`**
  - Body: `{ content, media, visibility }`
  - `author_id = req.user.id`
  - Create `new Post(...)`, save
  - Increment `User.stats.post_count`

- **`getPostById(req,res)`**
  - `Post.findById(id)` populate `author`

- **`updatePost(req,res)`**
  - Check quyền: so sánh `post.author_id` với `req.user.id`
  - Update fields: `content`, `media`, `visibility`

- **`deletePost(req,res)`**
  - Check quyền sở hữu
  - `post.deleteOne()`
  - Decrement `User.stats.post_count`

> ⚠️ Các điểm không nhất quán:
- Trong `models/Post.js` field là `author` (không thấy `author_id`).
- Trong `postsControllers.js` dùng `User` nhưng controller không import `User`.
- `getNewsfeed` gọi `User.findById(...).select('following')` nhưng model `Follow.js` lưu theo `follower_id/following_id`, không phải `following` array.

---

### Users
#### `backend/src/routes/usersRouters.js`
- `GET /users` -> `getUsers`
- `GET /users/:id` -> `getUserProfile`
- `PUT /users/profile` -> `updateUser`
- `GET /users/search?username=...` -> `findUserByUsername`
- `GET /users/:id/followers` -> `getFollowers`
- `GET /users/:id/following` -> `getFollowing`

#### `backend/src/controllers/usersControllers.js`
- **`getUsers`**: `User.find().select('-password')`
- **`getUserProfile`**:
  - `User.findById(req.params.id).select('username profile stats')`
  - Check `isFollowing` bằng `Follow.exists({ follower_id: req.user.id, following_id: req.params.id })`
  - Response: `{ user, isFollowing }`
- **`updateUser`**:
  - Body: `{ display_name, avatar, bio }`
  - Update `profile.*` theo `req.user.id`
- **`findUserByUsername`**: regex case-insensitive
- **`getFollowers`**: `Follow.find({ following_id: id }).populate(follower_id ...)`
- **`getFollowing`**: `Follow.find({ follower_id: id }).populate(following_id ...)`

---

### Comments
#### `backend/src/routes/commentRouters.js`
- `POST /comments` -> `createComment`
- `GET /post/:postId/comments` -> `getComments`
- `PUT /comments/:id` -> `updateComment`

#### `backend/src/controllers/commentControllers.js`
- **`createComment`**
  - Body: `{ post_id, content, parent_id }`
  - `auth_id = req.user.id`
  - Tạo `Comment`, nếu `!parent_id` thì increment `Post.stats.comment_count`
  - Populate `auth_id` trả comment kèm user

- **`getComments`**
  - Query: `page`, `limit`, optional `parent_id`
  - Find comments theo `{ post_id, parent_id: parent_id || null }`
  - Populate `auth_id`
  - Return format: `{ data, pagination }`

- **`updateComment`**
  - Check owner `comment.auth_id === req.user.id`
  - Update `content`

---

### Interaction (Follow/Like)
#### `backend/src/routes/interactionRouter.js`
- `POST /follow/:id` -> `toggleFollow`
- `POST /likes/toggle` -> `toggleLike`

#### `backend/src/controllers/interactionControllers.js`
- **`toggleFollow`**
  - Param `id` là người được follow
  - Check không follow chính mình
  - Nếu đã tồn tại follow -> delete
    - decrement `stats.following_count` và `stats.follower_count`
  - Nếu chưa tồn tại -> create
    - increment các stats tương ứng

- **`toggleLike`**
  - Body: `{ target_id, target_types }` ("Post" hoặc "Comment")
  - Search Like theo `{ target_id, user_id, target_types }`
  - Nếu tồn tại -> delete like và decrement stats
  - Nếu chưa tồn tại -> create like và increment stats

> ⚠️ Điểm không nhất quán trong file:
- `interactionControllers.js` dùng `User.findByIdAndUpdate` nhưng chưa import `User`.
- `toggleLike` lúc unlike dùng `$inc: { "stats.likes_count": -1 }` nhưng lúc like lại `$inc: { "stats.like_count": 1 }` (khác key so với Post schema: `likes_count`).

---

## Models

### `User` - `backend/src/models/User.js`
- Schema: `username`, `email`, `password`
- `profile`: `bio`, `avatar`, `display_name`
- `stats`: `followers_count`, `following_count`, `posts_count`
- `timestamps: true` (tạo `createAt/updateAt` theo mongoose conventions)

### `Post` - `backend/src/models/Post.js`
- `author` (ref User)
- `content`
- `media: [String]`
- `stats`: `likes_count`, `comments_count`
- `visibility`: enum `public|private|friends`
- timestamps

### `Comment` - `backend/src/models/Comment.js`
- `post_id` ref Post
- `auth_id` ref User
- `content`
- `parent_id` ref Comment (null nếu là comment gốc)
- `likes_count`
- `createAt`

### `Follow` - `backend/src/models/Follow.js`
- `follower_id` ref User
- `following_id` ref User
- `createAt`

### `Like` - `backend/src/models/Like.js`
- `target_id` + `target_types` (refPath)
- `user_id` ref User
- `createAt`
- unique index `{ target_id, user_id, target_types }`

