/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#070A0F',
          900: '#0A0E14',
          800: '#0E141C',
          700: '#131B26',
          600: '#1A2432',
          500: '#243244',
        },
        mist: {
          DEFAULT: '#EDEFF2',
          400: '#8B93A1',
          300: '#AEB4BF',
        },
        signal: {
          DEFAULT: '#2FA8FF',
          600: '#1C82E0',
          900: '#0C3A66',
        },
        gilt: {
          DEFAULT: '#C9A227',
          400: '#E1BE55',
        },
        loss: '#FF5C5C',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        grid: 'linear-gradient(to right, rgba(237,239,242,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(237,239,242,0.04) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        ticker: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '-1000px 0' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.2 },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        'marquee-reverse': 'marquee-reverse 44s linear infinite',
        blink: 'blink 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
