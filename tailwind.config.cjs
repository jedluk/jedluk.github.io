/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: 'rgb(179, 136, 255)',
        'brand-secondary': 'rgb(0, 151, 167)',
        accent: 'var(--accent)'
      },
      animation: {
        tech: 'flow 25s linear infinite'
      },
      keyframes: {
        flow: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
          '50%': { filter: 'grayscale', opacity: 0.4 },
          '100%': {
            transform: 'translateY(-1000px) rotate(720deg) scale(0.5)',
            opacity: 0
          }
        }
      }
    }
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('selected', '&[data-selected]')
      addVariant('active', '&[data-active]')
      addVariant('allowed', '&[data-allowed="true"]')
    })
  ]
}
