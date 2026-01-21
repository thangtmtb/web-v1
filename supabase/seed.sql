-- =============================================
-- SEED DATA FOR TRUYỆN CƯỜI
-- =============================================

-- Insert categories
INSERT INTO categories (name, slug, description, icon, display_order) VALUES
('Truyện Tiếu Lâm', 'tieu-lam', 'Những câu chuyện cười dân gian truyền thống', '😄', 1),
('Truyện Cười Công Sở', 'cong-so', 'Chuyện vui trong môi trường làm việc', '💼', 2),
('Truyện Cười Học Đường', 'hoc-duong', 'Những câu chuyện hài hước ở trường học', '📚', 3),
('Truyện Cười Gia Đình', 'gia-dinh', 'Chuyện vui trong gia đình', '👨‍👩‍👧‍👦', 4),
('Truyện Cười 18+', '18-plus', 'Dành cho người lớn', '🔞', 5),
('Truyện Cười Công Nghệ', 'cong-nghe', 'Chuyện vui về IT và công nghệ', '💻', 6),
('Truyện Cười Thời Sự', 'thoi-su', 'Châm biếm về các vấn đề xã hội', '📰', 7);

-- Note: You'll need to create a user first and get their UUID to insert sample jokes
-- For now, we'll create a placeholder admin user reference
-- After creating your first user through the app, update the author_id and reviewed_by fields

-- Sample approved jokes (you'll need to replace the UUIDs with real ones)
-- INSERT INTO jokes (title, content, category_id, author_id, status, reviewed_by, reviewed_at) VALUES
-- ('Tiêu đề truyện mẫu', 'Nội dung truyện cười...', 
--  (SELECT id FROM categories WHERE slug = 'tieu-lam'),
--  'YOUR_USER_UUID_HERE',
--  'approved',
--  'YOUR_ADMIN_UUID_HERE',
--  NOW()
-- );

-- You can add more seed data here after creating your first users
