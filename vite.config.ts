import react from '@vitejs/plugin-react-swc'
import {defineConfig} from "vite";
import tailwindcss from "@tailwindcss/vite";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
    base: '/',
    plugins: [
        react(),
        tailwindcss(),
        checker({
            typescript: true,
        })
    ]
})