/// <reference types="vitest" />
import { defineConfig } from "vite";

export default defineConfig({
  test: {
    deps: {
      inline: [/@nuxt\/test-utils/],
    },
  },
});
