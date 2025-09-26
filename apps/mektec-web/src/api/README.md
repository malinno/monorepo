# API Functions

Thư mục này chứa các hàm API được tổ chức theo module.

## Cấu trúc

```
api/
├── auth.ts          # Authentication APIs
├── index.ts         # Export tất cả APIs
└── README.md        # Tài liệu này
```

## Sử dụng

### 1. Import API functions

```typescript
import { authApi } from "../api/auth";
// hoặc
import { authApi } from "../api";
```

### 2. Sử dụng trong component

```typescript
import { useAuthContext } from "../contexts/AuthContext";

const MyComponent = () => {
  const { login, logout, user, isAuthenticated } = useAuthContext();

  const handleLogin = async () => {
    try {
      await login({
        accountName: "username",
        password: "password",
      });
      console.log("Đăng nhập thành công!");
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Xin chào, {user?.name}!</p>
          <button onClick={logout}>Đăng xuất</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Đăng nhập</button>
      )}
    </div>
  );
};
```

## API Endpoints

### Authentication (`/auth`)

- `POST /auth/login` - Đăng nhập
- `POST /auth/logout` - Đăng xuất
- `POST /auth/refresh` - Làm mới token
- `GET /auth/profile` - Lấy thông tin user
- `POST /auth/change-password` - Đổi mật khẩu
- `POST /auth/forgot-password` - Quên mật khẩu
- `POST /auth/reset-password` - Reset mật khẩu

## State Management

Ứng dụng sử dụng Zustand để quản lý state:

- `useAuth()` - Lấy state (user, isAuthenticated, isLoading, error)
- `useAuthActions()` - Lấy actions (login, logout, refreshToken, etc.)
- `useAuthContext()` - Hook tổng hợp cho backward compatibility

## LocalStorage

Tokens được tự động lưu vào localStorage và khôi phục khi reload trang.
