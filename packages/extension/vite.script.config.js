import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { resolve } from 'path'
import { renameSync, existsSync } from 'fs'

export default defineConfig({
  plugins: [
    nodePolyfills({
      include: ['buffer', 'crypto', 'stream', 'url', 'util'],
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    }),
    {
      name: 'rename-script',
      writeBundle() {
        const oldPath = 'dist/script.iife.js'
        const newPath = 'dist/script.js'
        if (existsSync(oldPath)) {
          renameSync(oldPath, newPath)
        }
      }
    }
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/script.js'),
      name: 'FlowScript',
      fileName: 'script',
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    },
    target: 'es2017',
    minify: process.env.NODE_ENV === 'production',
  },
  define: {
    global: 'globalThis',
  },
})