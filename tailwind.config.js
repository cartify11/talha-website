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
          950: '#07090E', // Refined deep obsidian slate (not muddy flat black)
          900: '#0D1117',
          850: '#141A24',
          800: '#1C2433',
          700: '#253043',
          600: '#324059',
        },
        gold: {
          50: '#FFFDF0',
          100: '#FEF9C3',
          200: '#FDE047',
          300: '#FACC15',
          400: '#FBBF24', // Radiant 24K bright gold
          500: '#F59E0B', // Primary vivid luminous gold
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        surface: {
          DEFAULT: '#101723',
          card: '#141C2B',
          elevated: '#1A2436',
          border: 'rgba(255, 255, 255, 0.12)',
          'border-gold': 'rgba(245, 158, 11, 0.4)',
        }
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 35px -5px rgba(245, 158, 11, 0.35)',
        'glow-gold-lg': '0 0 65px -10px rgba(245, 158, 11, 0.45)',
        'glow-cyan': '0 0 35px -5px rgba(56, 189, 248, 0.35)',
        'glow-ambient': '0 20px 45px -15px rgba(0, 0, 0, 0.85)',
      },
      backgroundImage: {
        'radial-gradient-hero': 'radial-gradient(circle at 75% 35%, rgba(245, 158, 11, 0.22) 0%, rgba(13, 17, 23, 0) 65%)',
        'radial-gradient-center': 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.15) 0%, rgba(7, 9, 14, 0) 70%)',
      }
    },
  },
  plugins: [],
}
