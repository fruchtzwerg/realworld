const { createGlobPatternsForDependencies } = require('@nx/vue/tailwind');
const { join } = require('path');

const { theme, plugins, daisyui } = require('../../../libs/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'index.html'),
    join(__dirname, 'src/**/*!(*.stories|*.spec).{vue,ts,tsx,js,jsx}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme,
  plugins: [...plugins],
  daisyui,
};
