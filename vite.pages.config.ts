import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const interfacePatches = [
  './patches/interface-improvements.patch',
  './patches/detailed-option-classification.patch',
].map((path) => fileURLToPath(new URL(path, import.meta.url)))

for (const patch of interfacePatches) {
  execFileSync('git', ['apply', '--check', patch], { stdio: 'inherit' })
  execFileSync('git', ['apply', patch], { stdio: 'inherit' })
}

export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  build: {
    outDir: 'dist-pages',
    emptyOutDir: true,
  },
})
