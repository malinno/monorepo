# Development Guide

## 🚀 Quick Start

### 1. Development Mode (Recommended)

```bash
# Start development server with mock API
pnpm dev
```

**Login Credentials:**

- Email: `test@mektec.com`
- Password: `password`

### 2. Environment Modes

#### Development (Default)

- **Frontend**: http://localhost:5173
- **API**: http://localhost:3000/api (Mock API)
- **Features**: Mock API enabled, Debug mode on

#### Staging

```bash
pnpm dev:staging
```

- **Frontend**: http://localhost:5174
- **API**: http://localhost:3001/api

#### Production

```bash
pnpm dev:production
```

- **Frontend**: http://localhost:5175
- **API**: http://localhost:3002/api

## 🔧 Configuration

### Environment Variables

The app uses different environment files:

- `env.development` - Development settings
- `env.staging` - Staging settings
- `env.production` - Production settings

### Mock API

When `VITE_ENABLE_MOCK_API=true` and `VITE_APP_ENV=development`:

- ✅ Mock API responses are used
- ✅ No backend server required
- ✅ Pre-configured test data
- ✅ Simulated network delays

### Real API

When `VITE_ENABLE_MOCK_API=false`:

- ❌ Requires backend server running
- ❌ Real API endpoints must be available
- ❌ Database connection required

## 🛠️ Development Features

### Mock API Service

The mock API provides:

- **Authentication**: Login/logout with test credentials
- **User Management**: Profile operations
- **Animation Data**: Sample animation flows
- **Error Simulation**: Various error scenarios

### Test Credentials

```
Email: test@mektec.com
Password: password
```

### Mock Data

- **Users**: Pre-configured test user
- **Animations**: Sample animation flows
- **Tokens**: Mock JWT tokens for testing

## 🚀 Building

### Development Build

```bash
pnpm build:dev
```

### Staging Build

```bash
pnpm build:staging
```

### Production Build

```bash
pnpm build
```

## 🔍 Debugging

### Mock API Indicator

When mock API is enabled, you'll see a yellow indicator in the top-right corner showing:

- Mock API is active
- Test credentials
- Current mode

### Console Logs

Mock API responses are logged to console for debugging:

- Request/response details
- Simulated delays
- Error scenarios

## 📁 Project Structure

```
src/
├── config/
│   ├── environment.ts    # Environment variables
│   ├── domains.ts        # Domain configurations
│   └── mockApi.ts        # Mock API responses
├── services/
│   ├── api.ts           # Real API service
│   └── mockService.ts   # Mock API service
└── components/
    └── common/
        └── MockApiIndicator.tsx  # Mock API indicator
```

## 🔄 Switching Between Modes

### Enable Mock API

```bash
# In env.development
VITE_ENABLE_MOCK_API=true
VITE_APP_ENV=development
```

### Disable Mock API

```bash
# In env.development
VITE_ENABLE_MOCK_API=false
VITE_APP_ENV=development
```

## 🐛 Troubleshooting

### Common Issues

1. **Mock API not working**

   - Check `VITE_ENABLE_MOCK_API=true`
   - Verify `VITE_APP_ENV=development`

2. **Login fails**

   - Use test credentials: `test@mektec.com` / `password`
   - Check console for error messages

3. **API calls fail**
   - Ensure backend server is running (if not using mock)
   - Check API base URL configuration

### Debug Mode

Enable debug mode for detailed logging:

```bash
VITE_ENABLE_DEBUG=true
```

## 📝 Notes

- Mock API is only available in development mode
- Real API requires backend server setup
- Environment files are loaded based on build mode
- All configurations are type-safe with TypeScript
