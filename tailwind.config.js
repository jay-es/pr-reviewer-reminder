/* eslint-env node */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        muted: '#656d76',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#1f883d',
          'primary-content': '#fff',
          secondary: '#0969da',
          'base-100': '#ffffff',
          'base-content': '#1f2328',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
