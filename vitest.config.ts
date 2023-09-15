/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    server: {
      deps: {
        inline: [/@nuxt\/test-utils/],
      },
    }
  },
});
