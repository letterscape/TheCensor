import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    //... 
    include: [
      "@mui/material"
      // include other packages that may broke the build
    ]
 }
});
