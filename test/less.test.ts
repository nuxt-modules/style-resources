import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { setup, $fetch } from "@nuxt/test-utils";

describe("less", async () => {
  await setup({
    rootDir: fileURLToPath(new URL("./fixture/less", import.meta.url)),
    dev: true,
    server: true,
  });

  it("resolve less file", async () => {
    const css = await $fetch("/_nuxt/app.css");

    expect(css).toContain(`h1 {
  color: #0f0;
}`);
    expect(css).toContain(`.ymca {
  color: #333;
}`);
  });
});
