import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { setup, $fetch } from "@nuxt/test-utils";

describe("stylus", async () => {
  await setup({
    rootDir: fileURLToPath(new URL("./fixture/stylus", import.meta.url)),
    dev: true,
    server: true,
  });

  it("resolve stylus file", async () => {
    const css = await $fetch("/_nuxt/app.css");

    expect(css).toContain(`h1 {
  color: #333;
}`);
    expect(css).toContain(`.ymca {
  color: #333;
}`);
  });
});
