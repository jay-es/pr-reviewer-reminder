/* eslint-env node */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        'github-light': {
          primary: '#1f883d', // --color-btn-primary-bg
          'primary-content': '#ffffff', // --color-btn-primary-text
          secondary: '#656d76', // --color-fg-muted
          accent: '#0969da', // --color-accent-fg
          'base-100': '#ffffff', // --color-canvas-default
          'base-content': '#1f2328', // --color-fg-default
          error: '#fa4549', // --color-checks-donut-error
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
