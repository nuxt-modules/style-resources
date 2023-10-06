import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { setup, $fetch } from "@nuxt/test-utils";

describe("sass", async () => {
  await setup({
    rootDir: fileURLToPath(new URL("./fixture/sass", import.meta.url)),
    dev: true,
    server: true,
  });

  it("resolve sass and css file", async () => {
    const css = await $fetch("/_nuxt/app.css");

    expect(css).toContain(`.ymca {
  color: #333;
  line-height: 16;
}`);
    expect(css).toContain(`.ymca {
  background-color: #fff;
}`);
  });
});
