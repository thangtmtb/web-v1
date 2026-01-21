-- =============================================
-- SAMPLE JOKES DATA
-- =============================================
-- This script will use the first existing user in the system
-- IMPORTANT: You must create at least one user account first!
-- 
-- Steps:
-- 1. Register a user account through the web app (http://localhost:5174/register)
-- 2. Then run this SQL script
-- 
-- Or if you want to set a specific user as admin:
-- UPDATE profiles SET is_admin = true WHERE email = 'your-email@example.com';

DO $$
DECLARE
    v_user_id UUID;
BEGIN
    -- Get the first user (preferably admin)
    SELECT id INTO v_user_id 
    FROM profiles 
    WHERE is_admin = true 
    LIMIT 1;
    
    -- If no admin, get any user
    IF v_user_id IS NULL THEN
        SELECT id INTO v_user_id 
        FROM profiles 
        LIMIT 1;
    END IF;
    
    -- Check if we have a user
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'No users found! Please create a user account first through the web app.';
    END IF;
    
    -- Log which user we're using
    RAISE NOTICE 'Using user ID: %', v_user_id;
    
    -- =============================================
    -- TRUYỆN TIẾU LÂM
    -- =============================================

    INSERT INTO jokes (title, content, category_id, author_id, status, reviewed_by, reviewed_at, is_featured) VALUES
    (
        'Chuyện anh hàng xóm',
        'Hôm nay anh hàng xóm hỏi tôi: "Sao nhà bạn không nuôi chó?"
Tôi trả lời: "Vì tôi sợ chó!"
Anh ấy cười và nói: "Thế mà tôi tưởng bạn sợ vợ chứ!"
Tôi đáp: "Ừ, nên tôi không dám nuôi thêm con nào nữa!"',
        (SELECT id FROM categories WHERE slug = 'tieu-lam'),
        v_user_id,
        'approved',
        v_user_id,
        NOW(),
        true
    ),
    (
        'Bác sĩ khám bệnh',
        'Bệnh nhân: Bác sĩ ơi, tôi bị đau đầu, đau bụng, đau chân, đau tay...
Bác sĩ: Anh bị đau nhiều quá vậy?
Bệnh nhân: Vâng, tôi đau cả người luôn!
Bác sĩ: Thế anh về nhà tắm nước nóng đi, chắc là anh bị... đau vì lạnh!',
        (SELECT id FROM categories WHERE slug = 'tieu-lam'),
        v_user_id,
        'approved',
        v_user_id,
        NOW(),
        false
    ),
    (
        'Câu chuyện về con gà',
        'Một người đàn ông vào quán ăn gọi món:
- Cho tôi một con gà!
Người phục vụ hỏi:
- Dạ gà luộc, gà rán hay gà nướng ạ?
Người đàn ông đáp:
- Gà... còn sống! Tôi muốn mang về nhà nuôi!',
        (SELECT id FROM categories WHERE slug = 'tieu-lam'),
        v_user_id,
        'approved',
        v_user_id,
        NOW(),
        false
    ),

    -- =============================================
    -- TRUYỆN CƯỜI CÔNG SỞ
    -- =============================================

    (
        'Họp hành công ty',
        'Sếp: Tại sao anh đến muộn?
Nhân viên: Thưa sếp, vì em ngủ quên!
Sếp: Sao không đặt đồng hồ báo thức?
Nhân viên: Em có đặt ạ, nhưng nó báo lúc em đang ngủ ngon nên em không nghe thấy!',
        (SELECT id FROM categories WHERE slug = 'cong-so'),
        v_user_id,
        'approved',
        v_user_id,
        NOW(),
        true
    ),
    (
        'Xin tăng lương',
        'Nhân viên: Thưa sếp, em xin tăng lương ạ!
Sếp: Lý do?
Nhân viên: Vì có 3 công ty khác muốn mời em về làm việc!
Sếp: Thật à? Công ty nào?
Nhân viên: Công ty điện lực, công ty nước, và công ty gas... họ đòi em trả tiền!',
        (SELECT id FROM categories WHERE slug = 'cong-so'),
        v_user_id,
        'approved',
        v_user_id,
        NOW(),
        false
    ),
    (
        'Làm việc từ xa',
        'Sếp gọi điện: Anh đang làm việc tại nhà à?
Nhân viên: Dạ đúng rồi ạ!
Sếp: Tôi nghe thấy tiếng sóng biển kìa?
Nhân viên: À, đó là... nhạc nền thư giãn để tăng năng suất làm việc ạ sếp!',
        (SELECT id FROM categories WHERE slug = 'cong-so'),
        v_user_id,
        'approved',
        v_user_id,
        NOW(),
        false
    ),

    -- =============================================
    -- TRUYỆN CƯỜI HỌC ĐƯỜNG
    -- =============================================

    (
        'Bài kiểm tra',
        'Thầy giáo: Em làm bài kiểm tra sao giống hệt bài của bạn bên cạnh vậy?
Học sinh: Thưa thầy, vì chúng em ngồi cạnh nhau ạ!
Thầy: Nhưng bạn ấy làm sai câu 5, em cũng làm sai y hệt?
Học sinh: Dạ, vì em thấy bạn ấy viết tự tin lắm nên em tin là đúng ạ!',
        (SELECT id FROM categories WHERE slug = 'hoc-duong'),
        v_user_id,
        'approved',
        v_user_id,
        NOW(),
        true
    ),
    (
        'Giờ học toán',
        'Cô giáo: Nếu em có 5 quả táo, cô lấy đi 3 quả, em còn lại mấy quả?
Học sinh: Dạ em còn 5 quả ạ!
Cô giáo: Sao lại 5 quả?
Học sinh: Vì em không cho cô lấy ạ!',
        (SELECT id FROM categories WHERE slug = 'hoc-duong'),
        v_user_id,
        'approved',
        v_user_id,
        NOW(),
        false
    ),
    (
        'Bài tập về nhà',
        'Mẹ: Con làm bài tập về nhà chưa?
Con: Rồi ạ!
Mẹ: Để mẹ xem nào!
Con: Con để ở trường rồi ạ!
Mẹ: Sao lại để ở trường?
Con: Con sợ mang về nhà bị... mất ạ!',
        (SELECT id FROM categories WHERE slug = 'hoc-duong'),
        v_user_id,
        'approved',
        v_user_id,
        NOW(),
        false
    ),

    -- =============================================
    -- TRUYỆN CƯỜI GIA ĐÌNH
    -- =============================================

    (
        'Vợ chồng nấu ăn',
        'Vợ: Anh ơi, hôm nay em nấu món gì anh muốn ăn nhất?
Chồng: Anh muốn ăn... mì tôm!
Vợ: Sao lại mì tôm? Em nấu cơm ngon mà!
Chồng: Vì anh sợ em nấu cơm... cháy!',
        (SELECT id FROM categories WHERE slug = 'gia-dinh'),
        v_user_id,
        'approved',
        v_user_id,
        NOW(),
        true
    ),
    (
        'Con hỏi bố',
        'Con: Bố ơi, sao bố không có tóc?
Bố: Vì bố suy nghĩ nhiều nên rụng hết tóc!
Con: Thế sao mẹ có nhiều tóc vậy bố?
Bố: Vì... mẹ không bao giờ suy nghĩ!
(Mẹ đang đứng sau lưng bố)',
        (SELECT id FROM categories WHERE slug = 'gia-dinh'),
        v_user_id,
        'approved',
        v_user_id,
        NOW(),
        false
    ),
    (
        'Đi chợ mua đồ',
        'Vợ: Anh ơi, em đi chợ mua rau về đây!
Chồng: Mua bao nhiêu tiền?
Vợ: 50 nghìn!
Chồng: Sao nhiều vậy?
Vợ: À, 10 nghìn tiền rau, 40 nghìn tiền... gặp bạn đi uống cà phê!',
        (SELECT id FROM categories WHERE slug = 'gia-dinh'),
        v_user_id,
        'approved',
        v_user_id,
        NOW(),
        false
    ),

    -- =============================================
    -- TRUYỆN CƯỜI CÔNG NGHỆ
    -- =============================================

    (
        'Sửa máy tính',
        'Khách hàng: Máy tính em bị lỗi, anh sửa được không?
Thợ sửa: Được chứ! Lỗi gì?
Khách: Nó cứ báo "Keyboard not found, press any key to continue"!
Thợ: Vậy bạn ấn phím gì chưa?
Khách: Em tìm mãi không thấy phím "any key" ạ!',
        (SELECT id FROM categories WHERE slug = 'cong-nghe'),
        v_user_id,
        'approved',
        v_user_id,
        NOW(),
        true
    ),
    (
        'Lập trình viên đi bar',
        'Lập trình viên vào quán bar gọi đồ:
- Cho tôi 1 ly bia!
Bartender: Dạ 1 ly bia ạ!
Lập trình viên: Không, tôi nói 1 ly bia, không phải "1 ly bia ạ"!
Bartender: ???
Lập trình viên: Bạn phải return đúng giá trị tôi yêu cầu chứ!',
        (SELECT id FROM categories WHERE slug = 'cong-nghe'),
        v_user_id,
        'approved',
        v_user_id,
        NOW(),
        false
    ),
    (
        'Cài đặt phần mềm',
        'Khách hàng: Anh ơi, em cài phần mềm xong rồi nhưng không chạy được!
IT: Bạn đã restart máy chưa?
Khách: Rồi ạ!
IT: Restart bao nhiêu lần?
Khách: Em tắt máy rồi bật lại... 1 lần ạ!
IT: Vậy là chưa đủ, phải restart ít nhất 3 lần!',
        (SELECT id FROM categories WHERE slug = 'cong-nghe'),
        v_user_id,
        'approved',
        v_user_id,
        NOW(),
        false
    ),

    -- =============================================
    -- TRUYỆN CƯỜI THỜI SỰ
    -- =============================================

    (
        'Giá xăng tăng',
        'Người 1: Giá xăng tăng quá, đi làm không đủ tiền đổ xăng!
Người 2: Vậy anh đi xe đạp đi!
Người 1: Đi xe đạp thì phải ăn nhiều hơn, tiền ăn còn đắt hơn tiền xăng!
Người 2: Vậy... đi bộ!
Người 1: Đi bộ thì mất thời gian, về đến nhà trời tối mất, tốn tiền điện!',
        (SELECT id FROM categories WHERE slug = 'thoi-su'),
        v_user_id,
        'approved',
        v_user_id,
        NOW(),
        true
    ),
    (
        'Tắc đường',
        'Cảnh sát: Anh biết anh đang vi phạm gì không?
Tài xế: Dạ em không biết ạ!
Cảnh sát: Anh đang đỗ xe sai quy định!
Tài xế: Thưa anh, em không đỗ xe, em đang... chờ đèn đỏ ạ!
Cảnh sát: Nhưng đây là vỉa hè!
Tài xế: Dạ, vì đường tắc quá nên em phải lên đây ạ!',
        (SELECT id FROM categories WHERE slug = 'thoi-su'),
        v_user_id,
        'approved',
        v_user_id,
        NOW(),
        false
    );

    -- =============================================
    -- UPDATE VIEW COUNTS (Random)
    -- =============================================

    UPDATE jokes SET view_count = floor(random() * 1000 + 100)::int WHERE status = 'approved';
    UPDATE jokes SET like_count = floor(random() * 100 + 10)::int WHERE status = 'approved';
    UPDATE jokes SET comment_count = floor(random() * 20)::int WHERE status = 'approved';
    
    RAISE NOTICE 'Successfully inserted % jokes!', (SELECT COUNT(*) FROM jokes WHERE author_id = v_user_id);

END $$;
