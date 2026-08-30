/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5EEDD',
        'cream-dim': '#EBDFC2',
        ink: '#1F1A12',
        'ink-soft': '#6E5F49',
        orange: '#9C7A2E',
        'orange-soft': '#EAD9AA',
        purple: '#5C2A2E',
        'purple-soft': '#E8D2D2',
        green: '#3F5C3F',
        'green-soft': '#DDE5DA',
        line: 'rgba(31, 26, 18, 0.11)',
        'line-strong': 'rgba(31, 26, 18, 0.20)',
        cyber: {
          bg: '#06080D',
          card: '#0C101B',
          cardHover: '#121726',
          panel: '#0F1422',
          border: 'rgba(255, 255, 255, 0.08)',
          borderGlow: 'rgba(0, 240, 255, 0.3)',
          cyan: '#00F0FF',
          cyanDim: 'rgba(0, 240, 255, 0.15)',
          emerald: '#10B981',
          emeraldDim: 'rgba(16, 185, 129, 0.15)',
          purple: '#8B5CF6',
          amber: '#F59E0B',
          textMain: '#F8FAFC',
          textMuted: '#94A3B8',
          textSub: '#64748B',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s infinite ease-in-out',
        'float': 'float 6s infinite ease-in-out',
        'scanline': 'scanline 8s linear infinite',
        'data-stream': 'dataStream 2s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 8px rgba(0,240,255,0.4))' },
          '50%': { opacity: '0.9', filter: 'drop-shadow(0 0 16px rgba(0,240,255,0.8))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        dataStream: {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        }
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
        'radial-glow': 'radial-gradient(circle at 50% 30%, rgba(0, 240, 255, 0.08) 0%, rgba(6, 8, 13, 0) 70%)',
        'emerald-glow': 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.08) 0%, rgba(6, 8, 13, 0) 70%)',
      }
    },
  },
  plugins: [],
}
