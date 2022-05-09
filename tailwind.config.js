const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      rotate: {
        '135':'135deg',
        '225':'225deg',
        '270': '270deg',
        '315':'315deg',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      textShadow: {
        'default': '1px -2px 3px #67e8f9',
        'logo': '3px 1px 2 #19C5CE',
        'md': '0 2px 2px #000',
        'h2': '0 0 3px #FF0000, 0 0 5px #0000FF',
        'h1': '0 0 3px rgba(0, 0, 0, .8), 0 0 5px rgba(0, 0, 0, .9)',
      },
      animation:{
        'bounce-short': 'bounce 3s ease-out infinite'
      },
      
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
}
