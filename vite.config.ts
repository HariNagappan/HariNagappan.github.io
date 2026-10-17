import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves a project site from https://<user>.github.io/<repo>/,
// so the production build needs base = "/<repo>/".
//
// You do NOT have to hard-code the repo name: the deploy workflow
// (.github/workflows/deploy.yml) sets VITE_BASE from your repository name,
// so renaming the repo just works. Locally the base is "/".
//
// To force a value yourself:  VITE_BASE=/my-repo/ npm run build
export default defineConfig({
  base: '/',
  plugins: [react()],
})
