import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/widget.js',
      name: 'CCWidget',
      fileName: (format) => `ccwidget.${format}.js`,
      formats: ['umd'],
    },
  },
});

/* This tells Vite:

“Bundle everything starting from src/widget.js, and export it as a global CCWidget object that browsers can call.”
*/