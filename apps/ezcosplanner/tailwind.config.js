const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--primary)',
        'primary-light': 'var(--primary-light)',
        'primary-dark': 'var(--primary-dark)',
        'secondary': 'var(--secondary)',
        'tertiary': 'var(--tertiary)',
        'neutral': 'var(--neutral)',
        'error': 'var(--error)',
      }
    },
  },
  plugins: [],
};
