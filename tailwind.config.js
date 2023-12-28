const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'brand-1': '#876445',
        'brand-2': '#CA965C',
        'brand-3': '#EEC373',
        'brand-4': '#F4DFBA',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none', /* Firefox */
          '&::-webkit-scrollbar': { /* Safari and Chrome */
            display: 'none',
          },
        },
        '.scrollbar-default': {
          '-ms-overflow-style': 'auto', /* IE and Edge */
          'scrollbar-width': 'auto', /* Firefox */
          '&::-webkit-scrollbar': { /* Safari and Chrome */
            display: 'block',
          },
        },
      })
    }),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        }
      );
    }),
  ],
}
