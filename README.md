# Portfolio Website

A modern, interactive portfolio website built with Next.js and TypeScript, featuring a purple neon theme, smooth animations, and dynamic content integration.

**Live Demo:** [https://portfolio-gagan-sl.vercel.app/](https://portfolio-gagan-sl.vercel.app/)

## ✨ Features

- **Modern UI/UX**: Purple neon-themed design with smooth animations and transitions
- **Responsive Design**: Fully responsive across all devices and screen sizes
- **Interactive Components**:
  - Animated hero section with 3D globe
  - Bento grid layout with video backgrounds
  - Project showcase with modal details
  - Work experience timeline
  - Education cards
  - GitHub contributions graph (dynamically fetched)
  - Skills showcase
  - Client testimonials
- **Performance Optimized**: Lazy loading, optimized assets, and efficient rendering
- **Error Monitoring**: Integrated with Sentry for error tracking
- **Dynamic Content**: GitHub contributions fetched via API

## 🚀 Technologies Used

### Core Framework
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **React 18** - UI library

### Styling & Animation
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **CSS Modules** - Component-scoped styles

### 3D Graphics
- **Three.js** - 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for react-three-fiber
- **three-globe** - 3D globe visualization

### Other Libraries
- **React Icons** - Icon library
- **React Lottie** - Animation support
- **Sentry** - Error tracking and monitoring
- **clsx & tailwind-merge** - Utility functions

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)

### Verifying Installation

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Git version
git --version
```

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/portfolio.git
cd portfolio
```

### 2. Install Dependencies

```bash
npm install
```

**Note:** If you encounter `npm is not recognized` error on Windows:
- Ensure Node.js is installed from [nodejs.org](https://nodejs.org/)
- Add Node.js to your system PATH:
  - **Temporary (current session):**
    ```powershell
    $env:Path += ";C:\Program Files\nodejs"
    ```
  - **Permanent:** Add `C:\Program Files\nodejs` to System Environment Variables → Path

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### 4. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
portfolio/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── github-contributions/  # GitHub contributions API
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── BentoGrid.tsx
│   │   ├── FloatingNavbar.tsx
│   │   ├── Globe.tsx
│   │   └── ...
│   ├── Education.tsx
│   ├── Experience.tsx
│   ├── GithubContributions.tsx
│   ├── Hero.tsx
│   ├── RecentProjects.tsx
│   └── ...
├── data/                  # Data files
│   └── index.ts          # Centralized data (projects, skills, etc.)
├── lib/                   # Utility functions
│   └── utils.ts
├── public/                # Static assets
│   ├── *.mp4            # Video files
│   ├── *.svg            # SVG icons
│   └── ...
├── sentry.client.config.ts  # Sentry configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── package.json          # Dependencies and scripts
```

## 🎨 Customization

### Updating Content

All content is centralized in `data/index.ts`:

- **Projects**: Edit `projects` array
- **Skills**: Edit `Skills` array
- **Work Experience**: Edit `workExperience` array
- **Education**: Edit `education` array
- **GitHub Username**: Update `githubContributions.username`

### Styling

- **Theme Colors**: Edit `tailwind.config.ts` for color customization
- **Purple Neon Theme**: Colors are defined with `rgba(203, 172, 249, ...)` values
- **Component Styles**: Modify individual component files in `components/`

### GitHub Contributions

The GitHub contributions graph automatically fetches data from:
- API: `https://github-contributions-api.deno.dev/{username}.json`
- Username is configured in `data/index.ts` → `githubContributions.username`

## 🐛 Troubleshooting

### TypeScript Errors

If you see TypeScript errors:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use

If port 3000 is already in use:
```bash
# Use a different port
npm run dev -- -p 3001
```

### Module Not Found Errors

```bash
# Clear Next.js cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

### GitHub Contributions Not Loading

- Check your internet connection
- Verify the GitHub username in `data/index.ts`
- Check browser console for API errors
- The API may have rate limits - wait a few minutes and retry

### Video Performance Issues

If videos are causing performance issues:
- Compress videos to 1080p or 720p resolution
- Use FFmpeg or HandBrake to reduce file sizes
- Consider using WebM format for better compression

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure settings
4. Click "Deploy"

### Environment Variables

If you need environment variables:
1. Go to your Vercel project settings
2. Add variables in the "Environment Variables" section
3. Redeploy your application

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and personal.

## 👤 Author

**Gagan SL**
- GitHub: [@gagan-sl6](https://github.com/gagan-sl6)
- Portfolio: [https://portfolio-gagan-sl.vercel.app/](https://portfolio-gagan-sl.vercel.app/)
