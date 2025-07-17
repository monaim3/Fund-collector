// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//        animation: {
//         'gradient-x': 'gradient-x 5s ease infinite',
//       },
//       keyframes: {
//         'gradient-x': {
//           '0%, 100%': {
//             backgroundPosition: '0% 50%',
//           },
//           '50%': {
//             backgroundPosition: '100% 50%',
//           },
//         },
//       },
//     },
//   },
//   plugins: [],
// }


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundSize: {
        "200%": "200% 200%",
      },
      keyframes: {
        "gradient-x": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "gradient-x": "gradient-x 5s ease infinite",
      },
    },
  },
  plugins: [],
}
