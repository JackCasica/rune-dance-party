/* I found that my prettier extension kept making formatting changes, makings the commits bloated. 
I added this config file for prettier for formatting consistency in this project, feel free to add any configs you want. 

I also added a plugin for automatically sorting the tailwind utility classes: 
https://github.com/tailwindlabs/prettier-plugin-tailwindcss */

const config = {
  printWidth: 120,
  tabWidth: 4,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
