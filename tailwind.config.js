/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // "ink" now carries the light end of the palette — white base with
        // soft blue tints for section depth — while keeping the same token
        // names every component already references.
        ink: {
          DEFAULT: '#FFFFFF',
          900: '#FFFFFF',
          800: '#EEF4FC',
          700: '#E3EDFB',
          600: '#D6E6F8',
          500: '#C7DBF2',
        },
        mist: {
          DEFAULT: '#0B2547',
          400: '#3E5C82',
          300: '#5C7BA3',
        },
        signal: {
          DEFAULT: '#2563EB',
          400: '#60A5FA',
          600: '#1D4ED8',
          900: '#0B2547',
        },
        leaf: {
          DEFAULT: '#16A34A',
          400: '#34D399',
          600: '#15803D',
        },
        gilt: {
          DEFAULT: '#C9A227',
          400: '#E1BE55',
        },
        loss: '#DC2626',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        grid: 'linear-gradient(to right, rgba(37,99,235,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.08) 1px, transparent 1px)',
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
        glowPulse: {
          '0%, 100%': { opacity: 0.35, transform: 'scale(1)' },
          '50%': { opacity: 0.7, transform: 'scale(1.06)' },
        },
        gridDrift: {
          '0%': { backgroundPosition: '0px 0px' },
          '100%': { backgroundPosition: '40px 40px' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        'marquee-reverse': 'marquee-reverse 44s linear infinite',
        blink: 'blink 1.6s ease-in-out infinite',
        glowPulse: 'glowPulse 5s ease-in-out infinite',
        gridDrift: 'gridDrift 12s linear infinite',
      },
    },
  },
  plugins: [],
}
