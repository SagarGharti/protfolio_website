# Tailwind CSS + Framer Motion Project

A modern web project showcasing the power of Tailwind CSS and Framer Motion animations, built with Vite and vanilla JavaScript.

## Features

- 🎨 **Tailwind CSS** - Utility-first CSS framework
- ✨ **Framer Motion-like Animations** - Custom animation utilities inspired by Framer Motion API
- ⚡ **Vite** - Lightning-fast build tool
- 📱 **Responsive Design** - Mobile-first approach
- 🎭 **Interactive Elements** - Hover effects and smooth animations

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
├── index.html          # HTML entry point
├── public/
│   └── images/         # Place static images here (refer as /images/filename.png)
├── src/
│   ├── main.js        # Main JavaScript file
│   └── style.css      # Tailwind CSS styles
├── package.json        # Dependencies and scripts
├── vite.config.js     # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
└── postcss.config.js  # PostCSS configuration
```

## Technologies Used

- **Vite** - Next generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Motion Library** - Framer Motion-inspired animation utilities for vanilla JavaScript
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## Customization

### Tailwind Configuration

Edit `tailwind.config.js` to customize colors, spacing, fonts, and more.

### Adding Animations

The project includes custom animation utilities. You can extend them in `src/main.js` or create new animation functions.

## License

MIT

