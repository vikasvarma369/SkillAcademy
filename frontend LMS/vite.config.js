import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server:{
  //   proxy:{
  //     '/api/v1': import.meta.env.VITE_BASE_URL
  //   }
  // },
  plugins: [react()],
})
