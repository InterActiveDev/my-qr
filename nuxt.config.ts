// https://nuxt.com/docs/api/configuration/nuxt-config
import { VitePWA } from "vite-plugin-pwa";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBase: "https://myorderpwa.hungryline.com/api/myorder",
      logSalt: process.env.LOG_SALT,
    },
  },

  app: {
    head: {
      title: "My Order",
      viewport:
        "initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width, height=device-height, target-densitydpi=device-dpi",
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "https://interactive.co.id/product/images/assets/product_detail/favicon.png",
        },
      ],
    },
  },

  ssr: false,

  nitro: {
    compressPublicAssets: true,
  },

  delayHydration: {
    mode: "mount",
    debug: process.env.NODE_ENV === "development",
  },

  plugins: [
    {
      src: "~/plugins/vidle.js",
    },
  ],

  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "@vite-pwa/nuxt",
    "@nuxt/image",
    "nuxt-delay-hydration",
    "@nuxtjs/web-vitals",
    "nuxt-swiper",
    "nuxt-lazy-hydrate",
    "@averjs/nuxt-compression",
  ],

  webVitals: {
    debug: false,
    disabled: false,
  },

  image: {
    inject: true,
    quality: 80,
    format: ["webp"],
    cloudinary: {
      baseURL: "https://res.cloudinary.com/dskhxnocs/image/upload/",
    },
  },

  pwa: {
    manifest: {
      name: "My Order",
      short_name: "My Order",
      description: "My Order PWA",
      theme_color: "#0AB85F",
      icons: [
        {
          src: "/icon.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icon.png",
          sizes: "512x512",
          type: "image/png",
        },
        {
          src: "/icon.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icon.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
    workbox: {
      navigateFallback: "/", // Fallback to index.html
      globPatterns: [
        "**/*.{js,css,html,png,jpg,jpeg,svg,woff2,woff,ttf,eot,webmanifest}",
      ],
    },
    client: {
      installPrompt: true,
    },
    registerWebManifestInRouteRules: true,
    devOptions: {
      enabled: true,
      navigateFallbackAllowlist: [/^\/$/],
    },
    registerType: "autoUpdate",
  },
  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
});
