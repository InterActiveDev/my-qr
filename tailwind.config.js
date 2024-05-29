/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      screens: {
        's760': { 'min-width': '760px' }, // @media (min-width: 760px)
        // 'smd': { 'min-width': '412px' }, // @media (min-width: 760px)
        's390': { 'min-width': '390px', 'max-width': '759px' }, // @media screen and (min-width: 390px) and (max-width: 760px)
        's376': { 'min-width': '376px', 'max-width': '389px' }, // @media screen and (min-width: 360px) and (max-width: 389px)
        's360': { 'min-width': '360px', 'max-width': '375px' }, // @media screen and (min-width: 360px) and (max-width: 389px)
      },
    },
  },
  plugins: [require("daisyui")],
}

