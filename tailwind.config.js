/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
      "bg-side":"#2e2e2e",
      "active":"#4eac6d",
      "li-clr":"#797c8c",
      "dark-bg":"#262626",
      "dark-bg-sec":"#333333",
      "dark-text":"#adb5bd",
      "light-bg":"#ffffff",
      "light-chat-bg":"#f2f2f2",
      "dark-chat-bg":"#2e2e2e",
      "dark-h":"#adb5bd",
      "light-h":"#495057",
      "dark-p":"#8f9198 ",
      "light-p":"#5a636f",
      "dark-received-bg":"#383838",
      "light-received-bg":"#ffffff",
      "dark-sent-bg":"#354b3c",
      "light-sent-bg":"#cce2d3",

      },
      backgroundImage: {
        'chat-pattern': "url('/light_bg_pattern.png')",
      }
    },
  },
  plugins: [],
}