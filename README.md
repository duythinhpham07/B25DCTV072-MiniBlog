# MiniBlog – React + TypeScript (Vite)

Phạm Duy Thịnh – B25DCTV072 – Lập trình Web

Ứng dụng blog nhỏ viết bằng React + TypeScript, lấy dữ liệu bài viết và bình luận từ [JSONPlaceholder](https://jsonplaceholder.typicode.com) bằng `fetch`, điều hướng bằng React Router.

## Chức năng

| # | Yêu cầu | Cách làm |
|---|---------|----------|
| 1 | Trang chủ hiển thị danh sách bài viết, tìm kiếm theo tiêu đề | `HomePage` lấy `/posts`, lọc theo tiêu đề (không phân biệt hoa thường, bỏ khoảng trắng thừa) |
| 2 | Xem chi tiết bài viết kèm bình luận | `PostDetailPage` (`/posts/:id`) lấy `/posts/:id` và `/posts/:id/comments` |
| 3 | Trạng thái đang tải và thông báo lỗi | Custom hook `useFetch` trả về `data / loading / error`; báo lỗi riêng khi mất mạng hoặc server lỗi |
| 4 | Đăng nhập / đăng xuất (`admin` / `123456`), chỉ người đã đăng nhập mới vào được trang viết bài | `AuthContext` lưu người dùng vào localStorage; `ProtectedRoute` chặn `/new`, đăng nhập xong quay lại đúng trang đang muốn vào |
| 5 | Form viết bài có kiểm tra dữ liệu, bài mới lưu localStorage và hiện cùng danh sách | `NewPostPage`: tiêu đề 5–100 ký tự, nội dung ≥ 20 ký tự; bài mới hiện đầu danh sách và xem chi tiết được |
| 6 | Trang 404 | Route `*` → `NotFoundPage`; `/posts/abc` hoặc bài không tồn tại (`/posts/999`) cũng hiện 404 |

### Làm thêm

- **Xóa bài viết của mình**: nút Xóa ở trang chi tiết, chỉ hiện với bài do người đang đăng nhập viết, có hỏi xác nhận trước khi xóa.
- **Phân trang**: 10 bài mỗi trang. Trang đang xem và từ khóa tìm kiếm được lưu vào sessionStorage (`useSessionState`), nên từ trang chi tiết quay lại vẫn giữ nguyên.
- **Tên tác giả**: lấy từ API `/users`; nếu API này lỗi thì hiện tạm "Tác giả #id", không ảnh hưởng danh sách bài viết.
- **Giao diện sáng/tối**: nút mặt trăng/mặt trời trên header (`useTheme`), lần đầu theo cài đặt của máy, lựa chọn được lưu vào localStorage.
- **Lọc theo tác giả**: hàng 10 tác giả ở đầu trang chủ, bấm vào một người để xem bài của người đó, bấm lại để bỏ lọc.

## Giao diện

- Mỗi tác giả có một màu riêng (`src/utils/authors.ts`), dùng cho avatar, vạch màu bên trái mỗi bài và phần đầu trang đọc bài. Phần còn lại của trang chỉ dùng màu chàm và trắng để màu tác giả nổi lên.
- Font của người Việt thiết kế: **Phudu** (tiêu đề lớn, chỉ có chữ hoa) và **Be Vietnam Pro** (nội dung, tiêu đề bài). Font được cài bằng `@fontsource` nên chạy không cần mạng.

## Cấu trúc

```
src/
├── api.ts                    # đường dẫn API JSONPlaceholder
├── types.ts                  # kiểu Post, Comment, User, Author
├── App.tsx                   # khai báo các route
├── main.tsx
├── index.css
├── context/AuthContext.tsx   # đăng nhập / đăng xuất
├── hooks/
│   ├── useFetch.ts           # gọi API: data / loading / error
│   ├── useSessionState.ts    # useState có lưu vào sessionStorage
│   └── useTheme.ts           # giao diện sáng / tối
├── utils/
│   ├── localPosts.ts         # đọc / ghi / xóa bài viết trong localStorage
│   └── authors.ts            # màu riêng và chữ viết tắt của từng tác giả
├── components/
│   ├── Header.tsx
│   ├── ProtectedRoute.tsx
│   ├── AuthorFilter.tsx
│   ├── Avatar.tsx
│   ├── PostCard.tsx
│   ├── Pagination.tsx
│   ├── Loading.tsx
│   └── ErrorMessage.tsx
└── pages/
    ├── HomePage.tsx
    ├── PostDetailPage.tsx
    ├── LoginPage.tsx
    ├── NewPostPage.tsx
    └── NotFoundPage.tsx
```

## Các đường dẫn

| Đường dẫn | Trang |
|-----------|-------|
| `/` | Danh sách bài viết |
| `/posts/:id` | Chi tiết bài viết + bình luận |
| `/login` | Đăng nhập |
| `/new` | Viết bài (cần đăng nhập) |
| còn lại | 404 |

## Chạy

```
npm install
npm run dev
```

Build: `npm run build` (có chạy `tsc` kiểm tra kiểu trước khi build).

Ghi chú: JSONPlaceholder là API giả nên bài viết mới chỉ được lưu trong localStorage của trình duyệt, không gửi lên server. Bài viết lưu trong máy chưa có bình luận.
