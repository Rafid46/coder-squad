/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "'Poppins', sans-serif",
        caveat: "'Caveat', cursive",
        brolimo: ["BrolimoRegular"],
        grotest: ["ArchivGroteskTrial-RegularTrial"],
        neue: ["NeueMontreal-Regular"],
        founderGrotest: ["FoundersGrotesk-Semibold"],
        diastema: ["Diastema Regular"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["cupcake", "dark", "cmyk", "nord"],
  },
};
