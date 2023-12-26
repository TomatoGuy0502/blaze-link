module.exports = {
  singleQuote: true,
  trailingComma: 'none',
  tabWidth: 2,
  printWidth: 120,
  semi: false,
  endOfLine: 'auto',
  plugins: [require('prettier-plugin-tailwindcss')], // 用pnpm時需要手動引入
}
