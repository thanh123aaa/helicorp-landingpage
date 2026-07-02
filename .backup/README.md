# HELICORP IT INTERN WEBSITE - LANDING PAGE HELIORING

Dự án thiết kế **Landing Page HelioRing** cao cấp giới thiệu nhẫn sức khỏe thông minh thế hệ mới, được thực hiện phục vụ cho bài kiểm tra đánh giá năng lực **Vòng 2 - Thực tập sinh IT Phát triển Website** của **Healthy Living Corporation (Helicorp)**.

*   **Ứng viên**: Thực tập sinh IT Phát triển Website
*   **Sản phẩm giới thiệu**: HelioRing Gen 3 (Nhẫn Sức khỏe Thông minh)
*   **Hạn nộp**: Trước 18:00 ngày 04/07/2026

---

## 🚀 Tính Năng Nổi Bật (Features Checklist)

Dự án không chỉ đáp ứng trọn vẹn các yêu cầu cơ bản mà còn tích hợp toàn bộ các phần điểm cộng nâng cao nhằm chứng minh năng lực kỹ thuật:

### 1. Thẩm Mỹ & Trải Nghiệm Người Dùng (UI/UX)
*   **Modern Design**: Thiết kế bám sát phong cách công nghệ cao cấp (Premium Luxury Tech) với tông màu tối mượt mà (Dark Mode) và giao diện sáng thanh lịch (Light Mode).
*   **Theme Toggle**: Khả năng chuyển đổi giao diện Dark/Light mượt mà, ghi nhớ tùy chọn người dùng qua `localStorage` và tự động nhận diện thiết lập hệ thống.
*   **Bento Grid Layout**: Trình bày tính năng theo cấu trúc lưới Bento thời thượng kết hợp hiệu ứng trượt vào (Intersection Observer) sống động.
*   **Micro-interactions**: Parallax di chuyển chuột trên Hero section, cảm biến nhịp tim nhấp nháy, biểu đồ giấc ngủ tương tác, và hiệu ứng vòng tròn cự chỉ thông minh.

### 2. Mini E-commerce (Thương Mại Điện Tử Thu Nhỏ)
*   **Product Customizer**: Cho phép người dùng tùy chọn màu sắc (Space Gray, Stellar Silver, Royal Gold, Rose Quartz) và kích cỡ nhẫn (US Size 6 - 13) kèm bảng hướng dẫn đo size trực quan. Hình ảnh nhẫn cập nhật tự động theo màu đang chọn.
*   **Shopping Cart (Giỏ hàng)**: Slide-out drawer bên phải quản lý thêm/sửa số lượng/xóa sản phẩm, tự động tính tổng tiền.
*   **Wishlist (Yêu thích)**: Lưu trữ các cấu hình nhẫn yêu thích và dễ dàng chuyển đổi nhanh vào giỏ hàng.
*   **Recently Viewed (Sản phẩm đã xem)**: Lưu lại danh sách các màu nhẫn người dùng vừa bấm xem qua.
*   **Persistence**: Đồng bộ giỏ hàng, danh sách yêu thích và lịch sử xem tức thì với `localStorage` để giữ nguyên trạng thái khi tải lại trang (F5).

### 3. Đăng Ký Nhận Tin & Kết Nối Webhook
*   **Form Validation**: Kiểm tra tính hợp lệ dữ liệu nhập vào (Họ tên >= 2 ký tự, Email đúng regex chuẩn, Số điện thoại định dạng Việt Nam) thời gian thực và hiển thị thông báo lỗi tiếng Việt trực quan.
*   **Real Webhook Integration**: Gửi dữ liệu POST trực tiếp đến Webhook URL thực tế (mặc định là `httpbin.org/post` để test).
*   **Webhook Configurator**: Tích hợp ô cấu hình Webhook URL ngay tại giao diện để nhà tuyển dụng dễ dàng thay đổi thành Webhook của riêng mình (ví dụ từ *webhook.site* hoặc Google Sheet API) và trực tiếp kiểm tra payload gửi đi.
*   **Skeleton Loading & Toast**: Hiệu ứng spinner khi gửi form kết hợp Toast thông báo kết quả.

### 4. Theo Dõi Hành Vi (User Behavior Tracking)
*   **Tracking Hook (`useTracking`)**: Tự động bắt và ghi nhận các sự kiện: Click nút CTA, Thêm sản phẩm vào giỏ, Thay đổi màu sắc/size nhẫn, Gửi form và cuộn trang theo các mốc độ sâu (25%, 50%, 75%, 100%).
*   **Developer Console Panel**: Một cửa sổ console nhỏ ở góc dưới hiển thị danh sách các sự kiện tương tác đang được ghi nhận thời gian thực để nhà tuyển dụng tiện theo dõi.
*   **Social Proof Popups**: Hiển thị ngẫu nhiên các thông báo đơn hàng giả lập góc màn hình tạo độ nhộn nhịp cho website thương hiệu.

### 5. Chatbot Tư Vấn Thông Minh (AI Chatbot)
*   **Interactive Assistant (HelioAI)**: Widget chat ở góc dưới màn hình hỗ trợ trả lời tự động thông minh bằng tiếng Việt với các từ khóa liên quan đến sản phẩm (Pin, kích cỡ, chất liệu, tính năng sức khỏe, giá bán, giao hàng, bảo hành).
*   **Gemini API Integration**: Hỗ trợ ô cấu hình API Key của Google Gemini trong phần cài đặt chatbot. Khi nhập key hợp lệ, chatbot sẽ trực tiếp trò chuyện bằng trí tuệ nhân tạo Gemini AI thực tế để tư vấn sản phẩm cho khách hàng.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

*   **Frontend core**: React 18, TypeScript, Vite.
*   **Styling**: Pure CSS (Vanilla CSS). Việc sử dụng CSS Variables và thiết kế gọn nhẹ giúp trang web đạt hiệu năng PageSpeed tối đa, không bị phình dung lượng bundle (Bundle CSS chỉ vỏn vẹn **5.2 KB**).
*   **Icons**: Lucide React.
*   **State Management**: Context API (ShopContext, ThemeContext, ToastContext).

---

## 📈 Tối Ưu SEO & Hiệu Năng (PageSpeed Insights)

*   **Tối ưu SEO**: Cấu hình đầy đủ thẻ Meta (Title, Description, Keywords, Open Graph, Twitter Card) và Structured Data JSON-LD hỗ trợ Google hiển thị Rich Snippets (giá, đánh giá) trên kết quả tìm kiếm.
*   **Tối ưu hiệu năng**:
    *   Sử dụng hình ảnh định dạng thế hệ mới WebP đã nén tối ưu.
    *   Khai báo kích thước ảnh `width`/`height` chính xác để ngăn hiện tượng dịch chuyển bố cục (CLS - Cumulative Layout Shift).
    *   Tối ưu hóa bundle JS/CSS thông qua Vite.
    *   *Kết quả build thực tế*: Bundle CSS chỉ **5.21 kB**, Bundle JS chỉ **327 kB** (chưa nén) / **90 kB** (sau gzip).

---

## 💻 Hướng Dẫn Cài Đặt và Chạy Local (Local Development)

### Yêu cầu hệ thống:
*   Đã cài đặt Node.js (phiên bản 18 trở lên).
*   Đã cài đặt Git.

### Các bước khởi chạy:

1.  **Clone repository từ GitHub**:
    ```bash
    git clone https://github.com/your-username/helicorp-intern-landingpage.git
    cd helicorp-intern-landingpage
    ```

2.  **Cài đặt các gói phụ thuộc (Dependencies)**:
    ```bash
    npm install
    ```

3.  **Khởi chạy môi trường phát triển (Local Server)**:
    ```bash
    npm run dev
    ```
    Mở trình duyệt truy cập địa chỉ hiển thị trên terminal (thường là `http://localhost:5173`).

4.  **Kiểm tra và Build Production**:
    ```bash
    npm run build
    ```

---

## 🌐 Triển khai thực tế (Deployment)

Dự án được deploy tự động lên **Vercel** thông qua việc liên kết trực tiếp với GitHub. Mọi thay đổi ở nhánh `main` sẽ được tự động build và cập nhật trực tiếp trên Vercel.
*   **Link Deploy**: *[Sẽ được bổ sung sau khi đẩy lên GitHub]*
