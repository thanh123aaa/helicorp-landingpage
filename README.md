# HelioWatch Gen 3 - Landing Page

Trang giới thiệu sản phẩm đồng hồ thông minh sức khỏe Titanium cao cấp **HelioWatch Gen 3** với thiết kế hiện đại, tối ưu hóa hiệu năng và tích hợp các tính năng tương tác thông minh.

---

## 🚀 Tính Năng Nổi Bật (Features)

*   **UI/UX Cao Cấp**: Giao diện chuyển đổi Dark/Light Mode mượt mà (lưu trạng thái qua `localStorage`), thiết kế dạng Bento Grid thời thượng, hiệu ứng Parallax ở Hero section và cuộn trang mượt mà.
*   **Mini E-commerce**:
    *   **Tùy biến sản phẩm (Customizer)**: Thay đổi màu sắc (Space Gray, Stellar Silver, Royal Gold, Rose Quartz), size vỏ (41mm/45mm) và các loại dây đeo. Ảnh tự động cập nhật theo cấu hình lựa chọn.
    *   **Giỏ hàng & Yêu thích (Cart & Wishlist)**: Slide-out drawer lưu trữ và cập nhật số lượng trực quan, đồng bộ tự động với `localStorage`.
    *   **Lịch sử xem**: Lưu trữ danh sách các phiên bản màu đồng hồ người dùng vừa bấm xem qua.
*   **Đăng Ký Nhận Tin (Newsletter Form)**: Kiểm tra thông tin đầu vào chuẩn Việt Nam, gửi dữ liệu POST đến webhook thực tế và hỗ trợ đổi địa chỉ Webhook linh hoạt ngay trên UI.
*   **Theo Dõi Hành Vi (Tracking System)**: Hook `useTracking` ghi lại các sự kiện tương tác (click, cuộn trang đạt 25%-100%, chọn màu/size, thêm giỏ hàng) hiển thị trực tiếp lên Developer Console Panel ở góc dưới màn hình.
*   **AI Chatbot (Helio Assistant)**: Hỗ trợ tư vấn khách hàng tự động bằng Tiếng Việt dựa trên các từ khóa sản phẩm hoặc kết nối trực tiếp với Google Gemini AI khi cấu hình API Key.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

*   **Core**: React 18, TypeScript, Vite.
*   **Styling**: Pure CSS (Vanilla CSS) giúp bundle nhẹ tối đa (Bundle CSS chỉ **5.2 KB**).
*   **Icons**: Lucide React.
*   **State**: Context API (ShopContext, ThemeContext, ToastContext, TrackingContext).

---

## 📈 Tối Ưu SEO & Hiệu Năng

*   Cấu hình đầy đủ thẻ Meta (Title, Description, Keywords, Open Graph) và Structured Data JSON-LD hỗ trợ hiển thị Rich Snippets trên công cụ tìm kiếm.
*   Tối ưu hóa hình ảnh thế hệ mới WebP đã nén, khai báo kích thước ảnh chống CLS.
*   *Kết quả build*: CSS chỉ ~5 KB, JS chỉ ~90 KB (sau gzip).

---

## 💻 Hướng Dẫn Cài Đặt và Chạy Local

1.  **Clone repository**:
    ```bash
    git clone https://github.com/thanh123aaa/helicorp-landingpage.git
    cd helicorp-landingpage
    ```

2.  **Cài đặt thư viện**:
    ```bash
    npm install
    ```

3.  **Khởi chạy local server**:
    ```bash
    npm run dev
    ```
    Truy cập địa chỉ hiển thị trên terminal (thường là `http://localhost:5173`).

4.  **Build sản phẩm**:
    ```bash
    npm run build
    ```

---

## 🌐 Triển khai (Deployment)
*   **Link Deploy**: [https://helicorp-landingpage.vercel.app/](https://helicorp-landingpage.vercel.app/)
