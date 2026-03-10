import './style.css';

// Framer Motion-like animation utilities for vanilla JavaScript
const Motion = {
  // Helper function to build transform string
  buildTransform: function(transformObj) {
    if (!transformObj) return '';
    const transforms = [];
    if (transformObj.x !== undefined) transforms.push(`translateX(${transformObj.x}px)`);
    if (transformObj.y !== undefined) transforms.push(`translateY(${transformObj.y}px)`);
    if (transformObj.scale !== undefined) transforms.push(`scale(${transformObj.scale})`);
    if (transformObj.rotate !== undefined) transforms.push(`rotate(${transformObj.rotate}deg)`);
    return transforms.join(' ');
  },
  
  // Create animated element with initial and animate states
  create: function(tag, props = {}, children = null) {
    const element = document.createElement(tag);
    
    // Apply initial styles
    if (props.initial) {
      if (props.initial.opacity !== undefined) {
        element.style.opacity = props.initial.opacity;
      }
      const initialTransform = this.buildTransform(props.initial);
      if (initialTransform) {
        element.style.transform = initialTransform;
      }
    }
    
    // Apply className
    if (props.className) {
      element.className = props.className;
    }
    
    // Apply style
    if (props.style) {
      Object.assign(element.style, props.style);
    }
    
    // Add children
    if (typeof children === 'string') {
      element.textContent = children;
    } else if (Array.isArray(children)) {
      children.forEach(child => {
        if (typeof child === 'string') {
          element.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
          element.appendChild(child);
        }
      });
    } else if (children instanceof Node) {
      element.appendChild(children);
    }
    
    // Animate on mount
    const delay = props.transition?.delay || props.delay || 0;
    const duration = props.transition?.duration || 0.6;
    const ease = props.transition?.ease || 'ease-out';
    
    setTimeout(() => {
      element.style.transition = `all ${duration}s ${ease}`;
      
      if (props.animate) {
        if (props.animate.opacity !== undefined) {
          element.style.opacity = props.animate.opacity;
        }
        const animateTransform = Motion.buildTransform(props.animate);
        if (animateTransform) {
          element.style.transform = animateTransform;
        }
      } else {
        // Default animate to visible state
        element.style.opacity = '1';
        element.style.transform = 'translateY(0) translateX(0) scale(1)';
      }
    }, delay * 1000);
    
    // Add hover animations
    if (props.whileHover) {
      const originalTransform = element.style.transform;
      element.addEventListener('mouseenter', () => {
        const hoverTransform = Motion.buildTransform(props.whileHover);
        if (hoverTransform) {
          element.style.transform = hoverTransform;
        }
        if (props.whileHover.backgroundColor) {
          element.style.backgroundColor = props.whileHover.backgroundColor;
        }
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = originalTransform || '';
        element.style.backgroundColor = '';
      });
    }
    
    return element;
  }
};


// Create the app
function createApp() {
  const app = document.getElementById('app');
  
  // Hero Section
  const hero = document.createElement('section');
  hero.className = 'min-h-screen flex items-center justify-center px-4';
  
  const heroContent = document.createElement('div');
  heroContent.className = 'text-center max-w-4xl';
  
  const title = Motion.create('h1', {
    className: 'text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent',
    initial: { y: -50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { delay: 0.1, duration: 0.8 }
  }, 'Welcome to');
  
  const subtitle = Motion.create('h2', {
    className: 'text-4xl md:text-6xl font-bold mb-8 text-white',
    initial: { y: -30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { delay: 0.3, duration: 0.8 }
  }, 'Tailwind + Framer Motion');
  
  const description = Motion.create('p', {
    className: 'text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto',
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { delay: 0.5, duration: 0.8 }
  }, 'A beautiful combination of utility-first CSS and smooth animations');
  
  const button = Motion.create('button', {
    className: 'btn-primary',
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { delay: 0.7, duration: 0.6 },
    whileHover: { scale: 1.05 }
  }, 'Get Started');
  
  button.addEventListener('click', () => {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = 'scale(1.05)';
      setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 150);
    }, 100);
  });
  
  heroContent.appendChild(title);
  heroContent.appendChild(subtitle);
  heroContent.appendChild(description);
  heroContent.appendChild(button);
  hero.appendChild(heroContent);
  
  // Features Section
  const featuresSection = document.createElement('section');
  featuresSection.className = 'py-20 px-4';
  
  const featuresContainer = document.createElement('div');
  featuresContainer.className = 'max-w-6xl mx-auto';
  
  const featuresTitle = Motion.create('h2', {
    className: 'text-4xl font-bold text-center mb-16',
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { delay: 0.9, duration: 0.6 }
  }, 'Features');
  
  const featuresGrid = document.createElement('div');
  featuresGrid.className = 'grid grid-cols-1 md:grid-cols-3 gap-8';
  
  const features = [
    {
      title: 'Tailwind CSS',
      description: 'Utility-first CSS framework for rapid UI development',
      icon: '🎨',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Framer Motion',
      description: 'Production-ready motion library for React and the web',
      icon: '✨',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Modern Stack',
      description: 'Built with Vite for lightning-fast development',
      icon: '⚡',
      color: 'from-yellow-500 to-orange-500'
    }
  ];
  
  features.forEach((feature, index) => {
    const featureCard = document.createElement('div');
    featureCard.className = 'card p-8 hover:scale-105 transition-transform duration-300';
    featureCard.style.opacity = '0';
    featureCard.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      featureCard.style.transition = 'all 0.6s ease-out';
      featureCard.style.opacity = '1';
      featureCard.style.transform = 'translateY(0)';
    }, 1100 + (index * 200));
    
    const icon = document.createElement('div');
    icon.className = `text-6xl mb-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`;
    icon.textContent = feature.icon;
    
    const title = document.createElement('h3');
    title.className = 'text-2xl font-bold mb-4 text-white';
    title.textContent = feature.title;
    
    const desc = document.createElement('p');
    desc.className = 'text-gray-300';
    desc.textContent = feature.description;
    
    featureCard.appendChild(icon);
    featureCard.appendChild(title);
    featureCard.appendChild(desc);
    featuresGrid.appendChild(featureCard);
  });
  
  featuresContainer.appendChild(featuresTitle);
  featuresContainer.appendChild(featuresGrid);
  featuresSection.appendChild(featuresContainer);
  
  // Animated Cards Section
  const cardsSection = document.createElement('section');
  cardsSection.className = 'py-20 px-4';
  
  const cardsContainer = document.createElement('div');
  cardsContainer.className = 'max-w-6xl mx-auto';
  
  const cardsTitle = Motion.create('h2', {
    className: 'text-4xl font-bold text-center mb-16',
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { delay: 1.7, duration: 0.6 }
  }, 'Interactive Cards');
  
  const cardsGrid = document.createElement('div');
  cardsGrid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6';
  
  for (let i = 0; i < 8; i++) {
    const card = document.createElement('div');
    card.className = 'card p-6 cursor-pointer';
    card.style.opacity = '0';
    card.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.5s ease-out';
      card.style.opacity = '1';
      card.style.transform = 'scale(1)';
    }, 1900 + (i * 100));
    
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'scale(1.05) rotate(2deg)';
      card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'scale(1) rotate(0deg)';
      card.style.boxShadow = '';
    });
    
    const number = document.createElement('div');
    number.className = 'text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent';
    number.textContent = `0${i + 1}`;
    
    const text = document.createElement('p');
    text.className = 'text-gray-300';
    text.textContent = `Card ${i + 1}`;
    
    card.appendChild(number);
    card.appendChild(text);
    cardsGrid.appendChild(card);
  }
  
  cardsContainer.appendChild(cardsTitle);
  cardsContainer.appendChild(cardsGrid);
  cardsSection.appendChild(cardsContainer);
  
  // Assemble the app
  app.appendChild(hero);
  app.appendChild(featuresSection);
  app.appendChild(cardsSection);
}

// Initialize the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createApp);
} else {
  createApp();
}

