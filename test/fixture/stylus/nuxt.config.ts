import MyModule from "../../../src/module";

export default defineNuxtConfig({
  css: ["@/assets/a.styl"],
  modules: [MyModule],
  styleResources: {
    stylus: ["@/assets/variables.styl"],
  },
  builder: "webpack",
});
