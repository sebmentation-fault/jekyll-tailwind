/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './_includes/*.html',
    './_layouts/*.html',
    './_posts/*.md',
    './*.md',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
}
