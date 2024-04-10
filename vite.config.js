import { defineConfig } from "vite";

export default defineConfig({
    base: "/RotatingTriangle/",
    server: {
        watch: {
            usePolling: true,
        }
    },
});