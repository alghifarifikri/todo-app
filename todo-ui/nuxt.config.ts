// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "id",
      },
      title: "Todo App with Nuxt 3",
      meta: [
        { charset: "utf-8" },
        { name: "publisher", content: "Alghifari Fikri" },
        { name: "author", content: "Alghifari Fikri" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
        {
          hid: "description",
          name: "description",
          content: "Take Home Test Todo App Nuxt 3 & Express JS",
        },
      ],
    },
  },
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  css: ["@/assets/css/tailwind.css", "@/assets/css/global.css"],
  postcss: {
    plugins: {
      "tailwindcss/nesting": {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@pinia/nuxt", ["@nuxtjs/tailwindcss", { viewer: false }]],
  vite: {
    vue: {
      customElement: true,
    },
    vueJsx: {
      mergeProps: true,
    },
  },
  alias: {
    "@": "./",
  },
});
