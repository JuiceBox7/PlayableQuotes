import { defineConfig } from "vite";

export default defineConfig({
    base: "https://juicebox7.github.io/RotatingTriangle/",
    server: {
        watch: {
            usePolling: true,
        }
    },
});