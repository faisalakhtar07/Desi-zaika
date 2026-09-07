export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'burgundy-900': '#2e0003',
        'burgundy-800': '#3d0008',
        'burgundy-700': '#4d000d',
        'burgundy-600': '#5d1012',
        'cream-400': '#D8cfbc',
        'cream-100': '#f5f1ed'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
