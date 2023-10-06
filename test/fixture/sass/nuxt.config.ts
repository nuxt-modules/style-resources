import MyModule from "../../../src/module";

export default defineNuxtConfig({
  css: ["@/assets/a.scss", "@/assets/a.sass"],
  modules: [MyModule],
  styleResources: {
    scss: ["@/assets/nested/index.scss", "mathsass"],
    sass: ["@/assets/nested/index.sass"],
    hoistUseStatements: true,
  },
  builder: "webpack",
});
