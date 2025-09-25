# Mektec Web App

A modern web application built with React, TypeScript, and Material-UI for creating and managing animation flows.

## 🚀 Features

- **Authentication System**: JWT-based authentication with refresh tokens
- **Protected Routes**: Role-based access control
- **Responsive Design**: Material-UI components with mobile-first approach
- **Animation Studio**: Integrated animation creation tools
- **Environment Configuration**: Support for development, staging, and production
- **Type Safety**: Full TypeScript support
- **Modern Build**: Vite for fast development and optimized builds

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Material-UI
- **Routing**: React Router v6
- **State Management**: React Context API
- **Forms**: React Hook Form with Yup validation
- **HTTP Client**: Axios with interceptors
- **Build Tool**: Vite
- **Package Manager**: pnpm

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── common/         # Common components
│   └── layout/         # Layout components
├── config/             # Configuration files
│   ├── environment.ts  # Environment variables
│   └── domains.ts      # Domain configurations
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── pages/              # Page components
├── router/             # Routing configuration
├── services/           # API services
├── theme/              # Material-UI theme
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm 8+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mektec
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy environment file
   cp env.development .env
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

## 🌍 Environment Configuration

The application supports multiple environments with different configurations:

### Development
```bash
pnpm dev
# or
pnpm dev:staging
pnpm dev:production
```

### Build
```bash
# Build for production
pnpm build

# Build for staging
pnpm build:staging

# Build for development
pnpm build:dev
```

### Environment Files

- `env.development` - Development environment
- `env.staging` - Staging environment  
- `env.production` - Production environment

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_APP_ENV` | Environment (development/staging/production) | development |
| `VITE_API_BASE_URL` | API base URL | http://localhost:3000/api |
| `VITE_API_TIMEOUT` | API timeout in ms | 10000 |
| `VITE_JWT_SECRET` | JWT secret key | - |
| `VITE_REFRESH_TOKEN_SECRET` | Refresh token secret | - |
| `VITE_ENABLE_DEBUG` | Enable debug mode | true |
| `VITE_ENABLE_ANALYTICS` | Enable analytics | false |

### Domain Configuration

The application automatically configures domains based on environment:

- **Development**: `http://localhost:5173`
- **Staging**: `https://staging.mektec.com`
- **Production**: `https://mektec.com`

## 🚀 Deployment

### Using Scripts

```bash
# Build and deploy to staging
./scripts/deploy.sh staging

# Build and deploy to production
./scripts/deploy.sh production
```

### Manual Deployment

1. **Build the application**
   ```bash
   pnpm build
   ```

2. **Deploy to server**
   ```bash
   # Copy dist/ folder to your web server
   rsync -avz dist/ user@server:/var/www/mektec/
   ```

## 🔐 Authentication

The application uses JWT-based authentication with the following features:

- **Access Tokens**: Short-lived tokens for API requests
- **Refresh Tokens**: Long-lived tokens for token renewal
- **Auto Refresh**: Automatic token refresh on API calls
- **Protected Routes**: Route protection based on authentication status
- **Role-based Access**: Access control based on user roles

## 🛡️ Security Features

- **CORS Configuration**: Environment-specific CORS settings
- **Token Validation**: JWT token validation and expiration checks
- **Secure Headers**: Security headers for production
- **Input Validation**: Form validation with Yup schemas
- **Error Handling**: Comprehensive error handling and logging

## 📱 Responsive Design

The application is fully responsive with:

- **Mobile-first approach**: Optimized for mobile devices
- **Breakpoint system**: Material-UI breakpoint system
- **Touch-friendly**: Touch-optimized interactions
- **Accessibility**: WCAG compliance

## 🧪 Testing

```bash
# Run type checking
pnpm type-check

# Run linter
pnpm lint

# Fix linting issues
pnpm lint:fix
```

## 📦 Build Optimization

The build process includes:

- **Code Splitting**: Automatic code splitting for better performance
- **Tree Shaking**: Dead code elimination
- **Minification**: JavaScript and CSS minification
- **Asset Optimization**: Image and asset optimization
- **Bundle Analysis**: Bundle size analysis

## 🔧 Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run linter
- `pnpm type-check` - Run TypeScript type checking

### Code Style

- **ESLint**: Code linting with TypeScript support
- **Prettier**: Code formatting (if configured)
- **TypeScript**: Strict type checking
- **Material-UI**: Component-based architecture

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📞 Support

For support and questions, please contact the development team.