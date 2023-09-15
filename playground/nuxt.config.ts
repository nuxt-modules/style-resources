export default defineNuxtConfig({
  modules: ["../src/module"],
  css: ["@/assets/a.scss", "@/assets/a.sass"],
  styleResources: {
    scss: ["@/assets/nested/index.scss", "mathsass"],
    sass: ["@/assets/nested/index.sass"],
    hoistUseStatements: true,
  },
  builder: "webpack",
});
