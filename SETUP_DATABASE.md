# Hướng dẫn Setup Database Supabase

## Bước 1: Tạo Project trên Supabase

1. Truy cập https://supabase.com
2. Đăng nhập hoặc tạo tài khoản mới
3. Click "New Project"
4. Điền thông tin:
   - **Name**: truyen-cuoi (hoặc tên bạn muốn)
   - **Database Password**: Tạo mật khẩu mạnh (lưu lại để sau này dùng)
   - **Region**: Chọn Singapore hoặc Tokyo (gần Việt Nam nhất)
5. Click "Create new project" và đợi vài phút

## Bước 2: Chạy Migration SQL

1. Trong Supabase Dashboard, vào **SQL Editor** (menu bên trái)
2. Click **New Query**
3. Copy toàn bộ nội dung file `supabase/migrations/001_initial_schema.sql`
4. Paste vào SQL Editor
5. Click **Run** để tạo database schema

## Bước 3: Thêm Seed Data (Dữ liệu mẫu)

1. Vẫn trong **SQL Editor**, tạo query mới
2. Copy toàn bộ nội dung file `supabase/seed.sql`
3. Paste vào SQL Editor
4. Click **Run** để thêm categories mẫu

## Bước 4: Cập nhật Environment Variables

1. Trong Supabase Dashboard, vào **Settings** > **API**
2. Copy:
   - **Project URL** (dạng: https://xxxxx.supabase.co)
   - **anon public** key (API Key)
3. Cập nhật file `.env.development`:

```env
VITE_SUPABASE_URL=https://your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Bước 5: Tạo Admin User (Tùy chọn)

Để có tài khoản admin, sau khi đăng ký user đầu tiên qua web:

1. Vào **Table Editor** > **profiles**
2. Tìm user vừa tạo
3. Edit row, set `is_admin = true`
4. Save

## Bước 6: Test Authentication

1. Vào **Authentication** > **Providers** trong Supabase Dashboard
2. Đảm bảo **Email** provider đã được bật
3. Trong **Email Templates**, có thể tùy chỉnh email xác nhận (tùy chọn)

## Bước 7: Kiểm tra RLS Policies

1. Vào **Authentication** > **Policies**
2. Kiểm tra các policies đã được tạo cho từng table
3. Đảm bảo RLS đã được enable cho tất cả tables

## Bước 8: Test trên Web

1. Chạy `npm run dev`
2. Mở http://localhost:5174
3. Thử các chức năng:
   - Đăng ký tài khoản mới
   - Đăng nhập
   - Đóng góp truyện
   - Xem danh sách truyện

## Lưu ý quan trọng

### Email Confirmation
- Mặc định Supabase yêu cầu xác nhận email
- Để test nhanh, có thể tắt trong **Authentication** > **Email Auth** > **Confirm email**: OFF
- Nhớ bật lại khi deploy production

### Database Backup
- Supabase tự động backup hàng ngày
- Có thể tạo backup thủ công trong **Database** > **Backups**

### Rate Limiting
- Free tier có giới hạn:
  - 500MB database
  - 1GB file storage
  - 2GB bandwidth/tháng
  - 50,000 monthly active users

## Troubleshooting

### Lỗi "relation does not exist"
- Chưa chạy migration SQL
- Giải pháp: Chạy lại file `001_initial_schema.sql`

### Lỗi "new row violates row-level security policy"
- RLS policies chưa đúng
- Giải pháp: Kiểm tra lại policies trong SQL

### Không thể đăng ký user
- Email provider chưa được bật
- Giải pháp: Vào Authentication > Providers > Enable Email

### Lỗi CORS
- Sai URL hoặc API key
- Giải pháp: Kiểm tra lại `.env.development`

## Tài liệu tham khảo

- Supabase Docs: https://supabase.com/docs
- Row Level Security: https://supabase.com/docs/guides/auth/row-level-security
- SQL Editor: https://supabase.com/docs/guides/database/overview
