# Requirements Document

## Introduction

Tính năng này xây dựng một trang web bán hàng công nghệ (tech e-commerce) hiện đại, chỉ gồm UI (frontend-only) tích hợp vào dự án Next.js hiện có. Trang web sử dụng mock data, hình ảnh từ Unsplash/placeholder, giao diện theo phong cách ShopHub với màu chủ đạo Orange (#FF6B35) kết hợp dark tech theme. Toàn bộ nội dung hiển thị bằng tiếng Việt.

Trang web bao gồm: Header đa năng, Navigation bar, Hero Banner slider, Feature bar, Danh mục nổi bật, Banner quảng cáo 3 cột, Grid sản phẩm bán chạy, và Footer. Giao diện được làm phong phú bởi các hiệu ứng 3D CSS, particle effects, glassmorphism, neon glow, và smooth scroll animations.

---

## Glossary

- **Store**: Hệ thống trang web bán hàng công nghệ (tech e-commerce UI).
- **Header**: Thanh tiêu đề cố định ở đầu trang gồm logo, thanh tìm kiếm, icon tài khoản và giỏ hàng.
- **Navbar**: Thanh điều hướng chứa các danh mục và liên kết trang.
- **HeroBanner**: Khu vực banner lớn ở đầu trang chủ với slider tự động và hiệu ứng động.
- **FeatureBar**: Thanh hiển thị 4 cam kết dịch vụ (vận chuyển, đổi trả, thanh toán, hỗ trợ).
- **CategorySection**: Khu vực hiển thị các danh mục sản phẩm nổi bật dạng grid icon.
- **PromoBanner**: Khu vực banner quảng cáo 3 cột cho các nhóm sản phẩm.
- **ProductGrid**: Khu vực hiển thị grid sản phẩm bán chạy với thông tin giá, rating, badge giảm giá.
- **ProductCard**: Thẻ hiển thị thông tin một sản phẩm trong ProductGrid.
- **Footer**: Phần cuối trang chứa thông tin cam kết, liên kết và bản quyền.
- **MockData**: Dữ liệu giả lập tĩnh được định nghĩa trong code, không gọi API thực.
- **ParticleEffect**: Hiệu ứng hạt chuyển động nền tạo cảm giác công nghệ.
- **GlassmorphismCard**: Thẻ UI với hiệu ứng kính mờ (backdrop-filter blur + semi-transparent background).
- **NeonGlow**: Hiệu ứng phát sáng neon trên viền hoặc text bằng CSS box-shadow/text-shadow.
- **3DCard**: ProductCard có hiệu ứng xoay 3D khi hover bằng CSS perspective và rotateX/rotateY.
- **CartStore**: Zustand store quản lý trạng thái giỏ hàng phía client.
- **SearchBar**: Thanh tìm kiếm trong Header cho phép lọc sản phẩm theo tên.

---

## Requirements

### Requirement 1: Header Component

**User Story:** As a người dùng, I want một header cố định với logo, tìm kiếm và giỏ hàng, so that tôi có thể điều hướng và truy cập nhanh các chức năng chính.

#### Acceptance Criteria

1. THE Store SHALL hiển thị Header cố định (sticky) ở đầu trang với z-index cao nhất.
2. THE Header SHALL hiển thị logo thương hiệu "TechStore" với icon công nghệ và màu gradient orange-to-red.
3. THE Header SHALL hiển thị SearchBar cho phép người dùng nhập từ khóa tìm kiếm sản phẩm.
4. WHEN người dùng nhập từ khóa vào SearchBar, THE SearchBar SHALL hiển thị danh sách gợi ý sản phẩm phù hợp từ MockData.
5. THE Header SHALL hiển thị icon tài khoản người dùng với dropdown menu chứa các tùy chọn đăng nhập/đăng ký.
6. THE Header SHALL hiển thị icon giỏ hàng kèm badge số lượng sản phẩm hiện có trong CartStore.
7. WHEN số lượng sản phẩm trong CartStore thay đổi, THE Header SHALL cập nhật badge số lượng ngay lập tức.
8. THE Header SHALL áp dụng hiệu ứng glassmorphism (backdrop-blur, semi-transparent background) khi trang được cuộn xuống.
9. WHEN màn hình có chiều rộng nhỏ hơn 768px, THE Header SHALL ẩn SearchBar và hiển thị icon tìm kiếm thay thế.

---

### Requirement 2: Navigation Bar

**User Story:** As a người dùng, I want một thanh điều hướng rõ ràng với các danh mục, so that tôi có thể dễ dàng tìm đến khu vực sản phẩm mong muốn.

#### Acceptance Criteria

1. THE Navbar SHALL hiển thị các mục điều hướng: Danh mục, Sản phẩm, Khuyến mãi, Bestseller, Tin tức, Liên hệ.
2. THE Navbar SHALL hiển thị nền màu tối (dark) với text màu trắng và highlight màu orange (#FF6B35) cho mục đang active.
3. WHEN người dùng hover vào một mục Navbar, THE Navbar SHALL hiển thị hiệu ứng underline animation màu orange.
4. WHEN người dùng click vào mục "Danh mục", THE Navbar SHALL hiển thị mega-menu dropdown với danh sách danh mục sản phẩm từ MockData.
5. WHEN màn hình có chiều rộng nhỏ hơn 768px, THE Navbar SHALL ẩn các mục điều hướng và hiển thị hamburger menu icon.
6. WHEN người dùng click hamburger menu, THE Navbar SHALL hiển thị drawer menu từ bên trái với đầy đủ các mục điều hướng.

---

### Requirement 3: Hero Banner Slider

**User Story:** As a người dùng, I want một hero banner ấn tượng với slider tự động, so that tôi được thu hút ngay khi vào trang và biết về các chương trình khuyến mãi nổi bật.

#### Acceptance Criteria

1. THE HeroBanner SHALL hiển thị slider với tối thiểu 3 slide chứa MockData về các chương trình khuyến mãi.
2. THE HeroBanner SHALL tự động chuyển slide sau mỗi 5 giây.
3. THE HeroBanner SHALL hiển thị nội dung "Siêu sale cuối mùa - Giảm đến 50%++" trên slide đầu tiên.
4. THE HeroBanner SHALL hiển thị nút điều hướng trái/phải để người dùng chuyển slide thủ công.
5. THE HeroBanner SHALL hiển thị dot indicators ở cuối slider để chỉ slide hiện tại.
6. WHEN người dùng click nút điều hướng hoặc dot indicator, THE HeroBanner SHALL chuyển đến slide tương ứng với hiệu ứng transition mượt mà.
7. THE HeroBanner SHALL áp dụng gradient background với màu tech (xanh dương, tím, cam) và ParticleEffect nền.
8. THE HeroBanner SHALL hiển thị nút CTA (Call-to-Action) "Mua ngay" với hiệu ứng NeonGlow màu orange.
9. THE HeroBanner SHALL áp dụng hiệu ứng animated text (fade-in, slide-up) khi slide được hiển thị.

---

### Requirement 4: Feature Bar

**User Story:** As a người dùng, I want thấy các cam kết dịch vụ ngay dưới banner, so that tôi tin tưởng vào chất lượng dịch vụ của cửa hàng.

#### Acceptance Criteria

1. THE FeatureBar SHALL hiển thị 4 mục cam kết dịch vụ theo bố cục ngang: Miễn phí vận chuyển, Đổi trả dễ dàng, Thanh toán an toàn, Hỗ trợ 24/7.
2. THE FeatureBar SHALL hiển thị icon tương ứng cho mỗi mục cam kết với màu orange (#FF6B35).
3. WHEN người dùng hover vào một mục FeatureBar, THE FeatureBar SHALL áp dụng hiệu ứng scale-up và NeonGlow trên icon.
4. THE FeatureBar SHALL sử dụng GlassmorphismCard làm nền cho mỗi mục cam kết.
5. WHEN màn hình có chiều rộng nhỏ hơn 640px, THE FeatureBar SHALL chuyển sang bố cục 2 cột.

---

### Requirement 5: Danh Mục Nổi Bật

**User Story:** As a người dùng, I want xem các danh mục sản phẩm nổi bật dạng grid, so that tôi có thể nhanh chóng điều hướng đến nhóm sản phẩm mình quan tâm.

#### Acceptance Criteria

1. THE CategorySection SHALL hiển thị tối thiểu 6 danh mục sản phẩm: Điện thoại, Laptop, Tai nghe, Đồng hồ thông minh, Phụ kiện, Máy tính bảng.
2. THE CategorySection SHALL hiển thị mỗi danh mục dưới dạng GlassmorphismCard với icon, tên danh mục và số lượng sản phẩm từ MockData.
3. WHEN người dùng hover vào một CategoryCard, THE CategorySection SHALL áp dụng hiệu ứng 3D tilt (CSS perspective + rotateX/rotateY) và NeonGlow viền.
4. THE CategorySection SHALL hiển thị hình ảnh đại diện cho mỗi danh mục từ Unsplash với lazy loading.
5. WHEN màn hình có chiều rộng nhỏ hơn 768px, THE CategorySection SHALL hiển thị dạng horizontal scroll carousel.

---

### Requirement 6: Banner Quảng Cáo 3 Cột

**User Story:** As a người dùng, I want xem các banner quảng cáo theo nhóm sản phẩm, so that tôi biết được các deal nổi bật theo từng danh mục.

#### Acceptance Criteria

1. THE PromoBanner SHALL hiển thị 3 banner theo bố cục 3 cột ngang với nội dung: "Điện thoại chính hãng", "Laptop deal sốc", "Phụ kiện giá tốt".
2. THE PromoBanner SHALL hiển thị hình ảnh sản phẩm đại diện từ Unsplash cho mỗi banner.
3. THE PromoBanner SHALL hiển thị thông tin giảm giá và nút "Xem ngay" trên mỗi banner.
4. WHEN người dùng hover vào một banner, THE PromoBanner SHALL áp dụng hiệu ứng zoom-in hình ảnh và overlay gradient màu orange.
5. WHEN màn hình có chiều rộng nhỏ hơn 768px, THE PromoBanner SHALL chuyển sang bố cục 1 cột dọc.

---

### Requirement 7: Grid Sản Phẩm Bán Chạy

**User Story:** As a người dùng, I want xem danh sách sản phẩm bán chạy với đầy đủ thông tin, so that tôi có thể so sánh và chọn mua sản phẩm phù hợp.

#### Acceptance Criteria

1. THE ProductGrid SHALL hiển thị tối thiểu 8 ProductCard sản phẩm bán chạy từ MockData theo bố cục grid 4 cột.
2. THE ProductCard SHALL hiển thị: hình ảnh sản phẩm (Unsplash), tên sản phẩm, giá gốc, giá khuyến mãi, phần trăm giảm giá, rating sao (1-5), số lượt đánh giá.
3. THE ProductCard SHALL hiển thị badge "Giảm X%" với màu đỏ ở góc trên trái hình ảnh khi sản phẩm có giảm giá.
4. THE ProductCard SHALL hiển thị badge "Bán chạy" hoặc "Mới" với màu orange cho sản phẩm được đánh dấu trong MockData.
5. WHEN người dùng hover vào ProductCard, THE ProductCard SHALL áp dụng hiệu ứng 3D tilt (CSS perspective transform) và hiển thị nút "Thêm vào giỏ" overlay.
6. WHEN người dùng click "Thêm vào giỏ" trên ProductCard, THE CartStore SHALL thêm sản phẩm vào giỏ hàng và hiển thị toast notification thành công.
7. THE ProductCard SHALL hiển thị icon yêu thích (heart) ở góc trên phải, toggle trạng thái khi click.
8. THE ProductGrid SHALL hiển thị nút "Xem tất cả sản phẩm" ở cuối section với hiệu ứng NeonGlow.
9. WHEN màn hình có chiều rộng nhỏ hơn 1024px, THE ProductGrid SHALL chuyển sang bố cục 2 cột.
10. WHEN màn hình có chiều rộng nhỏ hơn 640px, THE ProductGrid SHALL chuyển sang bố cục 1 cột.

---

### Requirement 8: Giỏ Hàng (Cart)

**User Story:** As a người dùng, I want quản lý giỏ hàng của mình, so that tôi có thể xem lại và điều chỉnh sản phẩm trước khi thanh toán.

#### Acceptance Criteria

1. THE CartStore SHALL lưu trữ danh sách sản phẩm trong giỏ hàng với thông tin: id, tên, giá, số lượng, hình ảnh.
2. WHEN người dùng click icon giỏ hàng trong Header, THE Store SHALL hiển thị cart drawer từ bên phải màn hình.
3. THE Store SHALL hiển thị danh sách sản phẩm trong giỏ hàng kèm tổng tiền trong cart drawer.
4. WHEN người dùng thay đổi số lượng sản phẩm trong cart drawer, THE CartStore SHALL cập nhật số lượng và tổng tiền ngay lập tức.
5. WHEN người dùng click nút xóa sản phẩm trong cart drawer, THE CartStore SHALL xóa sản phẩm khỏi giỏ hàng.
6. IF giỏ hàng trống, THEN THE Store SHALL hiển thị thông báo "Giỏ hàng trống" với icon minh họa trong cart drawer.
7. THE CartStore SHALL duy trì trạng thái giỏ hàng trong phiên làm việc (session) bằng localStorage.

---

### Requirement 9: Footer

**User Story:** As a người dùng, I want xem thông tin cam kết và liên kết hữu ích ở cuối trang, so that tôi tin tưởng vào cửa hàng và dễ dàng tìm thông tin cần thiết.

#### Acceptance Criteria

1. THE Footer SHALL hiển thị 3 cam kết chính: "Cam kết chính hãng 100%", "Giá tốt mỗi ngày", "Bảo mật thông tin".
2. THE Footer SHALL hiển thị các cột liên kết: Về chúng tôi, Chính sách, Hỗ trợ khách hàng, Kết nối với chúng tôi.
3. THE Footer SHALL hiển thị icon mạng xã hội (Facebook, Instagram, YouTube, TikTok) với hiệu ứng hover NeonGlow.
4. THE Footer SHALL hiển thị thông tin bản quyền và năm hiện tại.
5. THE Footer SHALL sử dụng nền màu tối (dark) với gradient và các đường viền NeonGlow trang trí.

---

### Requirement 10: Hiệu Ứng Giao Diện Công Nghệ

**User Story:** As a người dùng, I want trải nghiệm giao diện với các hiệu ứng công nghệ ấn tượng, so that trang web tạo cảm giác hiện đại và chuyên nghiệp.

#### Acceptance Criteria

1. THE Store SHALL hiển thị ParticleEffect (các hạt chuyển động) trên nền HeroBanner bằng CSS animation hoặc canvas.
2. THE Store SHALL áp dụng smooth scroll behavior cho toàn bộ trang.
3. WHEN các section được cuộn vào viewport, THE Store SHALL kích hoạt scroll-triggered animations (fade-in, slide-up) bằng Intersection Observer API.
4. THE Store SHALL áp dụng gradient background với màu tech (xanh #00D4FF, tím #7B2FBE, cam #FF6B35) cho các section chính.
5. THE Store SHALL hiển thị NeonGlow effect (CSS box-shadow với màu orange/cyan) trên các nút CTA và viền card quan trọng.
6. THE Store SHALL áp dụng GlassmorphismCard (backdrop-filter: blur(10px), background: rgba(255,255,255,0.1)) cho các card overlay trên nền tối.
7. THE 3DCard SHALL áp dụng CSS perspective(1000px) và rotateX/rotateY transform theo vị trí chuột khi hover.
8. THE Store SHALL sử dụng CSS custom properties (variables) để quản lý màu sắc theme nhất quán.
9. WHEN trang được tải lần đầu, THE Store SHALL hiển thị loading animation với logo và progress bar màu orange.

---

### Requirement 11: Mock Data và Hình Ảnh

**User Story:** As a developer, I want dữ liệu mock được tổ chức tốt, so that giao diện hiển thị đầy đủ và thực tế mà không cần backend.

#### Acceptance Criteria

1. THE Store SHALL sử dụng MockData được định nghĩa trong file TypeScript riêng biệt tại `src/data/mockData.ts`.
2. THE MockData SHALL chứa tối thiểu 12 sản phẩm với đầy đủ thông tin: id, name, price, originalPrice, discount, rating, reviewCount, category, badge, imageUrl.
3. THE MockData SHALL chứa tối thiểu 6 danh mục với: id, name, icon, productCount, imageUrl.
4. THE MockData SHALL chứa tối thiểu 3 slide HeroBanner với: id, title, subtitle, ctaText, imageUrl, gradient.
5. THE Store SHALL sử dụng hình ảnh từ Unsplash (https://images.unsplash.com) hoặc placeholder service (https://picsum.photos) cho tất cả hình ảnh sản phẩm và banner.
6. THE next.config.ts SHALL được cập nhật để cho phép load hình ảnh từ domain `images.unsplash.com` và `picsum.photos`.
