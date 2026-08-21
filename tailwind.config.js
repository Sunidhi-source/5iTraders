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
        panGrid: {
          '0%': { transform: 'rotate(-12deg) translateY(0)' },
          '100%': { transform: 'rotate(-12deg) translateY(-18%)' },
        },
        tilePulse: {
          '0%, 100%': {
            boxShadow:
              '0 0 12px rgb(var(--color-signal) / 0.12), inset 0 0 24px rgb(var(--color-signal) / 0.14)',
          },
          '50%': {
            boxShadow:
              '0 0 20px rgb(var(--color-signal) / 0.28), inset 0 0 36px rgb(var(--color-signal) / 0.3)',
          },
        },
        flowLine: {
          '0%': { strokeDashoffset: '480' },
          '100%': { strokeDashoffset: '0' },
        },
        nodeTwinkle: {
          '0%, 100%': { opacity: 0.35 },
          '50%': { opacity: 1 },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        botBlink: {
          '0%, 90%, 100%': { transform: 'scaleY(1)' },
          '95%': { transform: 'scaleY(0.1)' },
        },
        antennaBlip: {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.4)' },
        },
        riseFade: {
          '0%': { transform: 'translateY(18px) scale(0.9)', opacity: 0 },
          '15%': { opacity: 1 },
          '85%': { opacity: 1 },
          '100%': { transform: 'translateY(-30px) scale(1.02)', opacity: 0 },
        },
        dotBounce: {
          '0%, 80%, 100%': { transform: 'translateY(0)', opacity: 0.4 },
          '40%': { transform: 'translateY(-5px)', opacity: 1 },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        'marquee-reverse': 'marquee-reverse 44s linear infinite',
        blink: 'blink 1.6s ease-in-out infinite',
        glowPulse: 'glowPulse 5s ease-in-out infinite',
        gridDrift: 'gridDrift 12s linear infinite',
        panGrid: 'panGrid 70s linear infinite',
        'tile-pulse-slow': 'tilePulse 6s ease-in-out infinite alternate',
        'tile-pulse-fast': 'tilePulse 4s ease-in-out infinite alternate-reverse',
        'flow-line': 'flowLine 5s linear infinite',
        'flow-line-slow': 'flowLine 8s linear infinite reverse',
        'node-twinkle': 'nodeTwinkle 2.8s ease-in-out infinite',
        float: 'floatY 4.5s ease-in-out infinite',
        'bot-blink': 'botBlink 4.2s ease-in-out infinite',
        'antenna-blip': 'antennaBlip 1.8s ease-in-out infinite',
        rise: 'riseFade linear infinite',
        'dot-bounce': 'dotBounce 1.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
