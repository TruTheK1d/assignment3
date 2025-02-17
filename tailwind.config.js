/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.html',    // Watches all HTML files in public folder
    './views/**/*.html',     // Watches all HTML files in views folder
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'), // Add typography plugin
    require('daisyui'),                 // Add daisyUI plugin
  ],
}


