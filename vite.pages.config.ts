import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const interfacePatch = fileURLToPath(new URL('./patches/interface-improvements.patch', import.meta.url))
execFileSync('git', ['apply', '--check', interfacePatch], { stdio: 'inherit' })
execFileSync('git', ['apply', interfacePatch], { stdio: 'inherit' })

export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  build: {
    outDir: 'dist-pages',
    emptyOutDir: true,
  },
})
