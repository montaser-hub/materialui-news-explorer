import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// NewsAPI's free plan only answers requests from localhost and the key must not
// ship in the browser bundle, so the dev server proxies /newsapi to NewsAPI and
// adds the key (NEWSAPI_KEY in .env) on the server side.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname, "");
  const proxy = {
    "/newsapi": {
      target: "https://newsapi.org",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/newsapi/, ""),
      headers: { "X-Api-Key": env.NEWSAPI_KEY ?? "" },
    },
  };
  return {
    plugins: [react()],
    server: { proxy },
    preview: { proxy },
  };
});
