/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      animation: {
        tech: 'flow 25s linear infinite',
      },
      keyframes: {
        flow: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
          '50%': { filter: 'grayscale', opacity: 0.4 },
          '100%': {
            transform: 'translateY(-1000px) rotate(720deg)',
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities }) => {
      matchUtilities({
        'animation-delay': (value) => {
          return {
            'animation-delay': value,
          }
        },
        'animation-duration': (value) => {
          return {
            'animation-duration': value,
          }
        },
      })
    }),
  ],
}
