const fonts = {
  sansSerif: [
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'Noto Sans',
    'sans-serif',
  ],
  serif: ['ui-serif', 'Georgia, Cambria', '"Times New Roman"', 'Times', 'serif'],
};

const theme = {
  extend: {
    fontFamily: {
      sans: ['"Source Sans Pro"', ...fonts.sansSerif],
      serif: ['"source serif pro"', ...fonts.serif],
      title: ['"Titillium Web"', ...fonts.sansSerif],
    },
  },
};

const plugins = [require('daisyui'), require('@savvywombat/tailwindcss-grid-areas')];

const daisyui = {
  themes: ['emerald', 'dark'],
};

module.exports = { fonts, theme, plugins, daisyui };
