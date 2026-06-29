export const currentUser = {
  id: 1,
  name: 'Alex Chen',
  username: '@alexchen',
  avatar: null,   // sau này thay bằng ảnh thật
}

export const navItems = [
  { id: 1, label: 'Home',     path: '/',         badge: 0, end: true },
  { id: 2, label: 'Explore',  path: '/explore',  badge: 0, end: false },
  { id: 3, label: 'Friends',  path: '/friends',  badge: 0, end: false },
  { id: 4, label: 'Messages', path: '/messages', badge: 3, end: false },
  { id: 5, label: 'Saved',    path: '/saved',    badge: 0, end: false },
  { id: 6, label: 'Settings', path: '/settings', badge: 0, end: false },
]

export const friendSuggestions = [
  { id: 1, name: 'Atamira Braght', mutual: 12, avatar: null },
  { id: 2, name: 'Josh Garaan',    mutual: 8,  avatar: null },
  { id: 3, name: 'Marnie Sirhens', mutual: 15, avatar: null },
  { id: 4, name: 'Eleanor Pena',   mutual: 6,  avatar: null },
]

export const trendingTopics = [
  { id: 1, tag: '#TravelDiaries', posts: '32.5K' },
  { id: 2, tag: '#GoodVibes',     posts: '28.1K' },
  { id: 3, tag: '#SunsetLovers',  posts: '21.4K' },
  { id: 4, tag: '#Photography',   posts: '18.7K' },
]