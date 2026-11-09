import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 주소(https://beryls1201.github.io/figma-practice/)의 저장소 이름
  base: '/figma-practice/',
  plugins: [react()],
})
