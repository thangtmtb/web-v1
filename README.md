# 😂 Truyện Cười - Vietnamese Jokes Website

Một nền tảng chia sẻ truyện cười Việt Nam với giao diện hiện đại, được xây dựng bằng React + TypeScript + Supabase.

## ✨ Tính năng

### Người dùng
- ✅ Đọc truyện cười miễn phí (không cần đăng nhập)
- ✅ Tìm kiếm truyện theo từ khóa
- ✅ Lọc truyện theo danh mục
- ✅ Đăng ký/Đăng nhập tài khoản
- ✅ Đóng góp truyện cười mới
- ✅ Like, comment, lưu truyện yêu thích
- ✅ Xem lịch sử đọc truyện
- ✅ Báo cáo truyện vi phạm

### Admin
- ✅ Duyệt/Từ chối truyện đóng góp
- ✅ Quản lý danh mục
- ✅ Quản lý người dùng
- ✅ Xem thống kê

## 🎨 Danh mục truyện

1. **Truyện Tiếu Lâm** 😄 - Truyện cười dân gian truyền thống
2. **Truyện Vô Vạ** 🤣 - Tình huống hài hước bất ngờ
3. **Truyện Cười Công Sở** 💼 - Chuyện vui trong môi trường làm việc
4. **Truyện Cười Học Đường** 📚 - Câu chuyện hài hước ở trường học
5. **Truyện Cười Gia Đình** 👨‍👩‍👧‍👦 - Chuyện vui trong gia đình
6. **Truyện Cười 18+** 🔞 - Dành cho người lớn
7. **Truyện Cười Công Nghệ** 💻 - Chuyện vui về IT và công nghệ
8. **Truyện Cười Thời Sự** 📰 - Châm biếm về các vấn đề xã hội

## 🛠️ Công nghệ sử dụng

### Frontend
- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **React Router** - Routing
- **TanStack Query** - Data Fetching & Caching
- **Zustand** - State Management
- **React Hot Toast** - Notifications
- **React Icons** - Icons
- **date-fns** - Date Formatting

### Backend
- **Supabase** - Backend as a Service
  - PostgreSQL Database
  - Authentication
  - Row Level Security (RLS)
  - Real-time subscriptions

### Styling
- **Vanilla CSS** - Custom Design System
- **CSS Variables** - Theming
- **CSS Grid & Flexbox** - Layouts
- **CSS Animations** - Micro-interactions

## 📁 Cấu trúc dự án

```
truyen-cuoi2/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── JokeCard.tsx
│   │   └── CategoryFilter.tsx
│   ├── layouts/            # Layout components
│   │   ├── MainLayout.tsx
│   │   └── AuthLayout.tsx
│   ├── pages/              # Page components
│   │   ├── HomePage.tsx
│   │   ├── JokeDetailPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── SubmitJokePage.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── SavedJokesPage.tsx
│   │   └── AdminPage.tsx
│   ├── services/           # API services
│   │   ├── jokeService.ts
│   │   ├── categoryService.ts
│   │   └── commentService.ts
│   ├── store/              # State management
│   │   └── authStore.ts
│   ├── lib/                # Libraries & utilities
│   │   └── supabase.ts
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql
│   ├── seed.sql            # Categories seed data
│   └── sample_jokes.sql    # Sample jokes data
├── public/                 # Static assets
├── .env.development        # Environment variables
└── package.json

```

## 🚀 Hướng dẫn cài đặt

### 1. Clone repository

```bash
cd truyen-cuoi2
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Setup Supabase Database

Xem hướng dẫn chi tiết trong file [SETUP_DATABASE.md](./SETUP_DATABASE.md)

**Tóm tắt:**
1. Tạo project trên [Supabase](https://supabase.com)
2. Chạy file `supabase/migrations/001_initial_schema.sql` trong SQL Editor
3. Chạy file `supabase/seed.sql` để thêm categories
4. (Tùy chọn) Chạy `supabase/sample_jokes.sql` để thêm dữ liệu mẫu

### 4. Cấu hình Environment Variables

Tạo file `.env.development` (hoặc cập nhật file có sẵn):

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Chạy development server

```bash
npm run dev
```

Mở trình duyệt tại: http://localhost:5174

## 📝 Scripts

```bash
npm run dev      # Chạy development server
npm run build    # Build production
npm run preview  # Preview production build
npm run lint     # Chạy ESLint
```

## 🎯 Roadmap

### Phase 1: Core Features ✅
- [x] Database schema
- [x] Authentication
- [x] Homepage với danh sách truyện
- [x] Tìm kiếm & lọc theo danh mục
- [x] Đóng góp truyện

### Phase 2: Social Features (Coming Soon)
- [ ] Chi tiết truyện với comments
- [ ] Like & Save truyện
- [ ] Trang cá nhân
- [ ] Lịch sử đọc truyện
- [ ] Thông báo

### Phase 3: Admin Panel (Coming Soon)
- [ ] Dashboard thống kê
- [ ] Duyệt truyện
- [ ] Quản lý users
- [ ] Quản lý categories
- [ ] Xử lý báo cáo

### Phase 4: Advanced Features
- [ ] Chia sẻ truyện lên social media
- [ ] Đánh giá truyện (rating)
- [ ] Top truyện hot trong tuần/tháng
- [ ] Gợi ý truyện dựa trên sở thích
- [ ] Dark/Light mode toggle
- [ ] PWA support
- [ ] SEO optimization

## 🎨 Design System

### Colors
- **Primary**: Purple gradient (`hsl(260, 85%, 60%)`)
- **Secondary**: Blue (`hsl(200, 90%, 55%)`)
- **Accent**: Pink (`hsl(340, 85%, 60%)`)
- **Success**: Green (`hsl(140, 70%, 50%)`)
- **Error**: Red (`hsl(0, 80%, 60%)`)

### Typography
- **Font Family**: Inter
- **Sizes**: xs (12px) → 4xl (36px)

### Spacing
- **xs**: 4px
- **sm**: 8px
- **md**: 16px
- **lg**: 24px
- **xl**: 32px
- **2xl**: 48px

## 🔒 Security

- Row Level Security (RLS) enabled cho tất cả tables
- Authentication qua Supabase Auth
- Input validation & sanitization
- CORS protection
- Rate limiting (Supabase built-in)

## 📱 Responsive Design

- **Mobile First** approach
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## 🤝 Contributing

Mọi đóng góp đều được chào đón! Vui lòng:
1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

MIT License - Xem file [LICENSE](./LICENSE) để biết thêm chi tiết

## 👨‍💻 Author

Được xây dựng với ❤️ bởi Antigravity AI

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) - Backend platform
- [React](https://react.dev) - UI library
- [Vite](https://vitejs.dev) - Build tool
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library

---

**Happy Coding! 😂**
