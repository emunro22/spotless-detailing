import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — deep automotive navy with crystalline cyan accent
        midnight: {
          DEFAULT: '#04101F',
          50: '#E6EAF0',
          100: '#C2CCD8',
          200: '#8A9CB1',
          300: '#536C8A',
          400: '#2C4163',
          500: '#15263F',
          600: '#0B1A2E',
          700: '#071426',
          800: '#04101F',
          900: '#020812',
        },
        cyan: {
          DEFAULT: '#38BDF8',
          glow: '#7DD3FC',
          deep: '#0EA5E9',
          ice: '#E0F2FE',
        },
        ink: '#020812',
        cream: '#F5F7FA',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        sans: ['var(--font-body)', 'sans-serif'],
      },
      backgroundImage: {
        'hex-grid':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='92' viewBox='0 0 80 92'%3E%3Cpath fill='none' stroke='%2338BDF8' stroke-width='0.6' stroke-opacity='0.18' d='M40 0 L80 23 L80 69 L40 92 L0 69 L0 23 Z'/%3E%3C/svg%3E\")",
        'radial-glow':
          'radial-gradient(circle at 50% 0%, rgba(56,189,248,0.18) 0%, rgba(4,16,31,0) 60%)',
        'shine':
          'linear-gradient(110deg, transparent 35%, rgba(125,211,252,0.35) 50%, transparent 65%)',
      },
      animation: {
        'shimmer': 'shimmer 2.4s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'glow-cyan': '0 0 40px -8px rgba(56, 189, 248, 0.55)',
        'glow-cyan-lg': '0 0 80px -10px rgba(56, 189, 248, 0.65)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255,255,255,0.06)',
      },
    },
  },
  plugins: [],
};

export default config;
