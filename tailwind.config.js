/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // "ink" carries the surface scale — white/near-white in light mode,
        // deep navy in dark mode — driven by CSS variables set in index.css
        // so every component that already uses these tokens gets dark mode
        // for free.
        ink: {
          DEFAULT: 'rgb(var(--color-ink-900) / <alpha-value>)',
          900: 'rgb(var(--color-ink-900) / <alpha-value>)',
          800: 'rgb(var(--color-ink-800) / <alpha-value>)',
          700: 'rgb(var(--color-ink-700) / <alpha-value>)',
          600: 'rgb(var(--color-ink-600) / <alpha-value>)',
          500: 'rgb(var(--color-ink-500) / <alpha-value>)',
        },
        mist: {
          DEFAULT: 'rgb(var(--color-mist) / <alpha-value>)',
          400: 'rgb(var(--color-mist-400) / <alpha-value>)',
          300: 'rgb(var(--color-mist-300) / <alpha-value>)',
        },
        // "signal" is the brand blue, matched to the logo's electric-blue mark.
        signal: {
          DEFAULT: 'rgb(var(--color-signal) / <alpha-value>)',
          400: 'rgb(var(--color-signal-400) / <alpha-value>)',
          600: 'rgb(var(--color-signal-600) / <alpha-value>)',
          900: 'rgb(var(--color-signal-900) / <alpha-value>)',
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
        grid: 'linear-gradient(to right, rgba(36,144,243,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(36,144,243,0.08) 1px, transparent 1px)',
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
