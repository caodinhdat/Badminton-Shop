# 🏸 Badminton E-Commerce Website (Frontend)

> Trang web bán hàng cầu lông được xây dựng bằng **Vue 3**, tích hợp giỏ hàng, thanh toán, xác thực người dùng, và dashboard dành cho admin.

---

## 🚀 Công nghệ sử dụng

| Công nghệ      | Vai trò                           |
|----------------|-----------------------------------|
| Vue 3          | Framework frontend chính          |
| Vite           | Công cụ build, dev server nhanh   |
| Vue Router     | Điều hướng giữa các trang         |
| Pinia          | Quản lý state toàn cục            |
| Axios          | Gửi HTTP request tới backend      |
| TailwindCSS    | (Tuỳ chọn) Thiết kế giao diện đẹp |

---

## 🖼️ Các màn hình chính

1. **Home** – Hiển thị danh sách sản phẩm cầu lông  
2. **Product Detail** – Trang chi tiết sản phẩm khi click  
3. **Checkout** – Trang giỏ hàng và thanh toán  
4. **Payment Result** – Kết quả sau khi thanh toán  
5. **User Profile** – Thông tin tài khoản  
6. **Admin Dashboard** – Quản lý sản phẩm, đơn hàng *(chỉ Admin truy cập được)*

---

## 📁 Cấu trúc thư mục `src/`

```bash
src/
├── assets/                        # 📁 Hình ảnh, font, logo, CSS dùng chung
│   └── logo.png                   #    → Logo cửa hàng
│
├── components/                    # 🧩 Các component tái sử dụng
│   ├── common/                    #    → Nút, form, modal, spinner,...
│   │   ├── BaseButton.vue
│   │   ├── BaseInput.vue
│   │   └── LoadingSpinner.vue
│   ├── layout/                    #    → Header, Footer, Sidebar,...
│   │   ├── AppHeader.vue
│   │   ├── AppFooter.vue
│   │   └── AdminSidebar.vue
│   └── product/                   #    → ProductCard, Rating, ImageSlider
│       ├── ProductCard.vue
│       ├── RatingStars.vue
│       └── ProductImageSlider.vue
│
├── pages/                         # 📄 Các trang chính
│   ├── Home.vue                   # Trang chủ
│   ├── ProductDetail.vue          # Chi tiết sản phẩm
│   ├── Checkout.vue               # Trang giỏ hàng / thanh toán
│   ├── PaymentResult.vue          # Kết quả thanh toán
│   ├── Profile.vue                # Trang thông tin người dùng
│   └── admin/
│       └── Dashboard.vue          # Trang dashboard admin
│
├── router/                        # 🔀 Cấu hình định tuyến (Vue Router)
│   └── index.js                   # Route config và guard phân quyền
│
├── store/                         # 📦 Quản lý state toàn cục bằng Pinia
│   ├── userStore.js               # Trạng thái người dùng (login/logout)
│   ├── cartStore.js               # Trạng thái giỏ hàng
│   └── productStore.js            # Trạng thái danh sách sản phẩm
│
├── services/                      # 🌐 Giao tiếp với backend Spring Boot
│   ├── authService.js             # Đăng ký, đăng nhập
│   ├── productService.js          # Lấy danh sách / chi tiết sản phẩm
│   ├── orderService.js            # Tạo và xem đơn hàng
│   └── paymentService.js          # Giao tiếp với cổng thanh toán
│
├── utils/                         # 🛠️ Hàm tiện ích dùng chung
│   └── helpers.js                 # formatCurrency, formatDate,...
│
├── App.vue                        # 🎬 Root component
├── main.js                        # 🚪 Entry point của ứng dụng Vue
└── vite.config.js                 # ⚙️ Cấu hình Vite (build tool)


