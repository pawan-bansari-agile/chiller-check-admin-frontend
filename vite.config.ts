/// <reference types="vitest" />
/// <reference types="vite/client" />
import terser from '@rollup/plugin-terser';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    build: {
      outDir: 'build',
      chunkSizeWarningLimit: 1600
    },
    plugins: [
      react(),
      tsconfigPaths(),
      // To enable console in production remove below conditions
      (command === 'serve' || command === 'build') &&
        terser({
          compress: {
            drop_console: true
          }
        }),
      // TODO : Change below manifest file according to your project add appropriate icons in public folder
      VitePWA({
        registerType: 'prompt',
        includeAssets: ['icons/favicon.ico'],
        manifest: {
          theme_color: '#f88935',
          background_color: '#f69435',
          display: 'standalone',
          scope: '/',
          start_url: '/',
          name: 'Chiller Check',
          short_name: 'Chiller Check',
          description: 'Chiller Check - web panel',
          icons: [
            {
              src: 'icon.png',
              sizes: '192x192',
              type: 'image/png'
            }
          ]
        }
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    test: {
      globals: true,
      silent: true,
      onConsoleLog(log) {
        if (log.includes('warn') || log.includes('error')) return false;
      },
      deps: {
        optimizer: {
          web: {
            include: ['@ckeditor/ckeditor5-build-classic', '@ckeditor/ckeditor5-react']
          }
        }
      },
      coverage: {
        enabled: true,
        provider: 'v8',
        exclude: [
          'build',
          'src/services',
          'src/styles',
          'src/test',
          'src/setupTests.ts',
          'src/assets',
          'src/app',
          'src/store',
          'src/index.tsx',
          '.eslintrc.cjs',
          'src/vite-env.d.ts'
        ]
      },
      environment: 'jsdom',
      setupFiles: ['src/setupTests.ts']
    }
  };
});
