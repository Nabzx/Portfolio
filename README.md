# Nabil Shah - Portfolio Website

A modern, animated portfolio website built with Next.js 14, React, Framer Motion, and TailwindCSS. Features a unique, colorful design with smooth animations, glassmorphism effects, and a fully responsive layout.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 with App Router, TypeScript, TailwindCSS
- **Smooth Animations**: Framer Motion for section transitions, hover effects, and timeline animations
- **Dark/Light Mode**: Theme toggle with persistent preference
- **Command Palette**: Press `CMD/CTRL + K` to quickly navigate
- **Smooth Scrolling**: Section-based navigation with scroll snapping
- **Background Effects**: Animated particle system with connecting lines
- **Responsive Design**: Fully optimized for all screen sizes
- **SEO Optimized**: Complete metadata and Open Graph tags
- **Easter Egg**: Hidden `/chess` page

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build for Production

```bash
npm run build
```

This will generate a static export in the `out` directory, ready for deployment to GitHub Pages or any static hosting service.

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main page with all sections
│   ├── chess/
│   │   └── page.tsx        # Easter egg chess page
│   └── globals.css         # Global styles and Tailwind directives
├── components/
│   ├── achievements.tsx     # Achievements section
│   ├── background-particles.tsx  # Animated background
│   ├── command-palette.tsx # CMD+K command palette
│   ├── contact.tsx         # Contact section
│   ├── experience.tsx      # Experience timeline
│   ├── hero.tsx            # Hero/intro section
│   ├── projects.tsx        # Projects grid with filters
│   ├── sidebar.tsx         # Navigation sidebar
│   ├── tech-stack.tsx      # Tech stack section
│   └── theme-provider.tsx  # Theme context provider
├── lib/
│   ├── constants.ts        # Site data and constants
│   └── utils.ts            # Utility functions
└── public/                 # Static assets
```

## 🎨 Customization

### Update Personal Information

Edit `/lib/constants.ts` to update:
- Social links
- Experience entries
- Projects
- Tech stack
- Achievements

### Styling

- Tailwind config: `/tailwind.config.ts`
- Global styles: `/app/globals.css`
- Component styles: Inline Tailwind classes

### Colors & Theme

The color scheme uses a purple-pink-blue gradient theme. Modify colors in:
- `tailwind.config.ts` - Theme colors
- `app/globals.css` - CSS variables

## 🚢 Deployment

### GitHub Pages

1. Update `next.config.js` to set your base path if needed:
```js
const nextConfig = {
  basePath: '/your-repo-name',
  // ... rest of config
};
```

2. Build and deploy:
```bash
npm run build
# Deploy the 'out' directory to GitHub Pages
```

### Vercel

Simply connect your GitHub repository to Vercel for automatic deployments.

## 🛠️ Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **cmdk** - Command palette component
- **lucide-react** - Icon library

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Nabil Shah**
- GitHub: [@nabilshah](https://github.com/nabilshah)
- LinkedIn: [Nabil Shah](https://linkedin.com/in/nabilshah)

---

Built with ❤️ using Next.js and Framer Motion

