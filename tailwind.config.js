const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': {
        max: '380px'
      },

      'sm': {
        max: '640px'
      },

      'lg': {
        max: '768px'
      },

      'm': {
        max: '1050px'
      },

      'xl': {
        max: '1280px'
      },

      '3xl': {
        min: '1750px'
      }
    },

    extend: {
      minWidth: {
        '1': '100px',
        '1.5': '150px',
        '2': '200px',
        '2.5': '250px',
        '3': '300px',
        '3.5': '350px',
        '4': '400px',
        '4.5': '450px',
        '5': '500px',
        '5.5': '550px',
        '6': '600px',
        '6.5': '650px',
        '7': '700px',
        '7.5': '750px',
        '8': '800px',
      },

      transitionProperty: {
        'border': 'border-width, border-color'
      },
	  
	    minHeight: {
        '1': '100px',
        '1.5': '150px',
        '2': '200px',
        '2.5': '250px',
        '3': '300px',
        '3.5': '350px',
        '4': '400px',
        '4.5': '450px',
        '5': '500px',
        '5.5': '550px',
        '6': '600px',
        '6.5': '650px',
        '7': '700px',
        '7.5': '750px',
        '8': '800px',
      },


      fontFamily: {
        'open-sans': 'Open Sans'
      },

      colors: {
        'main': '#4D94F8',
        'neutral': {
          '150': 'hsl(0, 0%, 94%)'
        }
      },

      backgroundImage: {
        'sky-gradient': 'linear-gradient(90deg, #4D94F8 62.25%, #4D94F830 78.78%, #FFFFFF00 87.33%)'
      }
    },
  },
  plugins: [
    
  ],
}