/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        surface: '#111111',
        'text-primary': '#e8e4dc',
        muted: '#9a9590',
        accent: '#c4622d',
        'accent-hover': '#d4734e',
        paper: '#f5f0e8',
        'paper-text': '#1a1a1a',
      },
      fontFamily: {
        serif: ['Lora', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"Courier New"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

