import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A18',
        surface: '#12121F',
        border: '#232336',
        ink: {
          DEFAULT: '#F5F5FA',
          muted: '#8B8BA3',
          faint: '#5A5A72',
        },
        accent: {
          DEFAULT: '#E91E8C',
          soft: '#F0479E',
          violet: '#7C3AED',
          orange: '#FF7A45',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'signature-gradient': 'linear-gradient(135deg, #7C3AED 0%, #E91E8C 55%, #FF7A45 100%)',
        'glow-radial': 'radial-gradient(circle, rgba(233,30,140,0.55) 0%, rgba(233,30,140,0) 70%)',
      },
      keyframes: {
        marqueeLeft: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
        marqueeRight: {
          '0%': { transform: 'translate3d(-50%, 0, 0)' },
          '100%': { transform: 'translate3d(0, 0, 0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.9' },
        },
      },
      animation: {
        'marquee-left': 'marqueeLeft linear infinite',
        'marquee-right': 'marqueeRight linear infinite',
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
