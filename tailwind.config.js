/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  important: '#root',
  theme: {
    colors: {

      'prim-sol': 'rgba(118, 255, 122, 1)',
      'prim-sol-light': 'rgba(222, 248, 223, 1)',
      'prim-sol-dark': 'rgba(25, 43, 26, 1)',
      'prim-sol-dim': 'rgba(194, 220, 195, 1)',
      'prim-sol-var': 'rgba(68, 76, 88, 1)',
      'primary-light': 'rgba(245, 255, 245, 1)',
      primary: 'rgba(34, 184, 39, 1)',

      secondary: 'rgba(66, 133, 244, 1)',
      'sec-cont-light': 'rgba(216, 231, 255, 1)',
      'sec-cont-dark': 'rgba(17, 29, 49, 1)',
      'sec-dim': 'rgba(184, 205, 239, 1)',
      'sec-var': 'rgba(59, 74, 99, 1)',

      error: 'rgba(248, 61, 51, 1)',
      'err-cont-light': 'rgba(249, 222, 220, 1)',
      'err-cont-dark': 'rgba(65, 14, 11, 1)',

      'surf-dim': 'rgba(222, 216, 225, 1)',
      surf: 'rgba(254, 247, 255, 1)',
      'surf-bri': 'rgba(254, 247, 255, 1)',

      'surf-cont-lower': 'rgba(255, 255, 255, 1)',
      'surf-cont-low': 'rgba(247, 242, 250, 1)',
      'surf-cont': 'rgba(243, 237, 247, 1)',
      'surf-cont-high': 'rgba(236, 230, 240, 1)',
      'surf-cont-higher': 'rgba(230, 224, 233, 1)',
      'surf-dark': 'rgba(29, 27, 32, 1)',
      'surf-var': 'rgba(73, 69, 79, 1)',

      outl: 'rgba(121, 116, 126, 1)',
      'outl-var': 'rgba(121, 116, 126, 1)',
      'inv-surf-light': 'rgba(245, 239, 247, 1)',
      'inv-surf-dark': 'rgba(50, 47, 53, 1)',
      'card-icon-outl': 'rgba(102, 102, 102, 1)',

      lightgray: 'rgba(230, 230, 230, 1)',
      greenBorder: 'rgba(155, 226, 144, 1)',
      white: 'rgba(255, 255, 255, 1)',
      black: 'rgba(18, 18, 18, 1)',
      'green-btn': 'rgba(20, 160, 25, 1)',
      'Ai-Card-btn': 'rgba(14, 135, 18, 1)',
      lightText: 'rgba(102, 102, 102, 1)',
      DarkText: ' rgba(26, 26, 26, 1)',
      'pricing-card-yellow':"rgba(209, 254, 165, 1)"
    },
    backgroundImage: {
      'jobDetail-card':
        'linear-gradient(276.85deg, #ABF0A1 30.63%, #46BBFD 105.98%)',
      LinkedinCard:
        ' linear-gradient(90.55deg, #ABF0A1 -9.05%, #FFFFFF 95.31%)',
      tab: 'linear-gradient(90deg, rgba(118, 255, 122, 0) 0%, rgba(118, 255, 122, 0.1) 100%)',
      'prim-grad-lr':
        'linear-gradient(314.28deg, #C6FF8D -48.03%, #89D4FE 114.92%);',
      'prim-grad': 'linear-gradient(180deg, #C6FF8D 19%, #89D4FE 100%)',
      chatsidebanner: 'linear-gradient(180deg, #C4EAFF 0%, #EEFFD9 165.84%)',
      'prim-grad-cont-dark':
        'linear-gradient(180deg, #2F5D00 0%, #003A5C 100%)',
      'prim-grad-cont-light':
        'linear-gradient(180deg, #EEFFDE 0%, #DEF3FF 100%)',
      'prim-grad-dim': 'linear-gradient(180deg, #BCFFBE 0%, #BCE6FF 100%)',
      'prim-grad-var': 'linear-gradient(180deg, #618B37 0%, #376D8C 100%)',
      'prim-grad-fir':
        ' linear-gradient(136.38deg, #ABFF9F 8.54%, #9FFFFF 94.64%)',
      'inv-prim-grad': 'linear-gradient(90deg, #DEFFBC 0%, #BCE6FF 100%)',
      'pricing-card-btn': 'linear-gradient(90deg, #89D4FE 0%, #BFFA9B 100%)',
        'pricing-check-icon':' linear-gradient(319.76deg, #76FF7A 3.79%, #4285F4 86.01%)',
        'joblo-logo-gradient':' linear-gradient(8.51deg, #76FF7A 3.73%, #4285F4 36.77%)',
        'pricing-card-border':'linear-gradient(270deg, #4285F4 0%, #76FF7A 100%)',
        'dicover-card':
        'cconic-gradient(from -45deg at 100% 100%, #3968CC -29.52deg, rgba(255, 255, 255, 0.1) 3.03deg, #AFAFAF 155.61deg, #3968CC 330.48deg, rgba(255, 255, 255, 0.1) 363.03deg)',
      Herobackground:
        'background: radial-gradient(circle at 50% -20%, #76ff7a, #8fff8e, #a5ffa1, #b9ffb4, #ccffc7, #deffda, #efffec, #ffffff)',
    },
    extend: {},
  },
  plugins: [],
};
