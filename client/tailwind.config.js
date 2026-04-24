export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 40px rgba(59, 130, 246, 0.12)',
        soft: '0 20px 60px rgba(15, 23, 42, 0.12)'
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top, rgba(59, 130, 246, 0.18), transparent 40%), radial-gradient(circle at bottom right, rgba(168, 85, 247, 0.14), transparent 24%)'
      }
    }
  },
  plugins: []
};
