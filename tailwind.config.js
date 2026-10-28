/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary palette
        bg:      '#0f172a',
        'bg-2':  '#1e293b',
        'bg-3':  '#273349',
        'bg-card': '#1e293b',
        'bg-hover': '#253047',

        // Text
        'text-1': '#f8fafc',
        'text-2': '#cbd5e1',
        'text-3': '#94a3b8',
        'text-4': '#64748b',

        // Accents
        accent:  '#38bdf8',
        'accent-2': '#0ea5e9',
        indigo:  '#818cf8',
        green:   '#4ade80',

        // Borders
        border:  'rgba(255,255,255,0.08)',
        'border-2': 'rgba(255,255,255,0.14)',

        // Legacy aliases so existing code still compiles
        cream:       '#0f172a',
        'cream-dim': '#1e293b',
        ink:         '#f8fafc',
        'ink-2':     '#cbd5e1',
        'ink-3':     '#94a3b8',
        'ink-soft':  '#94a3b8',
        'ink-4':     '#64748b',
        orange:      '#38bdf8',
        'orange-soft':'#0c3347',
        purple:      '#818cf8',
        'purple-soft':'#1e1e3a',
        'line':      'rgba(255,255,255,0.08)',
        'line-2':    'rgba(255,255,255,0.14)',
        'line-strong':'rgba(255,255,255,0.14)',
        'accent-3':  '#0c3347',
        'accent-dim':'rgba(56,189,248,0.12)',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      animation: {
        'marquee': 'marquee 45s linear infinite',
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
