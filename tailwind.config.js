module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'nav': '0 0 1px rgb(0 0 0 / 10%)',
        'nav_mob': ' 0 0 4px 0 rgba(59, 71, 111, 0.15)',
        'standart': 'rgba(0, 0, 0, 0.04) 0 0 5px 0',
        'create': '0 0 5px rgba(42, 27, 61, 0.4)',
        'dropdown': '0 1px 4px 0 rgba(0,0,0,0.16)'
      },
      screens: {
        'tablet': '640px',
        'desktop': '1280px'
      },
    },
    fontFamily: {
      'nunito': ['Nunito', 'sans-serif', 'Roboto'],
      'montserrat': ['Montserrat', 'sans-serif', 'Roboto'],
      'sans': ['sans-serif', 'Montserrat']
    }
  },
  plugins: [],
};
