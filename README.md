# Interview Prep AI - Frontend

A modern, AI-powered interview preparation platform built with React and Vite. Master your interviews with personalized questions, instant explanations, and smart organization.

## 🚀 Live Demo

**[Try Interview Prep AI Now](https://interview-prep-frontend-five.vercel.app/)**

## ✨ Features

- **🤖 AI-Generated Questions**: Get personalized interview questions based on your role and experience
- **🧠 Smart Explanations**: Understand concepts with AI-powered explanations
- **📝 Question Organization**: Pin, filter, and organize questions for easy review
- **💾 Persistent Storage**: Save your progress and review anytime
- **🎯 Role-Specific Prep**: Customize preparation for different job roles
- **⚡ Real-time Responses**: Instant AI feedback without delays
- **📱 Responsive Design**: Works seamlessly on desktop and mobile
- **🔐 Secure Authentication**: JWT-based user authentication

## 📋 Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router v7
- **State Management**: React Context API
- **UI Components**: React Icons, Framer Motion
- **Markdown Rendering**: React Markdown with GFM support
- **Toast Notifications**: React Hot Toast
- **Deployment**: Vercel

## 🛠️ Installation

### Prerequisites

- Node.js v18 or higher
- npm or yarn

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/Muhammadyaqoobwako/interview-prep-frontend.git
cd interview-prep-frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment**

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8000
```

For production:

```env
VITE_API_URL=https://your-backend-url.app
```

4. **Start development server**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
src/
├── Pages/               # Main page components
│   ├── LandingPage.jsx
│   ├── Auth/
│   │   ├── Login.jsx
│   │   └── SignUp.jsx
│   ├── Home/
│   │   ├── Dashboard.jsx
│   │   └── CreateSessionForm.jsx
│   └── InterviewPrep/
│       └── InterviewPrep.jsx
├── components/          # Reusable components
│   ├── Cards/
│   ├── Inputs/
│   ├── Loader/
│   ├── layouts/
│   ├── Drawer.jsx
│   └── Modal.jsx
├── Context/             # State management
│   ├── userContext.jsx
│   └── userContextInstance.jsx
├── utils/               # Utility functions
│   ├── apiPaths.js
│   ├── axiosInstance.js
│   ├── helper.js
│   └── uploadImages.js
├── assets/              # Images and static files
├── App.jsx
├── main.jsx
└── index.css
```

## 🔄 User Flow

1. **Landing Page** → Introduction to the app
2. **Authentication** → Sign up or log in
3. **Dashboard** → View sessions and create new ones
4. **Create Session** → Define job role and requirements
5. **Interview Prep** → Generate questions and explanations
6. **Review & Organize** → Pin, filter, and take notes

## 🎯 Key Components

### UserContext

Global state management for user authentication and profile data.

### API Integration

- Centralized API paths in `utils/apiPaths.js`
- Axios instance with interceptors in `utils/axiosInstance.js`
- Automatic token attachment to requests

### Pages

- **Landing Page**: Marketing/intro page with call-to-action
- **Auth Pages**: Login and signup forms
- **Dashboard**: Session overview and management
- **Interview Prep**: Main interview prep interface

## 🔐 Authentication

Uses JWT tokens for secure authentication:

```javascript
// Token is stored in localStorage after login
localStorage.getItem("authToken");

// Token is automatically attached to API requests
// via axios interceptor (utils/axiosInstance.js)
```

## 🚀 Building for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

Preview the build:

```bash
npm run preview
```

## 📦 Build Optimization

- **Code Splitting**: Automatic with Vite
- **Asset Optimization**: Images optimized during build
- **CSS Minification**: Tailwind CSS purging included
- **Bundle Size**: Minimal and tree-shakeable dependencies

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. Push code to GitHub
2. Connect GitHub to [Vercel](https://vercel.com)
3. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variable:
   - `VITE_API_URL=<your-backend-url>`
5. Deploy automatically on every push

See [DEPLOYMENT.md](../../DEPLOYMENT.md) for detailed instructions.

## 🎨 Styling

Uses Tailwind CSS for styling with custom configuration:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      // Custom colors, fonts, etc.
    },
  },
};
```

## 🐛 Troubleshooting

### API Connection Issues

- Check `VITE_API_URL` environment variable
- Verify backend is running and accessible
- Check browser console for CORS errors
- Ensure backend CORS allows your frontend URL

### Authentication Issues

- Clear localStorage: `localStorage.clear()`
- Check token expiration in browser DevTools
- Verify JWT_SECRET matches backend

### Build Failures

- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`
- Check for case-sensitive filename issues (Windows vs Linux)

## 📝 Environment Variables Reference

| Variable       | Description          | Required |
| -------------- | -------------------- | -------- |
| `VITE_API_URL` | Backend API base URL | Yes      |

## ✅ Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint -- --fix
```

## 📚 Next Steps

- Add unit tests with Vitest
- Add E2E tests with Playwright
- Implement PWA features
- Add offline support
- Implement caching strategies
- Add analytics tracking
- Create mobile app with React Native

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## ✨ Credits

Built by Yaqoob | Interview Prep AI

---

**Questions or feedback?** Feel free to open an issue or reach out on LinkedIn!

## 🔗 Links

- **Live Demo**: [https://interview-prep-frontend-five.vercel.app/](https://interview-prep-frontend-five.vercel.app/)
- **Backend Repository**: [https://github.com/Muhammadyaqoobwako/interview-prep-backend](https://github.com/Muhammadyaqoobwako/interview-prep-backend)
- **Deployment Guide**: [DEPLOYMENT.md](../../DEPLOYMENT.md)
