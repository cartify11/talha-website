/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#000000',
          900: '#06080A',
          850: '#0A0D11',
          800: '#0F131A',
          700: '#151A24',
          600: '#1E2433',
        },
        gold: {
          50: '#FAF6F0',
          100: '#F4ECE0',
          200: '#E8D8C0',
          300: '#DBC3A0',
          400: '#D1B48B',
          500: '#C6A477', // Primary champagne gold
          600: '#B28E61',
          700: '#94724A',
          800: '#755737',
          900: '#563F27',
        },
        surface: {
          DEFAULT: '#0A0D11',
          card: '#0C0F14',
          elevated: '#12161E',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-gold': 'rgba(198, 164, 119, 0.25)',
        }
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 35px -5px rgba(198, 164, 119, 0.25)',
        'glow-gold-lg': '0 0 60px -10px rgba(198, 164, 119, 0.35)',
        'glow-ambient': '0 20px 40px -15px rgba(0, 0, 0, 0.8)',
      },
      backgroundImage: {
        'radial-gradient-hero': 'radial-gradient(circle at 75% 35%, rgba(198, 164, 119, 0.12) 0%, rgba(6, 8, 10, 0) 65%)',
        'radial-gradient-center': 'radial-gradient(circle at 50% 50%, rgba(198, 164, 119, 0.08) 0%, rgba(0, 0, 0, 0) 70%)',
      }
    },
  },
  plugins: [],
}
