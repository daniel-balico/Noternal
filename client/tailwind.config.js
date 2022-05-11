module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
    	width: {
    		'128': '32rem',
    	},
    	height: {
    		'15': '3.6rem',
    	}
    },
  },
  plugins: [
  	require('tw-elements/dist/plugin'),
  	require('@tailwindcss/line-clamp'),
  ],
  darkMode: 'class',
}
