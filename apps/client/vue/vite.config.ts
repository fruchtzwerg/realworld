/// <reference types='vitest' />
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { replaceFiles } from '@nx/vite/plugins/rollup-replace-files.plugin';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import VueDevTools from 'vite-plugin-vue-devtools';

const dynamicImports = [];

if (process.env.NODE_ENV === 'production') {
  dynamicImports.push(
    replaceFiles([
      {
        replace: 'apps/client/vue/src/environment/environment.ts',
        with: 'apps/client/vue/src/environment/environment.prod.ts',
      },
    ])
  );
}

export default defineConfig({
  root: __dirname,

  build: {
    emptyOutDir: true,
    outDir: '../../../dist/apps/client/vue',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  cacheDir: '../../../node_modules/.vite/realworld',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    ...dynamicImports,
    vue(),
    vueJsx(),
    // VueDevTools(),
    nxViteTsPaths({ debug: false }),
    Icons({ compiler: 'vue3' }),
  ],

  publicDir: 'src/assets',

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  test: {
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../../coverage/apps/client/vue',
      provider: 'v8',
    },
    globals: true,
    cache: {
      dir: '../../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
