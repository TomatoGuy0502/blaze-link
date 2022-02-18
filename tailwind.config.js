const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'brand-1': '#876445',
        'brand-2': '#CA965C',
        'brand-3': '#EEC373',
        'brand-4': '#F4DFBA'
      }
    }
  },
  plugins: []
}
