import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    // tsconfig.app.json에 설정된 @ 경로를 Vite에서도 사용합니다.
    tsconfigPaths: true,
  }
})
